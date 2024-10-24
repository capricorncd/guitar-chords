import { GuitarChords as CanvasGuitarChords } from '@guitar-chords/canvas'
import { GuitarChords as SvgGuitarChords } from '@guitar-chords/svg'

const chordsList = [
  {
    name: 'C',
    matrix: [
      [0, 0, 0, 0, 1, 0],
      [0, 0, 2, 0, 0, 0],
      [3, 4, 0, 0, 0, 0],
    ]
  },
  {
    name: 'Dm',
    matrix: [
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 0, 0, 0, 3, 0],
    ]
  },
  {
    name: 'Em',
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]
  },
  {
    name: 'F',
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 3, 4, 0, 0, 0],
    ]
  },
  {
    name: 'G',
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 4],
    ]
  },
  {
    name: 'Am',
    matrix: [
      [0, 0, 0, 0, 1, 0],
      [0, 0, 2, 3, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]
  },
  {
    name: 'G7',
    matrix: [
      [0, 0, 0, 0, 0, 1],
      [0, 2, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0],
    ]
  },
  {
    name: 'C3',
    startFrets: 3,
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 2, 3, 4, 0],
    ]
  }
]

  const app = document.getElementById('app') as HTMLDivElement
  app.append(...chordsList.map(v => new CanvasGuitarChords(v).element))

const h1 = document.createElement('h1')
h1.textContent = 'SVG'
app.append(h1)

app.append(...chordsList.map(v => new SvgGuitarChords(v).element))
