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
            currentDay: 1,
            doneDays: [0],
            doneTasks: { "day_0": [0, 1, 2] },
            streak: 1,
            absent: 0,
            phaseDone: [],
            dayScores: {},
            mistakes: [],
            apiKey: "",
            lastLoginDate: new Date().toDateString(),

            // Setters
            setScreen: setter(set, get, 'screen'),
            setCurrentDay: setter(set, get, 'currentDay'),
            setDoneDays: setter(set, get, 'doneDays'),
            setDoneTasks: setter(set, get, 'doneTasks'),
            setStreak: setter(set, get, 'streak'),
            setAbsent: setter(set, get, 'absent'),
            setPhaseDone: setter(set, get, 'phaseDone'),
            setDayScores: setter(set, get, 'dayScores'),
            setMistakes: setter(set, get, 'mistakes'),
            setApiKey: setter(set, get, 'apiKey'),
            setLastLoginDate: setter(set, get, 'lastLoginDate'),
        }),
        {
            name: 'mathlock-roboust-storage', // name of the item in storage
            storage: localforageStore, // Use the asynchronous localforage wrapper
            onRehydrateStorage: () => (state) => {
                // When local storage loads, if they are logged in, we sync their data up
                import('./supabase').then(({ supabase }) => {
                    if (supabase) {
                        supabase.auth.getUser().then(({ data: { user } }) => {
                            if (user && state) {
                                // Extract only the state to sync (omit api keys and transient ui stuff if needed, but we sync all for now)
                                const toSync = {
                                    screen: state.screen,
                                    currentDay: state.currentDay,
                                    doneDays: state.doneDays,
                                    doneTasks: state.doneTasks,
                                    streak: state.streak,
                                    absent: state.absent,
                                    phaseDone: state.phaseDone,
                                    dayScores: state.dayScores,
                                    mistakes: state.mistakes,
                                    lastLoginDate: state.lastLoginDate
                                };
                                supabase.from('user_progress').upsert({ id: user.id, app_state: toSync }).catch(console.error);

                                // ALSO: we should fetch to see if they have existing cloud data that is newer
                                supabase.from('user_progress').select('app_state').eq('id', user.id).single().then(({ data, error }) => {
                                    if (data && data.app_state && !error) {
                                        const cloudState = data.app_state;
                                        // only overwrite if cloud state has days played
                                        if (cloudState.doneDays && cloudState.doneDays.length > 0) {
                                            useStore.setState(cloudState);
                                        }
                                    }

                                    // ── AUTO-PROGRESSION & OVERRIDES ──
                                    const s = useStore.getState();
                                    const todayStr = new Date().toDateString();
                                    let updates = {};

                                    if (s.lastLoginDate !== todayStr) {
                                        const lastDate = new Date(s.lastLoginDate || todayStr);
                                        const todayDate = new Date(todayStr);
                                        const diffDays = Math.floor(Math.abs(todayDate - lastDate) / (1000 * 60 * 60 * 24));

                                        if (diffDays > 0) {
                                            let newDoneDays = [...s.doneDays];
                                            let newDoneTasks = { ...s.doneTasks };

                                            for (let i = 0; i < diffDays; i++) {
                                                const dayToMark = s.currentDay + i;
                                                if (!newDoneDays.includes(dayToMark) && dayToMark < 30) {
                                                    newDoneDays.push(dayToMark);
                                                    newDoneTasks[`day_${dayToMark}`] = newDoneTasks[`day_${dayToMark}`] || [];
                                                }
                                            }

                                            updates.doneDays = newDoneDays;
                                            updates.doneTasks = newDoneTasks;
                                            updates.currentDay = Math.min(s.currentDay + diffDays, 29);
                                            updates.absent = s.absent + diffDays;
                                        }
                                        updates.lastLoginDate = todayStr;
                                    }

                                    // Special Override for ronakaheer15@gmail.com
                                    if (user.email === 'ronakaheer15@gmail.com') {
                                        let newDoneDays = updates.doneDays || [...s.doneDays];
                                        let newDoneTasks = updates.doneTasks || { ...s.doneTasks };
                                        let curDay = updates.currentDay !== undefined ? updates.currentDay : s.currentDay;
                                        let changed = false;

                                        if (!newDoneDays.includes(0)) { newDoneDays.push(0); newDoneTasks["day_0"] = [0, 1, 2]; changed = true; }
                                        if (!newDoneDays.includes(1)) { newDoneDays.push(1); newDoneTasks["day_1"] = [0, 1, 2]; changed = true; }

                                        if (changed || curDay < 2) {
                                            updates.doneDays = [...new Set(newDoneDays)];
                                            updates.doneTasks = newDoneTasks;
                                            updates.currentDay = Math.max(curDay, 2);
                                        }
                                    }

                                    if (Object.keys(updates).length > 0) {
                                        useStore.setState(updates);
                                    }
                                });
                            }
                        })
                    }
                })
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
                            currentDay: state.currentDay,
                            doneDays: state.doneDays,
                            doneTasks: state.doneTasks,
                            streak: state.streak,
                            absent: state.absent,
                            phaseDone: state.phaseDone,
                            dayScores: state.dayScores,
                            mistakes: state.mistakes,
                            lastLoginDate: state.lastLoginDate
                        };
                        supabase.from('user_progress').upsert({ id: user.id, app_state: toSync }).catch(console.error);
                    }
                });
            }
        });
    }
});
