/**
 * @file Install package
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import * as pkg from '../lib/pkg';

console.log('hold on, installing ...');

let url = process.argv[2];
let cmds = url ? [pkg.install(url)] : pkg.init();

cmds.map(action => action.then(
    name => console.log(`install ${name} success`),
    error => console.log(`install fail, ${error}`)
));
