/**
 * @file Main command
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import fs from 'fs';
import path from 'path';
import program from 'commander';
import * as meta from '../lib/meta';

let info = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');
info = JSON.parse(info);

if (!meta.exists()) {
    console.log('Initialize vmm')
    meta.init();
    console.log('Finish initialization');
}

program
    .version(info.version)
    .command('ls', 'list all plugins')
    .command('install', 'install plugin')
    .command('update', 'update plugins')
    .command('remove', 'remove plugin')
    .parse(process.argv);
