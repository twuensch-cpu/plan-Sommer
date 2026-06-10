import { useState, useEffect } from 'react'
import TodayView from './views/TodayView.jsx'
import PlanView from './views/PlanView.jsx'
import GoalsView from './views/GoalsView.jsx'
import ProgressView from './views/ProgressView.jsx'
import CoachView from './views/CoachView.jsx'
import TestWeekView from './views/TestWeekView.jsx'

const TABS = [
  { id: 'today', label: 'Heute', icon: '▶' },
  { id: 'plan', label: 'Plan', icon: '≡' },
  { id: 'goals', label: 'Ziele', icon: '◎' },
  { id: 'progress', label: 'Werte', icon: '↑' },
  { id: 'coach', label: 'Coach', icon: '✦' },
]

export default function App() {
  const [tab, setTab] = useState('today')

  const [userData, setUserData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('userData')
      return saved ? JSON.parse(saved) : {
        startDate: '2026-06-15',
        benchPress: '',
        pullups: '',
        run5km: '',
        airbike: '300',
        weight: '73',
        entries: [],
        testComplete: false,
        testResults: {},
        completedTestDays: [],
        planValues: {},
        completedGoals: [],
      }
    } catch {
      return {
        startDate: '2026-06-15', benchPress: '', pullups: '', run5km: '',
        airbike: '300', weight: '73', entries: [], testComplete: false,
        testResults: {}, completedTestDays: [], planValues: {}, completedGoals: [],
      }
    }
  })

  useEffect(() => {
    try { sessionStorage.setItem('userData', JSON.stringify(userData)) } catch {}
  }, [userData])

  const updateUserData = (updates) => setUserData(prev => ({ ...prev, ...updates }))
  const addEntry = (entry) => setUserData(prev => ({
    ...prev,
    entries: [...prev.entries, { ...entry, date: new Date().toISOString().split('T')[0] }]
  }))

  const sharedProps = { userData, updateUserData, addEntry }

  // Show test week if not completed
  if (!userData.testComplete) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060606' }}>
        {/* Test Week Banner */}
        <div style={{ padding: '10px 14px 8px', background: '#0a0500', borderBottom: '1px solid #f9731620', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316' }} />
            <span style={{ fontSize: '8px', color: '#f97316', letterSpacing: '3px', fontFamily: 'Courier New, monospace' }}>
              WOCHE 0 — TESTWOCHE LÄUFT
            </span>
          </div>
          <div style={{ fontSize: '9px', color: '#3a3a3a', marginTop: '2px', fontFamily: 'Courier New, monospace' }}>
            Abschließen um den Plan zu kalibrieren
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <TestWeekView {...sharedProps} onComplete={() => updateUserData({ testComplete: true })} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060606' }}>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {tab === 'today' && <TodayView {...sharedProps} />}
        {tab === 'plan' && <PlanView {...sharedProps} />}
        {tab === 'goals' && <GoalsView {...sharedProps} />}
        {tab === 'progress' && <ProgressView {...sharedProps} />}
        {tab === 'coach' && <CoachView {...sharedProps} />}
      </div>

      {/* Bottom Nav */}
      <div style={{
        display: 'flex', borderTop: '1px solid #161616', background: '#080808',
        paddingBottom: 'env(safe-area-inset-bottom)', flexShrink: 0,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: '10px 4px 8px', border: 'none', cursor: 'pointer',
              background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
            }}>
            <div style={{ fontSize: '14px', color: tab === t.id ? '#fff' : '#2e2e2e' }}>{t.icon}</div>
            <div style={{ fontSize: '9px', letterSpacing: '1px', fontWeight: tab === t.id ? 900 : 400, color: tab === t.id ? '#fff' : '#2e2e2e', fontFamily: 'Courier New, monospace' }}>
              {t.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
