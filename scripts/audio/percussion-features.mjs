import FFT from 'fft.js'
/** Conservative mixed-source candidates, not instrument identification or separated Janggu stems. */
export function percussionFeatures(samples,sampleRate) {
  const n=2048,hop=Math.round(sampleRate/100),fft=new FFT(n),spectrum=fft.createComplexArray(),input=new Float64Array(n)
  const frames=[],prior=new Float64Array(n/2)
  for(let center=0;center<samples.length;center+=hop){
    for(let i=0;i<n;i++)input[i]=(samples[center+i-n/2]??0)*(.5-.5*Math.cos(2*Math.PI*i/(n-1)))
    fft.realTransform(spectrum,input)
    let low=0,mid=0,high=0,lowFlux=0,body=0,bodyFlux=0,highFlux=0,logHigh=0,highCount=0
    for(let k=1;k<n/2;k++){
      const hz=k*sampleRate/n,mag=Math.hypot(spectrum[2*k],spectrum[2*k+1])/n,flux=Math.max(0,mag-prior[k]);prior[k]=mag
      if(hz>=60&&hz<240){low+=mag;lowFlux+=flux}
      else if(hz>=240&&hz<2000){mid+=mag;if(hz<700){body+=mag;bodyFlux+=flux}}
      else if(hz>=2000&&hz<7000){high+=mag;highFlux+=flux;logHigh+=Math.log(mag+1e-10);highCount++}
    }
    const flatness=Math.exp(logHigh/Math.max(1,highCount))/(high/Math.max(1,highCount)+1e-10)
    frames.push({time:center/sampleRate,low,mid,high,lowFlux,body,bodyFlux,highFlux,flatness})
  }
  const percentile=key=>frames.map(f=>f[key]).sort((a,b)=>a-b)[Math.floor(frames.length*.95)]||1
  const lowScale=Math.max(.002,percentile('lowFlux')),bodyScale=Math.max(.002,percentile('bodyFlux')),highScale=Math.max(.004,percentile('highFlux'))
  const scores=frames.map((f,i)=>{
    // Low/body attack can lead the noisy strike by a few FFT hops. High-only bow noise cannot qualify.
    const onset=frames.slice(Math.max(0,i-2),i+1),bass=Math.max(...onset.map(v=>v.lowFlux))/lowScale
    const body=Math.max(...onset.map(v=>v.bodyFlux))/bodyScale,attack=f.highFlux/highScale
    const lowRatio=f.low/(f.low+f.mid+f.high+1e-9),bodyRatio=(f.low+f.body)/(f.low+f.mid+f.high+1e-9)
    if(f.high+f.low<.008||attack<.45||f.flatness<.16||bass<.18||body<.2||bodyRatio<.07||lowRatio<.008)return 0
    return Math.min(1,(Math.min(bass,1.5)*.25+Math.min(body,1.5)*.2+Math.min(attack,1.8)*.55)*Math.min(1,f.flatness/.3))
  })
  const hits=[]
  for(let i=2;i<scores.length-2;i++){
    const local=frames.slice(Math.max(0,i-10),i).map(f=>f.high+f.low),mean=local.reduce((a,b)=>a+b,0)/Math.max(1,local.length)
    if(scores[i]<.55||scores[i]<Math.max(...scores.slice(i-2,i),...scores.slice(i+1,i+3))||frames[i].high+frames[i].low<mean*1.10)continue
    const hit={time:Number(frames[i].time.toFixed(4)),score:Number(scores[i].toFixed(4)),flatness:Number(frames[i].flatness.toFixed(4))}
    const previous=hits.at(-1)
    if(previous&&hit.time-previous.time<.18){if(hit.score>previous.score)hits[hits.length-1]=hit}else hits.push(hit)
  }
  return {hits,frames}
}
