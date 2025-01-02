import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createVitePlugins } from './vite/plugins'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  // 是否是构建模式
  const isBuild = command === 'build'

  return {
    // 路径别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },

    // CSS 预处理器配置
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@use "@/styles/variables.scss" as *;`,
          api: 'modern-compiler'
        }
      }
    },

    // 插件配置
    plugins: createVitePlugins(env, isBuild),

    // 服务器配置
    server: {
      host: true,
      port: 3333,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },

    // 构建配置
    build: {
      // 构建目录
      outDir: `dist-${env.VITE_APP_ENV}`,
      // 构建优化
      chunkSizeWarningLimit: 2000,
      cssCodeSplit: true,
      sourcemap: false,

      // 分块策略
      rollupOptions: {
        output: {
          // 分包配置
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'element-plus': ['element-plus'],
            utils: ['axios']
          },
          // 输出目录配置
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      },

      // 压缩配置
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: env.VITE_APP_ENV === 'production',
          drop_debugger: env.VITE_APP_ENV === 'production'
        }
      }
    },

    // 预构建配置
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'axios', 'element-plus/es']
    }
  }
})
