import {
  GuitarChords as CanvasGuitarChords,
  type GuitarChordsOptions,
} from '@guitar-chords/canvas'
import { GuitarChords as SvgGuitarChords } from '@guitar-chords/svg'

const chordsList: GuitarChordsOptions[] = [
  {
    name: 'C',
    matrix: [
      [0, 0, 0, 0, 1, 0],
      [0, 0, 2, 0, 0, 0],
      [3, 4, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Dm',
    nutLineWidth: 10,
    fingerNumberTextColor: '#f30',
    matrix: [
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 0, 0, 0, 3, 0],
    ],
  },
  {
    name: 'Em',
    fretsLineWidth: 8,
    nameTextColor: '#080',
    nutColor: '#f30',
    fingerCircleColor: '#f30',
    stringColor: '#078',
    fretsColor: '#f88',
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: 'F',
    stringLineWidth: 12,
    fingerCircleColor: '#f30',
    matrix: [
      [1, 0, 0, 0, 1, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 3, 4, 0, 0, 0],
    ],
  },
  {
    name: 'G',
    nutLineWidth: 10,
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 4],
    ],
    showNotesOutsideOfChords: true,
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
    },
    crossLineWidth: 2,
  },
  {
    name: 'G7',
    matrix: [
      [0, 0, 0, 0, 0, 1],
      [0, 2, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0],
    ],
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
    ],
  },
  {
    name: 'F',
    transpose: 1,
    startFrets: 2,
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 3, 4, 0, 0, 0],
    ],
  },
  {
    name: 'Am',
    transpose: 1,
    transposeTextColor: '#f30',
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 2, 0],
      [0, 0, 3, 4, 0, 0],
    ],
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
    ],
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
    ],
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
    ],
  },
  {
    name: 'Cm7-5',
    startFrets: 3,
    transpose: 1,
    nutLineWidth: 10,
    mergeFingerCircle: true,
    nameLetterSpacing: -5,
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 2, 0, 0],
      [0, 0, 3, 0, 4, 0],
    ],
    notesOutsideOfChords: {
      6: true,
    },
  },
]

const cSharpData: GuitarChordsOptions = {
  name: 'C',
  transpose: 1,
  matrix: [
    [0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 2, 0],
    [0, 0, 3, 0, 0, 0],
    [0, 4, 0, 0, 0, 0],
  ],
  notesOutsideOfChords: {
    6: true,
  },
  mergeFingerCircle: true,
}

const app = document.getElementById('app') as HTMLDivElement

const testCanvas = new CanvasGuitarChords({
  ...chordsList[0],
  autoRender: false,
})
console.log(testCanvas.data)

const canvasTitle = document.createElement('h1')
canvasTitle.textContent = '@guitar-chords/canvas ' + testCanvas.version
app.append(canvasTitle)

app.append(...chordsList.map((v) => new CanvasGuitarChords(v).element))

testCanvas.render()
app.append(testCanvas.render(cSharpData).element)

const ukuleleBaseOptions: Omit<GuitarChordsOptions, 'name' | 'matrix'> = {
  nutLineWidth: 10,
  showFingerNumber: false,
  fretsSpacing: 36,
  spacing: 0,
  nameFontSize: 50,
}

const ukulele: GuitarChordsOptions[] = [
  {
    name: 'C',
    matrix: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
    ],
  },
  {
    name: 'Dm',
    matrix: [
      [0, 0, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    name: 'Em',
    matrix: [
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
    ],
  },
  {
    name: 'F',
    matrix: [
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    name: 'G',
    matrix: [
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    name: 'Am',
    matrix: [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    name: 'G7',
    matrix: [
      [0, 0, 1, 0],
      [0, 2, 0, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
]

app.append(
  ...ukulele.map(
    (v) => new CanvasGuitarChords({ ...ukuleleBaseOptions, ...v }).element
  )
)

// SVG
const testSvg = new SvgGuitarChords({
  ...chordsList[0],
  autoRender: false,
})
console.log(testSvg.data)

const svgTitle = document.createElement('h1')
svgTitle.textContent = '@guitar-chords/svg ' + testSvg.version
app.append(svgTitle)

app.append(...chordsList.map((v) => new SvgGuitarChords(v).element))

testSvg.render()
app.append(testSvg.render({ ...cSharpData, name: 'Test' }).element)

app.append(
  ...ukulele.map(
    (v) => new SvgGuitarChords({ ...ukuleleBaseOptions, ...v }).element
  )
)
