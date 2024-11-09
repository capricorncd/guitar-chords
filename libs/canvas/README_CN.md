# GuitarChords

用于创建一个Canvas吉他和弦实例。查看生成的[和弦图 →](https://capricorncd.github.io/guitar-chords/playground/)。

`options`和弦实例化选项，见[GuitarChordsOptions](#GuitarChordsOptions)

```js
import { GuitarChords } from '@guitar-chords/canvas'

const guitarChords = new GuitarChords({
  name: 'C',
  matrix: [
    [0, 0, 0, 0, 1, 0],
    [0, 0, 2, 0, 0, 0],
    [3, 4, 0, 0, 0, 0],
  ],
})
// get canvas element and append to body
document.querySelect('body').append(guitarChords.element)
// get data
console.log(guitarChords.data)
```

## Property

### data

获取和弦的数据

- @returns `GuitarChordsData` 见[GuitarChordsData](#GuitarChordsData)

### element

获取Canvas元素

- @returns `HTMLCanvasElement`

### gridRect

获取网格的尺寸及位置信息。

- @returns `GridRect` 见[GridRect](#gridrect-1)

### height

获取和弦的高度

- @returns `number`

### version

获取当前版本

- @returns `string` 版本号，比如`1.0.0`

### width

获取和弦的宽度

- @returns `number`

## Methods

### render(options)

重新渲染和弦图

Param|Types|Required|Description
:--|:--|:--|:--
options|`Partial<GuitarChordsOptions>`|no|和弦实例化选项，见[GuitarChordsOptions](#GuitarChordsOptions)

- @returns `GuitarChords`

## Types

### GridRect

网格尺寸及位置信息。

Prop|Types|Required|Description
:--|:--|:--|:--
width|`number`|yes|网格宽度
height|`number`|yes|网格高度
top|`number`|yes|网格顶部在整个和弦图中的位置
right|`number`|yes|网格右侧在整个和弦图中的位置
bottom|`number`|yes|网格底部在整个和弦图中的位置
left|`number`|yes|网格左侧在整个和弦图中的位置

<details>
<summary>Source Code</summary>

```ts
interface GridRect {
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
```

</details>

### GuitarChordsData

吉他和弦所有选项（配置数据）

Prop|Types|Required|Description
:--|:--|:--|:--
autoRender|`boolean`|yes|实例化时是否自动渲染，默认为true
defaultColor|`string`|yes|默认颜色（手指编号文字的颜色除外）
defaultLineWidth|`number`|yes|默认线条宽度
transpose|`number`|yes|和弦变调值，1为升半音，-1为降半音，默认0
transposeTextColor|`string`|yes|和弦变调符号字体颜色，默认与和弦名称字体颜色相同
name|`string`|yes|和弦名称
nameFontSize|`number`|yes|和弦名称字体大小
nameTextColor|`string`|yes|和弦名称颜色
nameLetterSpacing|`number`|yes|和弦名称字母之间的间距，默认0
spacing|`number`|yes|和弦名称与和弦网格之间的间距
nutLineWidth|`number`|yes|琴枕线条宽度（默认为lineWidth的值）
nutColor|`string`|yes|琴枕线条颜色
fretsSpacing|`number`|yes|品丝线条间距
fretsColor|`string`|yes|品丝线条颜色
fretsLineWidth|`number`|yes|品丝线条宽度
stringSpacing|`number`|yes|琴弦线条间距
stringColor|`string`|yes|琴弦线条颜色
stringLineWidth|`number`|yes|琴弦线条宽度
stringCount|`number`|yes|琴弦数量，为`matrix[i].length`的值或`6`
fingerRadius|`number`|yes|指法圆点的半径
fingerCircleColor|`string`|yes|指法圆点颜色
showFingerNumber|`boolean`|yes|是否显示手指编号，默认true
fingerNumberTextColor|`string`|yes|手指编号字体颜色，默认`#fff`
startFrets|`number`|yes|和弦的起始品位数，默认0
startFretsTextColor|`string`|yes|起始品位数字体颜色
matrix|`number[][]`|yes|和弦指法和品位数量的矩阵（二维数组，行表示弦，列表示品位）
mergeFingerCircle|`boolean`|yes|大横按/小横按时，是否合并指法圆点，默认false
showNotesOutsideOfChords|`boolean`|yes|用于是否在空弦列头部显示小叉`x/o`，默认为false
notesOutsideOfChords|`Record<number, boolean>`|yes|空弦音是否显示为和弦之外的音选项`{和弦序号（吉他的话为1-6弦）: true \| false}`
crossLineWidth|`number`|yes|和弦外音`x/o`的线条粗细，默认为琴弦线条宽度。其长度为指法圆点直径
crossLineColor|`string`|yes|和弦外音`x/o`的线条颜色
crossRadius|`number`|yes|和弦外音`x/o`的半径，默认为`fingerRadius * 0.75`
fontFamily|`string`|yes|字体，默认`Arial`
devicePixelRatio|`number`|yes|设备像素比

<details>
<summary>Source Code</summary>

```ts
interface GuitarChordsData {
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
  // 字体，默认`Arial`
  fontFamily: string
  // 设备像素比
  devicePixelRatio: number
}
```

</details>

### GuitarChordsOptions

和弦实力化时必须的配置选项，见[GuitarChordsData](#GuitarChordsData)

<details>
<summary>Source Code</summary>

```ts
type GuitarChordsOptions = OmitOptional<
  Omit<GuitarChordsData, 'stringCount'>,
  'name' | 'matrix'
>
```

</details>

## Constants

### DEF_OPTIONS

和弦默认选项

```ts
const DEF_OPTIONS: DefaultOptions = {
  autoRender: true,
  defaultColor: '#000',
  defaultLineWidth: 4,
  transpose: 0,
  fontFamily: 'Arial',
  name: '',
  nameFontSize: 60,
  // nameTextColor: '',
  spacing: 20,
  // nutLineWidth: LINE_WIDTH,
  // nutColor: '',
  fretsSpacing: 50,
  // fretsColor: '',
  // fretsLineWidth: LINE_WIDTH,
  stringSpacing: 30,
  // stringColor: '',
  // stringLineWidth: LINE_WIDTH,
  fingerRadius: 15,
  // fingerCircleColor: '',
  showFingerNumber: true,
  fingerNumberTextColor: '#fff',
  startFrets: 0,
  // startFretsTextColor: '',
  matrix: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  mergeFingerCircle: false,
  showNotesOutsideOfChords: false,
  devicePixelRatio: window.devicePixelRatio || 1,
}
```
