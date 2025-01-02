import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import glob from 'glob'

// 获取 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 自动导入的包和模块
const autoImportModules = [
  'vue',
  'vue-router',
  'pinia',
  '@vueuse/core',
  '@/composables/common',
  '@/stores'
]

// Element Plus 相关
const elementPlusImports = [
  'element-plus',
  '@element-plus'
]

// 递归获取所有 .vue 和 .js 文件
function getFiles(dir) {
  return glob.sync(path.join(dir, '**/*.{vue,js}'), {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/scripts/**',
      '**/vite/**'
    ]
  })
}

// 检查导入语句
function checkImports(file) {
  const content = fs.readFileSync(file, 'utf-8')
  const imports = content.match(/import .+ from ['"](.+)['"]/g) || []
  
  const unnecessaryImports = imports.filter(imp => {
    const importPath = imp.match(/from ['"](.+)['"]/)[1]
    return autoImportModules.some(module => importPath.startsWith(module)) ||
           elementPlusImports.some(module => importPath.startsWith(module))
  })
  
  if (unnecessaryImports.length > 0) {
    console.log(`\n文件: ${file}`)
    console.log('不必要的导入:')
    unnecessaryImports.forEach(imp => {
      console.log(`  ${imp}`)
    })
  }
}

// 主函数
function main() {
  const srcDir = path.resolve(__dirname, '../src')
  const files = getFiles(srcDir)
  
  console.log('开始检查不必要的导入...\n')
  files.forEach(checkImports)
  console.log('\n检查完成!')
}

main() 