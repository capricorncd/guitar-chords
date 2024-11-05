/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import { DEF_OPTIONS } from './const'
import type {
  GuitarChordsData,
  GuitarChordsOptions,
  DefaultOptions,
} from './types'

/**
 * @document GuitarChords
 *
 * 用于创建一个Canvas吉他和弦实例。
 *
 * `options`和弦实例化选项，见[GuitarChordsOptions](#GuitarChordsOptions)
 *
 * ```js
 * const guitarChords = new GuitarChords({
 *   name: 'C',
 *   matrix: [
 *     [0, 0, 0, 0, 1, 0],
 *     [0, 0, 2, 0, 0, 0],
 *     [3, 4, 0, 0, 0, 0],
 *   ],
 * })
 * // get canvas element and append to body
 * document.querySelect('body').append(guitarChords.element)
 * // get data
 * console.log(guitarChords.data)
 * ```
 */
export class GuitarChords {
  #options: DefaultOptions
  #element: HTMLCanvasElement
  #context: CanvasRenderingContext2D
  #dpr: number
  #version: string = '__VERSION__'

  constructor(options: GuitarChordsOptions) {
    this.#options = {
      ...DEF_OPTIONS,
      ...options,
    }

    const { devicePixelRatio, autoRender } = this.#options
    this.#element = document.createElement('canvas') as HTMLCanvasElement
    this.#context = (this.#element as HTMLCanvasElement).getContext(
      '2d'
    ) as CanvasRenderingContext2D
    this.#dpr = devicePixelRatio
    if (autoRender) this.#draw()
  }

  /**
   * @property element
   * 获取Canvas元素
   * @returns `HTMLCanvasElement`
   */
  get element() {
    return this.#element
  }

  /**
   * @property width
   * 获取和弦的宽度
   * @returns `number`
   */
  get width() {
    const { stringCount, stringSpacing, stringLineWidth } = this.data
    return (
      (stringSpacing * (stringCount + 1) + stringLineWidth * stringCount) *
      this.#dpr
    )
  }

  /**
   * @property height
   * 获取和弦的高度
   * @returns `number`
   */
  get height() {
    const {
      nutLineWidth,
      fretsLineWidth,
      fretsSpacing,
      matrix,
      spacing,
      nameFontSize,
    } = this.data
    return (
      (fretsSpacing * matrix.length +
        nutLineWidth +
        fretsLineWidth * matrix.length +
        nameFontSize +
        spacing) *
      this.#dpr
    )
  }

  /**
   * @property gridRect
   * 获取网格的尺寸及位置信息。
   * @returns `GridRect` 见[GridRect](#GridRect)
   */
  get gridRect() {
    const {
      stringLineWidth,
      stringSpacing,
      nutLineWidth,
      fretsSpacing,
      fretsLineWidth,
      stringCount,
      matrix,
      spacing,
      nameFontSize,
    } = this.data
    return {
      width:
        (stringSpacing * (stringCount - 1) + stringLineWidth * stringCount) *
        this.#dpr,
      height:
        (fretsSpacing * matrix.length +
          nutLineWidth +
          fretsLineWidth * matrix.length) *
        this.#dpr,
      left: stringSpacing * this.#dpr,
      top: (nameFontSize + spacing) * this.#dpr,
      right: (this.width - stringSpacing) * this.#dpr,
      bottom: this.height * this.#dpr,
    }
  }

  /**
   * @property version
   * 获取当前版本
   * @returns `string` 版本号，比如`1.0.0`
   */
  get version() {
    return this.#version
  }

  /**
   * @property data
   * 获取和弦的数据
   * @returns `GuitarChordsData` 见[GuitarChordsData](#GuitarChordsData)
   */
  get data(): GuitarChordsData {
    const { defaultColor, defaultLineWidth, fingerRadius } = this.#options
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
      showNotesOutsideOfChords,
      notesOutsideOfChords = {},
      crossLineWidth = Math.min(stringLineWidth, fretsLineWidth),
      crossLineColor = defaultColor,
      crossRadius = fingerRadius * 0.75,
      nameLetterSpacing = 0,
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
      showNotesOutsideOfChords:
        showNotesOutsideOfChords ||
        Object.keys(notesOutsideOfChords).length > 0,
      crossLineWidth,
      crossLineColor,
      crossRadius,
      nameLetterSpacing,
    }
  }

  /**
   * @method render(options)
   * 重新渲染和弦图
   * @param options? `Partial<GuitarChordsOptions>` 和弦配置选项
   * @returns `GuitarChords`
   */
  render(options?: Partial<GuitarChordsOptions>) {
    if (options) {
      this.#options = {
        ...this.#options,
        ...options,
      }
    }
    this.#draw()
    return this
  }

  /**
   * 绘制
   */
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

    // 绘制和弦外音符号`x/o`
    if (data.showNotesOutsideOfChords) {
      this.#drawNotesOutsideOfChords(data)
    }
    return this
  }

  /**
   * 绘制和弦名称
   */
  #drawChordName(data: GuitarChordsData) {
    const {
      name,
      nameTextColor,
      nameFontSize,
      transpose,
      transposeTextColor,
      fontFamily,
      nameLetterSpacing,
    } = data
    const { width } = this.gridRect
    const gridWidth = width / this.#dpr

    const context = this.#context
    context.fillStyle = nameTextColor
    context.font = `${nameFontSize}px ${fontFamily}`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.letterSpacing = `${nameLetterSpacing}px`
    context.fillText(
      name,
      this.width / (2 * this.#dpr),
      nameFontSize / 2,
      gridWidth
    )
    // 使用measureText方法获取TextMetrics对象
    const nameTextMetrics = context.measureText(name)
    // reset
    context.letterSpacing = `0px`

    // 变调符号绘制
    if (transpose !== 0) {
      const transposeFontSize = nameFontSize / 2
      context.font = `${transposeFontSize}px ${fontFamily}`
      context.fillStyle = transposeTextColor
      context.textAlign = 'right'

      // 在和弦名称的左上角绘制变调符号，如为1时#、-1时b
      context.fillText(
        transpose === 1 ? '♯' : '♭',
        this.width / (2 * this.#dpr) -
          Math.min(nameTextMetrics.width / 2, gridWidth / 2),
        transposeFontSize / 2
      )
    }
  }

  /**
   * 绘制指法位置
   */
  #drawFingerPositions(data: GuitarChordsData) {
    const {
      stringSpacing,
      fretsSpacing,
      stringLineWidth,
      fretsLineWidth,
      fingerRadius,
      matrix,
      nutLineWidth,
      fingerNumberTextColor,
      fingerCircleColor,
      fontFamily,
      showFingerNumber,
      mergeFingerCircle,
    } = data
    const context = this.#context
    context.fillStyle = fingerCircleColor

    const fontSize = fingerRadius * 1.5

    const { top } = this.gridRect

    const fingerCircleMap = new Map<number, { x: number; y: number }[]>()

    let fingerNumber = 0

    for (let fret = 0; fret < matrix.length; fret++) {
      for (let string = 0; string < matrix[fret].length; string++) {
        fingerNumber = matrix[fret][string]
        if (fingerNumber > 0) {
          const x =
            string * (stringSpacing + stringLineWidth) +
            stringLineWidth / 2 +
            stringSpacing
          const y =
            top / this.#dpr +
            nutLineWidth +
            (fretsSpacing + fretsLineWidth) * fret +
            fretsSpacing / 2
          // 绘制指法圆点
          context.fillStyle = fingerCircleColor
          context.beginPath()
          context.arc(x, y, fingerRadius, 0, Math.PI * 2)
          context.fill()

          // 大横按/小横按时，合并指法圆点
          if (mergeFingerCircle) {
            if (!fingerCircleMap.has(fingerNumber)) {
              fingerCircleMap.set(fingerNumber, [])
            }
            const fingerCircleList = fingerCircleMap.get(fingerNumber)!
            fingerCircleList.push({ x, y })
            // 相同手指编号的最后一个指法圆点绘制
            if (
              fingerCircleList.length > 1 &&
              string === matrix[fret].lastIndexOf(fingerNumber)
            ) {
              context.beginPath()
              context.moveTo(fingerCircleList[0].x, fingerCircleList[0].y)
              context.lineTo(x, y)
              context.strokeStyle = fingerCircleColor
              context.lineWidth = fingerRadius * 2
              context.stroke()
            }
          }

          // showFingerNumber为false时，不绘制指法数字
          // 或 大横按/小横按，且非最后一个指法圆点时，不绘制指法数字
          if (
            !showFingerNumber ||
            (mergeFingerCircle &&
              string !== matrix[fret].lastIndexOf(fingerNumber))
          )
            continue

          // 绘制指法数字
          context.fillStyle = fingerNumberTextColor
          context.font = `${fontSize}px ${fontFamily}`
          context.textAlign = 'center'
          context.textBaseline = 'middle'

          const fingerNo = String(fingerNumber)
          // FIX: 使用actualBoundingBoxAscent和actualBoundingBoxDescent来计算指法数字的垂直居中位置偏移值
          const { actualBoundingBoxAscent, actualBoundingBoxDescent } =
            context.measureText(fingerNo)
          context.fillText(
            fingerNo,
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
    const {
      nutLineWidth,
      fretsSpacing,
      startFrets,
      nameFontSize,
      startFretsTextColor,
      fontFamily,
    } = data
    if (startFrets <= 1) return

    const { top } = this.gridRect

    const context = this.#context
    const fontSize = nameFontSize / 2
    context.fillStyle = startFretsTextColor
    context.font = `italic ${fontSize}px ${fontFamily}`
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText(
      startFrets.toString(),
      0,
      top / this.#dpr + nutLineWidth + fretsSpacing / 2
    )
  }

  /**
   * 绘制网格
   */
  #drawGrid(data: GuitarChordsData) {
    const {
      matrix,
      nutLineWidth,
      stringLineWidth,
      fretsLineWidth,
      stringSpacing,
      fretsSpacing,
      nutColor,
      stringColor,
      fretsColor,
      stringCount,
      spacing,
      nameFontSize,
    } = data
    const context = this.#context

    const topSpacing = nameFontSize + spacing

    /** 品位数 */
    const fretCount = matrix.length
    // 绘制竖线（代表琴弦）
    for (let i = 0; i < stringCount; i++) {
      const x =
        i * (stringSpacing + stringLineWidth) +
        stringLineWidth / 2 +
        stringSpacing
      context.beginPath()
      context.moveTo(x, topSpacing + Math.abs(nutLineWidth - fretsLineWidth))
      context.lineTo(x, this.height)
      context.strokeStyle = stringColor
      context.lineWidth = stringLineWidth
      context.stroke()
    }

    // 绘制横线（代表品位）
    for (let i = 0; i <= fretCount; i++) {
      // 绘制横行时以线条的中心为基准点，所以要减去线条宽度的一半
      const y =
        i === 0
          ? topSpacing + nutLineWidth / 2
          : topSpacing +
            nutLineWidth +
            i * (fretsSpacing + fretsLineWidth) -
            fretsLineWidth / 2
      context.beginPath()
      context.moveTo(stringSpacing, y)
      context.lineTo(this.width / this.#dpr - stringSpacing, y)
      context.strokeStyle = i === 0 ? nutColor : fretsColor
      context.lineWidth = i === 0 ? nutLineWidth : fretsLineWidth
      context.stroke()
    }
  }

  /**
   * 绘制x/o，空弦音是否为和弦音
   */
  #drawNotesOutsideOfChords(data: GuitarChordsData) {
    const {
      stringLineWidth,
      stringSpacing,
      stringCount,
      notesOutsideOfChords,
      devicePixelRatio,
      crossLineColor,
      crossLineWidth,
      crossRadius,
    } = data

    const context = this.#context

    // 绘制垂直交叉线段，长度为指法圆点直径
    const y = this.gridRect.top / devicePixelRatio
    for (let i = 0; i < stringCount; i++) {
      if (!this.#isOpenString(i, data)) continue
      const x =
        i * (stringSpacing + stringLineWidth) +
        stringSpacing +
        stringLineWidth / 2
      if (notesOutsideOfChords[stringCount - i]) {
        const crossCanvas = this.#drawCrossCanvas(data)
        const crossWidth = crossCanvas.width / devicePixelRatio
        const crossHeight = crossCanvas.height / devicePixelRatio
        // 把crossCanvas缩小一半
        context.drawImage(
          crossCanvas,
          x - crossWidth / 2,
          y - crossHeight,
          crossWidth,
          crossHeight
        )
      } else {
        // 绘制空弦和弦音圆圈
        context.fillStyle = crossLineColor
        context.beginPath()
        context.arc(
          x,
          y - crossRadius - crossLineWidth / 2,
          crossRadius,
          0,
          Math.PI * 2
        )
        context.lineWidth = crossLineWidth
        context.strokeStyle = crossLineColor
        context.stroke()
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

  /**
   * 绘制和弦外音`x`
   */
  #drawCrossCanvas(data: GuitarChordsData) {
    const { crossLineColor, crossLineWidth, crossRadius, devicePixelRatio } =
      data
    const width = crossRadius * 2 * devicePixelRatio
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = canvas.height = width

    context.beginPath()
    const startPoint1 = this.#getCrossPoint(
      crossRadius,
      -Math.PI / 4,
      devicePixelRatio
    )
    const endPoint1 = this.#getCrossPoint(
      crossRadius,
      (3 * Math.PI) / 4,
      devicePixelRatio
    )
    context.moveTo(startPoint1.x, startPoint1.y)
    context.lineTo(endPoint1.x, endPoint1.y)

    const startPoint2 = this.#getCrossPoint(
      crossRadius,
      Math.PI / 4,
      devicePixelRatio
    )
    const endPoint2 = this.#getCrossPoint(
      crossRadius,
      (-3 * Math.PI) / 4,
      devicePixelRatio
    )
    context.moveTo(startPoint2.x, startPoint2.y)
    context.lineTo(endPoint2.x, endPoint2.y)

    context.strokeStyle = crossLineColor
    context.lineJoin = 'round'
    context.lineWidth = crossLineWidth * devicePixelRatio
    context.stroke()

    // 在4个端点绘制小圆，使直线看上去有圆角
    const points = [startPoint1, endPoint1, startPoint2, endPoint2]
    points.forEach(({ x, y }) => {
      context.fillStyle = crossLineColor
      context.beginPath()
      context.arc(x, y, (crossLineWidth * devicePixelRatio) / 2, 0, Math.PI * 2)
      context.fill()
    })

    return canvas
  }

  /**
   * 从以直径为边长的矩形中，根据角度获取内切圆边与圆心为起点的直线的交叉点的坐标
   * 并将交叉点坐标转换为以矩形左上角为原点的坐标
   * @param radius 圆的半径
   * @param angle 角度（弧度）
   * @returns 交点坐标
   */
  #getCrossPoint(
    radius: number,
    angle: number,
    devicePixelRatio: number
  ): { x: number; y: number } {
    // 计算圆上的点
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)

    // 将坐标转换为以矩形左上角为原点的坐标系
    return {
      x: (x + radius) * devicePixelRatio,
      y: (y + radius) * devicePixelRatio,
    }
  }
}
