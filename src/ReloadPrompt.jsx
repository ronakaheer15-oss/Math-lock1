import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ', r)
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    if (!offlineReady && !needRefresh) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1a1a2e',
            border: '1px solid #3a3a5a',
            borderRadius: '12px',
            padding: '16px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: '#f0eee8',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            minWidth: '300px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                    {offlineReady ? 'App ready to work offline' : '🌟 New Update Available!'}
                </h4>
                <button
                    onClick={close}
                    style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '4px' }}
                >
                    ✕
                </button>
            </div>

            <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>
                {offlineReady
                    ? 'You can now use MathLock without an internet connection.'
                    : 'A new version of MathLock has been found. Tap below to update.'}
            </p>

            {needRefresh && (
                <button
                    onClick={() => updateServiceWorker(true)}
                    style={{
                        backgroundColor: '#39ff7a',
                        color: '#000',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '13px'
                    }}
                >
                    Update Required →
                </button>
            )}
        </div>
    )
}

export default ReloadPrompt
