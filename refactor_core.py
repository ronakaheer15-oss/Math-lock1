import os

file_path = r'c:\Users\HP\Downloads\mathlock-vercel\src\MathLock.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Clean up header and constants (lines 1 to around 109)
new_header = """import { useState, useEffect, useRef } from 'react';
import { useStore } from "./store";
import { supabase } from "./supabase";
import Auth from "./Auth";
import { SUBJECTS, SUBJECT_LIST, getRoadmap, getMeta, getDaysLeft as getSubjectDaysLeft } from './data/subjects';

// ─── UTILITIES & CONSTANTS ────────────────────────────────────────────────
const PHASES = [
  { name: "📖 READ", full: "Read the concept carefully once", duration: 10 * 60, color: "#f0c040" },
  { name: "✏️ PRACTICE", full: "Solve problems with notes open", duration: 20 * 60, color: "#ff6b35" },
  { name: "🧠 RECALL BLIND", full: "Close notes. Solve from memory.", duration: 30 * 60, color: "#39ff7a" },
  { name: "🔁 REVIEW", full: "Check answers. Fix mistakes.", duration: 20 * 60, color: "#a78bfa" },
];

function fmt(s) { return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; }

const C = {
  bg: "#0a0a0f", surface: "#13131a", surface2: "#1c1c28",
  border: "#2a2a3a", text: "#f0eee8", muted: "#7a7a8a",
  yellow: "#f0c040", orange: "#ff6b35", green: "#39ff7a",
  red: "#ff3366", purple: "#a78bfa", blue: "#38bdf8"
};

// Seed defaults once — so Day 1 is always pre-marked complete on first ever load
function seedDefaults() {
  try {
    if (!localStorage.getItem("ml_seeded")) {
      localStorage.setItem("ml_day", JSON.stringify(1));
      localStorage.setItem("ml_doneDays", JSON.stringify([0]));
      localStorage.setItem("ml_doneTasks", JSON.stringify({ "day_0": [0, 1, 2] }));
      localStorage.setItem("ml_seeded", "true");
    }
  } catch(e) {}
}
seedDefaults();

async function checkAnswerWithAI(problem, userAnswer, subject = "Mathematics") {
  const apiKey = useStore.getState().apiKey;
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `Act as an expert ${subject} Teacher. 
Problem: ${problem}
Student's Answer: ${userAnswer}

Check if correct. provide brief feedback (max 2 sentences).
Format response as JSON: { "correct": boolean, "feedback": "string", "steps": ["step1", "step2"] }`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error || `Server Error (${response.status})`);
  }

  const data = await response.json();
  const contentStr = data.choices?.[0]?.message?.content;
  return JSON.parse(contentStr);
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
"""

# Find the start of the component
comp_start = content.find("export default function MathLock()")
comp_rest = content[comp_start:]

# Replace the component signature and local state
old_state_block = """export default function MathLock() {
  const screen = useStore(s => s.screen);
  const setScreen = useStore(s => s.setScreen);
  const currentDay = useStore(s => s.currentDay);
  const setCurrentDay = useStore(s => s.setCurrentDay);
  const doneDays = useStore(s => s.doneDays);
  const setDoneDays = useStore(s => s.setDoneDays);
  const doneTasks = useStore(s => s.doneTasks);
  const setDoneTasks = useStore(s => s.setDoneTasks);
  const streak = useStore(s => s.streak);
  const setStreak = useStore(s => s.setStreak);
  const absent = useStore(s => s.absent);
  const setAbsent = useStore(s => s.setAbsent);
  const phaseDone = useStore(s => s.phaseDone);
  const setPhaseDone = useStore(s => s.setPhaseDone);
  const dayScores = useStore(s => s.dayScores);
  const setDayScores = useStore(s => s.setDayScores);
  const mistakes = useStore(s => s.mistakes);
  const setMistakes = useStore(s => s.setMistakes);

  const [phase, setPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);
  const [running, setRunning] = useState(false);
  const [modal, setModal] = useState(null);
  const [activeTab, setActiveTab] = useState("guide");"""

new_state_block = """export default function MathLock() {
  const screen = useStore(s => s.screen);
  const setScreen = useStore(s => s.setScreen);
  
  // ── MULTI-SUBJECT STATE ──
  const activeSubject = useStore(s => s.activeSubject);
  const setActiveSubject = useStore(s => s.setActiveSubject);
  const subjectsProgress = useStore(s => s.subjectsProgress);
  const updateSubjectProgress = useStore(s => s.updateSubjectProgress);
  
  const currentProg = subjectsProgress[activeSubject] || { currentDay: 0, doneDays: [], doneTasks: {}, dayScores: {}, phaseDone: [] };
  const currentDay = currentProg.currentDay;
  const doneDays = currentProg.doneDays;
  const doneTasks = currentProg.doneTasks;
  const phaseDone = currentProg.phaseDone;
  const dayScores = currentProg.dayScores;

  // Shortcuts for local subject data
  const ROADMAP = getRoadmap(activeSubject);
  const subjectMeta = getMeta(activeSubject);
  const getDaysLeft = () => getSubjectDaysLeft(activeSubject);

  const streak = useStore(s => s.streak);
  const setStreak = useStore(s => s.setStreak);
  const absent = useStore(s => s.absent);
  const setAbsent = useStore(s => s.setAbsent);
  const mistakes = useStore(s => s.mistakes);
  const setMistakes = useStore(s => s.setMistakes);

  const [phase, setPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);
  const [running, setRunning] = useState(false);
  const [modal, setModal] = useState(null);
  const [activeTab, setActiveTab] = useState("guide");

  // Helper to sync current subject progress
  const syncProgress = (update) => updateSubjectProgress(activeSubject, update);

  const setDoneDays = (val) => syncProgress({ doneDays: typeof val === 'function' ? val(doneDays) : val });
  const setCurrentDay = (val) => syncProgress({ currentDay: typeof val === 'function' ? val(currentDay) : val });
  const setDoneTasks = (val) => syncProgress({ doneTasks: typeof val === 'function' ? val(doneTasks) : val });
  const setPhaseDone = (val) => syncProgress({ phaseDone: typeof val === 'function' ? val(phaseDone) : val });
  const setDayScores = (val) => syncProgress({ dayScores: typeof val === 'function' ? val(dayScores) : val });"""

final_comp = comp_rest.replace(old_state_block, new_state_block)

# Replace the branding in the header
final_comp = final_comp.replace('Math<span style={{ color: C.yellow }}>Lock</span> <span style={{ fontSize: 10, color: C.muted }}>v3</span>', 'Exam<span style={{ color: C.yellow }}>Lock</span> <span style={{ fontSize: 10, color: C.muted }}>v4</span>')

# Add the subject info to the header
header_target = '<div style={{ display: "flex", gap: 7, alignItems: "center" }}>'
header_replacement = '<div style={{ display: "flex", gap: 7, alignItems: "center" }}>\\n          <div style={{ fontSize: 14, fontWeight: 800, color: subjectMeta.color, marginRight: 4 }}>{subjectMeta.icon} {subjectMeta.name.toUpperCase()}</div>'
# Need to escape correctly
final_comp = final_comp.replace(header_target, header_target + '\n          <div style={{ fontSize: 14, fontWeight: 800, color: subjectMeta.color, marginRight: 4 }}>{subjectMeta.icon} {subjectMeta.name.toUpperCase()}</div>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_header + final_comp)

print("Header and core state refactored.")
