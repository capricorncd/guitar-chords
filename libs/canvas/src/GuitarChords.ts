/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import type { GuitarChordsData, GuitarChordsOptions } from "./types";
import { DEF_OPTIONS } from "./const";


/**
 * @document 吉他和弦
 */
export class GuitarChords {
  #options: GuitarChordsOptions
  #element: HTMLCanvasElement
  #context: CanvasRenderingContext2D;
  #dpr: number;

  constructor(options: Partial<GuitarChordsOptions> = {}) {
    this.#options = {
      ...DEF_OPTIONS,
      ...options
    }

    const { devicePixelRatio, autoRender } = this.#options
    this.#element = document.createElement('canvas') as HTMLCanvasElement
    this.#context = (this.#element as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    this.#dpr = devicePixelRatio
    if (autoRender) this.#draw()
  }

  get element() {
    return this.#element
  }

  get width() {
    const { stringCount, stringSpacing, stringLineWidth } = this.data
    return (stringSpacing * (stringCount + 1) + stringLineWidth * stringCount) * this.#dpr
  }

  get height() {
    const { nutLineWidth, fretsLineWidth, fretsSpacing, matrix, spacing, nameFontSize } = this.data
    return (fretsSpacing * matrix.length + nutLineWidth + fretsLineWidth * matrix.length + nameFontSize + spacing) * this.#dpr
  }

  /**
   * 网格尺寸
   */
  get gridRect() {
    const { stringLineWidth, stringSpacing, nutLineWidth, fretsSpacing, fretsLineWidth, stringCount, matrix, spacing, nameFontSize } = this.data
    return {
      width: (stringSpacing * (stringCount - 1) + stringLineWidth * stringCount) * this.#dpr,
      height: (fretsSpacing * matrix.length + nutLineWidth + fretsLineWidth * matrix.length) * this.#dpr,
      left: stringSpacing * this.#dpr,
      top: (nameFontSize + spacing) * this.#dpr,
      right: (this.width - stringSpacing) * this.#dpr,
      bottom: this.height * this.#dpr,
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
    this.#element.width = width
    this.#element.height = height
    this.#element.style.width = `${width / this.#dpr}px`
    this.#element.style.height = `${height / this.#dpr}px`
    this.#context.scale(this.#dpr, this.#dpr)

    // 清除画布
    this.#context.clearRect(0, 0, width, height)

    // 绘制网格
    this.#drawGrid(data)

    // 绘制起始品位数
    this.#drawStartFretNumbers(data)

    // 绘制指法
    this.#drawFingerPositions(data)

    // 绘制和弦名称
    this.#drawChordName(data)
    return this
  }

  /**
   * 绘制和弦名称
   */
  #drawChordName(data: GuitarChordsData) {
    const { name, nameTextColor, nameFontSize, transpose, transposeTextColor, fontFamily } = data
    const context = this.#context
    context.fillStyle = nameTextColor
    context.font = `${nameFontSize}px ${fontFamily}`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(name, this.width / (2 * this.#dpr), nameFontSize / 2)
    // 使用measureText方法获取TextMetrics对象
    const nameTextMetrics = context.measureText(name)

    // 变调符号绘制
    if (transpose !== 0) {
      const transposeFontSize = nameFontSize / 2
      context.font = `${transposeFontSize}px ${fontFamily}`
      context.fillStyle = transposeTextColor
      context.textAlign = 'right'

      // 在和弦名称的左上角绘制变调符号，如为1时#、-1时b
      context.fillText(
        transpose === 1 ? '♯' : '♭',
        this.width / (2 * this.#dpr) - nameTextMetrics.width / 2,
        transposeFontSize / 2,
      )
    }
  }

  #drawFingerPositions(data: GuitarChordsData) {
    const { stringSpacing, fretsSpacing, stringLineWidth, fretsLineWidth, fingerRadius, matrix, nutLineWidth, fingerNumberTextColor, fingerCircleColor, fontFamily, showFingerNumber } = data
    const context = this.#context
    context.fillStyle = fingerCircleColor

    const fontSize = fingerRadius * 1.5

    const { top } = this.gridRect

    let fingerNumber = 0

    for (let fret = 0; fret < matrix.length; fret++) {
      for (let string = 0; string < matrix[fret].length; string++) {
        fingerNumber = matrix[fret][string]
        if (fingerNumber > 0) {
          const x = string * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing
          const y = top / this.#dpr + nutLineWidth + (fretsSpacing + fretsLineWidth) * fret + fretsSpacing / 2
          context.fillStyle = fingerCircleColor
          context.beginPath()
          context.arc(x, y, fingerRadius, 0, Math.PI * 2)
          context.fill()

          // 绘制指法数字
          if (!showFingerNumber) continue

          context.fillStyle = fingerNumberTextColor
          context.font = `${fontSize}px ${fontFamily}`
          context.textAlign = 'center'
          context.textBaseline = 'middle'

          const fingerNo = String(fingerNumber)
          const {
            actualBoundingBoxAscent,
            actualBoundingBoxDescent,
          } = context.measureText(fingerNo)
          context.fillText(fingerNo,
              x,
              y + Math.abs(actualBoundingBoxAscent - actualBoundingBoxDescent) / 2
            )
        }
      }
    }
  }

  /**
   * 绘制起始品位数
   */
  #drawStartFretNumbers(data: GuitarChordsData) {
    const { nutLineWidth, fretsSpacing, startFrets, nameFontSize, startFretsTextColor, fontFamily } = data
    if (startFrets <= 1) return

    const { top } = this.gridRect

    const context = this.#context
    const fontSize = nameFontSize / 2
    context.fillStyle = startFretsTextColor
    context.font = `italic ${fontSize}px ${fontFamily}`
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText(startFrets.toString(),
      0,
      (top / this.#dpr + nutLineWidth + fretsSpacing / 2)
    )
  }

  /**
   * 绘制网格
   */
  #drawGrid(data: GuitarChordsData) {
    const { matrix, nutLineWidth, stringLineWidth, fretsLineWidth, stringSpacing, fretsSpacing, nutColor, stringColor, fretsColor, stringCount, spacing, nameFontSize } = data
    const context = this.#context
    /** 品位数 */
    const fretCount = matrix.length
    // 绘制竖线（代表琴弦）
    for (let i = 0; i < stringCount; i++) {
      const x = i * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing
      context.beginPath()
      context.moveTo(x, nameFontSize + spacing + Math.abs(nutLineWidth - fretsLineWidth))
      context.lineTo(x, this.height)
      context.strokeStyle = stringColor
      context.lineWidth = stringLineWidth
      context.stroke()
    }

    // 绘制横线（代表品位）
    const offsetY = (nutLineWidth - fretsLineWidth)
    for (let i = 0; i <= fretCount; i++) {
      const y = i * (fretsSpacing + fretsLineWidth) + fretsLineWidth / 2 + nameFontSize + spacing +
        (i === 0 ? 0 : offsetY)
      context.beginPath()
      context.moveTo(stringSpacing, y)
      context.lineTo(this.width / this.#dpr - stringSpacing, y)
      context.strokeStyle = i === 0 ? nutColor : fretsColor
      context.lineWidth = i === 0 ? nutLineWidth : fretsLineWidth
      context.stroke()
    }
  }
}
