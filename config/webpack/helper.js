// 约定一个entries目录，该目录下的所有文件夹中的`index.js`文件作为一个entry，entry名为该文件夹名字
// 如果entries目录下有一个index.js文件，则认为该文件为唯一入口点
import fsp from 'fs-promise'
import fp from 'path'
import { walkSync } from 'walk'
import env from '../environment'

const entriesDirectory = env.entriesDirectory

export const parseEntry = _ => {
  // 检查entries目录下是否存在index.js
  const singleEntry = fp.join(entriesDirectory, 'index.js')
  if (fsp.existsSync(singleEntry)) return singleEntry

  const entries = {}
  const walkerOption = {
    followLinks: false,
    listeners: {
      // 遍历出目录下所有的文件夹
      directories (root, stats) {
        if (root === entriesDirectory) {
          stats.forEach(({ name }) => {
            // 如果存在index.js，则把它作为entry
            const entry = fp.join(entriesDirectory, name, 'index.js')
            if (fsp.existsSync(entry)) entries[name] = entry
          })
        }
      }
    }
  }

  // 同步调用walker
  walkSync(entriesDirectory, walkerOption)

  return entries
}
