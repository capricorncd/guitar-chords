/**
 * 创建SVGElement
 *
 * @param type SvgElement元素类型，比如text/circle/line/svg...
 * @param attrs 元素属性
 * @returns SVGElement
 */
export const createSvgElement = (type: string, attrs: Record<string, string | number> = {}): SVGElement => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", type)
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(key, typeof val !== 'string' ? String(val) : val);
  }
  return el
}
