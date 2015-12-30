/**
 * @file Metadata
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';

const FILE = path.resolve(os.homedir(), '.vmm');

function save(data) {
    fs.writeFileSync(FILE, JSON.stringify(data), 'utf8');
}

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
    save([]);
}

export function add(name, url) {
    let packages = get();
    packages.push({name, url});
    save(packages);
}

export function del(name) {
    let packages = get();
    packages = packages.filter(item => item.name !== name);
    save(packages);
}

export function get(name) {
    let data = fs.readFileSync(FILE, 'utf8');
    data = JSON.parse(data);
    if (name) {
        data = data.find(item => item.name === name);
    }
    return data;
}
