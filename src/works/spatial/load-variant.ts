import type { WorksLayout, WorksVariant } from './variant.ts'

/** Loading a choice never imports either inactive choreography module. */
export async function loadWorksVariant(id: WorksVariant): Promise<WorksLayout> {
  switch (id) {
    case 'z-depth': return (await import('./variants/z-depth.ts')).default
    case 'wave-path': return (await import('./variants/wave-path.ts')).default
    case 'stack-flow': return (await import('./variants/stack-flow.ts')).default
  }
}
