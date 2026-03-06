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
                                    mistakes: state.mistakes
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
                            mistakes: state.mistakes
                        };
                        supabase.from('user_progress').upsert({ id: user.id, app_state: toSync }).catch(console.error);
                    }
                });
            }
        });
    }
});
