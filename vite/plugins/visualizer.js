import { visualizer } from 'rollup-plugin-visualizer'

export function createVisualizer() {
  return visualizer({
    filename: 'stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true
  })
}
