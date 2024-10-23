import { GuitarChords } from '@guitar-chords/canvas'

  const app = document.getElementById('app') as HTMLDivElement
  app.append(
    new GuitarChords({
    name: 'C',
    matrix: [
      [0, 0, 0, 0, 1, 0],
      [0, 0, 2, 0, 0, 0],
      [3, 4, 0, 0, 0, 0],
    ]
  }).draw().element,
  new GuitarChords({
    name: 'Dm',
    matrix: [
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 0, 0, 0, 3, 0],
    ]
  }).draw().element,
  new GuitarChords({
    name: 'Em',
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]
  }).draw().element,
  new GuitarChords({
    name: 'F',
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 2, 0, 0],
      [0, 3, 4, 0, 0, 0],
    ]
  }).draw().element,
  new GuitarChords({
    name: 'G',
    matrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 4],
    ]
  }).draw().element,
  new GuitarChords({
    name: 'Am',
    matrix: [
      [0, 0, 0, 0, 1, 0],
      [0, 0, 2, 3, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]
  }).draw().element,
  new GuitarChords({
    name: 'G7',
    matrix: [
      [0, 0, 0, 0, 0, 1],
      [0, 2, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0],
    ]
  }).draw().element,
  new GuitarChords({
    name: 'C3',
    startFrets: 3,
    matrix: [
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 2, 3, 4, 0],
    ]
  }).draw().element,
)
