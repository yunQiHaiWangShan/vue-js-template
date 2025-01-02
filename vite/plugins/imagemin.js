import viteImagemin from 'vite-plugin-imagemin'

export function createImagemin() {
  return viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false
    },
    optipng: {
      optimizationLevel: 7
    },
    mozjpeg: {
      quality: 80
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
          active: false
        },
        {
          name: 'removeEmptyAttrs',
          active: true
        }
      ]
    }
  })
}
