/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import type { GuitarChordsOptions } from "./types";
import { DEF_OPTIONS } from "./const";


/**
 * @document 吉他和弦
 */
export class GuitarChords {
  #options: GuitarChordsOptions
  #element: HTMLCanvasElement
  #context: CanvasRenderingContext2D;
  #nameFontSize: number;

  constructor(options: Partial<GuitarChordsOptions> = {}) {
    this.#options = {
      ...DEF_OPTIONS,
      ...options
    }

    const { lineSpacing } = this.#options
    this.#element = document.createElement('canvas') as HTMLCanvasElement
    this.#context = (this.#element as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    this.#nameFontSize = lineSpacing.y
  }
  get element() {
    return this.#element
  }

  get width() {
    const { stringCount, lineSpacing, lineWidth } = this.#options
    return lineSpacing.x * (stringCount + 1) + lineWidth * stringCount
  }

  get height() {
    const { lineSpacing, lineWidth, matrix, spacing } = this.#options
    return lineSpacing.y * matrix.length + lineWidth * (matrix.length + 1) + this.#nameFontSize + spacing
  }

  /**
   * 网格尺寸
   */
  get gridSize() {
    const { lineSpacing, lineWidth, stringCount, matrix, spacing } = this.#options
    return {
      width: lineSpacing.x * (stringCount - 1) + lineWidth * stringCount,
      height: lineSpacing.y * matrix.length + lineWidth * (matrix.length + 1),
      left: lineSpacing.x,
      top: this.#nameFontSize + spacing,
      right: this.width - lineSpacing.x,
      bottom: this.height,
    }
  }

  get info() {
    return {}
  }

  draw() {
    this.#element.setAttribute('width', this.width.toString())
    this.#element.setAttribute('height', this.height.toString())
    const { startFrets, matrix } = this.#options

    // 绘制网格
    this.#drawGrid()

    // 绘制品位数
    this.#drawFretNumbers(startFrets)

    // 绘制指法
    this.#drawFingerPositions(matrix)

    // 绘制和弦名称
    this.#drawChordName()
    return this
  }

  #drawChordName() {
    const { name, color } = this.#options
    const context = this.#context
    context.fillStyle = color
    context.font = `${this.#nameFontSize}px Arial`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(name, this.width / 2, this.#nameFontSize / 2)
  }

  #drawFingerPositions(matrix: number[][]) {
    const { lineSpacing, color, lineWidth, fingerRadius, spacing } = this.#options
    const context = this.#context
    context.fillStyle = color

    const fontSize = fingerRadius * 1.5

    let fingerNumber = 0

    for (let fret = 0; fret < matrix.length; fret++) {
      for (let string = 0; string < matrix[fret].length; string++) {
        fingerNumber = matrix[fret][string]
        if (fingerNumber > 0) {
          const x = string * (lineSpacing.x + lineWidth) + lineWidth / 2 + lineSpacing.x
          const y = (fret + 0.5) * (lineSpacing.y + lineWidth) + lineWidth / 2 + this.#nameFontSize + spacing
          context.fillStyle = color
          context.beginPath()
          context.arc(x, y, fingerRadius, 0, Math.PI * 2)
          context.fill()
          // 绘制指法数字
          context.fillStyle = '#ffffff'
          context.font = `${fontSize}px Arial`
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillText(fingerNumber.toString(),
              x,
              y + lineWidth / 2
            )
        }
      }
    }
  }

  /**
   * 绘制品位数
   * @param startFrets 起始品位
   */
  #drawFretNumbers(startFrets: number) {
    if (!startFrets) return
    const { color, lineWidth, lineSpacing } = this.#options
    const context = this.#context
    const fontSize = this.#nameFontSize / 2
    context.fillStyle = color
    context.font = `italic ${fontSize}px Arial`
    context.textAlign = 'left'
    context.textBaseline = 'middle'
      context.fillText(startFrets.toString(),
        0,
        this.gridSize.top + lineSpacing.y / 2 + lineWidth * 1.5
      )
  }

  #drawGrid() {
    const { matrix, lineWidth, lineSpacing, color, stringCount, spacing } = this.#options
    const context = this.#context
    const fretCount = matrix.length
    // 绘制竖线（代表琴弦）
    for (let i = 0; i < stringCount; i++) {
      const x = i * (lineSpacing.x + lineWidth) + lineWidth / 2 + lineSpacing.x
      context.beginPath()
      context.moveTo(x, this.#nameFontSize + spacing)
      context.lineTo(x, this.height)
      context.strokeStyle = color
      context.lineWidth = lineWidth
      context.stroke()
    }

    // 绘制横线（代表品位）
    for (let i = 0; i <= fretCount; i++) {
      const y = i * (lineSpacing.y + lineWidth) + lineWidth / 2 + this.#nameFontSize + spacing
      context.beginPath()
      context.moveTo(lineSpacing.x, y)
      context.lineTo(this.width - lineSpacing.x, y)
      context.strokeStyle = color
      context.lineWidth = lineWidth
      context.stroke()
    }
  }
}
