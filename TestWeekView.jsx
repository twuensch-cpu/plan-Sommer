import { useState } from 'react'

// Vollständiges Testprotokoll - 5 Tage
const TEST_DAYS = [
  {
    id: 'di',
    dayName: 'DIENSTAG',
    title: 'Kraft-Test I',
    subtitle: 'Oberkörper — Gym 12–14h',
    color: '#4ade80',
    tag: 'KRAFT',
    description: 'Maximalkraft Oberkörper. Kein Aufwärmen mit schwerem Gewicht — steigere dich rein. Notiere das tatsächlich erreichte Gewicht/Wiederholungen.',
    warmup: [
      '10 Min Einradfahren oder Seilspringen',
      '2 Sätze Bankdrücken mit 50% des erwarteten Gewichts × 10',
      '10 Klimmzüge locker',
    ],
    tests: [
      {
        id: 'bench_1rm',
        name: 'Bankdrücken — Max-Versuch',
        protocol: '5×50kg → 3×65kg → 1×75kg → 1×80kg → Versuch 85kg+',
        instruction: 'Steiger dich bis zum echten Maximalgewicht. Notiere das schwerste Gewicht das du 1× sauber gedrückt hast.',
        unit: 'kg',
        placeholder: 'z.B. 82.5',
        resultKey: 'bench1rm',
        category: 'kraft',
      },
      {
        id: 'pullups_max',
        name: 'Klimmzüge — Max Wiederholungen',
        protocol: 'Ein Satz bis zum Versagen. Volle Streckung unten, Kinn über Stange. Kein Hüpfen.',
        instruction: 'Nach 5 Min Pause nach Bankdrücken. Zähle nur saubere Wiederholungen.',
        unit: 'Wdh',
        placeholder: 'z.B. 12',
        resultKey: 'pullupsMax',
        category: 'kraft',
      },
      {
        id: 'military_press',
        name: 'Military Press — Arbeitsgewicht',
        protocol: '3 Sätze × 8 Wdh. Notiere das Gewicht bei dem du 3×8 sauber schaffst.',
        instruction: 'Stehend, kein Ausweichen mit der Hüfte. Welches Gewicht kannst du 3×8 kontrolliert drücken?',
        unit: 'kg',
        placeholder: 'z.B. 45',
        resultKey: 'militaryPress',
        category: 'kraft',
      },
    ],
    notes: 'Pause zwischen Max-Versuchen: mindestens 4 Min. Lieber etwas weniger als verletzen.',
  },
  {
    id: 'mi',
    dayName: 'MITTWOCH',
    title: 'Ausdauer-Test I',
    subtitle: 'Lauf — Zone-2 + 5km Zeittest',
    color: '#60a5fa',
    tag: 'LAUF',
    description: 'Zwei Teile: erst ruhiger Einschätzungslauf, dann 5km Zeittest nach 20 Min Pause. Das gibt uns dein Zone-2-Tempo UND deine Wettkampf-Pace.',
    warmup: [
      '10 Min einlaufen, sehr locker',
      'Dynamisches Dehnen: Ausfallschritte, Knieheber, Hackengang',
    ],
    tests: [
      {
        id: 'zone2_pace',
        name: 'Zone-2 Einschätzungslauf — 20 Min',
        protocol: 'Laufe 20 Min bei einem Tempo bei dem du dich noch normal unterhalten könntest. Notiere die Pace (Min/km).',
        instruction: 'Nasenatemtest: wenn du durch die Nase atmen kannst, bist du in Zone-2. Notiere deine durchschnittliche Pace.',
        unit: 'Min/km',
        placeholder: 'z.B. 6:20',
        resultKey: 'zone2pace',
        category: 'ausdauer',
      },
      {
        id: 'run5km',
        name: '5km Zeittest',
        protocol: 'Nach 20 Min Pause: 5km so schnell wie möglich. Gleichmäßiges Tempo, nicht zu schnell starten.',
        instruction: 'Stoppe die Zeit. Das ist deine Ausgangsbasis für alle Laufziele.',
        unit: 'Min:Sek',
        placeholder: 'z.B. 25:30',
        resultKey: 'run5km',
        category: 'ausdauer',
      },
    ],
    notes: 'Wenn kein GPS: Laufbahn nutzen oder bekannte Strecke. Pace = Minuten pro Kilometer.',
  },
  {
    id: 'do',
    dayName: 'DONNERSTAG',
    title: 'Ausdauer-Test II',
    subtitle: 'Airbike — Leistungsdiagnose',
    color: '#f97316',
    tag: 'AIRBIKE',
    description: 'Dein Airbike-Protokoll kennst du. Heute messen wir es genau: Durchschnittswatt in jedem Block, nicht nur gefühlt.',
    warmup: [
      '5 Min locker fahren',
      '2 Min progressiv bis 60% der erwarteten Max-Leistung',
    ],
    tests: [
      {
        id: 'airbike_vollgas',
        name: 'Airbike — 3×3 Min Vollgas',
        protocol: 'Exakt dein Protokoll. 3 Min Vollgas, 3 Min Pause, wiederholen. Notiere den Durchschnittswatt pro Block.',
        instruction: 'Notiere den Watt-Durchschnitt jedes einzelnen 3-Min-Blocks.',
        unit: 'W (Ø aller 3 Blöcke)',
        placeholder: 'z.B. 298',
        resultKey: 'airbikeVollgas',
        category: 'kondition',
      },
      {
        id: 'airbike_intervall',
        name: 'Airbike — 3×3 Min 20/10 Intervalle',
        protocol: 'Nach 15 Min Pause. Exakt dein Protokoll. Notiere wie viele Intervalle du auf Maximal-Level halten konntest.',
        instruction: 'Wie hoch war dein Peak-Watt in den 20s-Blöcken? Und wie viele konntest du wirklich auf Max halten?',
        unit: 'W Peak (20s)',
        placeholder: 'z.B. 420',
        resultKey: 'airbikeIntervall',
        category: 'kondition',
      },
    ],
    notes: 'Trink vor dem Test. Lüftung wichtig. Notiere Raumtemperatur wenn sehr warm — das beeinflusst die Werte.',
  },
  {
    id: 'fr',
    dayName: 'FREITAG',
    title: 'Kraft-Test II',
    subtitle: 'Unterkörper & Rumpf — Gym 12–14h',
    color: '#4ade80',
    tag: 'KRAFT',
    description: 'Unterkörper-Kraft und Rumpfstabilität. Kein klassisches Kreuzheben — KB-Variante wie im Plan.',
    warmup: [
      '5 Min Rad oder Seilspringen',
      'Hüftmobilität: 10× Leg Swing jede Seite',
      '2×10 Körpergewicht-Kniebeugen',
    ],
    tests: [
      {
        id: 'kb_rdl',
        name: 'Einarmiges KB-Kreuzheben — Arbeitsgewicht',
        protocol: 'Steigere dich: 3×6/Seite mit verschiedenen KB-Gewichten. Notiere das Gewicht bei dem Form noch 100% sauber ist.',
        instruction: 'Kein Kippen, Hüftscharnier sauber. Was ist das schwerste KB das du 6× pro Seite kontrolliert hebst?',
        unit: 'kg KB',
        placeholder: 'z.B. 28',
        resultKey: 'kbRDL',
        category: 'kraft',
      },
      {
        id: 'squat_working',
        name: 'Kniebeuge — Arbeitsgewicht 4×5',
        protocol: '3×60kg → 3×70kg → 4×5 mit dem Gewicht das sich nach 80% anfühlt.',
        instruction: 'Nicht maximal — finde das Gewicht für 4 Sätze × 5 Wdh mit 1 Wiederholung Reserve.',
        unit: 'kg',
        placeholder: 'z.B. 75',
        resultKey: 'squatWork',
        category: 'kraft',
      },
      {
        id: 'plank',
        name: 'Plank — Max Haltezeit',
        protocol: 'Unterarmstütz, gerade Linie Kopf–Ferse. Ein Versuch bis Versagen.',
        instruction: 'Rumpfstabilität = Laufeffizienz. Stoppe die Zeit bis du zusammenbrichst.',
        unit: 'Sek',
        placeholder: 'z.B. 95',
        resultKey: 'plankMax',
        category: 'kraft',
      },
    ],
    notes: 'KB-Kreuzheben: lieber zu leicht als zu schwer testen. Formbruch = Test beendet.',
  },
  {
    id: 'sa',
    dayName: 'SAMSTAG',
    title: 'Ausdauer-Test III',
    subtitle: 'Langer Lauf — Outdoor Baseline',
    color: '#a78bfa',
    tag: 'OUTDOOR',
    description: 'Dein längster aktueller Zone-2-Lauf. Kein Tempo-Druck — laufe so weit wie du kannst ohne das Tempo zu brechen. Das ist deine Basis-Distanz.',
    warmup: [
      '5 Min gehen',
      'Dynamisches Dehnen',
    ],
    tests: [
      {
        id: 'long_run_dist',
        name: 'Langer Zone-2-Lauf — Max Distanz',
        protocol: 'Laufe in Zone-2 (Nasenatemtest). Sobald du nicht mehr in Zone-2 bleiben kannst, stoppe. Notiere Distanz UND Zeit.',
        instruction: 'Keine Heroik. Ehrliche Zone-2-Distanz ohne Tempo zu brechen. Das ist dein Ausgangspunkt.',
        unit: 'km',
        placeholder: 'z.B. 6.5',
        resultKey: 'longRunDist',
        category: 'ausdauer',
      },
      {
        id: 'long_run_time',
        name: 'Gesamtzeit des langen Laufs',
        protocol: 'Zeit für die oben notierte Distanz.',
        instruction: '',
        unit: 'Min',
        placeholder: 'z.B. 42',
        resultKey: 'longRunTime',
        category: 'ausdauer',
      },
    ],
    notes: 'Danach: 20 Min Mobilität Pflicht. Hüftbeuger, Wade, Achilles. Das ist Teil des Tests.',
  },
]

