import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/map/UrbAglo_AQdata.csv',
          dest: 'assets/map'
        },
        {
          src: 'src/assets/map/AFRICAPOLIS2020.geojson',
          dest: 'assets/map'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['mapbox-gl', 'd3'],
  },
  build: {
    rollupOptions: {
      external: ['mapbox-gl', 'd3'],
      output: {
        globals: {
          'mapbox-gl': 'mapboxgl',
          'd3': 'd3'
        },
      },
    },
  },
  assetsInclude: ['**/*.csv', '**/*.geojson'],
  base: './', 
});
