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

function getName(url) {
    let name = path.basename(url);
    return name.replace(path.extname(name), '');
}

export function install(url) {
    let name = getName(url);
    if (meta.get(name)) {
        return Promise.reject(`${name} exists`);
    }

    return new Promise((resolve, reject) => {
        let dir = path.resolve(DIR, name);
        exec(
            `git clone ${url} ${dir}`,
            (error, stdout, stderr) => {
                if (error) {
                    return reject(stderr);
                }
                meta.add(name, url);
                resolve(name);
            }
        );
    });
}

export function remove(name) {
    let info = meta.get(name);
    if (!info) {
        return Promise.reject(`not found ${name}`);
    }

    return new Promise((resolve, reject) => {
        let dir = path.resolve(DIR, name);
        exec(
            `rm -rf ${dir}`,
            (error, stdout, stderr) => {
                if (error) {
                    return reject(stderr);
                }
                meta.del(name);
                resolve(name);
            }
        );
    });
}
