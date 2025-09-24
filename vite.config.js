import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { startTransition } from 'react'
import { Icon } from 'lucide-react'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  base: '/',
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      
      manifest: {
        name: 'Dog App',
        short_name: 'DogApp',
        description: 'An app to save your animal details',
        start_url: '/Pet-Care-App',
        scope: '/Pet-Care-App/',
        display: 'standalone',
        icons: [
  {
    "src": "icons/manifest-icon-192.maskable.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "any"
  },
  {
    "src": "icons/manifest-icon-192.maskable.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "maskable"
  },
  {
    "src": "icons/manifest-icon-512.maskable.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any"
  },
  {
    "src": "icons/manifest-icon-512.maskable.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "maskable"
  }
]
}
        
    })
  ],
  
})
