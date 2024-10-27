/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import type { GuitarChordsOptions, GuitarChordsData } from "./types";
import { DEF_OPTIONS } from "./const";
import { createSvgElement } from './helpers'

/**
 * @document 吉他和弦
 */
export class GuitarChords {
  #options: GuitarChordsOptions
  #element: SVGElement

  constructor(options: Partial<GuitarChordsOptions> = {}) {
    this.#options = {
      ...DEF_OPTIONS,
      ...options
    }

    const { autoRender } = this.#options
    this.#element = createSvgElement("svg")
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
    const text = createSvgElement("text", {
      'x': this.width / 2,
      'y': nameFontSize / 2,
      'fill': nameTextColor,
      'font-size': nameFontSize,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
    })

    text.textContent = name
    this.#element.appendChild(text)

    // 在和弦名称的左上角绘制变调符号
    if (transpose) {
      const transposeFontSize = nameFontSize / 2
      const isRisingPitch = transpose === 1
      const text = createSvgElement("text", {
        'x': `${this.width / 2 - nameFontSize * name.length / 2}`,
        'y': `${transposeFontSize * 0.5}`,
        'fill': transposeTextColor,
        'font-size': `${transposeFontSize}`,
        'text-anchor': isRisingPitch ? 'middle' : 'start',
        'dominant-baseline': 'middle',
      })
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
              const line = createSvgElement("line", {
                'x1': `${startPoint.x}`,
                'y1': `${startPoint.y}`,
                'x2': `${endPoint.x}`,
                'y2': `${endPoint.y}`,
                'stroke': fingerCircleColor,
                'stroke-width': `${fingerRadius * 2}`,
                'stroke-linecap': 'round',
              })
              this.#element.appendChild(line)

              // 在横按的最后一个位置绘制指法编号
              if (showFingerNumber) {
                this.#drawFingerNumber(x, y, fingerNumber, fingerNumberTextColor, fontSize)
              }
              continue
            }
          }

          const circle = createSvgElement("circle", {
            'cx': `${x}`,
            'cy': `${y}`,
            'r': `${fingerRadius}`,
            'fill': fingerCircleColor,
          })
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
    const text = createSvgElement("text", {
      'x': `${x}`,
      'y': `${y}`,
      'fill': color,
      'font-size': `${fontSize}`,
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
    })
    text.textContent = fingerNumber.toString()
    this.#element.appendChild(text)
  }

  #drawFretNumbers(data: GuitarChordsData) {
    const { startFretsTextColor, startFrets, nameFontSize, nutLineWidth, fretsLineWidth, fretsSpacing } = data
    if (startFrets <= 1) return

    const fontSize = nameFontSize / 2
    const text = createSvgElement("text", {
      'x': '0',
      'y': `${this.gridRect.top + nutLineWidth + fretsSpacing / 2 + fretsLineWidth * 2}`,
      'fill': startFretsTextColor,
      'font-size': `${fontSize}`,
      'font-style': 'italic',
    })
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
      const line = createSvgElement("line", {
        'x1': `${x}`,
        // 从琴枕横线下方 1/2 琴枕宽度开始
        'y1': `${top + nutLineWidth}`,
        'x2': `${x}`,
        'y2': `${bottom}`,
        'stroke': stringColor,
        'stroke-width': `${stringLineWidth}`,
      })
      this.#element.appendChild(line)
    }

    // 绘制横线（代表品位）
    for (let i = 0; i <= fretCount; i++) {
      const isNut = i === 0
      const y = isNut ? top + nutLineWidth / 2 : i * (fretsSpacing + fretsLineWidth) + top + nutLineWidth - fretsLineWidth / 2
      const line = createSvgElement("line", {
        'x1': `${left}`,
        'y1': `${y}`,
        'x2': `${right}`,
        'y2': `${y}`,
        'stroke': isNut ? nutColor : fretsColor,
        'stroke-width': `${isNut ? nutLineWidth : fretsLineWidth}`,
      })
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
        const group = createSvgElement("g", {
          'transform': `translate(${x - fingerRadius / 2}, ${y - fingerRadius * 1.2})`,
        })

        // 绘制交叉线
        const line1 = createSvgElement("line", {
          'x1': '0',
          'y1': '0',
          'x2': `${fingerRadius}`,
          'y2': `${fingerRadius}`,
          'stroke': crossLineColor,
          'stroke-width': `${crossLineWidth}`,
          'stroke-linecap': 'round',
        })
        group.appendChild(line1)

        const line2 = createSvgElement("line", {
          'x1': '0',
          'y1': `${fingerRadius}`,
          'x2': `${fingerRadius}`,
          'y2': '0',
          'stroke': crossLineColor,
          'stroke-width': `${crossLineWidth}`,
          'stroke-linecap': 'round',
        })
        group.appendChild(line2)

        this.#element.appendChild(group)
      } else {
        const radius = fingerRadius * 0.75
        const circle = createSvgElement("circle", {
          'cx': `${x}`,
          'cy': `${y - radius * 1.1}`,
          'r': `${radius}`,
          'fill': 'transparent',
          'stroke': crossLineColor,
          'stroke-width': `${crossLineWidth}`,
        })
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
