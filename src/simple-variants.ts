import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { safeLoad } from 'js-yaml'

const defaultFileNames: Array<string> = [
    '.variants',
    '.variants.json',
    '.variants.yml',
]
const cwd: string = process.cwd()

export default class Variants {
    private readonly file: any

    constructor(variant?: string, filePath?: string) {
        if (!filePath || !existsSync(filePath)) {
            let fileName = defaultFileNames.find((name: string) => {
                return existsSync(join(cwd, name))
            })
            if (!fileName) {
                throw new Error('Could not find variant file')
            }
            filePath = join(cwd, fileName)
        }
        try {
            let file = safeLoad(readFileSync(filePath, 'utf8'))
            this.file = file.default
            if (variant && variant !== 'default') {
                Object.assign(this.file, file[variant])
            }
            deepFreeze(this.file)
        } catch (e) {
            throw new SyntaxError(`Could not parse variants file: ${e.message}`)
        }
    }

    key(name: string) {
        return name.split('.').reduce(
            (accu: any, key: string) => accu[key],
            this.file,
        )
    }

    export() { return this.file }
}

//See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
function deepFreeze(obj: any): void {
    Object.getOwnPropertyNames(obj).forEach(function(name: string) {
        let prop = obj[name]
        if (typeof prop === 'object' && prop !== null)
            deepFreeze(prop)
    })
    Object.freeze(obj)
}
