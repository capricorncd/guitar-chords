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
      transposeTextColor = nameTextColor,
      notesOutsideOfChords = {},
      crossLineWidth = stringLineWidth,
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
      crossLineWidth,
      crossLineColor,
      notesOutsideOfChords,
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

    // 绘制和弦外音符号`x`
    if (Object.keys(data.notesOutsideOfChords).length > 0) {
      this.#drawNotesOutsideOfChords(data)
    }
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
    const { stringSpacing, fretsSpacing, stringLineWidth, fretsLineWidth, fingerRadius, matrix, nutLineWidth, fingerNumberTextColor, fingerCircleColor, fontFamily, showFingerNumber, mergeFingerCircle } = data
    const context = this.#context
    context.fillStyle = fingerCircleColor

    const fontSize = fingerRadius * 1.5

    const { top } = this.gridRect

    const fingerCircleMap = new Map<number, { x: number, y: number }[]>()

    let fingerNumber = 0

    for (let fret = 0; fret < matrix.length; fret++) {
      for (let string = 0; string < matrix[fret].length; string++) {
        fingerNumber = matrix[fret][string]
        if (fingerNumber > 0) {
          const x = string * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing
          const y = top / this.#dpr + nutLineWidth + (fretsSpacing + fretsLineWidth) * fret + fretsSpacing / 2
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
            if (fingerCircleList.length > 1 && string === matrix[fret].lastIndexOf(fingerNumber)) {
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
          if (!showFingerNumber || (mergeFingerCircle && string !== matrix[fret].lastIndexOf(fingerNumber))) continue

          // 绘制指法数字
          context.fillStyle = fingerNumberTextColor
          context.font = `${fontSize}px ${fontFamily}`
          context.textAlign = 'center'
          context.textBaseline = 'middle'

          const fingerNo = String(fingerNumber)
          // FIX: 使用actualBoundingBoxAscent和actualBoundingBoxDescent来计算指法数字的垂直居中位置偏移值
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

    const topSpacing = nameFontSize + spacing

    /** 品位数 */
    const fretCount = matrix.length
    // 绘制竖线（代表琴弦）
    for (let i = 0; i < stringCount; i++) {
      const x = i * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing
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
      const y = i === 0 ? topSpacing + nutLineWidth / 2 : topSpacing + nutLineWidth + i * (fretsSpacing + fretsLineWidth) - fretsLineWidth / 2
      context.beginPath()
      context.moveTo(stringSpacing, y)
      context.lineTo(this.width / this.#dpr - stringSpacing, y)
      context.strokeStyle = i === 0 ? nutColor : fretsColor
      context.lineWidth = i === 0 ? nutLineWidth : fretsLineWidth
      context.stroke()
    }
  }

  #drawNotesOutsideOfChords(data: GuitarChordsData) {
    const { stringLineWidth, stringSpacing, stringCount, notesOutsideOfChords } = data

    const context = this.#context
    // 绘制垂直交叉线段，长度为指法圆点直径
    const y = this.gridRect.top / this.#dpr
    for (let i = 0; i < stringCount; i++) {
      if (!notesOutsideOfChords[stringCount - i]) continue
      const crossCanvas = this.#drawCrossCanvas(data)
      const x = i * (stringSpacing + stringLineWidth) + stringLineWidth / 2 + stringSpacing - crossCanvas.width / 4
      // 把crossCanvas缩小一半
      context.drawImage(crossCanvas, x, y - crossCanvas.height / 2, crossCanvas.width / 2, crossCanvas.height / 2)
    }
  }

  #drawCrossCanvas(data: GuitarChordsData) {
    const { fingerRadius, crossLineColor, crossLineWidth, devicePixelRatio } = data
    const diameter = fingerRadius * 2;
    const width = diameter * devicePixelRatio;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = canvas.height = width;

    context.beginPath();
    const startPoint1 = this.#getCrossPoint(diameter, -Math.PI / 4);
    const endPoint1 = this.#getCrossPoint(diameter, 3 * Math.PI / 4);
    context.moveTo(startPoint1.x * devicePixelRatio, startPoint1.y * devicePixelRatio);
    context.lineTo(endPoint1.x * devicePixelRatio, endPoint1.y * devicePixelRatio);

    const startPoint2 = this.#getCrossPoint(diameter, Math.PI / 4);
    const endPoint2 = this.#getCrossPoint(diameter, -3 * Math.PI / 4);
    context.moveTo(startPoint2.x * devicePixelRatio, startPoint2.y * devicePixelRatio);
    context.lineTo(endPoint2.x * devicePixelRatio, endPoint2.y * devicePixelRatio);

    context.strokeStyle = crossLineColor;
    context.lineJoin = 'round';
    context.lineWidth = crossLineWidth * devicePixelRatio;
    context.stroke();

    return canvas;
  }

  /**
   * 从以直径为边长的矩形中，根据角度获取内切圆边与圆心为起点的直线的交叉点的坐标
   * 并将交叉点坐标转换为以矩形左上角为原点的坐标
   * @param diameter 圆的直径
   * @param angle 角度（弧度）
   * @returns 交点坐标
   */
  #getCrossPoint(diameter: number, angle: number): { x: number, y: number } {
    const radius = diameter / 2
    // 计算圆上的点
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // 将坐标转换为以矩形左上角为原点的坐标系
    return {
      x: x + radius,
      y: y + radius
    };
  }
}
