/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */

/** 吉他和弦配置 */
export interface GuitarChordsOptions {
  name: string,
  /** 和弦名称字体大小 */
  nameFontSize: number,
  /** 和弦名称与和弦网格的间距 */
  spacing: number
  /** 线条宽度 */
  lineWidth: number
  /** 线条间距 */
  lineSpacing: {
    x: number
    y: number
  }
  /** 和弦线条/指法颜色 */
  color: string
  /** 琴弦数量 */
  stringCount: number
  /** 指法圆的半径 */
  fingerRadius: number
  /** 和弦的起始品位 */
  startFrets: number
  /** 和弦指法位置数据 */
  matrix: number[][]
  /** 设备像素比 */
  devicePixelRatio: number
}

