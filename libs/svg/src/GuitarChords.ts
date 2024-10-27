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
      transposeTextColor = nameTextColor,
      notesOutsideOfChords = {},
      showNotesOutsideOfChords,
      crossLineWidth = Math.min(stringLineWidth, fretsLineWidth),
      crossLineColor = defaultColor,
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
      notesOutsideOfChords,
      showNotesOutsideOfChords: showNotesOutsideOfChords || Object.keys(notesOutsideOfChords).length > 0,
      crossLineWidth,
      crossLineColor,
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
    // 绘制和弦外音符号`x/o`
    if (data.showNotesOutsideOfChords) {
      this.#drawNotesOutsideOfChords(data)
    }
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
    const { stringSpacing, fingerCircleColor, stringLineWidth, fingerRadius, spacing, matrix, fretsSpacing, fretsLineWidth, nameFontSize, nutLineWidth, fingerNumberTextColor, showFingerNumber, mergeFingerCircle } = data
    const fontSize = fingerRadius * 1.5

    const fingerCircleMap = new Map<number, { x: number, y: number }[]>()

    for (let fret = 0; fret < matrix.length; fret++) {
      for (let string = 0; string < matrix[fret].length; string++) {
        const fingerNumber = matrix[fret][string]
        if (fingerNumber > 0) {
          const x = string * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing
          const y = (fret + 0.5) * (fretsSpacing + fretsLineWidth) + fretsLineWidth / 2 + nameFontSize + spacing + nutLineWidth - fretsLineWidth

          // 大横按/小横按时，合并指法圆点
          if (mergeFingerCircle) {
            if (!fingerCircleMap.has(fingerNumber)) {
              fingerCircleMap.set(fingerNumber, [])
            }
            const fingerCircleList = fingerCircleMap.get(fingerNumber)!
            fingerCircleList.push({ x, y })

            // 相同手指编号的最后一个指法圆点绘制
            if (fingerCircleList.length > 1 && string === matrix[fret].lastIndexOf(fingerNumber)) {
              const startPoint = fingerCircleList[0]
              const endPoint = { x, y }
              const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
              line.setAttribute('x1', `${startPoint.x}`)
              line.setAttribute('y1', `${startPoint.y}`)
              line.setAttribute('x2', `${endPoint.x}`)
              line.setAttribute('y2', `${endPoint.y}`)
              line.setAttribute('stroke', fingerCircleColor)
              line.setAttribute('stroke-width', `${fingerRadius * 2}`)
              line.setAttribute('stroke-linecap', 'round')
              this.#element.appendChild(line)

              // 在横按的最后一个位置绘制指法编号
              if (showFingerNumber) {
                this.#drawFingerNumber(x, y, fingerNumber, fingerNumberTextColor, fontSize)
              }
              continue
            }
          }

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute('cx', `${x}`)
          circle.setAttribute('cy', `${y}`)
          circle.setAttribute('r', `${fingerRadius}`)
          circle.setAttribute('fill', fingerCircleColor)
          this.#element.appendChild(circle)

          if (showFingerNumber && (!mergeFingerCircle || string === matrix[fret].lastIndexOf(fingerNumber))) {
            this.#drawFingerNumber(x, y, fingerNumber, fingerNumberTextColor, fontSize)
          }
        }
      }
    }
  }

  // 新增一个辅助方法来绘制指法编号
  #drawFingerNumber(x: number, y: number, fingerNumber: number, color: string, fontSize: number) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute('x', `${x}`)
    text.setAttribute('y', `${y}`)
    text.setAttribute('fill', color)
    text.setAttribute('font-size', `${fontSize}`)
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('dominant-baseline', 'central')
    text.textContent = fingerNumber.toString()
    this.#element.appendChild(text)
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

  #drawNotesOutsideOfChords(data: GuitarChordsData) {
    const { stringLineWidth, stringSpacing, stringCount, notesOutsideOfChords, fingerRadius, crossLineColor, crossLineWidth } = data

    // 绘制垂直交叉线段，长度为指法圆点直径
    const y = this.gridRect.top
    for (let i = 0; i < stringCount; i++) {
      if (!this.#isOpenString(i, data)) continue
      const x = i * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing
      if (notesOutsideOfChords[stringCount - i]) {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g")
        group.setAttribute('transform', `translate(${x - fingerRadius / 2}, ${y - fingerRadius * 1.2})`)

        // 绘制交叉线
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line1.setAttribute('x1', '0')
        line1.setAttribute('y1', '0')
        line1.setAttribute('x2', `${fingerRadius}`)
        line1.setAttribute('y2', `${fingerRadius}`)
        line1.setAttribute('stroke', crossLineColor)
        line1.setAttribute('stroke-width', `${crossLineWidth}`)
        line1.setAttribute('stroke-linecap', 'round')
        group.appendChild(line1)

        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line2.setAttribute('x1', '0')
        line2.setAttribute('y1', `${fingerRadius}`)
        line2.setAttribute('x2', `${fingerRadius}`)
        line2.setAttribute('y2', '0')
        line2.setAttribute('stroke', crossLineColor)
        line2.setAttribute('stroke-width', `${crossLineWidth}`)
        line2.setAttribute('stroke-linecap', 'round')
        group.appendChild(line2)

        this.#element.appendChild(group)
      } else {
        const radius = fingerRadius * 0.75
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute('cx', `${x}`)
        circle.setAttribute('cy', `${y - radius * 1.1}`)
        circle.setAttribute('r', `${radius}`)
        circle.setAttribute('fill', 'transparent')
        circle.setAttribute('stroke', crossLineColor)
        circle.setAttribute('stroke-width', `${crossLineWidth}`)
        this.#element.appendChild(circle)
      }
    }
  }

  /** 是否为空弦 */
  #isOpenString(index: number, data: GuitarChordsData) {
    const { matrix } = data
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][index] > 0) return false
    }
    return true
  }
}
