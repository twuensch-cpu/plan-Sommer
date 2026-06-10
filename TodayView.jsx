import { WEEK_DAYS, SESSIONS, BIWEEKLY_GOALS, TAG_COLORS, PLAN_META } from '../data.js'

function getCurrentWeek(startDate) {
  const start = new Date(startDate)
  const now = new Date()
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7))
  return Math.max(1, Math.min(16, diff + 1))
}

function getTodaySession() {
  const day = new Date().getDay() // 0=Sun
  const map = { 0: 'BOXEN', 1: 'BOXEN', 2: 'KRAFT_A', 3: 'LAUF_LANG', 4: 'AIRBIKE', 5: 'KRAFT_B', 6: 'LAUF_INTERVALL' }
  return map[day]
}

function getNextGoal(week) {
  return BIWEEKLY_GOALS.find(g => g.week >= week) || BIWEEKLY_GOALS[BIWEEKLY_GOALS.length - 1]
}

const DAY_NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

export default function TodayView({ userData }) {
  const week = getCurrentWeek(userData.startDate)
  const todayKey = getTodaySession()
  const session = SESSIONS[todayKey]
  const nextGoal = getNextGoal(week)
  const todayName = DAY_NAMES[new Date().getDay()]
  const tc = TAG_COLORS[session?.tag] || { bg: '#222', text: '#666' }
  const weeksToGoal = nextGoal.week - week

  return (
    <div style={{ padding: '16px 14px 24px', fontFamily: 'Courier New, monospace' }}>
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '8px', letterSpacing: '5px', color: '#333', marginBottom: '2px' }}>
          WOCHE {week} VON 16 · {todayName.toUpperCase()}
        </div>
        <div style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '2px', color: '#fff' }}>
          BOXER × SOLDAT
        </div>
        <div style={{ fontSize: '9px', color: '#333', marginTop: '2px' }}>
          Ziel: 7km / 20kg / Stiefel &lt; 45 Min · Ende September
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ fontSize: '8px', color: '#333', letterSpacing: '2px' }}>FORTSCHRITT</span>
          <span style={{ fontSize: '8px', color: '#60a5fa' }}>{Math.round((week / 16) * 100)}%</span>
        </div>
        <div style={{ height: '3px', background: '#111', borderRadius: '2px' }}>
          <div style={{ height: '100%', width: `${(week / 16) * 100}%`, background: '#60a5fa', borderRadius: '2px', transition: 'width 0.5s' }} />
        </div>
      </div>

      {/* Today's Session */}
      {session && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#2a2a2a', marginBottom: '8px' }}>HEUTIGE EINHEIT</div>
          <div style={{ background: '#0a0a0a', border: `1px solid ${tc.text}25`, borderTop: `3px solid ${tc.text}` }}>
            <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid #111' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <span style={{ fontSize: '7px', background: tc.bg, color: tc.text, padding: '2px 7px', letterSpacing: '1px' }}>{session.tag}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>{session.title}</div>
              <div style={{ fontSize: '9px', color: '#3a3a3a', marginTop: '3px' }}>{session.note}</div>
            </div>
            {session.blocks[0].exercises.slice(0, 4).map((ex, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', borderBottom: '1px solid #0d0d0d' }}>
                <span style={{ fontSize: '11px', color: '#ccc' }}>{ex.name}</span>
                <span style={{ fontSize: '11px', fontWeight: 900, color: tc.text }}>{ex.sets}</span>
              </div>
            ))}
            {session.blocks[0].exercises.length > 4 && (
              <div style={{ padding: '7px 14px', fontSize: '9px', color: '#2a2a2a' }}>
                + {session.blocks[0].exercises.length - 4} weitere → Plan-Tab
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next Biweekly Goal */}
      <div>
        <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#2a2a2a', marginBottom: '8px' }}>
          NÄCHSTES ZIEL — {nextGoal.label} ({weeksToGoal <= 0 ? 'JETZT' : `in ${weeksToGoal} Wo.`})
        </div>
        <div style={{ background: '#090909', border: '1px solid #161616', borderTop: `2px solid ${weeksToGoal <= 0 ? '#ef4444' : '#f97316'}`, padding: '12px 14px' }}>
          {nextGoal.test && (
            <div style={{ fontSize: '9px', background: '#ef444418', color: '#ef4444', padding: '3px 8px', display: 'inline-block', marginBottom: '8px', letterSpacing: '1px' }}>
              TEST: {nextGoal.test}
            </div>
          )}
          {nextGoal.checks.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '5px', alignItems: 'flex-start' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#f97316', marginTop: '5px', flexShrink: 0 }} />
              <div style={{ fontSize: '10px', color: '#888', lineHeight: 1.4 }}>{c}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
