/**
 * @file Remove package
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import * as pkg from '../lib/pkg';

let name = process.argv[2];

if (!name) {
    console.log('please input package name');
    process.exit(1);
}

pkg.remove(name).then(
    name => console.log(`remove ${name} success`),
    error => console.error(`remove fail, ${error}`)
);
