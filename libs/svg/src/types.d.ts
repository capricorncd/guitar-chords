/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */

/**
 * @type GuitarChordsData
 * 吉他和弦配置数据。
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
  name: string
  // 和弦名称字体大小
  nameFontSize: number
  // 和弦名称颜色
  nameTextColor: string
  // 和弦名称字母之间的间距，默认0
  nameLetterSpacing: number
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
  // 琴弦数量，为`matrix[i].length`的值或`6`
  stringCount: number
  // 指法圆点的半径
  fingerRadius: number
  // 指法圆点颜色
  fingerCircleColor: string
  // 是否显示手指编号，默认true
  showFingerNumber: boolean
  // 手指编号字体颜色，默认`#fff`
  fingerNumberTextColor: string
  // 和弦的起始品位数，默认0
  startFrets: number
  // 起始品位数字体颜色
  startFretsTextColor: string
  // 和弦指法和品位数量的矩阵（二维数组，行表示弦，列表示品位）
  matrix: number[][]
  // 大横按/小横按时，是否合并指法圆点，默认false
  mergeFingerCircle: boolean
  // 用于是否在空弦列头部显示小叉`x/o`，默认为false
  showNotesOutsideOfChords: boolean
  // 空弦音是否显示为和弦之外的音选项`{和弦序号（吉他的话为1-6弦）: true | false}`
  notesOutsideOfChords: Record<number, boolean>
  // 和弦外音`x/o`的线条粗细，默认为琴弦线条宽度。其长度为指法圆点直径
  crossLineWidth: number
  // 和弦外音`x/o`的线条颜色
  crossLineColor: string
  // 和弦外音`x/o`的半径，默认为`fingerRadius * 0.75`
  crossRadius: number
}

/**
 * PickOptional
 */
type PickOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * OmitOptional
 */
type OmitOptional<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>

/**
 * @type GuitarChordsOptions
 * 和弦实力化时必须的配置选项，见[GuitarChordsData](#GuitarChordsData)
 */
export type GuitarChordsOptions = OmitOptional<
  Omit<GuitarChordsData, 'stringCount'>,
  'name' | 'matrix'
>

/**
 * DefaultOptions
 */
export type DefaultOptions = PickOptional<
  Omit<GuitarChordsData, 'stringCount'>,
  | 'nameTextColor'
  | 'transposeTextColor'
  | 'nutLineWidth'
  | 'nutColor'
  | 'fretsColor'
  | 'fretsLineWidth'
  | 'stringColor'
  | 'stringLineWidth'
  | 'fingerCircleColor'
  | 'startFretsTextColor'
  | 'notesOutsideOfChords'
  | 'crossLineWidth'
  | 'crossLineColor'
  | 'nameLetterSpacing'
  | 'crossRadius'
>

/**
 * @type GridRect
 * 网格尺寸及位置信息。
 */
export interface GridRect {
  // 网格宽度
  width: number
  // 网格高度
  height: number
  // 网格顶部在整个和弦图中的位置
  top: number
  // 网格右侧在整个和弦图中的位置
  right: number
  // 网格底部在整个和弦图中的位置
  bottom: number
  // 网格左侧在整个和弦图中的位置
  left: number
}
