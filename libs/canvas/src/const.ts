/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import type { GuitarChordsOptions } from "./types";

export const DEF_OPTIONS: GuitarChordsOptions = {
  autoRender: true,
  defaultColor: '#000',
  defaultLineWidth: 4,
  transpose: 0,
  name: '',
  nameFontSize: 50,
  // nameTextColor: '',
  spacing: 10,
  // nutLineWidth: LINE_WIDTH,
  // nutColor: '',
  fretsSpacing: 50,
  // fretsColor: '',
  // fretsLineWidth: LINE_WIDTH,
  stringSpacing: 30,
  // stringColor: '',
  // stringLineWidth: LINE_WIDTH,
  stringCount: 6,
  fingerRadius: 15,
  // fingerCircleColor: '',
  fingerNumberTextColor: '#fff',
  startFrets: 0,
  // startFretsTextColor: '',
  matrix: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  devicePixelRatio: window.devicePixelRatio || 1
}
