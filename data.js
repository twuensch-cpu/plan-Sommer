// 16 Wochen: Mitte Juni – Ende September 2026
// Ziel: 7km / 20kg / Stiefel / Uniform < 45 Min
// VO2max Ausgangswert: 49 → Ziel: >55
// Ruhepuls Ausgangswert: 48 → Ziel: <44
// Fokus: Lange Läufe (Zone-2 für VO2max) + Airbike VO2max-Intervalle
// Kraft: militärisch-funktionell, Gelenke schonen

export const PLAN_META = {
  startDate: '2026-06-15',
  endDate: '2026-09-28',
  totalWeeks: 16,
  goal: '7km / 20kg / Stiefel < 45 Min',
  targetPace: '6:26 min/km unter Last',
  vo2maxStart: 49,
  vo2maxTarget: 55,
  hrRestStart: 48,
  hrRestTarget: 44,
}

export const BIWEEKLY_GOALS = [
  {
    week: 2,
    label: 'Woche 2',
    checks: [
      'Lauf: 8 km Zone-2 — Pace konstant halten',
      'Airbike: 3×3 Min Ø 300W',
      'Ruhepuls messen: Trend nach unten?',
    ],
    test: null,
  },
  {
    week: 4,
    label: 'Woche 4',
    checks: [
      'Lauf: 10 km < 66 Min',
      '5km Zeittest: Bestzeit setzen',
      'Airbike: Ø 305W Vollgas-Block',
    ],
    test: '5km Zeittest',
  },
  {
    week: 6,
    label: 'Woche 6',
    checks: [
      'Lauf: 12 km Zone-2',
      'Klimmzüge: 4×8 gewichtet',
      'VO2max-Schätzung: Verbesserung messbar?',
    ],
    test: null,
  },
  {
    week: 8,
    label: 'Woche 8',
    checks: [
      'Lauf: 14 km Zone-2',
      '5km Zeittest: < 25 Min',
      '1. RUCK-TEST: 7km / 20kg < 52 Min',
      'Airbike: Ø 310W',
    ],
    test: '5km + Ruck-Test',
  },
  {
    week: 10,
    label: 'Woche 10',
    checks: [
      'Lauf: 16 km Zone-2',
      '5km: < 24 Min',
      'VO2max-Messung: Ziel >52',
      'Ruhepuls: Ziel <46',
    ],
    test: 'VO2max + 5km',
  },
  {
    week: 12,
    label: 'Woche 12',
    checks: [
      'Lauf: 18 km Zone-2',
      '5km: < 23 Min',
      '2. RUCK-TEST: 7km / 20kg < 49 Min',
      'Airbike: Ø 315W',
    ],
    test: '5km + Ruck-Test',
  },
  {
    week: 14,
    label: 'Woche 14',
    checks: [
      'Lauf: 20 km Zone-2',
      '5km: < 22 Min',
      '3. RUCK-TEST: 7km / 20kg < 47 Min',
      'VO2max: Ziel >54',
    ],
    test: 'Ruck-Test + VO2max',
  },
  {
    week: 16,
    label: 'Woche 16',
    checks: [
      'FINALTEST: 7km / 20kg / Stiefel / Uniform',
      'ZIEL: < 45 Min',
      '5km: < 21 Min',
      'VO2max: > 55 ✓',
      'Ruhepuls: < 44 ✓',
    ],
    test: 'FINAL: Ruck < 45 Min',
  },
]

export const WEEK_DAYS = [
  { day: 'MO', type: 'BOXEN', color: '#ef4444', desc: 'Sparring / Technik (1–3x/Wo flexibel)' },
  { day: 'DI', type: 'KRAFT', color: '#4ade80', desc: 'Gym 12–14h — Kraft A' },
  { day: 'MI', type: 'LAUF', color: '#60a5fa', desc: 'Langer Zone-2-Lauf — VO2max Aufbau' },
  { day: 'DO', type: 'AIRBIKE', color: '#f97316', desc: 'Airbike VO2max-Intervalle' },
  { day: 'FR', type: 'KRAFT', color: '#4ade80', desc: 'Gym 12–14h — Kraft B' },
  { day: 'SA', type: 'LAUF', color: '#60a5fa', desc: 'Outdoor — Tempolauf / 1000m Intervalle' },
  { day: 'SO', type: 'BOXEN', color: '#ef4444', desc: 'Sparring / aktive Erholung' },
]

