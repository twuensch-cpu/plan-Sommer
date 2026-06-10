import { useState } from 'react'
import { BIWEEKLY_GOALS } from '../data.js'

function getCurrentWeek(startDate) {
  const start = new Date(startDate)
  const now = new Date()
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7))
  return Math.max(1, Math.min(16, diff + 1))
}

export default function GoalsView({ userData, updateUserData }) {
  const currentWeek = getCurrentWeek(userData.startDate)
  const completed = userData.completedGoals || []

  const toggle = (week) => {
    const next = completed.includes(week)
      ? completed.filter(w => w !== week)
      : [...completed, week]
    updateUserData({ completedGoals: next })
  }

  return (
    <div style={{ fontFamily: 'Courier New, monospace', padding: '14px' }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '8px', letterSpacing: '5px', color: '#2a2a2a', marginBottom: '2px' }}>MEILENSTEINE</div>
        <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>ZWISCHENZIELE</div>
        <div style={{ fontSize: '9px', color: '#333', marginTop: '2px' }}>Alle 2 Wochen · 8 Checkpoints bis Ziel</div>
      </div>

      {/* Final Goal Banner */}
      <div style={{ padding: '12px 14px', background: '#1a0000', border: '1px solid #ef444430', borderLeft: '3px solid #ef4444', marginBottom: '16px' }}>
        <div style={{ fontSize: '8px', color: '#ef4444', letterSpacing: '3px', marginBottom: '4px' }}>ENDZIEL · ENDE SEPTEMBER</div>
        <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>7 km · 20 kg · Stiefel · Uniform</div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#ef4444' }}>UNTER 45 MINUTEN</div>
        <div style={{ fontSize: '9px', color: '#555', marginTop: '3px' }}>= 6:26 min/km unter voller Last</div>
      </div>

      {/* Goals List */}
      {BIWEEKLY_GOALS.map((goal, i) => {
        const isPast = currentWeek > goal.week
        const isCurrent = currentWeek <= goal.week && currentWeek > (BIWEEKLY_GOALS[i - 1]?.week || 0)
        const isDone = completed.includes(goal.week)
        const isFinal = goal.week === 16

        let borderColor = '#1a1a1a'
        if (isFinal) borderColor = '#ef4444'
        else if (isCurrent) borderColor = '#f97316'
        else if (isDone) borderColor = '#4ade80'

        return (
          <div key={goal.week} style={{
            marginBottom: '8px', background: isDone ? '#020f06' : '#090909',
            border: `1px solid ${borderColor}30`,
            borderTop: `2px solid ${borderColor}`,
            opacity: isPast && !isDone ? 0.6 : 1,
          }}>
            <div style={{ padding: '10px 12px 8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => toggle(goal.week)} style={{
                width: '20px', height: '20px', border: `1px solid ${isDone ? '#4ade80' : '#222'}`,
                background: isDone ? '#4ade8020' : 'transparent', flexShrink: 0, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#4ade80',
              }}>
                {isDone ? '✓' : ''}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 900, color: isCurrent ? '#f97316' : isDone ? '#4ade80' : '#444', letterSpacing: '2px' }}>
                    {goal.label}
                  </span>
                  {isCurrent && <span style={{ fontSize: '7px', background: '#f9731620', color: '#f97316', padding: '1px 6px' }}>AKTUELL</span>}
                  {goal.test && <span style={{ fontSize: '7px', background: '#ef444415', color: '#ef4444', padding: '1px 6px' }}>TEST</span>}
                </div>
                {goal.test && <div style={{ fontSize: '8px', color: '#ef4444', marginTop: '1px' }}>{goal.test}</div>}
              </div>
            </div>
            <div style={{ padding: '0 12px 10px 42px' }}>
              {goal.checks.map((c, j) => (
                <div key={j} style={{ display: 'flex', gap: '6px', marginBottom: '3px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '8px', color: '#333', marginTop: '2px' }}>→</div>
                  <div style={{ fontSize: '10px', color: isDone ? '#4ade8088' : '#666', lineHeight: 1.4, textDecoration: isDone ? 'line-through' : 'none' }}>{c}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
