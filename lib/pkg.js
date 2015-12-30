/**
 * @file Packages
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import os from 'os';
import path from 'path';
import {exec} from 'child_process';

import * as meta from './meta';

const DIR = path.resolve(os.homedir(), '.vim', 'bundle');

let execute = cmd => new Promise(
    (resolve, reject) => exec(cmd, (error, stdout, stderr) => error ? reject(stderr) : resolve())
);

function getName(url) {
    let name = path.basename(url);
    return name.replace(path.extname(name), '');
}

export function install(url) {
    let name = getName(url);
    if (meta.get(name)) {
        return Promise.reject(`${name} exists`);
    }

    let dir = path.resolve(DIR, name);
    return execute(`git clone ${url} ${dir}`)
        .then(() => meta.add(name));
}

export function remove(name) {
    let info = meta.get(name);
    if (!info) {
        return Promise.reject(`not found ${name}`);
    }

    let dir = path.resolve(DIR, name);
    return execute(`rm -rf ${dir}`)
        .then(() => meta.del(name));
}

function updatePkg(name) {
    let dir = path.resolve(DIR, name);
    return execute(`cd ${dir} && git pull`).then(() => name);
}

export function update(name) {
    let info = meta.get(name);
    if (name && !info) {
        return Promise.reject(`not found ${name}`);
    }

    if (!Array.isArray(info)) {
        info = [info];
    }

    let tasks = info.map(item => updatePkg(item.name));

    return Promise.all(tasks);
}
