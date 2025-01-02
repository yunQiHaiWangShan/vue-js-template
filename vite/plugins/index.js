import vue from '@vitejs/plugin-vue'
import { createAutoImport } from './auto-import'
import { createCompression } from './compression'
import { createImagemin } from './imagemin'
import { createVisualizer } from './visualizer'

export function createVitePlugins(viteEnv, isBuild) {
  const vitePlugins = [
    vue()
  ]

  // 自动导入
  vitePlugins.push(...createAutoImport())

  // 生产环境插件
  if (isBuild) {
    // Gzip 压缩
    vitePlugins.push(createCompression())
    // 图片压缩
    vitePlugins.push(createImagemin())
    // 构建分析
    vitePlugins.push(createVisualizer())
  }

  return vitePlugins
}
