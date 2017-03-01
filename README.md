# simple-variants
[![NPM version](https://badge.fury.io/js/simple-variants.svg)](https://npmjs.org/package/simple-variants) [![Build Status](https://travis-ci.org/ckaznocha/simple-variants.svg?branch=master)](https://travis-ci.org/ckaznocha/simple-variants)
[![Coverage Status](https://coveralls.io/repos/github/ckaznocha/simple-variants/badge.svg?branch=master)](https://coveralls.io/github/ckaznocha/simple-variants?branch=master)

> Simple application variants for node.js

## Installation

```sh
$ yarn add simple-variants
```

## Usage

In the root of your project create a `.variants` or `.variants.yml` file.

```json
{
    "default": {
        "app": {
            "name": "Hello, World!"
        }
    },
    "variant1": {
        "app": {
            "name": "Yo, World!"
        }
    }
}
```

```js
import Variants from 'simple-variants'
const variants = new Variants(process.env.variant)

console.log(variants.key('app.name'))
```
or
```js
import Variants from 'simple-variants'
const variants = (new Variants(process.env.variant)).export()

console.log(variants.app.name)
```
## Contributing

See the `CONTRIBUTING` file.

## License
See `LICENSE` file
