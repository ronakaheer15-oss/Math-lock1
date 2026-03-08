import { useState, useEffect, useRef } from 'react';

import { useStore } from "./store";

import { supabase } from "./supabase";

import Auth from "./Auth";

import { SUBJECTS, SUBJECT_LIST, getRoadmap, getMeta, getDaysLeft as getSubjectDaysLeft } from './data/subjects';

import './examlock.css';



// Constants

const PHASES = [

  { name: "READ", icon: "\ud83d\udcd6", full: "Read the concept carefully once", duration: 10 * 60, color: "#f0c040" },

  { name: "PRACTICE", icon: "\u270f\ufe0f", full: "Solve problems with notes open", duration: 20 * 60, color: "#ff6b35" },

  { name: "RECALL", icon: "\ud83e\udde0", full: "Close notes. Solve from memory.", duration: 30 * 60, color: "#39ff7a" },

  { name: "REVIEW", icon: "\ud83d\udd01", full: "Check answers. Fix mistakes.", duration: 20 * 60, color: "#a78bfa" },

];



const BADGES = [

  { id: "early", name: "Early Bird", icon: "\ud83c\udf05", desc: "Started study before 7 AM", color: "#f0c040" },

  { id: "master", name: "Subject Guru", icon: "\ud83c\udf93", desc: "Completed 10 roadmap days", color: "#38bdf8" },

  { id: "streak3", name: "Ignited", icon: "\ud83d\udd25", desc: "Maintained a 3-day streak", color: "#ff6b35" },

  { id: "mistake", name: "Mistake Crusher", icon: "\ud83d\udee0\ufe0f", desc: "Reviewed 5 mistakes", color: "#ff3366" },

];



const C = {

  bg: "#06060b", surface: "rgba(19,19,26,0.65)", surface2: "rgba(28,28,40,0.6)",

  border: "rgba(255,255,255,0.06)", text: "#f0eee8", muted: "#7a7a8a",

  yellow: "#f0c040", orange: "#ff6b35", green: "#39ff7a",

  red: "#ff3366", purple: "#a78bfa", blue: "#38bdf8"

};



function fmt(s) { return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; }



