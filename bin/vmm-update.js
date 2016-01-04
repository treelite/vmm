/**
 * @file Update package
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import * as pkg from '../lib/pkg';

let name = process.argv[2];

console.log('hold on, updating ...');

pkg.update(name).then(
    name => console.log(`update ${name} success`),
    error => console.error(`update fail, ${error}`)
);
