import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
export default defineConfig(({command})=>{
  if(command!=='serve')throw new Error('P2K Interaction Lab is development-only')
  return {root:fileURLToPath(new URL('./labs/interaction',import.meta.url)),publicDir:false,
    server:{host:'127.0.0.1',port:4180,strictPort:true,fs:{allow:[fileURLToPath(new URL('.',import.meta.url))]},headers:{'X-Robots-Tag':'noindex, nofollow'}}}
})
