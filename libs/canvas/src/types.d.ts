/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */

/**
 * @type GuitarChordsData
 * 吉他和弦配置数据
 */
export interface GuitarChordsData {
  // 实例化时是否自动渲染，默认为true
  autoRender: boolean
  // 默认颜色（手指编号文字的颜色除外）
  defaultColor: string
  // 默认线条宽度
  defaultLineWidth: number
  // 和弦变调值，1为升半音，-1为降半音，默认0
  transpose: number
  // 和弦变调符号字体颜色，默认与和弦名称字体颜色相同
  transposeTextColor: string
  // 和弦名称
  name: string,
  // 和弦名称字体大小
  nameFontSize: number,
  // 和弦名称颜色
  nameTextColor: string
  // 和弦名称与和弦网格之间的间距
  spacing: number
  // 琴枕线条宽度（默认为lineWidth的值）
  nutLineWidth: number
  // 琴枕线条颜色
  nutColor: string
  // 品丝线条间距
  fretsSpacing: number
  // 品丝线条颜色
  fretsColor: string
  // 品丝线条宽度
  fretsLineWidth: number
  // 琴弦线条间距
  stringSpacing: number
  // 琴弦线条颜色
  stringColor: string
  // 琴弦线条宽度
  stringLineWidth: number
  // 琴弦数量，默认为6
  stringCount: number
  // 指法圆点的半径
  fingerRadius: number
  // 指法圆点颜色
  fingerCircleColor: string
  // 手指编号字体颜色，默认`#fff`
  fingerNumberTextColor: string
  // 和弦的起始品位数，默认0
  startFrets: number
  // 起始品位数字体颜色
  startFretsTextColor: string
  // 和弦指法和品位数量的矩阵（二维数组，行表示弦，列表示品位）
  matrix: number[][]
  // 设备像素比
  devicePixelRatio: number
}

/**
 * Optional
 */
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * @type GuitarChordsOptions
 * 和弦配置选项
 */
export type GuitarChordsOptions = Optional<GuitarChordsData, 'nameTextColor' | 'transposeTextColor' | 'nutLineWidth' | 'nutColor' | 'fretsColor' | 'fretsLineWidth' | 'stringColor' | 'stringLineWidth' | 'fingerCircleColor' | 'startFretsTextColor'>

