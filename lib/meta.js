/**
 * @file Metadata
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';
import _exists from './util/exists';

const FILE = path.resolve(os.homedir(), '.vmm');

let save = data => fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');

export function exists() {
    return _exists(FILE);
}

export function init() {
    save({});
}

export function get(name) {
    let data = fs.readFileSync(FILE, 'utf8');
    data = JSON.parse(data);
    return name ? data[name] : data;
}

export function set(name, data) {
    let meta = get();
    meta[name] = data;
    save(meta);
}
