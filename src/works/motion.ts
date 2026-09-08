export function portalProgress(scrollY: number, start: number, viewportHeight: number): number {
  const linear = Math.max(0, Math.min(1, (scrollY - start) / Math.max(1, viewportHeight * .64)))
  return linear * linear * (3 - 2 * linear)
}

export type LayoutBox = { left: number; top: number; width: number; height: number }

export function reflowTransform(previous: LayoutBox, next: LayoutBox): string {
  return `translate(${previous.left - next.left}px, ${previous.top - next.top}px) scale(${previous.width / Math.max(1, next.width)}, ${previous.height / Math.max(1, next.height)})`
}
