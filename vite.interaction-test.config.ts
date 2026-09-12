import { defineConfig, type Plugin } from 'vite'
import interactionConfig from './vite.interaction.config.ts'

// Exercise the same Immersive renderer and Vite settings without launching the
// independent Classic application. Edition/Classic delivery has its own artifact checks.
export default defineConfig(env => {
  const config = interactionConfig(env)
  return {
    ...config,
    plugins: config.plugins?.filter(plugin => (plugin as Plugin).name !== 'entry-classic-server'),
  }
})
