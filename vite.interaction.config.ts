import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { entryClassicServer } from './scripts/entry-classic-server.ts'
export default defineConfig(({command})=>{
  if(command!=='serve')throw new Error('P2K Interaction Lab is development-only')
  return {root:fileURLToPath(new URL('./labs/interaction',import.meta.url)),base:'/immersive/',publicDir:false,
    plugins:[entryClassicServer(), {name:'local-edition-entry',configureServer(server){
      server.middlewares.use((request,_response,next)=>{
        // Vite still owns HTML/module transforms. Only local HTML entry requests are remounted.
        if(request.headers.accept?.includes('text/html') && !request.url?.startsWith('/immersive/')) request.url='/immersive/'
        next()
      })
    }}],
    server:{host:'127.0.0.1',port:4180,strictPort:true,fs:{allow:[fileURLToPath(new URL('.',import.meta.url))]},headers:{'X-Robots-Tag':'noindex, nofollow'},
      proxy:{'^/__album_audio__/(jiyounghee|yeongsan|pyeongjo|hanbeomsu)/[a-z0-9_-]+\\.mp3$':{
        target:'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev',changeOrigin:true,
        rewrite:path=>path.replace('/__album_audio__',''),
      }}}}
})