// Berechne Startgewichte und Pace-Ziele basierend auf Testergebnissen
function calculatePlanValues(results) {
  const r = results
  const plan = {}

  // Bankdrücken: Startgewicht = ~80% des 1RM, auf 2.5kg gerundet
  if (r.bench1rm) {
    const w = parseFloat(r.bench1rm)
    plan.benchStart = Math.round((w * 0.80) / 2.5) * 2.5
    plan.benchWeek8 = Math.round((w * 0.95) / 2.5) * 2.5
    plan.benchTarget = Math.round((w * 1.10) / 2.5) * 2.5
  }

  // Klimmzüge: Startvolumen basierend auf Max
  if (r.pullupsMax) {
    const m = parseInt(r.pullupsMax)
    plan.pullupsStart = `4×${Math.max(3, Math.round(m * 0.6))}`
    plan.pullupsTarget = `4×${Math.min(15, Math.round(m * 1.5))}`
  }

  // Zone-2 Pace
  if (r.zone2pace) {
    plan.zone2pace = r.zone2pace
    plan.zone2note = 'Bleib in dieser Pace für alle Zone-2-Läufe in Phase I'
  }

  // 5km Ziele
  if (r.run5km) {
    const parts = r.run5km.split(':')
    const totalSec = parseInt(parts[0]) * 60 + (parseInt(parts[1]) || 0)
    const targetSec = Math.round(totalSec * 0.87) // ~13% Verbesserung in 16 Wochen
    const min = Math.floor(targetSec / 60)
    const sec = targetSec % 60
    plan.run5kmTarget = `${min}:${sec.toString().padStart(2, '0')}`
    plan.run5kmCurrent = r.run5km
  }

  // Langer Lauf: Start bei gefundener Distanz +10%
  if (r.longRunDist) {
    const d = parseFloat(r.longRunDist)
    plan.longRunStart = Math.round(d * 1.1 * 2) / 2 // auf 0.5km runden
    plan.longRunWeek8 = Math.round(d * 1.8 * 2) / 2
    plan.longRunTarget = Math.round(d * 2.8 * 2) / 2
  }

  // Airbike
  if (r.airbikeVollgas) {
    const w = parseInt(r.airbikeVollgas)
    plan.airbikeStart = w
    plan.airbikeTarget = Math.round(w * 1.07) // ~7% Steigerung
  }

  return plan
}

