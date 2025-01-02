import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function createComponents() {
  return Components({
    // 组件目录
    dirs: ['src/components'],
    // 组件解析器
    resolvers: [ElementPlusResolver()],
    // 生成 TypeScript 声明文件
    dts: 'components.d.ts'
  })
}
