# @guitar-chords/svg

Use SVG to generate guitar chords or edit it.

## Install

```bash
npm install @guitar-chords/svg
```

## Usage

```ts
import { GuitarChords } from '@guitar-chords/svg'

const guitarChords = new GuitarChords({
  name: 'C',
  matrix: [
    [0, 0, 0, 0, 1, 0],
    [0, 0, 2, 0, 0, 0],
    [3, 4, 0, 0, 0, 0],
  ]
})

document.body.appendChild(guitarChords.element)
```
