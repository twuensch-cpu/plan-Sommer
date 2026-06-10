import { useState } from 'react'

function buildSystemPrompt(userData) {
  const entries = (userData.entries || [])
  const lastEntries = {}
  entries.forEach(e => { lastEntries[e.type] = e })

  return `Du bist ein persönlicher Trainingscoach für einen Leistungssportler.

PROFIL:
- Boxer (Leistungssport) + Soldat (Einzelkämpfer-Ausbildung), 73 kg
- Gym nur Di+Fr 12–14h (Freihanteln, alles verfügbar), kein Gym Sa
- Sparring Mo+So fix, Boxen 1–3x/Woche flexibel
- Kein wöchentlicher Gepäcklauf (Gelenke schonen), nur 3 gezielte Rucks kurz vor Lehrgang

KARDIOVASKULÄRE AUSGANGSWERTE:
- VO2max: ${userData.vo2max || '49'} ml/kg/min (Ziel: >55)
- Ruhepuls: ${userData.hrRest || '48'} bpm (Ziel: <44)
- Maximalpuls: ${userData.hrMax || 'geschätzt ~185'} bpm
- HRV: ${userData.hrv || 'nicht gemessen'} ms
- Zone-2 Bereich: ${userData.zone2low || '132'}–${userData.zone2high || '148'} bpm

KRAFTWERTE:
- Bankdrücken 1RM: ${userData.bench1rm || 'unbekannt'} kg
- Klimmzüge Max: ${userData.pullupsMax || 'unbekannt'} Wdh
- Overhead Press: ${userData.ohpWork || 'unbekannt'} kg
- Trap Bar Deadlift: ${userData.trapBar || 'unbekannt'} kg
- Front Squat: ${userData.frontSquat || 'unbekannt'} kg

LAUFWERTE:
- 5km Bestzeit: ${userData.run5km || 'unbekannt'}
- Zone-2 Pace: ${userData.zone2pace || 'unbekannt'} min/km
- Airbike Ø: ${userData.airbike || '300'} W

AKTUELLE EINTRÄGE (letzter Wert je Kategorie):
${Object.entries(lastEntries).map(([k, v]) => `- ${k}: ${v.value} (${v.date})`).join('\n') || '- Noch keine Einträge'}

ENDZIEL: 7km / 20kg / Stiefel / Uniform < 45 Min bis Ende September 2026 (16 Wochen)
FOKUS: Zone-2-Läufe für VO2max-Aufbau + Airbike VO2max-Intervalle. Kraft funktionell.

TRAININGSPLAN:
- DI: Kraft A — Bankdrücken 4×5, Weighted Pull-Up, OHP, Pendlay Row, Farmers Carry + Pumpen
- MI: Langer Zone-2-Lauf (Wo1: 7km → Wo14: 20km), HF 132–148 bpm
- DO: Airbike — 3×3Min Vollgas + Pause + 3×3Min Tabata 20/10, ab Wo5 + 8Min Steady State
- FR: Kraft B — Trap Bar Deadlift, Front Squat, Romanian DL, Box Jump, Walking Lunge + Rumpf
- SA: 1000m Intervalle (Wo1: 4×1000m → Wo12: 4×1500m)
- MO/SO: Boxen/Sparring

Antworte auf Deutsch. Sei direkt, militärisch knapp, konkret. Keine langen Einleitungen.
Bei neuen Werten: interpretiere VO2max-Fortschritt, Ruhepuls-Trend, und passe Trainingsempfehlungen an.
Gib immer spezifische Zahlen — Gewichte, Pace, Herzfrequenz, keine vagen Ratschläge.`
}

export default function CoachView({ userData }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bereit. Gib deine aktuellen Werte ein oder stell deine Frage. Ich passe den Plan konkret an.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: buildSystemPrompt(userData),
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await response.json()
      const reply = data.content?.map(b => b.text || '').join('') || 'Fehler beim Abrufen der Antwort.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Verbindungsfehler. Bitte erneut versuchen.' }])
    }
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const quickPrompts = [
    'Ich habe heute 5km in 24:30 gelaufen',
    'Ruck-Test: 7km/20kg in 51 Min',
    'Bankdrücken heute: 80kg × 5',
    'Bin diese Woche müde, soll ich anpassen?',
    'Was ist mein kritischster Schwachpunkt?',
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', fontFamily: 'Courier New, monospace' }}>
      {/* Header */}
      <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid #141414', background: '#080808', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', letterSpacing: '5px', color: '#2a2a2a', marginBottom: '1px' }}>KI-ASSISTENT</div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff' }}>COACH</div>
        <div style={{ fontSize: '9px', color: '#2e2e2e', marginTop: '1px' }}>Werte eingeben → Plan wird angepasst</div>
      </div>

      {/* Quick Prompts */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #0e0e0e', display: 'flex', gap: '5px', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
        {quickPrompts.map((p, i) => (
          <button key={i} onClick={() => setInput(p)}
            style={{ flexShrink: 0, padding: '4px 9px', fontSize: '8px', fontFamily: 'Courier New, monospace', background: '#0c0c0c', border: '1px solid #1e1e1e', color: '#444', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {p}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', WebkitOverflowScrolling: 'touch' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ fontSize: '7px', letterSpacing: '2px', color: '#252525', marginBottom: '3px' }}>
              {m.role === 'user' ? 'DU' : 'COACH'}
            </div>
            <div style={{
              maxWidth: '85%', padding: '9px 12px',
              background: m.role === 'user' ? '#0d1a0d' : '#0a0a0a',
              border: `1px solid ${m.role === 'user' ? '#4ade8025' : '#1a1a1a'}`,
              borderLeft: m.role === 'assistant' ? '2px solid #f9731650' : undefined,
              fontSize: '11px', color: '#ccc', lineHeight: 1.6, whiteSpace: 'pre-wrap',
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ padding: '9px 12px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderLeft: '2px solid #f9731650', fontSize: '11px', color: '#f97316' }}>
              ···
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid #141414', background: '#080808', flexShrink: 0, paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Wert oder Frage eingeben..."
            rows={2}
            style={{
              flex: 1, background: '#0a0a0a', border: '1px solid #1e1e1e', color: '#ddd',
              padding: '8px 10px', fontSize: '11px', fontFamily: 'Courier New, monospace',
              resize: 'none', outline: 'none', lineHeight: 1.5,
            }}
          />
          <button onClick={send} disabled={loading || !input.trim()}
            style={{
              padding: '0 14px', background: loading || !input.trim() ? '#111' : '#f9731620',
              border: `1px solid ${loading || !input.trim() ? '#1a1a1a' : '#f9731650'}`,
              color: loading || !input.trim() ? '#2a2a2a' : '#f97316',
              fontSize: '12px', cursor: loading || !input.trim() ? 'default' : 'pointer',
              fontFamily: 'Courier New, monospace',
            }}>
            →
          </button>
        </div>
        <div style={{ fontSize: '8px', color: '#1e1e1e', marginTop: '5px' }}>
          Deine gespeicherten Werte werden automatisch als Kontext übergeben
        </div>
      </div>
    </div>
  )
}
