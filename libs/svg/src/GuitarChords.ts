/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import type { GuitarChordsOptions, GuitarChordsData } from "./types";
import { DEF_OPTIONS } from "./const";

/**
 * @document 吉他和弦
 */
export class GuitarChords {
  #options: GuitarChordsOptions
  #element: SVGSVGElement

  constructor(options: Partial<GuitarChordsOptions> = {}) {
    this.#options = {
      ...DEF_OPTIONS,
      ...options
    }

    const { autoRender } = this.#options
    this.#element = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    if (autoRender) this.#draw()
  }

  get element() {
    return this.#element
  }

  get width() {
    const { stringCount, stringSpacing, stringLineWidth } = this.data
    return (stringSpacing * (stringCount + 1) + stringLineWidth * stringCount)
  }

  get height() {
    const { nutLineWidth, fretsSpacing, fretsLineWidth, matrix, spacing, nameFontSize } = this.data
    return nutLineWidth + (fretsSpacing + fretsLineWidth) * matrix.length + nameFontSize + spacing
  }

  /**
   * 网格尺寸
   */
  get gridRect() {
    const { nutLineWidth, stringSpacing, stringLineWidth, stringCount, matrix, spacing, fretsSpacing, fretsLineWidth, nameFontSize } = this.data
    return {
      width: (stringSpacing * (stringCount - 1) + stringLineWidth * stringCount),
      height: nutLineWidth + (fretsSpacing + fretsLineWidth) * matrix.length,
      left: stringSpacing,
      top: (nameFontSize + spacing),
      right: (this.width - stringSpacing),
      bottom: this.height,
    }
  }

  get data(): GuitarChordsData {
    const { defaultColor, defaultLineWidth} = this.#options
    const {
      nameTextColor = defaultColor,
      nutLineWidth = defaultLineWidth,
      nutColor = defaultColor,
      fretsColor = defaultColor,
      fretsLineWidth = defaultLineWidth,
      stringColor = defaultColor,
      stringLineWidth = defaultLineWidth,
      fingerCircleColor = defaultColor,
      startFretsTextColor = defaultColor,
      transposeTextColor = nameTextColor
    } = this.#options
    return {
      ...this.#options,
      nameTextColor,
      nutLineWidth,
      nutColor,
      fretsColor,
      fretsLineWidth,
      stringColor,
      stringLineWidth,
      fingerCircleColor,
      startFretsTextColor,
      transposeTextColor,
    }
  }

  /**
   * 重新绘制
   * @param options 和弦配置选项
   * @returns
   */
  render(options?: Partial<GuitarChordsOptions>) {
    if (options) {
      this.#options = {
        ...this.#options,
        ...options
      }
    }
    this.#draw()
    return this
  }

  #draw() {
    const data = this.data
    const { width, height } = this
    this.#element.setAttribute('width', `${width}`)
    this.#element.setAttribute('height', `${height}`)
    this.#element.setAttribute('viewBox', `0 0 ${width} ${height}`)

    this.#drawGrid(data)
    this.#drawFretNumbers(data)
    this.#drawFingerPositions(data)
    this.#drawChordName(data)
  }

  #drawChordName(data: GuitarChordsData) {
    const { name, nameTextColor, nameFontSize, transposeTextColor, transpose } = data
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute('x', `${this.width / 2}`)
    text.setAttribute('y', `${nameFontSize / 2}`)
    text.setAttribute('fill', nameTextColor)
    text.setAttribute('font-size', `${nameFontSize}`)
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('dominant-baseline', 'middle')
    text.textContent = name
    this.#element.appendChild(text)

    // 在和弦名称的左上角绘制变调符号
    if (transpose) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
      const transposeFontSize = nameFontSize / 2
      const isRisingPitch = transpose === 1
      text.setAttribute('x', `${this.width / 2 - nameFontSize * name.length / 2}`)
      text.setAttribute('y', `${transposeFontSize * 0.5}`)
      text.setAttribute('fill', transposeTextColor)
      text.setAttribute('font-size', `${transposeFontSize}`)
      text.setAttribute('text-anchor', isRisingPitch ? 'middle' : 'start')
      text.setAttribute('dominant-baseline', 'middle')
      text.textContent = isRisingPitch ? '♯' : '♭'
      this.#element.appendChild(text)
    }
  }

  #drawFingerPositions(data: GuitarChordsData) {
    const { stringSpacing, fingerCircleColor, stringLineWidth, fingerRadius, spacing, matrix, fretsSpacing, fretsLineWidth, nameFontSize, nutLineWidth, fingerNumberTextColor } = data
    const fontSize = fingerRadius * 1.5

    for (let fret = 0; fret < matrix.length; fret++) {
      for (let string = 0; string < matrix[fret].length; string++) {
        const fingerNumber = matrix[fret][string]
        if (fingerNumber > 0) {
          const x = string * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing
          const y = (fret + 0.5) * (fretsSpacing + fretsLineWidth) + fretsLineWidth / 2 + nameFontSize + spacing + nutLineWidth - fretsLineWidth
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute('cx', `${x}`)
          circle.setAttribute('cy', `${y}`)
          circle.setAttribute('r', `${fingerRadius}`)
          circle.setAttribute('fill', fingerCircleColor)
          this.#element.appendChild(circle)

          const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
          text.setAttribute('x', `${x}`)
          text.setAttribute('y', `${y + (nutLineWidth > fretsLineWidth ? fretsLineWidth : nutLineWidth) / 2}`)
          text.setAttribute('fill', fingerNumberTextColor)
          text.setAttribute('font-size', `${fontSize}`)
          text.setAttribute('text-anchor', 'middle')
          text.setAttribute('dominant-baseline', 'middle')
          text.textContent = fingerNumber.toString()
          this.#element.appendChild(text)
        }
      }
    }
  }

  #drawFretNumbers(data: GuitarChordsData) {
    const { startFretsTextColor, startFrets, nameFontSize, nutLineWidth, fretsLineWidth, fretsSpacing } = data
    if (startFrets <= 1) return

    const fontSize = nameFontSize / 2
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute('x', '0')
    text.setAttribute('y', `${this.gridRect.top + nutLineWidth + fretsSpacing / 2 + fretsLineWidth * 2}`)
    text.setAttribute('fill', startFretsTextColor)
    text.setAttribute('font-size', `${fontSize}`)
    text.setAttribute('font-style', 'italic')
    text.textContent = startFrets.toString()
    this.#element.appendChild(text)
  }

  #drawGrid(data: GuitarChordsData) {
    const { matrix, stringLineWidth, stringSpacing, stringColor, stringCount, fretsSpacing, fretsLineWidth, fretsColor, nutLineWidth, nutColor } = data
    const fretCount = matrix.length

    const { top, bottom, right, left } = this.gridRect

    // 绘制竖线（代表琴弦）
    for (let i = 0; i < stringCount; i++) {
      const x = i * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      line.setAttribute('x1', `${x}`)
      line.setAttribute('y1', `${top + nutLineWidth}`) // 从琴枕横线下方 1/2 琴枕宽度开始
      line.setAttribute('x2', `${x}`)
      line.setAttribute('y2', `${bottom}`)
      line.setAttribute('stroke', stringColor)
      line.setAttribute('stroke-width', `${stringLineWidth}`)
      this.#element.appendChild(line)
    }

    // 绘制横线（代表品位）
    for (let i = 0; i <= fretCount; i++) {
      const isNut = i === 0
      const y = isNut ? top + nutLineWidth / 2 : i * (fretsSpacing + fretsLineWidth) + top + nutLineWidth - fretsLineWidth / 2
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      line.setAttribute('x1', `${left}`)
      line.setAttribute('y1', `${y}`)
      line.setAttribute('x2', `${right}`)
      line.setAttribute('y2', `${y}`)
      line.setAttribute('stroke', isNut ? nutColor : fretsColor)
      line.setAttribute('stroke-width', `${isNut ? nutLineWidth : fretsLineWidth}`)
      this.#element.appendChild(line)
    }
  }
}
