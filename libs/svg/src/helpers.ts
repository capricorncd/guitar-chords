export type SvgElementAttrs = Record<string, string | number>

/**
 * 创建SVGElement
 *
 * @param type SvgElement元素类型，比如text/circle/line/svg...
 * @param attrs 元素属性
 * @param content 文本内容
 * @returns SVGElement
 */
export const createSvgElement = <T extends SVGElement>(type: string, attrs: SvgElementAttrs = {}, content?: string | number): T => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", type) as T
  for (const [key, val] of Object.entries(attrs)) {
    if (!val && val !== 0) continue
    el.setAttribute(key, String(val))
  }
  if (content) el.textContent = String(content)
  return el
}
