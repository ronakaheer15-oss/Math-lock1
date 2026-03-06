import React, { useState } from 'react';
import { supabase } from './supabase';
import { useStore } from './store';

const C = {
    bg: "#0f0f0f",
    surface: "#1a1a1a",
    surface2: "#222",
    border: "#333",
    yellow: "#f0c040",
    text: "#f0eee8",
    muted: "#a09e98",
    red: "#ff3366",
    green: "#39ff7a",
    blue: "#40c0f0",
};

export default function Auth({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('login'); // login | signup | reset
    const [message, setMessage] = useState({ text: '', type: '' });

    const setApiKey = useStore(s => s.setApiKey); // Clear out the old state logic usage optionally

    const handleAuth = async (e) => {
        e.preventDefault();
        if (!supabase) {
            setMessage({ text: "Supabase keys missing. Check .env.local", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            let error;
            if (mode === 'signup') {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                error = signUpError;
                if (!error) setMessage({ text: "Check your email for the confirmation link!", type: "success" });
            } else if (mode === 'login') {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                error = signInError;
                if (!error && onLogin) onLogin(); // Trigger app refresh
            } else if (mode === 'reset') {
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
                error = resetError;
                if (!error) setMessage({ text: "Password reset link sent!", type: "success" });
            }

            if (error) setMessage({ text: error.message, type: "error" });
        } catch (error) {
            setMessage({ text: error.message || "An error occurred", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, color: C.text, fontFamily: "system-ui", padding: 20 }}>
            <div style={{ width: "100%", maxWidth: 400, background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: 32, boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>

                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: C.yellow, letterSpacing: "-1px", marginBottom: 8 }}>MathLock</div>
                    <div style={{ fontSize: 13, color: C.muted }}>Sign in to sync your progress to the cloud</div>
                </div>

                {message.text && (
                    <div style={{ padding: "12px 16px", borderRadius: 8, background: message.type === "error" ? "rgba(255,51,102,.1)" : "rgba(57,255,122,.1)", border: `1px solid ${message.type === "error" ? C.red : C.green}`, color: message.type === "error" ? C.red : C.green, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                        <div style={{ fontSize: 10, letterSpacing: "2px", color: C.muted, marginBottom: 6, fontWeight: 700 }}>EMAIL ADDRESS</div>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                            placeholder="you@school.edu"
                        />
                    </div>

                    {mode !== 'reset' && (
                        <div>
                            <div style={{ fontSize: 10, letterSpacing: "2px", color: C.muted, marginBottom: 6, fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
                                <span>PASSWORD</span>
                                {mode === 'login' && (
                                    <span onClick={() => setMode('reset')} style={{ color: C.yellow, cursor: "pointer", textTransform: "none", letterSpacing: "normal" }}>Forgot?</span>
                                )}
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={6}
                                style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: "100%", background: C.yellow, color: "#000", border: "none", padding: "14px", borderRadius: 8, fontWeight: 900, cursor: loading ? "not-allowed" : "pointer", fontSize: 14, marginTop: 10, opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? "WAIT..." : mode === 'login' ? 'SIGN IN' : mode === 'signup' ? 'CREATE ACCOUNT' : 'SEND RESET LINK'}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: C.muted }}>
                    {mode === 'login' ? (
                        <span>New here? <span onClick={() => { setMode('signup'); setMessage({ text: '', type: '' }); }} style={{ color: C.yellow, fontWeight: 700, cursor: "pointer" }}>Sign up</span></span>
                    ) : (
                        <span>Already have an account? <span onClick={() => { setMode('login'); setMessage({ text: '', type: '' }); }} style={{ color: C.yellow, fontWeight: 700, cursor: "pointer" }}>Sign in</span></span>
                    )}
                </div>
            </div>
        </div>
    );
}
