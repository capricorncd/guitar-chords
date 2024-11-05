/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import type { DefaultOptions } from './types'

/**
 * @constant DEF_OPTIONS
 * @private
 * 和弦默认选项
 */
export const DEF_OPTIONS: DefaultOptions = {
  autoRender: true,
  defaultColor: '#000',
  defaultLineWidth: 4,
  transpose: 0,
  fontFamily: 'Arial',
  name: '',
  nameFontSize: 60,
  // nameTextColor: '',
  spacing: 20,
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
  showFingerNumber: true,
  fingerNumberTextColor: '#fff',
  startFrets: 0,
  // startFretsTextColor: '',
  matrix: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  mergeFingerCircle: false,
  showNotesOutsideOfChords: false,
  devicePixelRatio: window.devicePixelRatio || 1,
}
