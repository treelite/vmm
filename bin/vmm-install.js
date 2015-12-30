/**
 * @file Install package
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import * as pkg from '../lib/pkg';

let url = process.argv[2];

if (!url) {
    console.log('please input package url');
    process.exit(1);
}

console.log('hold on, installing ...');
pkg.install(url).then(
    name => console.log(`install ${name} success`),
    error => console.log(`install fail, ${error}`)
);
