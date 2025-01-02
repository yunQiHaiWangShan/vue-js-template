import compression from 'vite-plugin-compression'

export function createCompression() {
  return compression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz'
  })
}
