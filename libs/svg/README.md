# @guitar-chords/svg

<p>
  <a href="https://npmcharts.com/compare/@guitar-chords/svg?minimal=true"><img src="https://img.shields.io/npm/dm/@guitar-chords/svg.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@guitar-chords/svg"><img src="https://img.shields.io/npm/v/@guitar-chords/svg.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@guitar-chords/svg"><img src="https://img.shields.io/npm/l/@guitar-chords/svg.svg?sanitize=true" alt="License"></a>
  <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" />
</p>

Use SVG to generate guitar chords.

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

## Options

See [types.d.ts](./src/types.d.ts).

## API

### `render(options?: Partial<GuitarChordsOptions>)`

Re-render the guitar chord.

## Contributors

`version<=0.0.4` 的代码90%由`Cursor`(The AI Code Editor)完成