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
const META_NAME = 'packages';

let execute = cmd => new Promise(
    (resolve, reject) => exec(cmd, (error, stdout, stderr) => error ? reject(stderr) : resolve())
);

function add(name, url) {
    let data = meta.get(META_NAME) || [];
    data.push({name, url});
    meta.set(META_NAME, data);
    return name;
}

function del(name) {
    let data = meta.get(META_NAME) || [];
    data = data.filter(item => item.name !== name);
    meta.set(META_NAME, data);
    return name;
}

function getName(url) {
    let name = path.basename(url);
    return name.replace(path.extname(name), '');
}

export function get(name) {
    let data = meta.get(META_NAME) || [];
    if (name) {
        data = data.find(item => item.name === name);
    }
    return data;
}

export function install(url) {
    let name = getName(url);
    if (get(name)) {
        return Promise.reject(`${name} exists`);
    }

    let dir = path.resolve(DIR, name);
    return execute(`git clone ${url} ${dir}`)
        .then(() => add(name, url));
}

export function remove(name) {
    let info = get(name);
    if (!info) {
        return Promise.reject(`not found ${name}`);
    }

    let dir = path.resolve(DIR, name);
    return execute(`rm -rf ${dir}`)
        .then(() => del(name));
}

function updatePkg(name) {
    let dir = path.resolve(DIR, name);
    return execute(`cd ${dir} && git pull`).then(() => name);
}

export function update(name) {
    let info = get(name);
    if (name && !info) {
        return Promise.reject(`not found ${name}`);
    }

    if (!Array.isArray(info)) {
        info = [info];
    }

    let tasks = info.map(item => updatePkg(item.name));

    return Promise.all(tasks);
}
