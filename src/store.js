import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import localforage from 'localforage'

// localforage configuration
localforage.config({
    name: 'MathLockDB',
    storeName: 'mathlock_store'
})

// Create an adapter for Zustand to use localforage
const localforageStore = {
    getItem: async (name) => {
        const value = await localforage.getItem(name)
        return value || null
    },
    setItem: async (name, value) => {
        await localforage.setItem(name, value)
    },
    removeItem: async (name) => {
        await localforage.removeItem(name)
    }
}

// Utility to support functional updates (prev => prev + 1)
const setter = (set, get, key) => (updater) => {
    set((state) => ({
        [key]: typeof updater === 'function' ? updater(state[key]) : updater
    }))
}

export const useStore = create(
    persist(
        (set, get) => ({
            // State
            screen: "welcome",
            activeSubject: "math",
            subjectsProgress: {}, // keyed by subjectId: { currentDay, doneDays, doneTasks, dayScores, phaseDone }
            streak: 1,
            absent: 0,
            mistakes: [],
            badges: [],
            apiKey: "",
            lastLoginDate: new Date().toDateString(),
            voiceEnabled: true,

            // Setters
            setScreen: setter(set, get, 'screen'),
            setActiveSubject: setter(set, get, 'activeSubject'),
            setSubjectsProgress: setter(set, get, 'subjectsProgress'),
            setStreak: setter(set, get, 'streak'),
            setAbsent: setter(set, get, 'absent'),
            setMistakes: setter(set, get, 'mistakes'),
            setBadges: setter(set, get, 'badges'),
            setApiKey: setter(set, get, 'apiKey'),
            setLastLoginDate: setter(set, get, 'lastLoginDate'),
            setVoiceEnabled: setter(set, get, 'voiceEnabled'),

            // Helper to update current subject progress
            updateSubjectProgress: (subjectId, update) => {
                const current = get().subjectsProgress[subjectId] || { currentDay: 0, doneDays: [], doneTasks: {}, dayScores: {}, phaseDone: [] };
                set(state => ({
                    subjectsProgress: {
                        ...state.subjectsProgress,
                        [subjectId]: { ...current, ...update }
                    }
                }));
            },
        }),
        {
            name: 'mathlock-roboust-storage', // name of the item in storage
            storage: localforageStore, // Use the asynchronous localforage wrapper
            onRehydrateStorage: () => (state) => {
                // ── ALWAYS apply the ronakaheer15 override, even without Supabase ──
                setTimeout(() => {
                    const s = useStore.getState();
                    const applyMathDay3 = (email) => {
                        if (email !== 'ronakaheer15@gmail.com') return;
                        const mathProg = s.subjectsProgress['math'] || { currentDay: 0, doneDays: [], doneTasks: {}, dayScores: {}, phaseDone: [] };
                        if (mathProg.currentDay >= 2 && mathProg.doneDays.includes(0) && mathProg.doneDays.includes(1)) return;
                        useStore.setState({
                            subjectsProgress: {
                                ...s.subjectsProgress,
                                math: {
                                    ...mathProg,
                                    doneDays: [...new Set([...mathProg.doneDays, 0, 1])],
                                    doneTasks: { ...mathProg.doneTasks, "day_0": [0, 1, 2], "day_1": [0, 1, 2] },
                                    currentDay: 2
                                }
                            }
                        });
                    };

                    // Try Supabase first, then fall back to localStorage flag
                    import('./supabase').then(({ supabase }) => {
                        if (!supabase) {
                            // No Supabase — check localStorage override flag
                            const flag = localStorage.getItem('examlock_user_email');
                            if (flag) applyMathDay3(flag);
                            return;
                        }
                        supabase.auth.getUser().then(({ data: { user } }) => {
                            if (!user || !state) return;
                            // Persist email for offline override
                            localStorage.setItem('examlock_user_email', user.email);

                            const toSync = {
                                screen: state.screen,
                                activeSubject: state.activeSubject,
                                subjectsProgress: state.subjectsProgress,
                                streak: state.streak,
                                absent: state.absent,
                                mistakes: state.mistakes,
                                badges: state.badges,
                                lastLoginDate: state.lastLoginDate
                            };
                            supabase.from('user_progress').upsert({ id: user.id, app_state: toSync }).catch(console.error);

                            supabase.from('user_progress').select('app_state').eq('id', user.id).single().then(({ data, error }) => {
                                if (data && data.app_state && !error) {
                                    const cloudState = data.app_state;
                                    if (cloudState.subjectsProgress && Object.keys(cloudState.subjectsProgress).length > 0) {
                                        useStore.setState(cloudState);
                                    }
                                }
                                applyMathDay3(user.email);
                            });
                        });
                    });
                }, 100);
            }
        }
    )
)

// A separate function to force push state to Supabase when it changes.
// We subscribe to the store and push changes.
import('./supabase').then(({ supabase }) => {
    if (supabase) {
        useStore.subscribe((state, prevState) => {
            // Check if anything meaningful changed to avoid spamming the DB
            if (JSON.stringify(state) !== JSON.stringify(prevState)) {
                supabase.auth.getUser().then(({ data: { user } }) => {
                    if (user) {
                        const toSync = {
                            screen: state.screen,
                            activeSubject: state.activeSubject,
                            subjectsProgress: state.subjectsProgress,
                            streak: state.streak,
                            absent: state.absent,
                            mistakes: state.mistakes,
                            badges: state.badges,
                            lastLoginDate: state.lastLoginDate
                        };
                        supabase.from('user_progress').upsert({ id: user.id, app_state: toSync }).catch(console.error);
                    }
                });
            }
        });
    }
});
