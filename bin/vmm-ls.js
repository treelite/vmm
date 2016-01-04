/**
 * @file List all packages
 * @author treelite(c.xinle@gmail.com)
 */

import * as pkg from '../lib/pkg';

let packages = pkg.get();

if (!packages.length) {
    console.log('no packages, use `vmm import <package>` to import packages');
    process.exit(0);
}

for (let item of packages) {
    console.log(`${item.name}: ${item.url}`);
}
