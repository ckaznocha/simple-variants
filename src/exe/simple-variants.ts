#!/usr/bin/env node

import * as commander from 'commander'
import { safeDump } from 'js-yaml'
import { writeFileSync } from 'fs'
import simpleVariants from '../simple-variants'

const pkg = require("../../package.json")

commander
    .version(pkg.version)
    .option(
        '-v, --variant [name]',
        'the name of the variant to write [default]',
        'default'
    )
    .option(
        '-i, --input [path]',
        'the path to your input file [./variants]',
        './variants'
    )
    .option(
        '-o, --output [path]',
        'the path to your output file [./.variants]',
        './.variants'
    )
    .option(
        '-f, --format [json|yaml]',
        'the format of the output [json]',
        'json'
    )
    .parse(process.argv)

const variant = {
    default: (new simpleVariants(commander.variant, commander.input)).export()
}

let output: string

switch (commander.format) {
case 'json':
    output = JSON.stringify(variant, undefined, 2)
    output = `${output}\n`
    break
case 'yaml':
    output = safeDump(variant)
    break
default:
    throw new Error(`Invalid output format ${commander.format}`)
}

writeFileSync(commander.output, output)
