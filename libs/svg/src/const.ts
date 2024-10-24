/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import type { GuitarChordsOptions } from "./types";

export const DEF_OPTIONS: GuitarChordsOptions = {
  name: '',
  nameFontSize: 50,
  spacing: 10,
  lineWidth: 4,
  lineSpacing: {
    x: 30,
    y: 50,
  },
  color: '#000',
  stringCount: 6,
  fingerRadius: 15,
  startFrets: 0,
  matrix: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
}
