# @guitar-chords/canvas

Use Canvas to generate guitar chords.

## Install

```bash
npm install @guitar-chords/canvas
```

## Usage

```ts
import { GuitarChords } from '@guitar-chords/canvas'

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

## Options

See [types.d.ts](./src/types.d.ts).

## API

### `render(options?: Partial<GuitarChordsOptions>)`

Re-render the guitar chord.
