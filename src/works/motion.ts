export function convergenceProgress(scrollY: number, start: number, end: number): number {
  const linear = Math.max(0, Math.min(1, (scrollY - start) / Math.max(1, end - start)))
  return linear * linear * (3 - 2 * linear)
}

export type LayoutBox = { left: number; top: number; width: number; height: number }

export function worldTransform(opening: LayoutBox, destination: LayoutBox, progress: number): string {
  const remaining = 1 - Math.max(0, Math.min(1, progress))
  const scale = 1 + (opening.width / Math.max(1, destination.width) - 1) * remaining
  return `translate3d(${(opening.left - destination.left) * remaining}px, ${(opening.top - destination.top) * remaining}px, 0) scale(${scale})`
}

export function reflowTransform(previous: LayoutBox, next: LayoutBox): string {
  return `translate(${previous.left - next.left}px, ${previous.top - next.top}px) scale(${previous.width / Math.max(1, next.width)}, ${previous.height / Math.max(1, next.height)})`
}
