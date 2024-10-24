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
  #element: SVGSVGElement
  #nameFontSize: number;

  constructor(options: Partial<GuitarChordsOptions> = {}) {
    this.#options = {
      ...DEF_OPTIONS,
      ...options
    }

    const { nameFontSize } = this.#options
    this.#element = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this.#nameFontSize = nameFontSize
    this.#draw()
  }

  get element() {
    return this.#element
  }

  get width() {
    const { stringCount, lineSpacing, lineWidth } = this.#options
    return (lineSpacing.x * (stringCount + 1) + lineWidth * stringCount)
  }

  get height() {
    const { lineSpacing, lineWidth, matrix, spacing } = this.#options
    return (lineSpacing.y * matrix.length + lineWidth * (matrix.length + 1) + this.#nameFontSize + spacing)
  }

  /**
   * 网格尺寸
   */
  get gridRect() {
    const { lineSpacing, lineWidth, stringCount, matrix, spacing } = this.#options
    return {
      width: (lineSpacing.x * (stringCount - 1) + lineWidth * stringCount),
      height: (lineSpacing.y * matrix.length + lineWidth * (matrix.length + 1)),
      left: lineSpacing.x,
      top: (this.#nameFontSize + spacing),
      right: (this.width - lineSpacing.x),
      bottom: this.height,
    }
  }

  get data() {
    return {...this.#options}
  }

  #draw() {
    const { width, height } = this
    this.#element.setAttribute('width', `${width}`)
    this.#element.setAttribute('height', `${height}`)
    this.#element.setAttribute('viewBox', `0 0 ${width} ${height}`)

    const { startFrets, matrix } = this.#options

    this.#drawGrid()
    this.#drawFretNumbers(startFrets)
    this.#drawFingerPositions(matrix)
    this.#drawChordName()
  }

  #drawChordName() {
    const { name, color } = this.#options
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute('x', `${this.width / 2}`)
    text.setAttribute('y', `${this.#nameFontSize / 2}`)
    text.setAttribute('fill', color)
    text.setAttribute('font-size', `${this.#nameFontSize}`)
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('dominant-baseline', 'middle')
    text.textContent = name
    this.#element.appendChild(text)
  }

  #drawFingerPositions(matrix: number[][]) {
    const { lineSpacing, color, lineWidth, fingerRadius, spacing } = this.#options
    const fontSize = fingerRadius * 1.5

    for (let fret = 0; fret < matrix.length; fret++) {
      for (let string = 0; string < matrix[fret].length; string++) {
        const fingerNumber = matrix[fret][string]
        if (fingerNumber > 0) {
          const x = string * (lineSpacing.x + lineWidth) + lineWidth / 2 + lineSpacing.x
          const y = (fret + 0.5) * (lineSpacing.y + lineWidth) + lineWidth / 2 + this.#nameFontSize + spacing
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute('cx', `${x}`)
          circle.setAttribute('cy', `${y}`)
          circle.setAttribute('r', `${fingerRadius}`)
          circle.setAttribute('fill', color)
          this.#element.appendChild(circle)

          const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
          text.setAttribute('x', `${x}`)
          text.setAttribute('y', `${y + lineWidth / 2}`)
          text.setAttribute('fill', '#ffffff')
          text.setAttribute('font-size', `${fontSize}`)
          text.setAttribute('text-anchor', 'middle')
          text.setAttribute('dominant-baseline', 'middle')
          text.textContent = fingerNumber.toString()
          this.#element.appendChild(text)
        }
      }
    }
  }

  #drawFretNumbers(startFrets: number) {
    if (startFrets < 1) return
    const { color, lineSpacing } = this.#options
    const fontSize = this.#nameFontSize / 2
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute('x', '0')
    text.setAttribute('y', `${this.gridRect.top + (lineSpacing.y + fontSize) / 2}`)
    text.setAttribute('fill', color)
    text.setAttribute('font-size', `${fontSize}`)
    text.setAttribute('font-style', 'italic')
    text.textContent = startFrets.toString()
    this.#element.appendChild(text)
  }

  #drawGrid() {
    const { matrix, lineWidth, lineSpacing, color, stringCount, spacing } = this.#options
    const fretCount = matrix.length

    // 绘制竖线（代表琴弦）
    for (let i = 0; i < stringCount; i++) {
      const x = i * (lineSpacing.x + lineWidth) + lineWidth / 2 + lineSpacing.x
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      line.setAttribute('x1', `${x}`)
      line.setAttribute('y1', `${this.#nameFontSize + spacing}`)
      line.setAttribute('x2', `${x}`)
      line.setAttribute('y2', `${this.height}`)
      line.setAttribute('stroke', color)
      line.setAttribute('stroke-width', `${lineWidth}`)
      this.#element.appendChild(line)
    }

    // 绘制横线（代表品位）
    for (let i = 0; i <= fretCount; i++) {
      const y = i * (lineSpacing.y + lineWidth) + lineWidth / 2 + this.#nameFontSize + spacing
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      line.setAttribute('x1', `${lineSpacing.x}`)
      line.setAttribute('y1', `${y}`)
      line.setAttribute('x2', `${this.width - lineSpacing.x}`)
      line.setAttribute('y2', `${y}`)
      line.setAttribute('stroke', color)
      line.setAttribute('stroke-width', `${lineWidth}`)
      this.#element.appendChild(line)
    }
  }
}
