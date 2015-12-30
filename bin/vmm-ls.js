/**
 * @file List all packages
 * @author treelite(c.xinle@gmail.com)
 */

import * as meta from '../lib/meta';

let packages = meta.get();

if (!packages.length) {
    console.log('no packages, use `vmm import <package>` to import packages');
    process.exit(0);
}

for (let item of packages) {
    console.log(`${item.name}: ${item.url}`);
}
