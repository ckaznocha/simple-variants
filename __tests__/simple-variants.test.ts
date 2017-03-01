import simpleVariants from '../src/simple-variants'
import * as path from 'path'

it('gets the default value', () => {
    const v = new simpleVariants()
    expect(v.key('foo.bar')).toBe('baz')
})

it('returns undefined when the key is not valid', () => {
    const v = new simpleVariants()
    expect(v.key('foo.buzz')).toBe(undefined)
})

it('can not overwrite a value', () => {
    const v = new simpleVariants()
    let e = v.export()
    expect(()=>{e.foo.bar = 'zap'}).toThrow()
    expect(Object.isFrozen(e)).toBe(true)
    expect(v.key('foo.bar')).toBe('baz')
})

it('gets the variant value', () => {
    const v = new simpleVariants('bing')
    expect(v.key('foo.bar')).toBe('zip')
})

it('gets the a custom file', () => {
    const v = new simpleVariants(undefined, path.join(__dirname,'fixtures/foo.json'))
    expect(v.key('foo.bar')).toBe('quux')
})

it('throws an error when there is no file',() =>{
    expect(()=>{
        new simpleVariants(undefined,  path.join(__dirname,'fixtures/bad.json'))
    }).toThrow()
})
