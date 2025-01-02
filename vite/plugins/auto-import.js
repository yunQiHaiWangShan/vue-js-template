import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function createAutoImport() {
  return [
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        '@vueuse/head',
        {
          // 自定义导入
          '@/utils/request': ['request'],
        }
      ],
      // 自动导入 Element Plus 相关函数
      resolvers: [
        ElementPlusResolver(),
        // 自定义解析器
        (name) => {
          // 自动导入图标
          if (name.startsWith('Icon')) {
            return { name, from: '@element-plus/icons-vue' }
          }
        }
      ],
      dirs: [
        './src/composables/common/**', // 导入 composables/common 目录下所有文件的方法
        './src/stores/**', // 导入 stores 目录下所有文件的方法
      ],
      vueTemplate: true,
      dts: 'auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
       // 自动导入的目录
       dirs: ['src/components'],
       // 组件的有效文件扩展名
       extensions: ['vue', 'jsx'],
       // 配置文件生成位置
       dts: 'components.d.ts',
       // 组件名称的生成规则
       directoryAsNamespace: true,
       // 自动导入 Element Plus 组件
       resolvers: [
         ElementPlusResolver(),
         // 自动导入图标组件
         (name) => {
           if (name.startsWith('Icon')) {
             return { name, from: '@element-plus/icons-vue' }
           }
         }
       ],
       // 自定义组件的解析规则
       resolveIdsFromFile: (file) => {
         const filename = file.split('/').pop()
         // 如果是 index.vue，使用父文件夹名作为组件名
         if (filename === 'index.vue') {
           const folderName = file.split('/').slice(-2, -1)[0]
           return [`${folderName}`]
         }
         // 其他 .vue 文件使用文件名作为组件名（去掉.vue后缀）
         return [filename.replace(/\.vue$/, '')]
       }
    })
  ]
}
