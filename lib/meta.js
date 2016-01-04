/**
 * @file Metadata
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';

const FILE = path.resolve(os.homedir(), '.vmm');

export function exists() {
    let res = true;
    try {
        fs.accessSync(FILE);
    }
    catch (e) {
        res = false;
    }
    return res;
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
    fs.writeFileSync(FILE, JSON.stringify(meta), 'utf8');
}