function ResultTag({ color, label }) {
  return (
    <span style={{ fontSize: '7px', background: color + '20', color, padding: '2px 7px', letterSpacing: '1px', marginLeft: '6px' }}>
      {label}
    </span>
  )
}

export default function TestWeekView({ userData, updateUserData, onComplete }) {
  const [activeDay, setActiveDay] = useState(0)
  const [results, setResults] = useState(userData.testResults || {})
  const [completedDays, setCompletedDays] = useState(userData.completedTestDays || [])
  const [showSummary, setShowSummary] = useState(false)

  const day = TEST_DAYS[activeDay]
  const allDaysComplete = completedDays.length >= TEST_DAYS.length

  const setResult = (key, value) => {
    const updated = { ...results, [key]: value }
    setResults(updated)
    updateUserData({ testResults: updated })
  }

  const completeDay = () => {
    // Check all tests for this day have values
    const allFilled = day.tests.every(t => results[t.resultKey]?.trim())
    if (!allFilled) return

    const updated = completedDays.includes(day.id) ? completedDays : [...completedDays, day.id]
    setCompletedDays(updated)
    updateUserData({ completedTestDays: updated })

    if (activeDay < TEST_DAYS.length - 1) {
      setActiveDay(activeDay + 1)
    } else {
      setShowSummary(true)
    }
  }

  const finishTest = () => {
    const planValues = calculatePlanValues(results)
    updateUserData({
      testComplete: true,
      testResults: results,
      planValues,
      // Populate startwerte
      benchPress: results.bench1rm || userData.benchPress,
      pullups: results.pullupsMax || userData.pullups,
      run5km: results.run5km || userData.run5km,
      airbike: results.airbikeVollgas || userData.airbike,
    })
    onComplete()
  }

  if (showSummary) {
    const plan = calculatePlanValues(results)
    return (
      <div style={{ fontFamily: 'Courier New, monospace', padding: '14px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '8px', letterSpacing: '5px', color: '#4ade80', marginBottom: '2px' }}>TESTWOCHE ABGESCHLOSSEN</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff' }}>DEINE AUSGANGSWERTE</div>
          <div style={{ fontSize: '9px', color: '#333', marginTop: '2px' }}>Der Plan ist jetzt auf dich kalibriert</div>
        </div>

        {/* Raw Results */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#2a2a2a', marginBottom: '8px' }}>MESSWERTE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            {[
              { label: 'Bankdr. 1RM', key: 'bench1rm', unit: 'kg', color: '#4ade80' },
              { label: 'Klimmzüge Max', key: 'pullupsMax', unit: 'Wdh', color: '#4ade80' },
              { label: '5km Zeit', key: 'run5km', unit: 'Min', color: '#60a5fa' },
              { label: 'Zone-2 Pace', key: 'zone2pace', unit: '/km', color: '#60a5fa' },
              { label: 'Langer Lauf', key: 'longRunDist', unit: 'km', color: '#a78bfa' },
              { label: 'Airbike Vollgas', key: 'airbikeVollgas', unit: 'W', color: '#f97316' },
              { label: 'KB-Kreuzheben', key: 'kbRDL', unit: 'kg', color: '#4ade80' },
              { label: 'Kniebeuge', key: 'squatWork', unit: 'kg', color: '#4ade80' },
            ].map(f => (
              <div key={f.key} style={{ padding: '9px 10px', background: '#090909', borderTop: `2px solid ${f.color}40` }}>
                <div style={{ fontSize: '7px', color: '#333', letterSpacing: '1px', marginBottom: '3px' }}>{f.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: results[f.key] ? f.color : '#222' }}>
                  {results[f.key] || '—'}
                  <span style={{ fontSize: '8px', fontWeight: 400, color: '#333', marginLeft: '3px' }}>{f.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calibrated Plan Values */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#2a2a2a', marginBottom: '8px' }}>DEIN KALIBRIERTER PLAN</div>
          <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
            {[
              plan.benchStart && { label: 'Bankdrücken Woche 1', value: `${plan.benchStart} kg × 4×6`, sub: `→ Ziel Woche 16: ${plan.benchTarget} kg`, color: '#4ade80' },
              plan.pullupsStart && { label: 'Klimmzüge Woche 1', value: plan.pullupsStart, sub: `→ Ziel: ${plan.pullupsTarget}`, color: '#4ade80' },
              plan.run5kmCurrent && { label: '5km Ziel', value: `< ${plan.run5kmTarget} Min`, sub: `Aktuell: ${plan.run5kmCurrent} Min`, color: '#60a5fa' },
              plan.zone2pace && { label: 'Zone-2 Pace Phase I', value: plan.zone2pace + ' /km', sub: 'Bleib in dieser Pace', color: '#60a5fa' },
              plan.longRunStart && { label: 'Langer Lauf Woche 1', value: `${plan.longRunStart} km`, sub: `→ Ziel Woche 14: ${plan.longRunTarget} km`, color: '#a78bfa' },
              plan.airbikeStart && { label: 'Airbike Basis', value: `${plan.airbikeStart} W`, sub: `→ Ziel: ${plan.airbikeTarget} W+`, color: '#f97316' },
            ].filter(Boolean).map((item, i) => (
              <div key={i} style={{ padding: '10px 14px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '3px', alignSelf: 'stretch', background: item.color + '60', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '8px', color: '#333', letterSpacing: '1px', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: '8px', color: '#2e2e2e', marginTop: '1px' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={finishTest} style={{
          width: '100%', padding: '14px', background: '#4ade8015',
          border: '1px solid #4ade8040', color: '#4ade80',
          fontSize: '11px', letterSpacing: '4px', fontFamily: 'Courier New, monospace', cursor: 'pointer',
        }}>
          PLAN STARTEN →
        </button>
      </div>
    )
  }

  const dayDone = completedDays.includes(day.id)
  const allFilled = day.tests.every(t => results[t.resultKey]?.trim())

  return (
    <div style={{ fontFamily: 'Courier New, monospace' }}>
      {/* Header */}
      <div style={{ padding: '12px 14px', background: '#080808', borderBottom: '1px solid #141414' }}>
        <div style={{ fontSize: '8px', letterSpacing: '5px', color: '#333', marginBottom: '2px' }}>WOCHE 0 — TESTPROTOKOLL</div>
        <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>BASELINE-TESTS</div>
        <div style={{ fontSize: '9px', color: '#333', marginTop: '2px' }}>Ehrliche Werte → präziser Plan</div>
      </div>

      {/* Day Nav */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #111', scrollbarWidth: 'none', background: '#070707' }}>
        {TEST_DAYS.map((d, i) => {
          const done = completedDays.includes(d.id)
          const active = activeDay === i
          return (
            <button key={d.id} onClick={() => setActiveDay(i)}
              style={{
                flexShrink: 0, padding: '9px 13px', border: 'none', cursor: 'pointer',
                background: active ? d.color + '12' : 'transparent',
                borderBottom: `2px solid ${active ? d.color : done ? d.color + '40' : 'transparent'}`,
              }}>
              <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '2px', color: active ? d.color : done ? d.color + '80' : '#2a2a2a' }}>
                {d.dayName.slice(0, 2)}
              </div>
              <div style={{ fontSize: '8px', color: done ? '#4ade8060' : '#1a1a1a', marginTop: '1px' }}>
                {done ? '✓' : `${d.tests.length} Tests`}
              </div>
            </button>
          )
        })}
        {allDaysComplete && (
          <button onClick={() => setShowSummary(true)}
            style={{ flexShrink: 0, padding: '9px 13px', border: 'none', cursor: 'pointer', background: '#4ade8012', borderBottom: '2px solid #4ade80' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: '#4ade80' }}>AUSWERTUNG</div>
          </button>
        )}
      </div>

      {/* Day Content */}
      <div style={{ padding: '14px' }}>
        {/* Day Header */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '7px', background: day.color + '18', color: day.color, padding: '2px 7px', letterSpacing: '1px' }}>{day.tag}</span>
            <span style={{ fontSize: '8px', color: '#333', letterSpacing: '2px' }}>{day.dayName}</span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff' }}>{day.title}</div>
          <div style={{ fontSize: '9px', color: '#3a3a3a', marginTop: '2px' }}>{day.subtitle}</div>
          <div style={{ fontSize: '10px', color: '#555', marginTop: '8px', lineHeight: 1.6, borderLeft: `2px solid ${day.color}30`, paddingLeft: '10px' }}>
            {day.description}
          </div>
        </div>

        {/* Warmup */}
        <div style={{ marginBottom: '14px', padding: '10px 12px', background: '#080808', border: '1px solid #111' }}>
          <div style={{ fontSize: '7px', letterSpacing: '3px', color: '#2a2a2a', marginBottom: '7px' }}>AUFWÄRMEN</div>
          {day.warmup.map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: '7px', marginBottom: '4px' }}>
              <span style={{ fontSize: '9px', color: '#2a2a2a' }}>→</span>
              <span style={{ fontSize: '10px', color: '#555' }}>{w}</span>
            </div>
          ))}
        </div>

        {/* Tests */}
        {day.tests.map((test, i) => {
          const val = results[test.resultKey] || ''
          const filled = val.trim().length > 0
          return (
            <div key={test.id} style={{
              marginBottom: '10px', background: '#0a0a0a',
              border: `1px solid ${filled ? day.color + '30' : '#141414'}`,
              borderLeft: `3px solid ${filled ? day.color : '#1e1e1e'}`,
            }}>
              <div style={{ padding: '10px 12px 8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: filled ? day.color + '25' : '#111', border: `1px solid ${filled ? day.color : '#222'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: filled ? day.color : '#2a2a2a', flexShrink: 0 }}>
                    {filled ? '✓' : i + 1}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ddd' }}>{test.name}</div>
                </div>

                <div style={{ marginLeft: '22px' }}>
                  <div style={{ fontSize: '9px', color: '#444', lineHeight: 1.6, marginBottom: '6px' }}>{test.protocol}</div>
                  {test.instruction && (
                    <div style={{ fontSize: '9px', color: day.color + '90', lineHeight: 1.5, marginBottom: '8px', fontStyle: 'italic' }}>
                      {test.instruction}
                    </div>
                  )}

                  {/* Input */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      value={val}
                      onChange={e => setResult(test.resultKey, e.target.value)}
                      placeholder={test.placeholder}
                      style={{
                        flex: 1, background: '#060606', border: `1px solid ${filled ? day.color + '50' : '#1e1e1e'}`,
                        color: filled ? day.color : '#888', padding: '8px 10px',
                        fontSize: '14px', fontWeight: 900, fontFamily: 'Courier New, monospace', outline: 'none',
                      }}
                    />
                    <div style={{ fontSize: '9px', color: '#333', whiteSpace: 'nowrap' }}>{test.unit}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Notes */}
        {day.notes && (
          <div style={{ padding: '9px 12px', background: '#080808', border: '1px solid #0e0e0e', marginBottom: '14px' }}>
            <div style={{ fontSize: '8px', color: '#2a2a2a', letterSpacing: '2px', marginBottom: '4px' }}>HINWEIS</div>
            <div style={{ fontSize: '9px', color: '#3a3a3a', lineHeight: 1.6 }}>{day.notes}</div>
          </div>
        )}

        {/* Complete Day Button */}
        <button
          onClick={completeDay}
          disabled={!allFilled || dayDone}
          style={{
            width: '100%', padding: '12px',
            background: dayDone ? '#4ade8012' : allFilled ? day.color + '18' : '#0a0a0a',
            border: `1px solid ${dayDone ? '#4ade8040' : allFilled ? day.color + '50' : '#141414'}`,
            color: dayDone ? '#4ade80' : allFilled ? day.color : '#222',
            fontSize: '10px', letterSpacing: '4px', fontFamily: 'Courier New, monospace',
            cursor: allFilled && !dayDone ? 'pointer' : 'default',
          }}
        >
          {dayDone ? '✓ TAG ABGESCHLOSSEN' : allFilled ? 'TAG ABSCHLIESSEN →' : `NOCH ${day.tests.filter(t => !results[t.resultKey]?.trim()).length} WERTE FEHLEN`}
        </button>
      </div>
    </div>
  )
}
