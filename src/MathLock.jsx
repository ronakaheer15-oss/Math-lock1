import { useState, useEffect, useRef } from 'react';
import { useStore } from "./store";
import { supabase } from "./supabase";
import Auth from "./Auth";
import { SUBJECTS, SUBJECT_LIST, getRoadmap, getMeta, getDaysLeft as getSubjectDaysLeft } from './data/subjects';

// ROADMAP is now dynamically set based on active subject â€” see inside component
// Keeping a default for any top-level references:
const ROADMAP_DEFAULT = getRoadmap('math');

// (Old inline ROADMAP removed â€” data now lives in src/data/)

// â”€â”€â”€ REMAINING APP CODE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// Seed defaults once â€” so Day 1 is always pre-marked complete on first ever load
function seedDefaults() {
  try {
    if (!localStorage.getItem("ml_seeded")) {
      localStorage.setItem("ml_day", JSON.stringify(1));
      localStorage.setItem("ml_doneDays", JSON.stringify([0]));
      localStorage.setItem("ml_doneTasks", JSON.stringify({ "day_0": [0, 1, 2] }));
      localStorage.setItem("ml_streak", JSON.stringify(1));
      localStorage.setItem("ml_absent", JSON.stringify(0));
      localStorage.setItem("ml_scores", JSON.stringify({ "day_0": 8 }));
      localStorage.setItem("ml_mistakes", JSON.stringify([]));
      localStorage.setItem("ml_phaseDone", JSON.stringify([]));
      localStorage.setItem("ml_screen", JSON.stringify("welcome"));
      localStorage.setItem("ml_seeded", "true");
    }
  } catch { }
}
seedDefaults();

function loadState(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveState(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { } }

function Modal({ children, borderColor = "#2a2a3a" }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.93)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 12px", overflowY: "auto" }}>
      <div style={{ background: C.surface, border: `1px solid ${borderColor}`, borderRadius: 16, padding: "24px 16px", maxWidth: 420, width: "100%", textAlign: "center", fontFamily: "'Inter',system-ui,sans-serif", color: C.text, maxHeight: "90vh", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "2px", color, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 3, height: 14, background: color, borderRadius: 2 }} />{title}
      </div>
      {children}
    </div>
  );
}

// â”€â”€â”€ UTILITIES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const playAudio = (text) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

// â”€â”€â”€ AI ANSWER CHECKER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function checkAnswerWithAI(question, userAnswer, chapter, mode = "check") {
  const response = await fetch("/api/checkAnswer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: `Chapter: ${chapter}\nQuestion: ${question}`,
      answer: userAnswer
    })
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error || `Server Error (${response.status})`);
  }

  // The serverless function now parses and cleans the JSON for us
  const data = await response.json();
  return data;
}

