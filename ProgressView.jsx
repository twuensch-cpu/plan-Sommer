import { useState } from 'react'

const CARDIO_FIELDS = [
  { key: 'vo2max', label: 'VO2max', unit: 'ml/kg/min', color: '#f97316', placeholder: '49', info: 'Von Uhr (Garmin/Polar/Apple) oder Cooper-Test. Ziel: >55 bis September.' },
  { key: 'hrRest', label: 'Ruhepuls', unit: 'bpm', color: '#ef4444', placeholder: '48', info: 'Morgens liegend, vor dem Aufstehen. Täglich messen, Trend wichtiger als Einzelwert. Ziel: <44.' },
  { key: 'hrMax', label: 'Maximalpuls', unit: 'bpm', color: '#ef4444', placeholder: '185', info: 'Aus Maximaltest oder Schätzung (220 - Alter). Bestimmt deine Zone-2-Grenzen.' },
  { key: 'hrv', label: 'HRV', unit: 'ms', color: '#a78bfa', placeholder: 'z.B. 68', info: 'Heart Rate Variability. Von Uhr oder App (HRV4Training). Hoch = gut erholt. Niedrig = mehr Ruhe.' },
  { key: 'zone2low', label: 'Zone-2 HF untere Grenze', unit: 'bpm', color: '#60a5fa', placeholder: '132', info: '65% der MHF. Bei MHF 185 = 120 bpm.' },
  { key: 'zone2high', label: 'Zone-2 HF obere Grenze', unit: 'bpm', color: '#60a5fa', placeholder: '148', info: '80% der MHF. Bei MHF 185 = 148 bpm.' },
]

const KRAFT_FIELDS = [
  { key: 'bench1rm', label: 'Bankdrücken 1RM', unit: 'kg', color: '#4ade80', placeholder: '80' },
  { key: 'pullupsMax', label: 'Klimmzüge Max', unit: 'Wdh', color: '#4ade80', placeholder: '12' },
  { key: 'ohpWork', label: 'Overhead Press Arbeitsgew.', unit: 'kg', color: '#4ade80', placeholder: '50' },
  { key: 'trapBar', label: 'Trap Bar Deadlift', unit: 'kg', color: '#4ade80', placeholder: '100' },
  { key: 'frontSquat', label: 'Front Squat Arbeitsgew.', unit: 'kg', color: '#4ade80', placeholder: '70' },
]

const LAUF_FIELDS = [
  { key: 'run5km', label: '5km Bestzeit', unit: 'Min:Sek', color: '#60a5fa', placeholder: '25:30' },
  { key: 'run10km', label: '10km Zeit', unit: 'Min', color: '#60a5fa', placeholder: '54:00' },
  { key: 'zone2pace', label: 'Zone-2 Pace aktuell', unit: 'Min/km', color: '#60a5fa', placeholder: '6:15' },
  { key: 'ruck7km', label: 'Ruck 7km/20kg', unit: 'Min', color: '#a78bfa', placeholder: '52:00' },
]

const ENTRY_TYPES = [
  { key: 'vo2max', label: 'VO2max', unit: 'ml/kg/min', color: '#f97316', placeholder: 'z.B. 51' },
  { key: 'hrRest', label: 'Ruhepuls', unit: 'bpm', color: '#ef4444', placeholder: 'z.B. 46' },
  { key: 'hrv', label: 'HRV', unit: 'ms', color: '#a78bfa', placeholder: 'z.B. 72' },
  { key: 'run5km', label: '5km Zeit', unit: 'Min:Sek', color: '#60a5fa', placeholder: 'z.B. 24:10' },
  { key: 'ruck7km', label: 'Ruck 7km/20kg', unit: 'Min', color: '#a78bfa', placeholder: 'z.B. 50:00' },
  { key: 'bench1rm', label: 'Bankdrücken', unit: 'kg', color: '#4ade80', placeholder: 'z.B. 85' },
  { key: 'pullupsMax', label: 'Klimmzüge', unit: 'Wdh', color: '#4ade80', placeholder: 'z.B. 14' },
  { key: 'airbike', label: 'Airbike Ø Watt', unit: 'W', color: '#f97316', placeholder: 'z.B. 310' },
  { key: 'weight', label: 'Körpergewicht', unit: 'kg', color: '#a78bfa', placeholder: 'z.B. 73' },
]

function SectionHeader({ label }) {
  return (
    <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#2a2a2a', marginBottom: '8px', marginTop: '4px' }}>
      {label}
    </div>
  )
}

