import { useEffect, useMemo, useState } from 'react'

const keyFigures = [
  { value: '72%', label: 'des sondes algorithmiques favorisent les memes formats courts' },
  { value: '4h12', label: 'de consultation moyenne par semaine pour les 18-34 ans' },
  { value: '1 sur 3', label: 'lecteurs declarent ne plus distinguer pub et information' },
]

const fieldNotes = [
  {
    title: 'Une timeline qui accelere',
    text: 'Entre 7h et 9h, les pics de publication doublent. Les redactions diffusent plus vite, mais les correctifs arrivent plus tard.',
  },
  {
    title: 'Des titres sous contraintes',
    text: 'Les formulations les plus nuancees perdent en portee. Les formulations affirmatives captent la priorite de distribution.',
  },
  {
    title: 'Le role des lecteurs',
    text: 'Les commentaires poussent les formats explicatifs en fin de journee. La conversation devient un levier editorial.',
  },
]

const timeline = [
  {
    when: 'Matin',
    title: 'Signal faible',
    text: 'Les sujets complexes restent peu visibles durant les premieres heures de consultation mobile.',
  },
  {
    when: 'Midi',
    title: 'Point de bascule',
    text: 'Les formats comparatifs et infographies remontent dans les recommandations.',
  },
  {
    when: 'Soir',
    title: 'Retour au contexte',
    text: 'Les enquetes longues enregistrent leur meilleure retention lorsque publiees apres 20h.',
  },
]

function App() {
  const [topic, setTopic] = useState('Institut Montaigne')

  useEffect(() => {
    const loadTopic = async () => {
      try {
        const response = await fetch('api/topic')
        if (!response.ok) {
          throw new Error('HTTP error')
        }
        const data = await response.json()
        if (data?.topic) {
          setTopic(data.topic)
        }
      } catch (_error) {
        setTopic('Institut Montaigne')
      }
    }

    loadTopic()
  }, [])

  const publicationDate = useMemo(() => {
    return new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }, [])

  return (
    <div className="relative overflow-hidden bg-paper text-ink">
      <div className="grain-overlay pointer-events-none absolute inset-0" />

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pt-12">
        <header className="fade-up border-b border-ink/20 pb-10">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-rust">Edition speciale</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] sm:text-5xl lg:text-7xl">
            Qui decide vraiment de ce que nous lisons?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
            Une enquete en une page sur la fabrique de l'attention: mecanique des plateformes,
            arbitrages editoriaux et angle citoyen.
          </p>

          <div className="mt-7 flex flex-col gap-3 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Projet: <span className="font-semibold text-ink">{topic}</span>
            </p>
            <p>{publicationDate}</p>
          </div>
        </header>

        <section className="fade-up mt-10 grid gap-4 sm:grid-cols-3">
          {keyFigures.map((item) => (
            <article key={item.label} className="rounded-sm border border-ink/15 bg-white/70 p-5 backdrop-blur-sm">
              <p className="font-display text-4xl leading-none text-blueprint">{item.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{item.label}</p>
            </article>
          ))}
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <article className="fade-up space-y-8">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-rust">Constat</p>
              <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
                La visibilite de l'info est devenue une negociation permanente
              </h2>
            </div>

            <p className="max-w-3xl text-lg leading-relaxed text-ink/85">
              Derriere chaque article, deux temporalites se confrontent: celle de la verification et
              celle de la distribution. Les redactions gagnent en vitesse de publication, mais perdent
              souvent en maitrise du contexte lorsque la recommandation privilegie l'impact immediat.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {fieldNotes.map((note) => (
                <article
                  key={note.title}
                  className="rounded-sm border border-ink/15 bg-sand/80 p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <h3 className="font-sans text-sm uppercase tracking-[0.12em] text-rust">{note.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">{note.text}</p>
                </article>
              ))}
            </div>
          </article>

          <aside className="fade-up space-y-6 border-l border-ink/20 pl-0 lg:pl-6">
            <h2 className="font-display text-2xl sm:text-3xl">Chronologie d'une journee d'attention</h2>

            {timeline.map((step) => (
              <article key={step.when} className="relative rounded-sm border border-ink/15 bg-white/60 p-5">
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-rust">{step.when}</p>
                <h3 className="mt-2 font-display text-xl text-blueprint">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{step.text}</p>
              </article>
            ))}
          </aside>
        </section>

        <section className="fade-up mt-16 rounded-sm border border-ink/20 bg-blueprint px-6 py-8 text-paper sm:px-10">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-sand/90">Methodologie</p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed sm:text-base">
            Analyse comparative de formats editoriaux publies sur une semaine, croisee avec des
            entretiens redactionnels et des mesures de retention anonymisees.
          </p>
        </section>

        <footer className="fade-up mt-14 border-t border-ink/20 pt-7">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-ink/70">Partenaires Hyblab</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            <img className="h-10 w-full object-contain" src="ecoles/logo_edna.png" alt="Ecole de Design Nantes Atlantique" />
            <img className="h-10 w-full object-contain" src="ecoles/logo_polytech.png" alt="Polytech Nantes" />
            <img className="h-10 w-full object-contain" src="institutionnels/logo_nantesmetropole.png" alt="Nantes Metropole" />
            <img className="h-10 w-full object-contain" src="logo_hyblab.png" alt="Hyblab" />
            <img className="h-10 w-full object-contain" src="logo_oml.png" alt="Ouest Medialab" />
            <img className="h-10 w-full object-contain" src="logo_opensource.png" alt="Open Source" />
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
