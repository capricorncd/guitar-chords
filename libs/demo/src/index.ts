import { GuitarChords as CanvasGuitarChords } from '@guitar-chords/canvas'
import { GuitarChords as SvgGuitarChords } from '@guitar-chords/svg'

const chordsList = [
  {
    name: 'Cmaj7',
    nutLineWidth: 10,
    nameTextColor: '#f30',
    nutColor: '#f30',
    fingerCircleColor: '#f30',
    stringColor: '#078',
    fretsColor: '#f88',
    matrix: [
      [0, 0, 0, 0, 1, 0],
      [0, 0, 2, 0, 0, 0],
      [3, 4, 0, 0, 0, 0],
    ]
  },
  {
    name: 'Dm',
    nutLineWidth: 10,
    fingerNumberTextColor: '#f30',
    matrix: [
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 0, 0, 0, 3, 0],
    ]
  },
  {
    name: 'Em',
    fretsLineWidth: 8,
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]
  },
  {
    name: 'F',
    stringLineWidth: 12,
    fingerCircleColor: '#f30',
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
    ],
    notesOutsideOfChords: {
      6: true,
    }
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
    startFretsTextColor: '#f30',
    nutLineWidth: 10,
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 2, 3, 4, 0],
    ]
  },
  {
    name: 'F',
    transpose: 1,
    startFrets: 2,
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 3, 4, 0, 0, 0],
    ]
  },
  {
    name: 'Am',
    transpose: 1,
    transposeTextColor: '#f30',
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 2, 0],
      [0, 0, 3, 4, 0, 0],
    ]
  },
  {
    name: 'C3',
    startFrets: 2,
    transpose: -1,
    startFretsTextColor: '#f30',
    showFingerNumber: false,
    mergeFingerCircle: true,
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 2, 3, 4, 0],
    ]
  },
  {
    name: 'C3',
    startFrets: 3,
    startFretsTextColor: '#f30',
    nutLineWidth: 10,
    mergeFingerCircle: true,
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 0],
    ]
  },
  {
    name: 'Fmaj7',
    startFrets: 5,
    startFretsTextColor: '#f30',
    nutLineWidth: 10,
    mergeFingerCircle: true,
    matrix: [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 2, 0, 0, 0],
      [0, 3, 0, 0, 0, 0],
    ]
  },
]

  const app = document.getElementById('app') as HTMLDivElement

  const canvasTitle = document.createElement('h1')
  canvasTitle.textContent = 'Canvas'
  app.append(canvasTitle)

  app.append(...chordsList.map(v => new CanvasGuitarChords(v).element))

  const testCanvas = new CanvasGuitarChords({
    ...chordsList[0],
    autoRender: false,
  })
  console.log(testCanvas.data)

  app.append(testCanvas.element)

  testCanvas.render({
    name: 'C',
    transpose: 1,
    matrix: [
      [1, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 2, 0],
      [0, 0, 3, 0, 0, 0],
      [0, 4, 0, 0, 0, 0],
    ]
  })


const svgTitle = document.createElement('h1')
svgTitle.textContent = 'SVG'
app.append(svgTitle)

app.append(...chordsList.map(v => new SvgGuitarChords(v).element))

const testSvg = new CanvasGuitarChords({
  ...chordsList[0],
  autoRender: false,
})
console.log(testSvg.data)

app.append(testSvg.element)

testSvg.render({
  name: 'C',
  transpose: 1,
  matrix: [
    [1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 2, 0],
    [0, 0, 3, 0, 0, 0],
    [0, 4, 0, 0, 0, 0],
  ]
})