export const SESSIONS = {
  KRAFT_A: {
    title: 'Kraft A — Drücken & Ziehen',
    tag: 'GYM',
    color: '#4ade80',
    note: 'Dienstag 12–14h. Oberkörperkraft + Schultern. Kein Muskelversagen — 1 Wdh Reserve immer.',
    blocks: [
      {
        title: 'HAUPTARBEIT — KRAFT',
        primary: true,
        exercises: [
          { name: 'Bankdrücken', sets: '4×5', load: 'Ph.I: 70→75kg / Ph.II: 77.5→85kg / Ph.III: 85→90kg', note: '3s runter, 1s Pause unten, explosiv hoch — maximale Muskelspannung' },
          { name: 'Weighted Pull-Up', sets: '4×5', load: 'Ph.I: +5kg / Ph.II: +10kg / Ph.III: +15kg', note: 'Vollständige Streckung — Latzug für Boxen und Klettern unter Last' },
          { name: 'Standing Overhead Press', sets: '4×5', load: '45→60kg progressiv', note: 'Stehend, Kern angespannt. Schulterbreite + Stabilität für Gepäcktragen' },
          { name: 'Pendlay Row', sets: '4×4', load: '65→80kg', note: 'Explosiv aus dem Boden. Oberer Rücken = Schlagstabilität + Gepäckstabilisierung' },
          { name: 'Farmers Carry', sets: '3×40m', load: 'So schwer wie möglich', note: 'Greifkraft + Trapezkraft + Ganzkörperspannung unter Last = Ruck-Transfer' },
        ],
      },
      {
        title: 'HYPERTROPHIE — SCHULTERN & ARME',
        primary: false,
        exercises: [
          { name: 'Dumbbell Lateral Raise', sets: '4×12', load: 'leicht-mittel', note: 'Schulterbreite, mittlerer Deltamuskel — Kontrolle wichtiger als Gewicht' },
          { name: 'Incline Dumbbell Curl', sets: '3×10', load: 'mittel', note: 'Langer Bizeps-Kopf — volle Streckung am Ende' },
          { name: 'Triceps Dips / Close-Grip', sets: '3×10', load: 'KG oder +Scheibe', note: 'Trizepsvolumen — Boxen-Transfer Geraden' },
        ],
      },
    ],
  },

  KRAFT_B: {
    title: 'Kraft B — Beine & Posterior Chain',
    tag: 'GYM',
    color: '#4ade80',
    note: 'Freitag 12–14h. Unterkörper für Laufkraft + Ruck-Belastbarkeit. Kein Kreuzheben mit Rückenbelastung.',
    blocks: [
      {
        title: 'HAUPTARBEIT — EXPLOSIVKRAFT',
        primary: true,
        exercises: [
          { name: 'Trap Bar Deadlift (oder KB beidarmig)', sets: '4×5', load: '80→110kg progressiv', note: 'Aufrechter Rumpf, Hüftstreckung explosiv. Ruck-Transfer: Last vom Boden heben' },
          { name: 'Front Squat', sets: '4×4', load: '60→80kg', note: 'Aufrechter Oberkörper = Ruck-Haltung. Tiefe Kniebeuge, Kernspannung Pflicht' },
          { name: 'Romanian Deadlift', sets: '3×6', load: '70→90kg', note: 'Hamstring Exzentrik — Laufkraft, Verletzungsprävention. Langsamst mögliches Ablassen' },
          { name: 'Box Jump', sets: '4×5', load: 'Max Höhe', note: 'Explosivität + Kraft-Geschwindigkeits-Kurve. Volle Hüftstreckung beim Absprung' },
          { name: 'Walking Lunge mit KH', sets: '3×12/Bein', load: '2×20kg KH', note: 'Einseitige Kraftentwicklung = direkter Lauftransfer. Knie schonen: aufrecht bleiben' },
        ],
      },
      {
        title: 'RUMPF & ROTATIONSKRAFT',
        primary: false,
        exercises: [
          { name: 'Pallof Press', sets: '3×10/Seite', load: 'Kabel oder Band', note: 'Anti-Rotation = Kern unter Last stabilisieren. Direkt für Boxen + Gepäckstabilität' },
          { name: 'Ab Wheel Rollout', sets: '3×8', load: '—', note: 'Anteriore Kettenspannung — Laufeffizienz und Schlagpower' },
          { name: 'Hammer Curl', sets: '3×12', load: 'KH', note: 'Brachialis + Unterarm — Griffkraft für Farmers Carry und Klettern' },
        ],
      },
    ],
  },

  LAUF_LANG: {
    title: 'Langer Zone-2-Lauf',
    tag: 'LAUF',
    color: '#60a5fa',
    note: 'Mittwoch. Herzstück des VO2max-Aufbaus. Zone-2 = der Bereich der VO2max am stärksten verbessert bei deiner Ausgangslage (49).',
    blocks: [
      {
        title: 'ZONE-2 HERZFREQUENZ-ZIELBEREICH',
        primary: true,
        exercises: [
          { name: 'Dein Zone-2 Bereich', sets: 'HF: 132–148 bpm', load: 'Bei RHR 48 und geschätzter MHF ~185', note: 'Nasenatemtest: du kannst Sätze sprechen aber nicht singen. Pace ist FOLGE, nicht Ziel.' },
          { name: 'Wo 1–2', sets: '7–8 km', load: '~6:10–6:40/km erwartet', note: 'Pace wird sich mit steigendem VO2max automatisch verbessern' },
          { name: 'Wo 3–4', sets: '9–10 km', load: '~6:00–6:30/km', note: '' },
          { name: 'Wo 5–6', sets: '11–12 km', load: '~5:55–6:20/km', note: '' },
          { name: 'Wo 7–8', sets: '13–14 km', load: '~5:50–6:15/km', note: '' },
          { name: 'Wo 9–10', sets: '15–16 km', load: '~5:40–6:05/km', note: '' },
          { name: 'Wo 11–12', sets: '17–18 km', load: '~5:35–6:00/km', note: '' },
          { name: 'Wo 13–14', sets: '19–20 km', load: '~5:30–5:55/km', note: 'Halbmarathon-Bereich' },
          { name: 'Wo 15–16', sets: '12–14 km', load: '~5:25–5:45/km', note: 'Taper — Distanz runter, Pace ist jetzt schärfer' },
        ],
      },
      {
        title: 'NACH DEM LAUF — PFLICHT',
        primary: false,
        exercises: [
          { name: 'Ruhepuls messen', sets: 'sofort nach Aufwachen', load: '—', note: 'Täglich, am besten morgens liegend. Trend nach unten = gute Adaptation' },
          { name: 'Mobilität', sets: '15 Min', load: '—', note: 'Hüftbeuger (Psoas), Achilles, Wade (Soleus), LWS — Verletzungsprävention' },
        ],
      },
    ],
  },

  AIRBIKE: {
    title: 'Airbike — VO2max Intervalle',
    tag: 'AIRBIKE',
    color: '#f97316',
    note: 'Donnerstag. Dein Protokoll ist bereits VO2max-optimal. Pausen werden progressiv kürzer — das zwingt das Herz zur Adaptation.',
    blocks: [
      {
        title: 'PROTOKOLL — PAUSEN WERDEN KÜRZER',
        primary: true,
        exercises: [
          { name: 'Aufwärmen', sets: '5 Min', load: 'locker', note: 'HF unter 130' },
          { name: '3×3 Min Vollgas', sets: 'Wo1–4: Pause 3 Min\nWo5–8: Pause 2.5 Min\nWo9–12: Pause 2 Min\nWo13–16: Pause 90s', load: 'Ziel: Ø 300→325W', note: 'Bei VO2max 49 ist dieser Block dein stärkster VO2max-Reiz' },
          { name: 'Pause', sets: '12–15 Min', load: 'sehr locker fahren', note: 'Aktive Erholung — nicht stoppen, HF auf <130 bringen' },
          { name: '3×3 Min 20s/10s', sets: 'Wo1–6: Pause 1 Min\nWo7–12: Pause 45s\nWo13–16: Pause 30s', load: 'Absolutes Max auf 20s', note: 'Tabata-Prinzip: maximaler VO2max-Stimulus in kurzer Zeit' },
        ],
      },
      {
        title: 'ZUSATZ — AB WO 5: LÄNGERER BLOCK',
        primary: false,
        exercises: [
          { name: 'Steady State Block (Wo 5+)', sets: '1×8 Min', load: 'Ø ~260–270W', note: 'Nach dem Intervall-Protokoll: 8 Min gleichmäßig submaximale Leistung. VO2max-Plateau brechen.' },
          { name: 'Medball Rotational Slam', sets: '3×8/Seite', load: '6–8 kg', note: 'Rotationsexplosivität = Schlagkraft. Aus Hüfte, nicht Armen.' },
        ],
      },
    ],
  },

  LAUF_INTERVALL: {
    title: 'Tempolauf — 1000m Intervalle',
    tag: 'LAUF',
    color: '#60a5fa',
    note: 'Samstag. Outdoor. 1000m statt 800m — besserer Transfer auf Laktatschwellen-Anhebung bei deinem VO2max-Niveau.',
    blocks: [
      {
        title: '1000M INTERVALLE — PROGRESSION',
        primary: true,
        exercises: [
          { name: 'Einlaufen', sets: '15 Min', load: 'Zone-2', note: 'HF unter 145, locker' },
          { name: 'Wo 1–3: 4×1000m', sets: 'Pause: 2:30 Min', load: '< 4:40/km Pace', note: 'Einstieg — komfortabel aber anstrengend' },
          { name: 'Wo 4–7: 5×1000m', sets: 'Pause: 2 Min', load: '< 4:30/km Pace', note: '' },
          { name: 'Wo 8–11: 6×1000m', sets: 'Pause: 90s', load: '< 4:20/km Pace', note: 'Laktatschwelle hebt sich' },
          { name: 'Wo 12–13: 4×1500m', sets: 'Pause: 2 Min', load: '< 4:30/km Pace', note: 'Distanz rauf — VO2max-Plateau durchbrechen' },
          { name: 'Wo 14: 5km Zeittest', sets: '1×', load: 'Alles geben', note: 'Statt Intervalle — Ergebnis notieren' },
          { name: 'Wo 15–16: 3×1000m locker', sets: 'Taper', load: 'Zone-3 max', note: 'Frisch in den Lehrgang' },
        ],
      },
      {
        title: 'NACH DEM INTERVALL',
        primary: false,
        exercises: [
          { name: 'Auslaufen', sets: '10 Min', load: 'sehr locker', note: 'HF unter 130 bringen bevor du stoppst' },
          { name: 'Achilles + Wade Dehnen', sets: '10 Min', load: '—', note: 'Verletzungsprävention Samstag = Training Sonntag möglich' },
        ],
      },
    ],
  },

  BOXEN: {
    title: 'Boxen — Technik & Kondition',
    tag: 'BOXEN',
    color: '#ef4444',
    note: 'Mo + So fix. 1–3 zusätzliche Einheiten je nach Woche. Boxen zählt als Ausdauertraining — berücksichtigen.',
    blocks: [
      {
        title: 'STRUKTUR',
        primary: true,
        exercises: [
          { name: 'Seilspringen', sets: '3×3 Min', load: '30s Pause', note: 'Koordination + Cardio + Wadenbelastung ohne Laufstress' },
          { name: 'Schattenboxen', sets: '4×3 Min', load: '1 Min Pause', note: 'Technik + Footwork. Letzte Runde: maximale Intensität' },
          { name: 'Pratzen / Sandsack', sets: '5×3 Min', load: '1 Min Pause', note: 'Rotationskraft aus Hüfte. Körperdrehung = Schlagkraft, nicht Arm' },
          { name: 'Sparring', sets: '3–6×3 Min', load: '1 Min Pause', note: 'Taktisch + physisch. Zählt als HIIT — entsprechend planen' },
          { name: 'Auslaufen + Atemkontrolle', sets: '5–10 Min', load: '—', note: 'Vagusnerv-Aktivierung: 4s ein, 8s aus. Senkt Ruhepuls langfristig' },
        ],
      },
    ],
  },
}

export const TAG_COLORS = {
  GYM: { bg: '#4ade8018', text: '#4ade80' },
  AIRBIKE: { bg: '#f9731618', text: '#f97316' },
  LAUF: { bg: '#60a5fa18', text: '#60a5fa' },
  BOXEN: { bg: '#ef444418', text: '#ef4444' },
  OUTDOOR: { bg: '#a78bfa18', text: '#a78bfa' },
}
