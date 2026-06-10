import { useState } from 'react'
import { SESSIONS, WEEK_DAYS, TAG_COLORS } from '../data.js'

const SESSION_MAP = {
  MO: 'BOXEN', DI: 'KRAFT_A', MI: 'LAUF_LANG',
  DO: 'AIRBIKE', FR: 'KRAFT_B', SA: 'LAUF_INTERVALL', SO: 'BOXEN',
}

function ExBlock({ block, color }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{
        fontSize: '7px', letterSpacing: '4px', marginBottom: '6px', paddingBottom: '5px',
        borderBottom: `1px solid ${block.primary ? color + '25' : '#141414'}`,
        color: block.primary ? color : '#2e2e2e',
      }}>{block.title}</div>
      {block.exercises.map((ex, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '1fr 90px', gap: '8px',
          padding: '8px 10px', marginBottom: '3px',
          background: block.primary ? '#0a0a0a' : '#080808',
          borderLeft: `2px solid ${block.primary ? color + '50' : '#1a1a1a'}`,
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#ddd' }}>{ex.name}</div>
            {ex.note ? <div style={{ fontSize: '9px', color: '#383838', fontStyle: 'italic', marginTop: '1px' }}>{ex.note}</div> : null}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: block.primary ? color : '#555', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{ex.sets}</div>
            {ex.load && ex.load !== '—' && (
              <div style={{ fontSize: '9px', color: '#3a3a3a', marginTop: '2px', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{ex.load}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PlanView() {
  const [activeDay, setActiveDay] = useState('DI')

  const sessionKey = SESSION_MAP[activeDay]
  const session = SESSIONS[sessionKey]
  const tc = TAG_COLORS[session?.tag] || { bg: '#111', text: '#555' }

  return (
    <div style={{ fontFamily: 'Courier New, monospace' }}>
      {/* Header */}
      <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid #141414', background: '#080808' }}>
        <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#2a2a2a', marginBottom: '2px' }}>WOCHENPLAN</div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff' }}>TRAININGSSTRUKTUR</div>
        <div style={{ fontSize: '9px', color: '#2e2e2e', marginTop: '2px' }}>Fokus: Laufen + Airbike · Kraft funktionell · Boxen flexibel</div>
      </div>

      {/* Day Selector */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #111', scrollbarWidth: 'none', background: '#070707' }}>
        {WEEK_DAYS.map(d => {
          const sk = SESSION_MAP[d.day]
          const s = SESSIONS[sk]
          const t = TAG_COLORS[s?.tag] || { bg: '#111', text: '#333' }
          const active = activeDay === d.day
          return (
            <button key={d.day} onClick={() => setActiveDay(d.day)}
              style={{
                flexShrink: 0, padding: '9px 12px', border: 'none', cursor: 'pointer',
                background: active ? t.bg : 'transparent',
                borderBottom: `2px solid ${active ? t.text : 'transparent'}`,
              }}>
              <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '2px', color: active ? t.text : '#282828' }}>{d.day}</div>
              <div style={{ fontSize: '7px', color: active ? '#555' : '#1e1e1e', marginTop: '1px', whiteSpace: 'nowrap' }}>{s?.tag || '—'}</div>
            </button>
          )
        })}
      </div>

      {/* Session Content */}
      {session && (
        <div style={{ padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '36px', height: '36px', background: tc.bg, border: `1px solid ${tc.text}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900, color: tc.text, flexShrink: 0 }}>
              {activeDay}
            </div>
            <div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff' }}>{session.title}</div>
                <span style={{ fontSize: '7px', background: tc.bg, color: tc.text, padding: '2px 6px' }}>{session.tag}</span>
              </div>
              <div style={{ fontSize: '9px', color: '#333', marginTop: '2px' }}>{session.note}</div>
            </div>
          </div>
          {session.blocks.map((block, i) => (
            <ExBlock key={i} block={block} color={session.color} />
          ))}
        </div>
      )}
    </div>
  )
}
