/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import type { DefaultOptions } from "./types";

export const DEF_OPTIONS: DefaultOptions = {
  autoRender: true,
  defaultColor: '#000',
  defaultLineWidth: 4,
  transpose: 0,
  name: '',
  nameFontSize: 50,
  // nameTextColor: '',
  spacing: 18,
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
  showFingerNumber: true,
  startFrets: 0,
  // startFretsTextColor: '',
  matrix: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  mergeFingerCircle: false,
  showNotesOutsideOfChords: false,
}