const speakText = (text, langCode = "en") => {
  if (!window.speechSynthesis || !useStore.getState().voiceEnabled) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  let targetRegex = /en-/i;
  if (langCode === "hi") targetRegex = /hi-/i;
  if (langCode === "te") targetRegex = /te-/i;

  let v = voices.find(v => targetRegex.test(v.lang) && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Female")));
  if (!v) v = voices.find(v => targetRegex.test(v.lang));
  if (!v) v = voices.find(v => /en-/i.test(v.lang));

  if (v) u.voice = v;
  if (langCode === "te") {
    u.rate = 0.85; u.pitch = 1.0;
  } else {
    u.rate = 0.9; u.pitch = 1.0;
  }
  window.speechSynthesis.speak(u);
};

async function checkAnswerWithAI(problem, userAnswer, subject = "Mathematics", mode = "check", imageBase64 = null, language = "en") {
  const apiKey = useStore.getState().apiKey;
  if (!apiKey) throw new Error("Please add your Groq API Key in settings");

  let langStr = "English";
  if (language === "hi") langStr = "Hindi";
  if (language === "te") langStr = "Telugu";

  const prompt = mode === "check" ?
    `Act as an expert ${subject} Teacher. The student is asking in ${langStr}. Respond entirely in ${langStr} (use native script).\nProblem: ${problem}\nStudent Answer/Image: ${userAnswer}\nProvide a detailed step-by-step explanation of how to solve it.\nCRITICAL: You MUST format your response as strict valid JSON without codeblocks.\nFormat exactly like this:\n{ "correct": true/false, "score": "x/10", "verdict": "Short summary in ${langStr}", "explain_step_by_step": "1. First step... 2. Second step... (in ${langStr})", "what_is_right": "...", "mistakes": "...", "correct_approach": "...", "tip": "..." }`
    : `Give a subtle hint for this ${subject} problem in ${langStr}. Do NOT solve it.\nProblem: ${problem}\nStudent is stuck at: ${userAnswer}\nFormat response as JSON: { "verdict": "Hint: ... (in ${langStr})", "tip": "Try focusing on... (in ${langStr})" }`;

  let messages = [];
  let modelToUse = "llama-3.3-70b-versatile";

  if (imageBase64) {
    modelToUse = "llama-3.2-11b-vision-preview";
    messages = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: imageBase64 } }
        ]
      }
    ];
  } else {
    messages = [{ role: "user", content: prompt }];
  }

  const payload = { model: modelToUse, messages: messages };
  if (!imageBase64) {
    payload.response_format = { type: "json_object" };
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const e = await response.json().catch(() => ({}));
    throw new Error(e?.error?.message || `Server Error (${response.status})`);
  }
  const data = await response.json();
  let contentStr = data.choices?.[0]?.message?.content || "{}";

  contentStr = contentStr.replace(/```json/g, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(contentStr);
  } catch (e) {
    console.error("Failed to parse AI JSON:", contentStr);
    throw new Error("AI returned invalid data format. Please try again.");
  }
}



// Shared components

const Modal = ({ children, borderColor = C.border }) => (

  <div className="modal-overlay">

    <div className="modal-content" style={{ borderColor }}>

      {children}

    </div>

  </div>

);



const Section = ({ title, color, children }) => (

  <div style={{ marginBottom: 22 }}>

    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>

      <div style={{ width: 3, height: 16, background: `linear-gradient(to bottom, ${color}, transparent)`, borderRadius: 2 }} />

      <div style={{ fontSize: 10, fontWeight: 900, color, letterSpacing: "2px" }}>{title}</div>

    </div>

    {children}

  </div>

);



// ─── MAIN COMPONENT ───────────────────────────────────────────────────────

export default function MathLock() {

  const screen = useStore(s => s.screen);

  const setScreen = useStore(s => s.setScreen);

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



  const ROADMAP = getRoadmap(activeSubject);

  const subjectMeta = getMeta(activeSubject);

  const getDaysLeft = () => getSubjectDaysLeft(activeSubject);



  const streak = useStore(s => s.streak);

  const setStreak = useStore(s => s.setStreak);

  const absent = useStore(s => s.absent);

  const setAbsent = useStore(s => s.setAbsent);

  const mistakes = useStore(s => s.mistakes);

  const setMistakes = useStore(s => s.setMistakes);

  const badges = useStore(s => s.badges);

  const setBadges = useStore(s => s.setBadges);

  const aiLanguage = useStore(s => s.aiLanguage);

  const setAiLanguage = useStore(s => s.setAiLanguage);



  const [phase, setPhase] = useState(0);

  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);

  const [running, setRunning] = useState(false);

  const [modal, setModal] = useState(null);

  const [activeTab, setActiveTab] = useState("guide");

  const [breakSec, setBreakSec] = useState(600);

  const [showSubjectSwitcher, setShowSubjectSwitcher] = useState(false);


  const scrollRef = useRef(null);
  useEffect(() => {
    if (screen !== "app" || !scrollRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    const t = setTimeout(() => {
      if (!scrollRef.current) return;
      const els = scrollRef.current.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale, .stagger-children');
      els.forEach(el => observer.observe(el));
    }, 100);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [screen, activeTab]);


  // Badge unlock logic

  useEffect(() => {

    const unlocked = [...badges]; let changed = false;

    if (streak >= 3 && !unlocked.includes("streak3")) { unlocked.push("streak3"); changed = true; }

    if (doneDays.length >= 10 && !unlocked.includes("master")) { unlocked.push("master"); changed = true; }

    const hr = new Date().getHours();

    if (running && hr < 7 && !unlocked.includes("early")) { unlocked.push("early"); changed = true; }

    if (changed) { setBadges(unlocked); setModal("badgeUnlocked"); }

  }, [streak, doneDays.length, running]);



  const [user, setUser] = useState(null);

  const [authChecking, setAuthChecking] = useState(true);

  const [quizIdx, setQuizIdx] = useState(0);

  const [quizAnswer, setQuizAnswer] = useState("");

  const [quizResult, setQuizResult] = useState(null);

  const [quizDone, setQuizDone] = useState([]);

  const [checkerQ, setCheckerQ] = useState("");

  const [checkerA, setCheckerA] = useState("");

  const [checkerRes, setCheckerRes] = useState(null);

  const [checkerImage, setCheckerImage] = useState(null);

  const [checkerLoading, setCheckerLoading] = useState(false);

  const [newMistake, setNewMistake] = useState("");

  const [mistakeChap, setMistakeChap] = useState("");

  const [pendingScore, setPendingScore] = useState(null);



  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => setCheckerImage(event.target.result);

    reader.readAsDataURL(file);

  };



  const timerRef = useRef(null);

  const breakRef = useRef(null);

  const checkRef = useRef(null);



  const day = ROADMAP[currentDay] || ROADMAP[0];

  const myTasks = doneTasks[`day_${currentDay}`] || [];

  const progress = Math.round((doneDays.length / ROADMAP.length) * 100);

  const circ = 2 * Math.PI * 48;

  const phaseFrac = 1 - timeLeft / PHASES[phase].duration;



  const syncProgress = (update) => updateSubjectProgress(activeSubject, update);

  const setDoneDays = (val) => syncProgress({ doneDays: typeof val === 'function' ? val(doneDays) : val });

  const setCurrentDay = (val) => syncProgress({ currentDay: typeof val === 'function' ? val(currentDay) : val });

  const setDoneTasks = (val) => syncProgress({ doneTasks: typeof val === 'function' ? val(doneTasks) : val });

  const setPhaseDone = (val) => syncProgress({ phaseDone: typeof val === 'function' ? val(phaseDone) : val });

  const setDayScores = (val) => syncProgress({ dayScores: typeof val === 'function' ? val(dayScores) : val });



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

    const arr = [...myTasks]; const pos = arr.indexOf(ti);

    pos > -1 ? arr.splice(pos, 1) : arr.push(ti);

    setDoneTasks({ ...doneTasks, [`day_${di}`]: arr });

    if (arr.length === ROADMAP[di].recallTask.length) {

      setTimeout(() => { if (!doneDays.includes(di)) setDoneDays([...doneDays, di]); setStreak(s => s + 1); setPendingScore(di); }, 300);

    }

  }

  function submitScore(di, score) { setDayScores({ ...dayScores, [`day_${di}`]: score }); setPendingScore(null); setModal("dayDone"); }

  function addMistake() {

    if (!newMistake.trim()) return;

    setMistakes([{ id: Date.now(), text: newMistake, chapter: mistakeChap || day.chapter, day: currentDay + 1, date: new Date().toLocaleDateString(), reviewCount: 0 }, ...mistakes].slice(0, 50));

    setNewMistake(""); setMistakeChap("");

  }

  function deleteMistake(id) { setMistakes(mistakes.filter(m => m.id !== id)); }

  const quizSet = day.quizFormulas || [];

  function nextQuiz() { setQuizIdx(i => (i + 1) % quizSet.length); setQuizAnswer(""); setQuizResult(null); }

  function checkQuiz() {

    const correct = quizSet[quizIdx].a.toLowerCase().replace(/\s/g, "");

    const given = quizAnswer.toLowerCase().replace(/\s/g, "");

    const isCorrect = correct.includes(given) || given.includes(correct) || (given.length > 2 && correct.includes(given.slice(0, Math.floor(given.length * .7))));

    setQuizResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) setQuizDone([...new Set([...quizDone, quizIdx])]);

  }

  function resetAllData() {

    ["ml_screen", "ml_day", "ml_doneDays", "ml_doneTasks", "ml_streak", "ml_absent", "ml_phaseDone", "ml_scores", "ml_mistakes", "ml_seeded"].forEach(k => localStorage.removeItem(k));

    if (supabase) supabase.auth.signOut();

    window.location.reload();

  }



  // Auth check

  useEffect(() => {

    if (!supabase) { setAuthChecking(false); return; }

    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setAuthChecking(false); });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null); });

    return () => subscription.unsubscribe();

  }, []);



  if (authChecking) return (

    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg }}>

      <div style={{ textAlign: "center" }}>

        <div style={{ width: 32, height: 32, border: `3px solid ${C.yellow}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />

        <div style={{ color: C.yellow, fontWeight: 900, letterSpacing: "3px", fontSize: 11 }}>EXAMLOCK</div>

      </div>

    </div>

  );

  if (supabase && !user) return <Auth onLogin={() => window.location.reload()} />;



  // ── WELCOME & SUBJECT SELECTOR ─────────────────────────────────────────

  if (screen === "welcome") return (

    <div className="welcome-bg" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 16px", color: C.text, textAlign: "center", width: "100%", maxWidth: "100vw", overflow: "hidden", position: "relative", zIndex: 1 }}>
      <div className="welcome-orb" />



      <div style={{ background: "linear-gradient(135deg, #f0c040, #e6a820)", color: "#000", fontSize: 9, fontWeight: 900, letterSpacing: "5px", padding: "5px 18px", borderRadius: 4, marginBottom: 28, animation: "fadeIn 0.6s ease" }}>EXAMLOCK v4.0</div>



      <h1 className="welcome-title" style={{ animation: "slideUp 0.8s ease" }}>STUDY.<br /><span style={{ WebkitTextFillColor: "#f0c040" }}>NO</span> ESCAPE.</h1>



      <p style={{ color: C.muted, fontSize: 11, letterSpacing: "4px", marginBottom: 32, fontFamily: "'JetBrains Mono', monospace", animation: "fadeIn 1s ease" }}>// AI-powered board exam system //</p>



      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "4px", color: C.muted, marginBottom: 14, animation: "fadeIn 1.2s ease" }}>CHOOSE YOUR SUBJECT</div>



      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28, width: "100%", maxWidth: 380, animation: "slideUp 1s ease" }}>

        {SUBJECT_LIST.map(meta => {

          const isActive = activeSubject === meta.id;

          const dLeft = getSubjectDaysLeft(meta.id);

          const rd = getRoadmap(meta.id);

          const prog = subjectsProgress[meta.id] || { doneDays: [] };

          return (

            <div key={meta.id}

              className={`subject-card ${isActive ? "active" : ""}`}

              style={{ "--accent": meta.color }}

              onClick={() => setActiveSubject(meta.id)}>

              <div style={{ fontSize: 30, marginBottom: 8, animation: isActive ? "float 3s ease-in-out infinite" : "none" }}>{meta.icon}</div>

              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 3, color: isActive ? meta.color : C.text }}>{meta.name}</div>

              <div style={{ fontSize: 10, color: C.muted, marginBottom: 8 }}>{meta.chapters} chapters &middot; {rd.length} days</div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>

                <div>

                  <div style={{ fontSize: 24, fontWeight: 900, color: meta.color, lineHeight: 1 }}>{dLeft}</div>

                  <div style={{ fontSize: 8, color: C.muted, letterSpacing: "2px", fontWeight: 700 }}>DAYS LEFT</div>

                </div>

                {prog.doneDays.length > 0 && (

                  <div style={{ fontSize: 11, color: C.green, fontWeight: 800, background: "rgba(57,255,122,0.08)", padding: "2px 8px", borderRadius: 8 }}>{Math.round((prog.doneDays.length / rd.length) * 100)}%</div>

                )}

              </div>

            </div>

          );

        })}

      </div>



      <div className="glass" style={{ borderLeft: `3px solid ${subjectMeta.color}`, padding: "16px 22px", marginBottom: 28, width: "100%", maxWidth: 380, textAlign: "left", animation: "fadeIn 1.3s ease" }}>

        <div style={{ fontSize: "clamp(38px,10vw,54px)", fontWeight: 900, color: subjectMeta.color, lineHeight: 1 }}>{getDaysLeft()}</div>

        <div style={{ color: C.muted, fontSize: 9, letterSpacing: "4px", marginTop: 4, fontWeight: 700 }}>DAYS UNTIL {subjectMeta.name.toUpperCase()} EXAM</div>

        <div style={{ fontSize: 12, marginTop: 10, color: C.text, display: "flex", alignItems: "center", gap: 6 }}>

          <span style={{ opacity: 0.6 }}>{"\ud83d\udcc5"}</span> {new Date(subjectMeta.examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

        </div>

      </div>



      {doneDays.length > 0 && (

        <div className="glass" style={{ border: `1px solid rgba(57,255,122,0.2)`, padding: "12px 22px", marginBottom: 18, fontSize: 13, animation: "fadeIn 1.4s ease", width: "100%", maxWidth: 380 }}>

          {"\u2705"} Welcome back! <strong style={{ color: C.green }}>{doneDays.length} days</strong> done. Progress saved!

        </div>

      )}



      <button className="btn-primary" onClick={() => setScreen("app")} style={{ animation: "fadeIn 1.5s ease", marginBottom: 12 }}>

        {doneDays.length > 0 ? `\u25b6 CONTINUE (Day ${currentDay + 1})` : "\ud83d\udd12 LOCK IN & START"}

      </button>



      {doneDays.length > 0 && <button onClick={resetAllData} style={{ background: "transparent", color: C.muted, border: `1px solid rgba(255,255,255,0.08)`, padding: "8px 22px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 8, transition: "all 0.2s" }}>Reset All Progress</button>}

    </div>

  );



  // ── MAIN APP ───────────────────────────────────────────

  return (

    <div ref={scrollRef} style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter',system-ui,sans-serif", padding: "12px 10px 40px", maxWidth: 540, margin: "0 auto", width: "100%" }}>



      {/* HEADER */}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, position: "relative" }}>

        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px" }}>Exam<span style={{ color: C.yellow }}>Lock</span> <span style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}>v4</span></div>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>

          <div onClick={() => setShowSubjectSwitcher(!showSubjectSwitcher)} style={{ fontSize: 12, fontWeight: 800, color: subjectMeta.color, cursor: "pointer", background: `color-mix(in srgb, ${subjectMeta.color} 8%, transparent)`, padding: "5px 10px", borderRadius: 8, display: "flex", alignItems: "center", gap: 5, border: `1px solid color-mix(in srgb, ${subjectMeta.color} 20%, transparent)`, transition: "all 0.2s" }}>

            {subjectMeta.icon} {subjectMeta.name.split(" ")[0].toUpperCase()} {"\u25be"}

          </div>

          {absent > 0 && <div style={{ background: "rgba(255,51,102,.12)", border: "1px solid rgba(255,51,102,.3)", color: C.red, padding: "4px 8px", borderRadius: 20, fontSize: 9, fontWeight: 800 }}>{"\u26a0\ufe0f"} {absent}</div>}

          <div style={{ background: "rgba(255,107,53,.1)", border: "1px solid rgba(255,107,53,.25)", color: C.orange, padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 800 }}>{"\ud83d\udd25"} {streak}</div>

          <button onClick={() => setScreen("welcome")} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: C.muted, padding: "4px 9px", borderRadius: 8, fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}>{"\ud83c\udfe0"}</button>

        </div>

      </div>



      {showSubjectSwitcher && (

        <div className="switcher-dropdown">

          {SUBJECT_LIST.map(s => (

            <div key={s.id} className="switcher-item"

              onClick={() => { setActiveSubject(s.id); setShowSubjectSwitcher(false); }}

              style={{ background: activeSubject === s.id ? `color-mix(in srgb, ${s.color} 10%, transparent)` : "transparent", color: activeSubject === s.id ? s.color : C.text }}>

              <span style={{ fontSize: 18 }}>{s.icon}</span> {s.name}

            </div>

          ))}

        </div>

      )}



      {/* PROGRESS */}

      <div className="glass-glow scroll-reveal" style={{ padding: "12px 16px", marginBottom: 14 }}>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.muted, marginBottom: 6, fontWeight: 700, letterSpacing: "1px" }}>

          <span>PROGRESS</span>

          <span style={{ color: C.yellow }}>{doneDays.length}/{ROADMAP.length} &middot; {progress}%</span>

        </div>

        <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>

          <div className="progress-bar-fill" style={{ background: `linear-gradient(90deg, ${subjectMeta.color}, ${C.yellow})`, width: `${progress}%` }} />

        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontSize: 10, alignItems: "center" }}>

          <span style={{ color: C.text, fontWeight: 700 }}>Day {currentDay + 1}: {day.chapter}</span>

          <span style={{ color: getDaysLeft() <= 5 ? C.red : C.muted, fontSize: 9, fontWeight: 700 }}>{getDaysLeft()} days left</span>

        </div>

      </div>



      {/* TIMER */}

      <div className="glass scroll-reveal" style={{ padding: 18, marginBottom: 14 }}>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>

          <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>

            <svg width="100" height="100" className="timer-ring" style={{ transform: "rotate(-90deg)", "--ring-color": `${PHASES[phase].color}40` }}>

              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="5" />

              <circle cx="50" cy="50" r="44" fill="none" stroke={PHASES[phase].color} strokeWidth="5"

                strokeDasharray={circ} strokeDashoffset={circ * (1 - phaseFrac)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />

            </svg>

            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: PHASES[phase].color }}>{fmt(timeLeft)}</div>

            </div>

          </div>

          <div style={{ flex: 1, minWidth: 0 }}>

            <div style={{ fontSize: 9, color: C.muted, letterSpacing: "3px", marginBottom: 4, fontWeight: 700 }}>{PHASES[phase].icon} {PHASES[phase].name}</div>

            <div style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.4, color: "rgba(240,238,232,0.8)" }}>{PHASES[phase].full}</div>

            <div style={{ display: "flex", gap: 6 }}>

              <button onClick={() => setRunning(r => !r)} style={{ flex: 2, background: running ? `linear-gradient(135deg, ${C.red}, #cc2952)` : `linear-gradient(135deg, ${C.yellow}, #e6a820)`, color: "#000", border: "none", padding: "10px 6px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 12, transition: "all 0.2s" }}>{running ? "\u23f8 PAUSE" : "\u25b6 START"}</button>

              <button onClick={() => { setModal("break"); setBreakSec(600); setRunning(false); }} style={{ flex: 1, background: "rgba(255,255,255,0.04)", color: C.text, border: "1px solid rgba(255,255,255,0.06)", padding: 10, borderRadius: 8, cursor: "pointer", fontSize: 13, transition: "all 0.2s" }}>{"\u2615"}</button>

              <button onClick={() => setModal("hardProblem")} style={{ flex: 1, background: "rgba(255,255,255,0.04)", color: C.text, border: "1px solid rgba(255,255,255,0.06)", padding: 10, borderRadius: 8, cursor: "pointer", fontSize: 13, transition: "all 0.2s" }}>{"\ud83c\udd98"}</button>

            </div>

          </div>

        </div>

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 14 }}>

          {PHASES.map((p, i) => (

            <button key={i} onClick={() => goPhase(i)} className="phase-pill"

              style={{ borderColor: i === phase ? p.color : phaseDone.includes(i) ? C.green : "rgba(255,255,255,0.06)", background: i === phase ? `color-mix(in srgb, ${p.color} 10%, transparent)` : phaseDone.includes(i) ? "rgba(57,255,122,.06)" : "transparent", color: i === phase ? p.color : phaseDone.includes(i) ? C.green : C.muted }}>

              {phaseDone.includes(i) && "\u2705 "}{p.icon} {p.name}

            </button>

          ))}

        </div>

      </div>



      {/* TABS */}

      <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 14 }}>

        {[["guide", "\ud83d\udcda", "Guide"], ["tasks", "\u2705", "Recall"], ["quiz", "\u26a1", "Quiz"], ["vault", "\ud83e\uddea", "Vault"], ["checker", "\ud83e\udd16", "AI"], ["mistakes", "\ud83d\udcdd", "Notes"], ["roadmap", "\ud83d\udcc5", "Path"]].map(([id, icon, label]) => (

          <button key={id} onClick={() => setActiveTab(id)} className={`tab-btn ${activeTab === id ? "active" : ""}`}>

            <span style={{ fontSize: 17 }}>{icon}</span>

            <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: "0.5px" }}>{label.toUpperCase()}</span>

          </button>

        ))}

      </div>



      {/* STUDY GUIDE */}

      {activeTab === "guide" && (

        <div className="glass scroll-reveal-scale" style={{ padding: 18, animation: "fadeIn 0.3s ease" }}>

          <div style={{ marginBottom: 16 }}>

            <div style={{ fontSize: 9, color: C.muted, letterSpacing: "3px", marginBottom: 4, fontWeight: 700 }}>DAY {currentDay + 1} OF {ROADMAP.length}</div>

            <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 3 }}>{day.topic}</div>

            <div style={{ fontSize: 12, color: subjectMeta.color, display: "flex", alignItems: "center", gap: 6 }}>{"\ud83d\udccc"} {day.chapter}</div>

          </div>

          <Section title="WHAT TO STUDY TODAY" color={C.blue}>

            {day.whatToStudy.map((item, i) => (

              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12, lineHeight: 1.5 }}>

                <span style={{ color: C.blue, fontWeight: 900, flexShrink: 0, minWidth: 18 }}>{i + 1}.</span><span>{item}</span>

              </div>

            ))}

          </Section>

          <Section title="PROBLEMS TO SOLVE" color={C.orange}>

            {day.problems.map((p, i) => (

              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12, lineHeight: 1.5, background: "rgba(255,255,255,0.02)", padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)" }}>

                <span style={{ color: C.orange, fontWeight: 900, flexShrink: 0, minWidth: 24 }}>Q{i + 1}</span><span>{p}</span>

              </div>

            ))}

          </Section>

          <Section title="FORMULAS" color={C.purple}>

            {day.formulas.map((f, i) => (

              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", background: "rgba(167,139,250,.06)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(167,139,250,.12)" }}>

                <span style={{ color: C.purple, fontWeight: 900 }}>f{i + 1}</span><span style={{ color: "#e2d9fa" }}>{f}</span>

              </div>

            ))}

          </Section>

        </div>

      )}



      {/* RECALL TASKS */}

      {activeTab === "tasks" && (

        <div className="glass scroll-reveal" style={{ padding: 18, animation: "fadeIn 0.3s ease" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>

            <div>

              <div style={{ fontSize: 14, fontWeight: 900 }}>RECALL TASKS</div>

              <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>Close your book first!</div>

            </div>

            <div style={{ background: "rgba(255,51,102,.1)", color: C.red, fontSize: 8, padding: "5px 12px", borderRadius: 20, fontWeight: 900, letterSpacing: "1px" }}>{"\ud83d\udcd5"} NOTES CLOSED</div>

          </div>

          {day.recallTask.map((t, i) => {

            const done = myTasks.includes(i);

            return (

              <div key={i} onClick={() => toggleTask(currentDay, i)}

                style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", borderRadius: 12, border: `1px solid ${done ? "rgba(57,255,122,.25)" : "rgba(255,255,255,0.04)"}`, background: done ? "rgba(57,255,122,.04)" : "rgba(255,255,255,0.02)", marginBottom: 10, cursor: "pointer", transition: "all 0.25s" }}>

                <div style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${done ? C.green : "rgba(255,255,255,0.1)"}`, background: done ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 900, fontSize: 13, flexShrink: 0, transition: "all 0.3s" }}>{done ? "\u2713" : ""}</div>

                <div>

                  <div style={{ fontSize: 9, letterSpacing: "2px", color: done ? C.green : C.muted, marginBottom: 4, fontWeight: 800 }}>TASK {i + 1}{done ? " \u2014 DONE" : ""}</div>

                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.4, color: done ? "rgba(240,238,232,.45)" : C.text, textDecoration: done ? "line-through" : "none" }}>{t}</div>

                </div>

              </div>

            );

          })}

          {dayScores[`day_${currentDay}`] && (

            <div style={{ marginTop: 14, padding: "12px 16px", background: "rgba(240,192,64,.06)", border: "1px solid rgba(240,192,64,.2)", borderRadius: 10, fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>

              <span style={{ color: C.muted }}>Today's Self Score</span>

              <span style={{ color: C.yellow, fontWeight: 900, fontSize: 20 }}>{dayScores[`day_${currentDay}`]}/10</span>

            </div>

          )}

        </div>

      )}



      {/* FORMULA QUIZ */}

      {activeTab === "quiz" && (

        <div className="glass scroll-reveal-scale" style={{ padding: 18, animation: "fadeIn 0.3s ease" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>

            <div style={{ fontSize: 14, fontWeight: 900 }}>{"\u26a1"} FORMULA QUIZ</div>

            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>{quizDone.length}/{quizSet.length} mastered</div>

          </div>

          {quizSet.length > 0 ? (

            <>

              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "22px 18px", marginBottom: 16, textAlign: "center", position: "relative" }}>

                <button onClick={() => playAudio(quizSet[quizIdx].q)} style={{ position: "absolute", top: 12, right: 14, background: "transparent", border: "none", cursor: "pointer", fontSize: 16, opacity: 0.5, transition: "opacity 0.2s" }}>{"\ud83d\udd0a"}</button>

                <div style={{ fontSize: 9, color: C.muted, letterSpacing: "3px", marginBottom: 10, fontWeight: 700 }}>WHAT IS THIS FORMULA?</div>

                <div style={{ fontSize: 18, fontWeight: 900, color: C.yellow, lineHeight: 1.4 }}>{quizSet[quizIdx].q}</div>

              </div>

              <input value={quizAnswer} onChange={e => setQuizAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && !quizResult && checkQuiz()} placeholder="Type your answer..."

                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: `1.5px solid ${quizResult ? (quizResult === "correct" ? "rgba(57,255,122,.4)" : "rgba(255,51,102,.4)") : "rgba(255,255,255,0.06)"}`, borderRadius: 10, padding: "13px 16px", color: C.text, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", outline: "none", boxSizing: "border-box", marginBottom: 12, transition: "border-color 0.3s" }} />

              {quizResult && (

                <div style={{ padding: "14px 16px", borderRadius: 10, background: quizResult === "correct" ? "rgba(57,255,122,.06)" : "rgba(255,51,102,.06)", border: `1px solid ${quizResult === "correct" ? "rgba(57,255,122,.25)" : "rgba(255,51,102,.25)"}`, marginBottom: 12, fontSize: 12, position: "relative" }}>

                  <button onClick={() => playAudio(quizSet[quizIdx].a)} style={{ position: "absolute", top: 12, right: 14, background: "transparent", border: "none", cursor: "pointer", fontSize: 16, opacity: 0.5 }}>{"\ud83d\udd0a"}</button>

                  <div style={{ fontWeight: 900, color: quizResult === "correct" ? C.green : C.red, marginBottom: 5 }}>{quizResult === "correct" ? "\u2705 CORRECT!" : "\u274c NOT QUITE"}</div>

                  <div style={{ color: C.muted }}>Answer: <span style={{ color: C.text, fontFamily: "'JetBrains Mono', monospace" }}>{quizSet[quizIdx].a}</span></div>

                </div>

              )}

              <div style={{ display: "flex", gap: 8 }}>

                {!quizResult ?

                  <button onClick={checkQuiz} style={{ flex: 2, background: `linear-gradient(135deg, ${C.yellow}, #e6a820)`, color: "#000", border: "none", padding: 12, borderRadius: 10, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>CHECK ANSWER</button> :

                  <button onClick={nextQuiz} style={{ flex: 2, background: `linear-gradient(135deg, ${C.yellow}, #e6a820)`, color: "#000", border: "none", padding: 12, borderRadius: 10, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>NEXT FORMULA {"\u2192"}</button>

                }

                <button onClick={() => setQuizResult("wrong")} style={{ flex: 1, background: "rgba(255,255,255,0.03)", color: C.muted, border: "1px solid rgba(255,255,255,0.06)", padding: 12, borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>SHOW</button>

              </div>

            </>

          ) : <div style={{ color: C.muted, textAlign: "center", padding: 24 }}>No quiz formulas for this day.</div>}

        </div>

      )}



      {/* FORMULA VAULT */}

      {activeTab === "vault" && (

        <div className="glass scroll-reveal" style={{ padding: 18, animation: "fadeIn 0.3s ease" }}>

          <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 14 }}>{"\ud83e\uddea"} {subjectMeta.name.toUpperCase()} FORMULA VAULT</div>

          <div style={{ maxHeight: 420, overflowY: "auto" }}>

            {ROADMAP.map((d, i) => (

              <div key={i} style={{ marginBottom: 16 }}>

                <div style={{ fontSize: 8, fontWeight: 900, color: C.muted, marginBottom: 8, display: "flex", alignItems: "center", gap: 8, letterSpacing: "1px" }}>

                  <div style={{ background: "rgba(255,255,255,0.05)", height: 1, flex: 1 }} />

                  DAY {i + 1}: {d.chapter}

                  <div style={{ background: "rgba(255,255,255,0.05)", height: 1, flex: 1 }} />

                </div>

                {d.formulas.map((f, fi) => (

                  <div key={fi} className="formula-card" style={{ background: "rgba(167,139,250,.04)", border: "1px solid rgba(167,139,250,.1)", borderRadius: 8, padding: "10px 14px", marginBottom: 6, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#e2d9fa", display: "flex", gap: 10, alignItems: "center" }}>

                    <span style={{ color: C.purple, fontWeight: 900, minWidth: 22 }}>f{fi + 1}</span>

                    <span>{f}</span>

                  </div>

                ))}

              </div>

            ))}

          </div>

        </div>

      )}



      {/* AI CHECKER */}

      {activeTab === "checker" && (
        <div className="glass scroll-reveal-scale" style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ padding: 10, background: "rgba(168,85,247,0.1)", borderRadius: 10, color: C.purple }}>🤖</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: C.purple, letterSpacing: "1px" }}>AI TUTOR</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Upload a photo or type to get step-by-step help.</div>
              </div>
            </div>
            {/* Language Switcher */}
            <div style={{ display: "flex", background: "rgba(0,0,0,0.3)", borderRadius: 6, padding: 2 }}>
              {[{ id: "en", label: "EN" }, { id: "hi", label: "HI" }, { id: "te", label: "TE" }].map(lang => (
                <button key={lang.id} onClick={() => setAiLanguage(lang.id)} style={{ background: aiLanguage === lang.id ? "rgba(255,255,255,0.15)" : "transparent", color: aiLanguage === lang.id ? "#fff" : C.muted, border: "none", padding: "4px 8px", fontSize: 11, fontWeight: 700, borderRadius: 4, cursor: "pointer" }}>{lang.label}</button>
              ))}
            </div>
          </div>

          <input value={checkerQ} onChange={e => setCheckerQ(e.target.value)} placeholder="Type the problem question..." style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: 12, borderRadius: 10, color: "#fff", marginBottom: 12, outline: "none", fontFamily: "inherit", fontSize: 13 }} />

          <div style={{ position: "relative", marginBottom: 12 }}>
            <textarea value={checkerA} onChange={e => setCheckerA(e.target.value)} placeholder="Type your answer, OR click the camera icon to upload a photo of your notebook..." style={{ width: "100%", height: 80, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 40px 12px 12px", borderRadius: 10, color: "#fff", outline: "none", resize: "none", fontFamily: "inherit", fontSize: 13 }} />

            {/* Camera Upload Button */}
            <label style={{ position: "absolute", right: 10, bottom: 15, background: "rgba(168,85,247,0.2)", color: C.purple, padding: 8, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              📷
              <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>
          </div>

          {checkerImage && (
            <div style={{ position: "relative", marginBottom: 12, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(168,85,247,0.3)" }}>
              <img src={checkerImage} alt="Uploaded problem" style={{ width: "100%", maxHeight: 200, objectFit: "cover", display: "block" }} />
              <button onClick={() => setCheckerImage(null)} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✕</button>
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={async () => { setCheckerLoading(true); setCheckerRes(null); try { const r = await checkAnswerWithAI(checkerQ, checkerA, subjectMeta.name, "check", checkerImage, aiLanguage); setCheckerRes(r); if (r.explain_step_by_step) speakText(r.explain_step_by_step, aiLanguage); } catch (e) { alert(e.message); } setCheckerLoading(false); }} disabled={checkerLoading || (!checkerQ && !checkerImage)}
              style={{ flex: 1, background: `linear-gradient(135deg, ${C.purple}, #9333ea)`, color: "#fff", padding: 12, borderRadius: 10, fontWeight: 800, border: "none", cursor: "pointer", opacity: (checkerLoading || (!checkerQ && !checkerImage)) ? 0.5 : 1 }}>
              {checkerLoading ? "THINKING..." : "CHECK & EXPLAIN"}
            </button>
            <button onClick={async () => { setCheckerLoading(true); setCheckerRes(null); try { const r = await checkAnswerWithAI(checkerQ, checkerA, subjectMeta.name, "hint", checkerImage, aiLanguage); setCheckerRes(r); if (r.verdict) speakText(r.verdict, aiLanguage); } catch (e) { alert(e.message); } setCheckerLoading(false); }} disabled={checkerLoading || (!checkerQ && !checkerImage)}
              style={{ background: "rgba(168,85,247,0.1)", color: C.purple, border: `1px solid rgba(168,85,247,0.3)`, padding: "0 16px", borderRadius: 10, fontWeight: 800, cursor: "pointer", opacity: (checkerLoading || (!checkerQ && !checkerImage)) ? 0.5 : 1 }}>
              HINT
            </button>
          </div>

          {checkerRes && (
            <div className="scroll-reveal visible" style={{ marginTop: 16, padding: 16, background: checkerRes.correct ? "rgba(34,197,94,0.05)" : "rgba(244,63,94,0.05)", border: `1px solid ${checkerRes.correct ? "rgba(34,197,94,0.2)" : "rgba(244,63,94,0.2)"}`, borderRadius: 12 }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ color: checkerRes.correct ? C.green : C.red, fontSize: 18 }}>{checkerRes.correct ? "✅" : "✘"}</div>
                  <div style={{ fontWeight: 800, color: checkerRes.correct ? C.green : C.red, letterSpacing: "1px" }}>
                    {checkerRes.score ? `SCORE: ${checkerRes.score}` : "FEEDBACK"}
                  </div>
                </div>
                <button onClick={() => { if (checkerRes.explain_step_by_step) speakText(checkerRes.explain_step_by_step, aiLanguage); else if (checkerRes.verdict) speakText(checkerRes.verdict, aiLanguage); }} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  🔊 LISTEN
                </button>
              </div>

              <p style={{ fontSize: 14, color: "#fff", marginBottom: 14, lineHeight: 1.6, fontWeight: 600 }}>{checkerRes.verdict}</p>

              {checkerRes.explain_step_by_step && (
                <div style={{ padding: 12, background: "rgba(168,85,247,0.06)", borderRadius: 8, borderLeft: `3px solid ${C.purple}`, marginBottom: 10, fontSize: 13 }}>
                  <div style={{ color: C.purple, fontWeight: 800, marginBottom: 6, letterSpacing: "1px" }}>STEP-BY-STEP EXPLANATION:</div>
                  <div style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{checkerRes.explain_step_by_step}</div>
                </div>
              )}

              {checkerRes.mistakes && (
                <div style={{ padding: 12, background: "rgba(244,63,94,0.06)", borderRadius: 8, borderLeft: `3px solid ${C.red}`, marginBottom: 10, fontSize: 13 }}>
                  <div style={{ color: C.red, fontWeight: 800, marginBottom: 6, letterSpacing: "1px" }}>MISTAKES DETECTED:</div>
                  <div style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{checkerRes.mistakes}</div>
                </div>
              )}

              {checkerRes.tip && (
                <div style={{ padding: 12, background: "rgba(56,189,248,0.06)", borderRadius: 8, borderLeft: `3px solid ${C.blue}`, fontSize: 13 }}>
                  <div style={{ color: C.blue, fontWeight: 800, marginBottom: 6, letterSpacing: "1px" }}>EXPERT TIP:</div>
                  <div style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{checkerRes.tip}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}



      {/* MISTAKE NOTEBOOK */}

      {activeTab === "mistakes" && (

        <div className="glass scroll-reveal" style={{ padding: 18, animation: "fadeIn 0.3s ease" }}>

          <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 14 }}>{"\ud83d\udcdd"} MISTAKE NOTEBOOK</div>

          <textarea value={newMistake} onChange={e => setNewMistake(e.target.value)} placeholder="What did you get wrong?" rows={2}

            style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 14px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box", marginBottom: 10 }} />

          <button onClick={addMistake} style={{ width: "100%", background: `linear-gradient(135deg, ${C.red}, #cc2952)`, color: "#fff", border: "none", padding: 12, borderRadius: 10, fontWeight: 900, cursor: "pointer", fontSize: 13, marginBottom: 18 }}>+ SAVE MISTAKE</button>

          <div style={{ maxHeight: 320, overflowY: "auto" }}>

            {mistakes.map(m => (

              <div key={m.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 10, padding: "13px 14px", marginBottom: 10, position: "relative" }}>

                <button onClick={() => deleteMistake(m.id)} style={{ position: "absolute", top: 10, right: 10, background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 12 }}>{"\u2715"}</button>

                <div style={{ fontSize: 9, color: C.muted, marginBottom: 5, fontWeight: 700, letterSpacing: "1px" }}>Day {m.day} &middot; {m.chapter}</div>

                <div style={{ fontSize: 12, lineHeight: 1.5 }}>{m.text}</div>

              </div>

            ))}

          </div>

        </div>

      )}



      {/* ROADMAP */}

      {activeTab === "roadmap" && (

        <div className="glass scroll-reveal-scale" style={{ overflow: "hidden", animation: "fadeIn 0.3s ease" }}>

          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 9, fontWeight: 900, letterSpacing: "3px", color: C.muted }}>{ROADMAP.length}-DAY ROADMAP</div>

          <div style={{ maxHeight: 380, overflowY: "auto", padding: 10 }}>

            {ROADMAP.map((d, i) => {

              const isDone = doneDays.includes(i);

              const isActive = i === currentDay;

              return (

                <div key={i} className="roadmap-item"

                  onClick={() => { setCurrentDay(i); setPhase(0); setTimeLeft(PHASES[0].duration); setPhaseDone([]); setActiveTab("guide"); }}

                  style={{ background: isActive ? "rgba(240,192,64,0.05)" : "transparent", opacity: isDone ? 0.55 : 1 }}>

                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: isActive ? C.yellow : isDone ? C.green : C.muted, fontWeight: 700, fontSize: 12, minWidth: 28 }}>D{i + 1}</div>

                  <div style={{ flex: 1 }}>

                    <div style={{ fontSize: 12, fontWeight: 700 }}>{d.topic}</div>

                    <div style={{ fontSize: 10, color: C.muted }}>{d.chapter}</div>

                  </div>

                  {isDone && <div style={{ color: C.green, fontSize: 14 }}>{"\u2705"}</div>}

                </div>

              );

            })}

          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 10 }}>

            <button onClick={() => setModal("examSim")} style={{ flex: 1, background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,.2)", color: C.blue, padding: 11, borderRadius: 10, fontSize: 11, fontWeight: 900, cursor: "pointer" }}>{"\ud83d\udcdd"} EXAM SIM</button>

            <button onClick={() => setModal("reset")} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: C.muted, padding: 11, borderRadius: 10, fontSize: 11, cursor: "pointer" }}>{"\ud83d\uddd1\ufe0f"} RESET</button>

          </div>

          <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>

            <div style={{ fontSize: 9, fontWeight: 900, color: C.muted, marginBottom: 10, letterSpacing: "2px" }}>MY BADGES</div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

              {BADGES.map(b => {

                const isLocked = !badges.includes(b.id);

                return (

                  <div key={b.id} title={b.desc} className={`badge-circle ${isLocked ? "locked" : ""}`}

                    style={{ background: isLocked ? "rgba(28,28,40,0.6)" : `color-mix(in srgb, ${b.color} 12%, transparent)`, borderColor: isLocked ? "rgba(255,255,255,0.06)" : b.color, border: `2px solid` }}>

                    {b.icon}

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      )}



      {/* ── MODALS ── */}

      {modal === "reset" && (

        <Modal borderColor={C.red}>

          <div style={{ textAlign: "center" }}>

            <div style={{ fontSize: 44, marginBottom: 14 }}>{"\u26a0\ufe0f"}</div>

            <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8, color: C.red }}>RESET DATA?</h2>

            <p style={{ color: C.muted, fontSize: 12, marginBottom: 22, lineHeight: 1.5 }}>This will erase ALL progress for this subject. This cannot be undone.</p>

            <button onClick={resetAllData} style={{ width: "100%", background: `linear-gradient(135deg, ${C.red}, #cc2952)`, color: "#fff", border: "none", padding: 14, borderRadius: 12, fontWeight: 900, cursor: "pointer", marginBottom: 10, fontSize: 14 }}>DELETE EVERYTHING</button>

            <button onClick={() => setModal(null)} style={{ width: "100%", background: "transparent", color: C.muted, border: "1px solid rgba(255,255,255,0.06)", padding: 12, borderRadius: 12, cursor: "pointer", fontSize: 12 }}>CANCEL</button>

          </div>

        </Modal>

      )}



      {modal === "examSim" && (

        <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 2000, padding: 16, display: "flex", flexDirection: "column" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>

            <div style={{ fontSize: 20, fontWeight: 900 }}>{"\ud83d\udcdd"} EXAM SIM<span style={{ color: C.blue }}>ULATOR</span></div>

            <button onClick={() => setModal(null)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: C.text, padding: "8px 18px", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>QUIT</button>

          </div>

          <div className="glass-strong" style={{ border: `1.5px solid ${C.blue}`, padding: 24, textAlign: "center", marginBottom: 22 }}>

            <div style={{ fontSize: 10, color: C.muted, letterSpacing: "4px", marginBottom: 10, fontWeight: 700 }}>FULL SYLLABUS DRY RUN</div>

            <div style={{ fontSize: 56, fontWeight: 900, color: C.blue, fontFamily: "'JetBrains Mono', monospace" }}>03:00:00</div>

            <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>No books. No phone. No escape.</div>

          </div>

          <div className="glass" style={{ flex: 1, overflowY: "auto", padding: 18 }}>

            <h3 style={{ fontSize: 13, fontWeight: 900, marginBottom: 14, color: C.yellow, letterSpacing: "2px" }}>SYLLABUS COVERED:</h3>

            {ROADMAP.filter((_, i) => i % 3 === 0).map((d, i) => (

              <div key={i} style={{ marginBottom: 14, fontSize: 13, borderLeft: `2px solid ${C.blue}`, paddingLeft: 14 }}>

                <div style={{ fontWeight: 800 }}>{d.topic}</div>

                <div style={{ fontSize: 11, color: C.muted }}>{d.chapter}</div>

              </div>

            ))}

            <div style={{ padding: 22, textAlign: "center", color: C.muted, fontSize: 12 }}>

              Use your textbook Model Paper and solve in your notebook.

            </div>

          </div>

          <button onClick={() => { alert("Great work! Now check answers with the AI Checker tab."); setModal(null); }} style={{ marginTop: 18, background: `linear-gradient(135deg, ${C.blue}, #2196f3)`, color: "#000", border: "none", padding: 16, borderRadius: 12, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>FINISH SIMULATION</button>

        </div>

      )}



      {modal === "badgeUnlocked" && (

        <Modal borderColor={C.yellow}>

          <div style={{ textAlign: "center" }}>

            <div style={{ fontSize: 64, marginBottom: 18, animation: "pulse 1s ease-in-out infinite" }}>{"\ud83c\udfc6"}</div>

            <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 10, color: C.yellow }}>LEVEL UP!</h2>

            {(() => {

              const b = BADGES.find(x => x.id === badges[badges.length - 1]);

              return b ? (

                <>

                  <div style={{ fontSize: 44, marginBottom: 14 }}>{b.icon}</div>

                  <div style={{ fontSize: 18, fontWeight: 800, color: b.color, marginBottom: 5 }}>{b.name}</div>

                  <p style={{ color: C.muted, fontSize: 13, marginBottom: 22 }}>{b.desc}</p>

                </>

              ) : null;

            })()}

            <button onClick={() => setModal(null)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.green}, #22c55e)`, color: "#000", border: "none", padding: 14, borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 14 }}>AWESOME!</button>

          </div>

        </Modal>

      )}



      {modal === "checkIn" && (

        <Modal>

          <div style={{ textAlign: "center" }}>

            <div style={{ fontSize: 44, marginBottom: 14 }}>{"\ud83d\udc41\ufe0f"}</div>

            <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>STILL STUDYING?</h2>

            <p style={{ color: C.muted, fontSize: 12, marginBottom: 22 }}>Stay focused. Exam in {getDaysLeft()} days.</p>

            <button onClick={() => { setModal(null); setRunning(true); }} style={{ width: "100%", background: `linear-gradient(135deg, ${C.green}, #22c55e)`, color: "#000", border: "none", padding: 14, borderRadius: 12, fontWeight: 900, cursor: "pointer" }}>{"\u2705"} I AM STUDYING</button>

          </div>

        </Modal>

      )}



      {modal === "break" && (

        <Modal>

          <div style={{ textAlign: "center" }}>

            <div style={{ fontSize: 44, marginBottom: 14 }}>{"\u2615"}</div>

            <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 10 }}>BREAK TIME</h2>

            <div style={{ fontSize: 36, fontWeight: 900, color: C.yellow, marginBottom: 22, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(breakSec)}</div>

            <button onClick={() => setModal(null)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.yellow}, #e6a820)`, color: "#000", border: "none", padding: 14, borderRadius: 12, fontWeight: 900, cursor: "pointer" }}>{"\ud83d\udcaa"} BACK TO WORK</button>

          </div>

        </Modal>

      )}



      {pendingScore !== null && (

        <Modal borderColor={C.yellow}>

          <div style={{ textAlign: "center" }}>

            <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 14 }}>RATE YOUR PERFORMANCE</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>

              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (

                <button key={v} onClick={() => submitScore(pendingScore, v)} style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.03)", color: C.yellow, border: "1.5px solid rgba(240,192,64,.25)", fontWeight: 900, cursor: "pointer", fontSize: 15, transition: "all 0.2s" }}>{v}</button>

              ))}

            </div>

          </div>

        </Modal>

      )}



      {modal === "dayDone" && (

        <Modal borderColor={C.green}>

          <div style={{ textAlign: "center" }}>

            <div style={{ fontSize: 44, marginBottom: 14, animation: "pulse 1s ease-in-out infinite" }}>{"\ud83c\udfaf"}</div>

            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>DAY COMPLETE!</h2>

            <button onClick={() => { setModal(null); if (currentDay < ROADMAP.length - 1) setCurrentDay(currentDay + 1); goPhase(0); setPhaseDone([]); setActiveTab("guide"); }}

              style={{ width: "100%", background: `linear-gradient(135deg, ${C.green}, #22c55e)`, color: "#000", border: "none", padding: 14, borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 14 }}>NEXT DAY {"\u2192"}</button>

          </div>

        </Modal>

      )}



      {modal === "hardProblem" && (

        <Modal>

          <div style={{ textAlign: "center" }}>

            <div style={{ fontSize: 36, marginBottom: 14 }}>{"\ud83c\udd98"}</div>

            <h2 style={{ fontSize: 16, fontWeight: 900, marginBottom: 14 }}>STUCK? TRY THESE:</h2>

            <ul style={{ textAlign: "left", fontSize: 12, color: C.muted, paddingLeft: 22, lineHeight: 2 }}>

              <li>Write everything you know about the problem.</li>

              <li>Draw a diagram if possible.</li>

              <li>Try working backwards from the goal.</li>

              <li>Take a 1-min deep breath.</li>

            </ul>

            <button onClick={() => setModal(null)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.yellow}, #e6a820)`, color: "#000", border: "none", padding: 13, borderRadius: 12, fontWeight: 900, cursor: "pointer", marginTop: 16, fontSize: 14 }}>BACK TO WORK</button>

          </div>

        </Modal>

      )}

    </div>

  );

}