// â”€â”€â”€ MAIN COMPONENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function MathLock() {
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

  // â”€â”€ MULTI-SUBJECT STATE â”€â”€
  const [activeSubject, setActiveSubject] = useState('math');
  const ROADMAP = getRoadmap(activeSubject);
  const subjectMeta = getMeta(activeSubject);
  const getDaysLeft = () => getSubjectDaysLeft(activeSubject);

  const [phase, setPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);
  const [running, setRunning] = useState(false);
  const [modal, setModal] = useState(null);
  const [activeTab, setActiveTab] = useState("guide");

  // Auth internal state
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [quizDone, setQuizDone] = useState([]);

  // AI checker state
  const [checkerQ, setCheckerQ] = useState("");
  const [checkerA, setCheckerA] = useState("");
  const [checkerRes, setCheckerRes] = useState(null);
  const [checkerLoading, setCheckerLoading] = useState(false);
  // Mistake notebook
  const [newMistake, setNewMistake] = useState("");
  const [mistakeChap, setMistakeChap] = useState("");

  // Score modal
  const [pendingScore, setPendingScore] = useState(null);

  const timerRef = useRef(null);
  const breakRef = useRef(null);
  const checkRef = useRef(null);

  const day = ROADMAP[currentDay];
  const myTasks = doneTasks[`day_${currentDay}`] || [];
  const progress = Math.round((doneDays.length / ROADMAP.length) * 100);
  const circ = 2 * Math.PI * 48;
  const phaseFrac = 1 - timeLeft / PHASES[phase].duration;
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); setRunning(false); setPhaseDone(p => [...new Set([...p, phase])]); if (phase < 3) setTimeout(() => goPhase(phase + 1), 500); return 0; }
          return t - 1;
        });
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running, phase]);

  useEffect(() => {
    if (modal === "break") {
      breakRef.current = setInterval(() => setBreakSec(t => t <= 1 ? (clearInterval(breakRef.current), 0) : t - 1), 1000);
    } else clearInterval(breakRef.current);
    return () => clearInterval(breakRef.current);
  }, [modal]);

  useEffect(() => {
    if (screen !== "app") return;
    checkRef.current = setInterval(() => { if (running) { setRunning(false); setModal("checkIn"); } }, 8 * 60 * 1000);
    return () => clearInterval(checkRef.current);
  }, [screen, running]);

  useEffect(() => {
    const h = () => { if (document.hidden && running) { setRunning(false); setAbsent(a => a + 1); setModal("checkIn"); } };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [running]);

  function goPhase(i) { setPhase(i); setTimeLeft(PHASES[i].duration); setRunning(false); }

  function toggleTask(di, ti) {
    setDoneTasks(prev => {
      const k = `day_${di}`, arr = [...(prev[k] || [])], pos = arr.indexOf(ti);
      pos > -1 ? arr.splice(pos, 1) : arr.push(ti);
      const next = { ...prev, [k]: arr };
      if (arr.length === ROADMAP[di].recallTask.length) setTimeout(() => {
        setDoneDays(d => d.includes(di) ? d : [...d, di]);
        setStreak(s => s + 1);
        setPendingScore(di);
      }, 300);
      return next;
    });
  }

  function submitScore(di, score) {
    setDayScores(prev => ({ ...prev, [`day_${di}`]: score }));
    setPendingScore(null);
    setModal("dayDone");
  }

  function addMistake() {
    if (!newMistake.trim()) return;
    setMistakes(prev => [{ id: Date.now(), text: newMistake, chapter: mistakeChap || day.chapter, day: currentDay + 1, date: new Date().toLocaleDateString(), reviewCount: 0, nextReviewDate: Date.now() + 86400000 }, ...prev].slice(0, 50));
    setNewMistake(""); setMistakeChap("");
  }

  function deleteMistake(id) { setMistakes(prev => prev.filter(m => m.id !== id)); }

  // runChecker obsolete

  // Quiz helpers
  const quizSet = day.quizFormulas || [];
  function nextQuiz() {
    setQuizIdx(i => (i + 1) % quizSet.length);
    setQuizAnswer(""); setQuizResult(null);
  }
  function checkQuiz() {
    const correct = quizSet[quizIdx].a.toLowerCase().replace(/\s/g, "");
    const given = quizAnswer.toLowerCase().replace(/\s/g, "");
    const isCorrect = correct.includes(given) || given.includes(correct) || given.length > 2 && correct.includes(given.slice(0, Math.floor(given.length * .7)));
    setQuizResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) setQuizDone(d => [...new Set([...d, quizIdx])]);
  }

  function resetAllData() {
    ["ml_screen", "ml_day", "ml_doneDays", "ml_doneTasks", "ml_streak", "ml_absent", "ml_phaseDone", "ml_scores", "ml_mistakes", "ml_seeded"]
      .forEach(k => localStorage.removeItem(k));
    if (supabase) supabase.auth.signOut();
    window.location.reload();
  }

  // â”€â”€ AUTH CHECK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (!supabase) { setAuthChecking(false); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (authChecking) {
    return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, color: C.yellow, fontWeight: 900 }}>Loading...</div>;
  }

  // If Supabase is configured and the user isn't logged in, show Auth
  if (supabase && !user) {
    return <Auth onLogin={() => window.location.reload()} />;
  }

  // ── SUBJECT SELECTOR ───────────────────────────────────────────────────
  if (screen === "welcome") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 16px", fontFamily: "'Inter',system-ui,sans-serif", color: C.text, textAlign: "center", width: "100%", maxWidth: "100vw", overflow: "hidden" }}>
      <div style={{ background: C.yellow, color: "#000", fontSize: "10px", fontWeight: 900, letterSpacing: "4px", padding: "5px 16px", borderRadius: 2, marginBottom: 24 }}>EXAMLOCK v4.0</div>
      <h1 style={{ fontSize: "clamp(36px,11vw,84px)", fontWeight: 900, lineHeight: .88, marginBottom: 14 }}>STUDY.<br /><span style={{ color: C.yellow }}>NO</span> ESCAPE.</h1>
      <p style={{ color: C.muted, fontSize: "11px", letterSpacing: "3px", marginBottom: 28, fontFamily: "monospace" }}>// AI-powered multi-subject board exam system //</p>

      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "3px", color: C.muted, marginBottom: 12 }}>CHOOSE YOUR SUBJECT</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24, width: "100%", maxWidth: 360 }}>
        {SUBJECT_LIST.map(meta => {
          const isActive = activeSubject === meta.id;
          const dLeft = getSubjectDaysLeft(meta.id);
          const rd = getRoadmap(meta.id);
          return (
            <div key={meta.id}
              onClick={() => setActiveSubject(meta.id)}
              style={{
                background: isActive ? `${meta.color}15` : C.surface2,
                border: `2px solid ${isActive ? meta.color : C.border}`,
                borderRadius: 12, padding: "14px 12px", textAlign: "left", cursor: "pointer",
                transition: "all 0.2s ease",
                transform: isActive ? "scale(1.03)" : "scale(1)"
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{meta.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 2, color: isActive ? meta.color : C.text }}>{meta.name}</div>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>{meta.chapters} chapters • {rd.length} days</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: meta.color, lineHeight: 1 }}>{dLeft}</div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: "1px" }}>DAYS LEFT</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${subjectMeta.color}`, padding: "14px 20px", borderRadius: 8, marginBottom: 24, width: "100%", maxWidth: 360 }}>
        <div style={{ fontSize: "clamp(36px,9vw,50px)", fontWeight: 900, color: subjectMeta.color, lineHeight: 1 }}>{getDaysLeft()}</div>
        <div style={{ color: C.muted, fontSize: "10px", letterSpacing: "3px", marginTop: 4 }}>DAYS UNTIL {subjectMeta.name.toUpperCase()} EXAM</div>
        <div style={{ fontSize: 12, marginTop: 8 }}>📅 TS SSC — {new Date(subjectMeta.examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24, width: "100%", maxWidth: 360 }}>
        {[["📊", "Score Tracker", "Rate each day's performance"], ["⚡", "Formula Quiz", "Flash card memory training"], ["📝", "Mistake Notebook", "Save & review your errors"], ["🤖", "AI Answer Check", "Write answer, AI checks it"]].map(([icon, title, desc]) => (
          <div key={title} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", textAlign: "left" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 2 }}>{title}</div>
            <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{desc}</div>
          </div>
        ))}
      </div>

      {doneDays.length > 0 && (
        <div style={{ background: "rgba(57,255,122,.08)", border: `1px solid ${C.green}`, borderRadius: 8, padding: "10px 20px", marginBottom: 16, fontSize: 13 }}>
          ✅ Welcome back! <strong style={{ color: C.green }}>{doneDays.length} days</strong> done. Progress saved!
        </div>
      )}
      <button onClick={() => setScreen("app")} style={{ background: C.yellow, color: "#000", border: "none", padding: "16px 52px", fontSize: 17, fontWeight: 900, cursor: "pointer", borderRadius: 4, marginBottom: 10 }}>
        {doneDays.length > 0 ? `▶ CONTINUE ${subjectMeta.icon} ${subjectMeta.name} (Day ${currentDay + 1})` : `🔒 LOCK IN ${subjectMeta.icon} ${subjectMeta.name}`}
      </button>
      {doneDays.length > 0 && <button onClick={resetAllData} style={{ background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: "7px 20px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 4 }}>Reset All Progress</button>}
    </div>
  );

  // â”€â”€ MAIN APP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter',system-ui,sans-serif", padding: "12px 10px 40px", maxWidth: 540, margin: "0 auto", width: "100%" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>Math<span style={{ color: C.yellow }}>Lock</span> <span style={{ fontSize: 10, color: C.muted }}>v3</span></div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {absent > 0 && <div style={{ background: "rgba(255,51,102,.15)", border: `1px solid ${C.red}`, color: C.red, padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>âš ï¸ {absent}x</div>}
          <div style={{ background: "rgba(255,107,53,.15)", border: `1px solid ${C.orange}`, color: C.orange, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>ðŸ”¥ {streak}</div>
          <button onClick={() => setScreen("welcome")} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, padding: "3px 9px", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>âŒ‚</button>
        </div>
      </div>

      {/* PROGRESS */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 5 }}>
          <span>PROGRESS</span>
          <span style={{ color: C.yellow }}>{doneDays.length}/{ROADMAP.length} Â· {progress}%</span>
        </div>
        <div style={{ height: 5, background: C.surface2, borderRadius: 3 }}>
          <div style={{ height: "100%", background: C.yellow, borderRadius: 3, width: `${progress}%`, transition: "width .5s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 10, color: C.muted }}>
          <span style={{ color: C.text, fontWeight: 700 }}>Day {currentDay + 1}: {day.chapter}</span>
          <span style={{ color: getDaysLeft() <= 5 ? C.red : C.muted }}>{getDaysLeft()} days left</span>
        </div>
      </div>

      {/* TIMER */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
            <svg width="96" height="96" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="48" cy="48" r="44" fill="none" stroke={C.surface2} strokeWidth="6" />
              <circle cx="48" cy="48" r="44" fill="none" stroke={PHASES[phase].color} strokeWidth="6"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - phaseFrac)} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: PHASES[phase].color }}>{fmt(timeLeft)}</div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: "2px", marginBottom: 3 }}>{PHASES[phase].name}</div>
            <div style={{ fontSize: 12, marginBottom: 10, lineHeight: 1.3 }}>{PHASES[phase].full}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setRunning(r => !r)} style={{ flex: 2, background: running ? C.red : C.yellow, color: "#000", border: "none", padding: "9px 6px", borderRadius: 7, fontWeight: 900, cursor: "pointer", fontSize: 12 }}>{running ? "â¸ PAUSE" : "â–¶ START"}</button>
              <button onClick={() => { setModal("break"); setBreakSec(600); setRunning(false); }} style={{ flex: 1, background: C.surface2, color: C.text, border: `1px solid ${C.border}`, padding: 9, borderRadius: 7, cursor: "pointer", fontSize: 12 }}>â˜•</button>
              <button onClick={() => setModal("hardProblem")} style={{ flex: 1, background: C.surface2, color: C.text, border: `1px solid ${C.border}`, padding: 9, borderRadius: 7, cursor: "pointer", fontSize: 12 }}>ðŸ†˜</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 12 }}>
          {PHASES.map((p, i) => (
            <button key={i} onClick={() => goPhase(i)} style={{ padding: "4px 10px", borderRadius: 20, border: `1px solid ${i === phase ? p.color : phaseDone.includes(i) ? C.green : C.border}`, background: i === phase ? `${p.color}22` : phaseDone.includes(i) ? "rgba(57,255,122,.08)" : "transparent", color: i === phase ? p.color : phaseDone.includes(i) ? C.green : C.muted, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
              {phaseDone.includes(i) && "âœ“ "}{p.name}
            </button>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 5, marginBottom: 12 }}>
        {[["guide", "ðŸ“š"], ["tasks", "âœ…"], ["quiz", "âš¡"], ["checker", "ðŸ¤–"], ["mistakes", "ðŸ“"], ["roadmap", "ðŸ—“"]].slice(0, 6).map(([id, icon]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "8px 4px", borderRadius: 7, border: `1px solid ${activeTab === id ? C.yellow : C.border}`, background: activeTab === id ? "rgba(240,192,64,.1)" : C.surface, color: activeTab === id ? C.yellow : C.muted, fontSize: 18, cursor: "pointer" }}>
            {icon}
          </button>
        ))}
      </div>

      {/* â”€â”€ STUDY GUIDE â”€â”€ */}
      {activeTab === "guide" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: "2px", marginBottom: 3 }}>DAY {currentDay + 1} OF {ROADMAP.length}</div>
            <div style={{ fontSize: 17, fontWeight: 900, marginBottom: 2 }}>{day.topic}</div>
            <div style={{ fontSize: 12, color: C.yellow }}>ðŸ“Œ {day.chapter}</div>
          </div>
          <Section title="WHAT TO STUDY TODAY" color={C.blue}>
            {day.whatToStudy.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 12, lineHeight: 1.5 }}>
                <span style={{ color: C.blue, fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span><span>{item}</span>
              </div>
            ))}
          </Section>
          <Section title="PROBLEMS TO SOLVE TODAY" color={C.orange}>
            {day.problems.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 12, lineHeight: 1.5, background: C.surface2, padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.border}` }}>
                <span style={{ color: C.orange, fontWeight: 900, flexShrink: 0, minWidth: 20 }}>Q{i + 1}</span><span>{p}</span>
              </div>
            ))}
          </Section>
          <Section title="FORMULAS FOR TODAY" color={C.purple}>
            {day.formulas.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12, fontFamily: "monospace", background: "rgba(167,139,250,.08)", padding: "7px 10px", borderRadius: 5, border: `1px solid rgba(167,139,250,.2)` }}>
                <span style={{ color: C.purple, fontWeight: 900 }}>f{i + 1}</span><span style={{ color: "#e2d9fa" }}>{f}</span>
              </div>
            ))}
          </Section>
        </div>
      )}

      {/* â”€â”€ RECALL TASKS â”€â”€ */}
      {activeTab === "tasks" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 900 }}>RECALL TASKS</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Close your book first!</div>
            </div>
            <div style={{ background: C.red, color: "#fff", fontSize: "9px", padding: "4px 10px", borderRadius: 20, fontWeight: 800 }}>ðŸ“• NOTES CLOSED</div>
          </div>
          {day.recallTask.map((t, i) => {
            const done = myTasks.includes(i);
            return (
              <div key={i} onClick={() => toggleTask(currentDay, i)}
                style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 9, border: `1px solid ${done ? C.green : C.border}`, background: done ? "rgba(57,255,122,.06)" : C.surface2, marginBottom: i < day.recallTask.length - 1 ? "10px" : 0, cursor: "pointer" }}>
                <div style={{ width: 24, height: 24, borderRadius: 5, border: `2px solid ${done ? C.green : C.border}`, background: done ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{done ? "âœ“" : ""}</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "2px", color: done ? C.green : C.muted, marginBottom: 3, fontWeight: 700 }}>TASK {i + 1}{done ? " â€” DONE âœ“" : ""}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.4, color: done ? "rgba(240,238,232,.5)" : C.text }}>{t}</div>
                </div>
              </div>
            );
          })}
          {/* Day score display */}
          {dayScores[`day_${currentDay}`] && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(240,192,64,.08)", border: `1px solid rgba(240,192,64,.3)`, borderRadius: 8, fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: C.muted }}>Today's Self Score</span>
              <span style={{ color: C.yellow, fontWeight: 900, fontSize: 18 }}>{dayScores[`day_${currentDay}`]}/10</span>
            </div>
          )}
          <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(240,192,64,.06)", border: `1px solid rgba(240,192,64,.2)`, borderRadius: 8, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
            ðŸ’¡ <strong style={{ color: C.yellow }}>Remember:</strong> Tick only after genuinely solving blind. That discomfort is memory being built.
          </div>
        </div>
      )}

      {/* â”€â”€ FORMULA QUIZ â”€â”€ */}
      {activeTab === "quiz" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 900 }}>âš¡ FORMULA QUIZ</div>
            <div style={{ fontSize: 10, color: C.muted }}>{quizDone.length}/{quizSet.length} mastered</div>
          </div>
          {quizSet.length > 0 ? (
            <>
              <div style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 16px", marginBottom: 14, textAlign: "center", position: "relative" }}>
                <button onClick={() => playAudio(quizSet[quizIdx].q)} title="Listen" style={{ position: "absolute", top: 12, right: 12, background: "transparent", border: "none", cursor: "pointer", fontSize: 16, padding: 4 }}>ðŸ”Š</button>
                <div style={{ fontSize: 10, color: C.muted, letterSpacing: "2px", marginBottom: 8 }}>WHAT IS THIS FORMULA?</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: C.yellow, lineHeight: 1.4 }}>{quizSet[quizIdx].q}</div>
              </div>
              <input
                value={quizAnswer}
                onChange={e => setQuizAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !quizResult && checkQuiz()}
                placeholder="Type your answer..."
                style={{ width: "100%", background: C.surface2, border: `1px solid ${quizResult ? (quizResult === "correct" ? C.green : C.red) : C.border}`, borderRadius: 8, padding: "12px 14px", color: C.text, fontSize: 14, fontFamily: "monospace", outline: "none", boxSizing: "border-box", marginBottom: 10 }}
              />
              {quizResult && (
                <div style={{ padding: "12px 14px", borderRadius: 8, background: quizResult === "correct" ? "rgba(57,255,122,.1)" : "rgba(255,51,102,.1)", border: `1px solid ${quizResult === "correct" ? C.green : C.red}`, marginBottom: 10, fontSize: 12, position: "relative" }}>
                  <button onClick={() => playAudio(quizSet[quizIdx].a)} title="Listen to Answer" style={{ position: "absolute", top: 12, right: 12, background: "transparent", border: "none", cursor: "pointer", fontSize: 16, padding: 4 }}>ðŸ”Š</button>
                  <div style={{ fontWeight: 900, color: quizResult === "correct" ? C.green : C.red, marginBottom: 4 }}>{quizResult === "correct" ? "âœ… CORRECT!" : "âŒ NOT QUITE"}</div>
                  <div style={{ color: C.muted }}>Answer: <span style={{ color: C.text, fontFamily: "monospace" }}>{quizSet[quizIdx].a}</span></div>
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                {!quizResult ?
                  <button onClick={checkQuiz} style={{ flex: 2, background: C.yellow, color: "#000", border: "none", padding: "11px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>CHECK ANSWER</button> :
                  <button onClick={nextQuiz} style={{ flex: 2, background: C.yellow, color: "#000", border: "none", padding: "11px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>NEXT FORMULA â†’</button>
                }
                <button onClick={() => { setQuizResult("wrong"); }} style={{ flex: 1, background: C.surface2, color: C.muted, border: `1px solid ${C.border}`, padding: 11, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>SHOW</button>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 6, justifyContent: "center" }}>
                {quizSet.map((_, i) => (
                  <div key={i} onClick={() => { setQuizIdx(i); setQuizAnswer(""); setQuizResult(null); }}
                    style={{ width: 10, height: 10, borderRadius: "50%", cursor: "pointer", background: quizDone.includes(i) ? C.green : i === quizIdx ? C.yellow : C.border }} />
                ))}
              </div>
            </>
          ) : <div style={{ color: C.muted, textAlign: "center", padding: 20 }}>No quiz formulas for this day.</div>}
        </div>
      )}

      {/* â”€â”€ AI CHECKER â”€â”€ */}
      {activeTab === "checker" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 4 }}>ðŸ¤– AI ANSWER CHECKER</div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 12 }}>Write any question + your answer. AI will check it and give detailed feedback. Powered by Groq.</div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", color: C.muted, marginBottom: 6, fontWeight: 700 }}>QUESTION</div>
            <textarea
              value={checkerQ}
              onChange={e => setCheckerQ(e.target.value)}
              placeholder="e.g. Find HCF of 96 and 404 using Euclid's Division Algorithm"
              rows={2}
              style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13, fontFamily: "system-ui", outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", color: C.muted, marginBottom: 6, fontWeight: 700 }}>YOUR ANSWER / WORKING</div>
            <textarea
              value={checkerA}
              onChange={e => setCheckerA(e.target.value)}
              placeholder="Write your complete answer here, including steps..."
              rows={4}
              style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13, fontFamily: "system-ui", outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <button onClick={async () => {
              if (!checkerQ || !checkerA) return alert("Please fill both Question and your Answer.");
              setCheckerLoading(true); setCheckerRes(null);
              try {
                const r = await checkAnswerWithAI(checkerQ, checkerA, day.chapter, "check");
                setCheckerRes(r);
              } catch (e) { alert("AI Error: " + e.message); }
              setCheckerLoading(false);
            }} disabled={checkerLoading || !checkerQ || !checkerA}
              style={{ flex: 2, background: checkerLoading ? "rgba(240,192,64,.4)" : C.yellow, color: "#000", border: "none", padding: "13px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14 }}>
              {checkerLoading ? "ðŸ¤– Checking..." : "ðŸ¤– CHECK ANSWER"}
            </button>
            <button onClick={async () => {
              if (!checkerQ || !checkerA) return alert("Please fill both Question and your Answer.");
              setCheckerLoading(true); setCheckerRes(null);
              try {
                const r = await checkAnswerWithAI(checkerQ, checkerA, day.chapter, "hint");
                setCheckerRes(r);
              } catch (e) { alert("AI Error: " + e.message); }
              setCheckerLoading(false);
            }} disabled={checkerLoading || !checkerQ || !checkerA}
              style={{ flex: 1, background: "transparent", color: C.yellow, border: `1px solid ${C.yellow}`, padding: "13px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14 }}>
              ðŸ’¡ GET HINT
            </button>
          </div>

          {checkerRes && (
            <div style={{ background: checkerRes.correct ? "rgba(57,255,122,.08)" : "rgba(255,51,102,.08)", border: `1px solid ${checkerRes.correct ? C.green : C.red}`, borderRadius: 10, padding: "16px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontWeight: 900, fontSize: 15, color: checkerRes.correct ? C.green : C.red }}>{checkerRes.correct ? "âœ… CORRECT!" : "âŒ NEEDS WORK"}</div>
                <div style={{ background: checkerRes.correct ? C.green : C.orange, color: "#000", fontWeight: 900, padding: "4px 12px", borderRadius: 20, fontSize: 13 }}>{checkerRes.score}</div>
              </div>
              <div style={{ fontSize: 12, color: C.text, marginBottom: 8, fontWeight: 700 }}>{checkerRes.verdict}</div>
              {checkerRes.what_is_right && <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}><strong style={{ color: C.green }}>âœ“ Right:</strong> {checkerRes.what_is_right}</div>}
              {checkerRes.mistakes !== "None" && (() => {
                const match = checkerRes.mistakes.match(/^\[(.*?)\]\s*(.*)/);
                const tag = match ? match[1] : null;
                const desc = match ? match[2] : checkerRes.mistakes;
                const tagColor = tag === "CALCULATION ERROR" ? C.orange : tag === "FORMULA ERROR" ? C.blue : tag === "CONCEPT ERROR" ? C.red : C.red;
                return (
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, lineHeight: 1.5 }}>
                    {match ? <strong style={{ color: tagColor, background: `${tagColor}22`, padding: "2px 6px", borderRadius: 4, marginRight: 6 }}>{tag}</strong> : <strong style={{ color: C.red }}>âœ— Mistake:</strong>}
                    {desc}
                  </div>
                );
              })()}
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}><strong style={{ color: C.blue }}>Correct approach:</strong> {checkerRes.correct_approach}</div>
              <div style={{ fontSize: 11, background: "rgba(240,192,64,.1)", border: `1px solid rgba(240,192,64,.2)`, padding: "8px 10px", borderRadius: 6, color: C.yellow }}>ðŸ’¡ {checkerRes.tip}</div>
              {!checkerRes.correct && (
                <button onClick={() => setMistakes(prev => [{ id: Date.now(), text: `Q: ${checkerQ} | Mistake: ${checkerRes.mistakes}`, chapter: day.chapter, day: currentDay + 1, date: new Date().toLocaleDateString(), reviewCount: 0, nextReviewDate: Date.now() + 86400000 }, ...prev])}
                  style={{ marginTop: 10, width: "100%", background: "transparent", border: `1px solid ${C.border}`, color: C.muted, padding: "8px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
                  ðŸ“ Save to Mistake Notebook
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* â”€â”€ MISTAKE NOTEBOOK â”€â”€ */}
      {activeTab === "mistakes" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 4 }}>ðŸ“ MISTAKE NOTEBOOK</div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>Save errors here. Review before every exam. This is your most powerful study tool.</div>
          <textarea
            value={newMistake}
            onChange={e => setNewMistake(e.target.value)}
            placeholder="Describe your mistake or what you forgot..."
            rows={2}
            style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 8, fontFamily: "system-ui" }}
          />
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input value={mistakeChap} onChange={e => setMistakeChap(e.target.value)} placeholder="Chapter (optional)"
              style={{ flex: 1, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 7, padding: "9px 12px", color: C.text, fontSize: 12, outline: "none", fontFamily: "system-ui" }} />
            <button onClick={addMistake} style={{ background: C.red, color: "#fff", border: "none", padding: "9px 18px", borderRadius: 7, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>+ ADD</button>
          </div>
          {mistakes.length === 0 ? (
            <div style={{ textAlign: "center", color: C.muted, padding: "24px 0", fontSize: 13 }}>No mistakes saved yet. Great job â€” or start adding them! ðŸ˜„</div>
          ) : (
            <div style={{ maxHeight: 340, overflowY: "auto", position: "relative" }}>
              {mistakes.map(m => {
                const due = m.nextReviewDate && m.nextReviewDate <= Date.now();
                return (
                  <div key={m.id} style={{ background: C.surface2, border: `1px solid ${due ? C.red : C.border}`, borderRadius: 8, padding: "12px 14px", marginBottom: 12, position: "relative" }}>
                    {due && <div style={{ position: "absolute", top: -8, right: 10, background: C.red, color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 900 }}>DUE TO REVIEW</div>}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: 9, background: "rgba(255,51,102,.15)", color: C.red, padding: "2px 8px", borderRadius: 10, fontWeight: 700, marginRight: 6 }}>Day {m.day}</span>
                        <span style={{ fontSize: 9, color: C.muted }}>{m.date}</span>
                      </div>
                      <button onClick={() => deleteMistake(m.id)} style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 14, padding: 0 }}>âœ•</button>
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>{m.text}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 10, color: C.muted, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: 8 }}>{m.chapter}</div>
                      <button onClick={() => setMistakes(prev => prev.map(x => x.id === m.id ? { ...x, reviewCount: (x.reviewCount || 0) + 1, nextReviewDate: Date.now() + (Math.pow(2, (x.reviewCount || 0) + 1) * 86400000) } : x))}
                        style={{ background: due ? C.red : "transparent", color: due ? "#fff" : C.muted, border: `1px solid ${due ? C.red : C.border}`, padding: "6px 10px", borderRadius: 6, cursor: "pointer", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                        {due ? "MARK REVIEWED" : `Reviewed ${(m.reviewCount || 0)}x`}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* â”€â”€ ROADMAP â”€â”€ */}
      {activeTab === "roadmap" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, fontSize: 10, fontWeight: 700, letterSpacing: "3px", color: C.muted }}>{ROADMAP.length}-DAY ROADMAP</div>
          <div style={{ maxHeight: 420, overflowY: "auto", padding: 8 }}>
            {ROADMAP.map((d, i) => {
              const done = doneDays.includes(i), active = i === currentDay, score = dayScores[`day_${i}`];
              return (
                <div key={i} onClick={() => { setCurrentDay(i); goPhase(0); setPhaseDone([]); setActiveTab("guide"); }}
                  style={{ display: "flex", gap: 10, padding: "10px", borderRadius: 7, cursor: "pointer", background: active ? "rgba(240,192,64,.08)" : "transparent", border: active ? `1px solid rgba(240,192,64,.3)` : "1px solid transparent", marginBottom: 3, opacity: done ? .6 : 1 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: active ? C.yellow : done ? C.green : C.muted, minWidth: 28, paddingTop: 2, fontWeight: 700 }}>D{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.topic}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>{d.chapter}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                    {score && <div style={{ fontSize: 11, fontWeight: 900, color: score >= 7 ? C.green : score >= 5 ? C.yellow : C.red }}>{score}/10</div>}
                    {done && <div style={{ color: C.green, fontWeight: 900, fontSize: 14 }}>âœ“</div>}
                    {active && !done && <div style={{ color: C.yellow, fontWeight: 700, fontSize: 10 }}>NOW</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* â”€â”€ MODALS â”€â”€ */}
      {modal === "checkIn" && (
        <Modal>
          <div style={{ fontSize: 48, marginBottom: 10 }}>ðŸ‘€</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, color: C.yellow }}>STILL STUDYING?</h2>
          <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>{absent > 0 ? `Absent ${absent} time(s). Exam in ${getDaysLeft()} days!` : "8 minutes done. Confirm you're at your desk."}</p>
          <button onClick={() => { setModal(null); setRunning(true); }} style={{ width: "100%", background: C.green, color: "#000", border: "none", padding: 14, borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14, marginBottom: 8 }}>âœ… YES, I AM STUDYING</button>
          <button onClick={() => { setModal(null); setAbsent(a => a + 1); }} style={{ width: "100%", background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: 11, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>ðŸ˜” I wandered off...</button>
        </Modal>
      )}

      {modal === "break" && (
        <Modal>
          <div style={{ fontSize: 48, marginBottom: 10 }}>â˜•</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>BREAK TIME</h2>
          <p style={{ color: C.muted, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>10 minutes. Stand up, drink water. Your brain consolidates memory right now!</p>
          <div style={{ fontFamily: "monospace", fontSize: 48, fontWeight: 900, color: breakSec > 0 ? C.yellow : C.red, marginBottom: 20 }}>{fmt(breakSec)}</div>
          <button onClick={() => setModal(null)} style={{ width: "100%", background: C.yellow, color: "#000", border: "none", padding: 14, borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14 }}>ðŸ’ª BACK TO STUDYING</button>
        </Modal>
      )}

      {pendingScore !== null && (
        <Modal borderColor={C.yellow}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>ðŸ“Š</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>RATE TODAY!</h2>
          <p style={{ color: C.muted, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>How well did you solve today's recall tasks? Be honest â€” this is for your improvement!</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 16 }}>
            {[...Array(10)].map((_, i) => {
              const v = i + 1;
              return (
                <button key={v} onClick={() => submitScore(pendingScore, v)}
                  style={{ padding: "12px 6px", borderRadius: 8, border: `1px solid ${v <= 3 ? C.red : v <= 6 ? C.orange : C.green}`, background: `rgba(${v <= 3 ? "255,51,102" : v <= 6 ? "255,107,53" : "57,255,122"},.1)`, color: v <= 3 ? C.red : v <= 6 ? C.orange : C.green, fontWeight: 900, fontSize: 16, cursor: "pointer" }}>
                  {v}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 4 }}>
            <span>ðŸ˜° Very Hard</span><span>ðŸ˜Š Perfect</span>
          </div>
        </Modal>
      )}

      {modal === "dayDone" && (
        <Modal borderColor={C.green}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>ðŸŽ¯</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>DAY {currentDay + 1} COMPLETE!</h2>
          <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>All recall tasks done + scored! Real memory built â€” not just recognition. Progress saved automatically!</p>
          <button onClick={() => { setModal(null); if (currentDay < ROADMAP.length - 1) setCurrentDay(d => d + 1); goPhase(0); setPhaseDone([]); setActiveTab("guide"); setCheckerQ(""); setCheckerA(""); setCheckerRes(null); setQuizDone([]); setQuizIdx(0); }}
            style={{ width: "100%", background: C.green, color: "#000", border: "none", padding: 14, borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14, marginBottom: 8 }}>â†’ NEXT DAY</button>
          <button onClick={() => setModal(null)} style={{ width: "100%", background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: 11, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>STAY ON THIS DAY</button>
        </Modal>
      )}

      {modal === "hardProblem" && (
        <Modal>
          <div style={{ fontSize: 40, marginBottom: 8 }}>ðŸ†˜</div>
          <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 12, color: C.yellow }}>STUCK? USE THIS:</h2>
          {[["1ï¸âƒ£", "READ TWICE", "Underline what's given and what's asked."], ["2ï¸âƒ£", "WRITE ANYTHING", "Diagram, formula, known values. Pen moving = brain unlocking."], ["3ï¸âƒ£", "WORK BACKWARDS", "What do I need? Do I already know it?"], ["4ï¸âƒ£", "TRY SIMPLER NUMBERS", "Replace big numbers with 2 and 3."], ["5ï¸âƒ£", "SKIP & RETURN", "Brain works on it in background!"]].map(([n, t, d]) => (
            <div key={t} style={{ display: "flex", gap: 8, marginBottom: 9, textAlign: "left" }}>
              <div style={{ fontSize: 12, minWidth: 22, flexShrink: 0 }}>{n}</div>
              <div><div style={{ fontSize: 12, fontWeight: 800, marginBottom: 2, color: C.yellow }}>{t}</div><div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{d}</div></div>
            </div>
          ))}
          <button onClick={() => setModal(null)} style={{ width: "100%", background: C.yellow, color: "#000", border: "none", padding: 13, borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 13, marginTop: 6 }}>BACK TO WORK ðŸ’ª</button>
        </Modal>
      )}
    </div>
  );
}