function InfoTooltip({ text }) {
  const [show, setShow] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span onClick={() => setShow(!show)}
        style={{ fontSize: '8px', color: '#333', border: '1px solid #222', borderRadius: '50%', width: '13px', height: '13px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: '5px' }}>
        i
      </span>
      {show && (
        <div onClick={() => setShow(false)} style={{
          position: 'absolute', bottom: '18px', left: 0, zIndex: 10, width: '200px',
          background: '#111', border: '1px solid #2a2a2a', padding: '8px 10px',
          fontSize: '9px', color: '#888', lineHeight: 1.5,
        }}>
          {text}
        </div>
      )}
    </span>
  )
}

export default function ProgressView({ userData, updateUserData, addEntry }) {
  const [section, setSection] = useState('cardio') // cardio | kraft | lauf | log
  const [newEntry, setNewEntry] = useState({ type: 'vo2max', value: '', note: '' })
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(false)
  const [vals, setVals] = useState({
    vo2max: userData.vo2max || '49',
    hrRest: userData.hrRest || '48',
    hrMax: userData.hrMax || '',
    hrv: userData.hrv || '',
    zone2low: userData.zone2low || '132',
    zone2high: userData.zone2high || '148',
    bench1rm: userData.bench1rm || '',
    pullupsMax: userData.pullupsMax || '',
    ohpWork: userData.ohpWork || '',
    trapBar: userData.trapBar || '',
    frontSquat: userData.frontSquat || '',
    run5km: userData.run5km || '',
    run10km: userData.run10km || '',
    zone2pace: userData.zone2pace || '',
    ruck7km: userData.ruck7km || '',
    weight: userData.weight || '73',
    airbike: userData.airbike || '300',
  })

  const save = () => { updateUserData(vals); setEditing(false) }

  const submitEntry = () => {
    if (!newEntry.value) return
    addEntry(newEntry)
    setNewEntry(p => ({ ...p, value: '', note: '' }))
    setShowForm(false)
  }

  const SECTIONS = [
    { id: 'cardio', label: 'Cardio', fields: CARDIO_FIELDS },
    { id: 'kraft', label: 'Kraft', fields: KRAFT_FIELDS },
    { id: 'lauf', label: 'Lauf', fields: LAUF_FIELDS },
  ]

  const activeFields = SECTIONS.find(s => s.id === section)?.fields || []

  // VO2max interpretation
  const vo2 = parseFloat(vals.vo2max)
  let vo2label = ''
  if (vo2 >= 55) vo2label = 'ZIEL ERREICHT ✓'
  else if (vo2 >= 52) vo2label = 'KURZ VOR ZIEL'
  else if (vo2 >= 49) vo2label = 'AUSGANGSWERT'
  else if (vo2 > 0) vo2label = 'UNTER AUSGANGSWERT'

  return (
    <div style={{ fontFamily: 'Courier New, monospace', padding: '14px' }}>
      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '8px', letterSpacing: '5px', color: '#2a2a2a', marginBottom: '2px' }}>LEISTUNGSDATEN</div>
        <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>MEINE WERTE</div>
      </div>

      {/* VO2max + Ruhepuls Highlight */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '14px' }}>
        <div style={{ padding: '12px', background: '#0f0800', border: '1px solid #f9731625', borderTop: '2px solid #f97316' }}>
          <div style={{ fontSize: '7px', color: '#f97316', letterSpacing: '2px', marginBottom: '4px' }}>VO2MAX</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: vals.vo2max ? '#f97316' : '#222' }}>
            {vals.vo2max || '—'}
          </div>
          <div style={{ fontSize: '8px', color: '#555', marginTop: '1px' }}>ml/kg/min</div>
          <div style={{ fontSize: '7px', color: '#f9731680', marginTop: '4px' }}>Ziel: &gt;55</div>
          {vo2label && <div style={{ fontSize: '7px', color: '#f97316', marginTop: '2px', letterSpacing: '1px' }}>{vo2label}</div>}
        </div>
        <div style={{ padding: '12px', background: '#0f0000', border: '1px solid #ef444425', borderTop: '2px solid #ef4444' }}>
          <div style={{ fontSize: '7px', color: '#ef4444', letterSpacing: '2px', marginBottom: '4px' }}>RUHEPULS</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: vals.hrRest ? '#ef4444' : '#222' }}>
            {vals.hrRest || '—'}
          </div>
          <div style={{ fontSize: '8px', color: '#555', marginTop: '1px' }}>bpm</div>
          <div style={{ fontSize: '7px', color: '#ef444480', marginTop: '4px' }}>Ziel: &lt;44</div>
        </div>
      </div>

      {/* Zone-2 Info */}
      {vals.zone2low && vals.zone2high && (
        <div style={{ padding: '9px 12px', background: '#00080f', border: '1px solid #60a5fa20', marginBottom: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ fontSize: '7px', color: '#60a5fa80', letterSpacing: '2px' }}>ZONE-2 ZIELBEREICH</div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#60a5fa' }}>
            {vals.zone2low}–{vals.zone2high} bpm
          </div>
        </div>
      )}

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            style={{
              flex: 1, padding: '7px 4px', border: 'none', cursor: 'pointer', fontFamily: 'Courier New, monospace',
              background: section === s.id ? '#111' : 'transparent',
              borderBottom: `2px solid ${section === s.id ? '#fff' : 'transparent'}`,
              fontSize: '9px', letterSpacing: '1px', color: section === s.id ? '#fff' : '#2a2a2a',
            }}>
            {s.label.toUpperCase()}
          </button>
        ))}
        <button onClick={() => setSection('log')}
          style={{
            flex: 1, padding: '7px 4px', border: 'none', cursor: 'pointer', fontFamily: 'Courier New, monospace',
            background: section === 'log' ? '#111' : 'transparent',
            borderBottom: `2px solid ${section === 'log' ? '#60a5fa' : 'transparent'}`,
            fontSize: '9px', letterSpacing: '1px', color: section === 'log' ? '#60a5fa' : '#2a2a2a',
          }}>
          LOG
        </button>
      </div>

      {section !== 'log' ? (
        <>
          {/* Fields Grid */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
              <button onClick={() => editing ? save() : setEditing(true)}
                style={{ fontSize: '8px', color: editing ? '#4ade80' : '#f97316', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '1px', fontFamily: 'Courier New, monospace' }}>
                {editing ? 'SPEICHERN ✓' : 'BEARBEITEN'}
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
              {activeFields.map(f => (
                <div key={f.key} style={{
                  padding: '9px 10px', background: '#090909',
                  borderTop: `2px solid ${vals[f.key] ? f.color + '50' : '#1a1a1a'}`,
                  border: '1px solid #141414',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
                    <div style={{ fontSize: '7px', color: '#2e2e2e', letterSpacing: '1px' }}>{f.label.toUpperCase()}</div>
                    {f.info && <InfoTooltip text={f.info} />}
                  </div>
                  {editing ? (
                    <input
                      value={vals[f.key]}
                      onChange={e => setVals(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{
                        width: '100%', background: '#060606', border: `1px solid ${f.color}40`,
                        color: f.color, padding: '5px 7px', fontSize: '13px', fontWeight: 900,
                        fontFamily: 'Courier New, monospace', outline: 'none',
                      }}
                    />
                  ) : (
                    <>
                      <div style={{ fontSize: '18px', fontWeight: 900, color: vals[f.key] ? f.color : '#1e1e1e' }}>
                        {vals[f.key] || '—'}
                      </div>
                      <div style={{ fontSize: '8px', color: '#252525' }}>{f.unit}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Log Entry */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#2a2a2a' }}>VERLAUF EINTRAGEN</div>
              <button onClick={() => setShowForm(!showForm)}
                style={{ fontSize: '8px', color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '1px', fontFamily: 'Courier New, monospace' }}>
                {showForm ? '— SCHLIESSEN' : '+ NEU'}
              </button>
            </div>
            {showForm && (
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '12px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                  {ENTRY_TYPES.map(t => (
                    <button key={t.key} onClick={() => setNewEntry(p => ({ ...p, type: t.key }))}
                      style={{
                        padding: '4px 8px', fontSize: '8px', fontFamily: 'Courier New, monospace', cursor: 'pointer',
                        background: newEntry.type === t.key ? t.color + '20' : 'transparent',
                        border: `1px solid ${newEntry.type === t.key ? t.color : '#1e1e1e'}`,
                        color: newEntry.type === t.key ? t.color : '#333',
                      }}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <input
                  value={newEntry.value}
                  onChange={e => setNewEntry(p => ({ ...p, value: e.target.value }))}
                  placeholder={ENTRY_TYPES.find(t => t.key === newEntry.type)?.placeholder}
                  style={{ width: '100%', background: '#060606', border: '1px solid #1e1e1e', color: '#fff', padding: '8px 10px', fontSize: '14px', fontWeight: 900, fontFamily: 'Courier New, monospace', outline: 'none', marginBottom: '6px' }}
                />
                <input
                  value={newEntry.note}
                  onChange={e => setNewEntry(p => ({ ...p, note: e.target.value }))}
                  placeholder="Notiz (optional)"
                  style={{ width: '100%', background: '#060606', border: '1px solid #1a1a1a', color: '#888', padding: '7px 10px', fontSize: '10px', fontFamily: 'Courier New, monospace', outline: 'none', marginBottom: '8px' }}
                />
                <button onClick={submitEntry}
                  style={{ width: '100%', padding: '9px', background: '#60a5fa15', border: '1px solid #60a5fa35', color: '#60a5fa', fontSize: '9px', letterSpacing: '3px', fontFamily: 'Courier New, monospace', cursor: 'pointer' }}>
                  EINTRAGEN
                </button>
              </div>
            )}
          </div>

          {/* History */}
          {(userData.entries || []).length === 0 ? (
            <div style={{ fontSize: '10px', color: '#252525', padding: '20px 0', textAlign: 'center' }}>Noch keine Einträge</div>
          ) : (
            [...(userData.entries || [])].reverse().map((e, i) => {
              const type = ENTRY_TYPES.find(t => t.key === e.type)
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', marginBottom: '4px', background: '#090909', borderLeft: `2px solid ${type?.color || '#333'}40` }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#bbb' }}>{type?.label}</div>
                    {e.note && <div style={{ fontSize: '8px', color: '#2e2e2e', marginTop: '1px' }}>{e.note}</div>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: type?.color || '#fff' }}>
                      {e.value} <span style={{ fontSize: '8px', fontWeight: 400, color: '#333' }}>{type?.unit}</span>
                    </div>
                    <div style={{ fontSize: '8px', color: '#1e1e1e' }}>{e.date}</div>
                  </div>
                </div>
              )
            })
          )}
        </>
      )}
    </div>
  )
}
