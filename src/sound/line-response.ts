// The existing Hero line holders survive into SOUND. This owner adds only their subpixel texture.
// Live samples control density/friction, never a large waveform or an elapsed-time simulation.
export function createLineResponse(holders: HTMLElement[], mobile: () => boolean) {
  const ns = 'http://www.w3.org/2000/svg'
  const paths = holders.map(holder => {
    const svg = document.createElementNS(ns, 'svg'), path = document.createElementNS(ns, 'path')
    svg.classList.add('sound-thread'); svg.setAttribute('viewBox', '0 0 1000 6'); svg.setAttribute('preserveAspectRatio', 'none')
    svg.setAttribute('aria-hidden', 'true'); path.setAttribute('d','M0 3H1000'); svg.append(path); holder.append(svg)
    return path
  })
  let energy = 0
  const points = paths.map(() => new Float32Array(129))
  return {
    paint(samples: Float32Array<ArrayBuffer> | null, dt: number, reduced: boolean) {
      let sum = 0
      if (samples) for (const s of samples) sum += s*s
      const target = samples ? Math.min(1,Math.sqrt(sum/samples.length)*5) : 0
      energy += (target-energy)*(1-Math.exp(-dt/(target>energy ? 70 : 58)))
      if (energy < .002 || reduced) energy = 0
      const count = mobile() ? 64 : 128, limit = mobile() ? .34 : .62
      paths.forEach((path,line) => {
        const ys = points[line], commands = ['M0 3']
        // Resizing to the smaller mobile sample budget must not leave old desktop points settling forever.
        ys.fill(0,count)
        for(let i=1;i<count;i++) {
          const edge = Math.min(1,i/8,(count-i)/8)
          const index = Math.floor(i*(3+energy*10)+line*113) % (samples?.length ?? 1)
          const friction = samples ? Math.max(-1,Math.min(1,samples[index]*4)) : ys[i]/limit
          const y = energy ? friction*energy*limit*edge : 0
          ys[i] += (y-ys[i])*(1-Math.exp(-dt/32))
          if (!energy && Math.abs(ys[i]) < .002) ys[i]=0
          commands.push(`L${(i/count*1000).toFixed(2)} ${(3+ys[i]).toFixed(3)}`)
        }
        commands.push('L1000 3'); path.setAttribute('d', energy || ys.some(v=>v!==0) ? commands.join(' ') : 'M0 3H1000')
      })
      return { energy, unsettled: energy > 0 || points.some(p=>p.some(v=>Math.abs(v)>.002)) }
    },
    reset() { energy=0; points.forEach(p=>p.fill(0)); paths.forEach(p=>p.setAttribute('d','M0 3H1000')) },
    destroy() { paths.forEach(p=>p.parentElement?.remove()) },
  }
}
