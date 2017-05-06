# simple-variants

[![NPM version](https://badge.fury.io/js/simple-variants.svg)](https://npmjs.org/package/simple-variants) [![Build Status](https://travis-ci.org/ckaznocha/simple-variants.svg?branch=master)](https://travis-ci.org/ckaznocha/simple-variants)
[![Greenkeeper badge](https://badges.greenkeeper.io/ckaznocha/simple-variants.svg)](https://greenkeeper.io/)
[![Dependency Status](https://david-dm.org/ckaznocha/simple-variants.svg)](https://david-dm.org/ckaznocha/simple-variants)
[![Coverage Status](https://coveralls.io/repos/github/ckaznocha/simple-variants/badge.svg?branch=master)](https://coveralls.io/github/ckaznocha/simple-variants?branch=master)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://ckaznocha.mit-license.org)

> Simple application variants for node.js

## Installation

```sh
$ yarn add simple-variants
```

## Usage

In the root of your project create a `.variants` or `.variants.yml` file. The
file can be json or yaml. It should contain a `default` object, your variants
will overwrite specified properties of the `default`.

```json
{
    "default": {
        "app": {
            "name": "Hello, World!",
            "version": "1.0.0"
        },
        "color": "blue"
    },
    "variant1": {
        "app": {
            "name": "Yo, World!"
        }
    }
}
```

```js
import simpleVariants from 'simple-variants'
const variants = new simpleVariants(process.env.variant)

console.log(variants.key('app.name')) // "Hello, World!" or "Yo, World!"
console.log(variants.key('app.version')) // "1.0.0"
console.log(variants.key('color')) // "blue"
```
or
```js
import simpleVariants from 'simple-variants'
const variants = (new simpleVariants(process.env.variant)).export()

console.log(variants.app.name)
console.log(variants.app.version)
console.log(variants.color)

// exported variants are frozen and can not be modified
variants.color = 'red' //throws an error
```

The constructor accepts a second argument if you wish to use a custom path for
your variants file:
```js
const variants = new simpleVariants(process.env.variant,'/path/to/file.yml')
```

## CLI

If you don't want to ship all your variant information, use the included
executable to pre-render the variant you'll be targeting.

```sh
Usage: simple-variants [options]

Options:

  -h, --help                output usage information
  -V, --version             output the version number
  -v, --variant [name]      the name of the variant to write [default]
  -i, --input [path]        the path to your input file [./variants]
  -o, --output [path]       the path to your output file [./.variants]
  -f, --format [json|yaml]  the format of the output [json]
```

## Contributing

See the `CONTRIBUTING` file.

## License
See `LICENSE` file
