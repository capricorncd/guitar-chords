# @guitar-chords/canvas

<p>
  <a href="https://npmcharts.com/compare/@guitar-chords/canvas?minimal=true"><img src="https://img.shields.io/npm/dm/@guitar-chords/canvas.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@guitar-chords/canvas"><img src="https://img.shields.io/npm/v/@guitar-chords/canvas.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@guitar-chords/canvas"><img src="https://img.shields.io/npm/l/@guitar-chords/canvas.svg?sanitize=true" alt="License"></a>
  <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" />
</p>

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

## Contributors

`version<=0.0.6` 的代码70%由`Cursor`(The AI Code Editor)完成
