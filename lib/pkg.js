/**
 * @file Packages
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import os from 'os';
import path from 'path';
import exists from './util/exists';
import {exec} from 'child_process';

import * as meta from './meta';

/**
 * 插件安装目录
 *
 * TODO
 * 支持 windows
 *
 * @const
 * @type {string}
 */
const DIR = path.resolve(os.homedir(), '.vim', 'bundle');

/**
 * 元数据字段名
 *
 * @const
 * @type {string}
 */
const META_NAME = 'packages';

/**
 * 执行外部命名的 Promise 包装
 *
 * @type {function(string):Promise}
 */
let execute = cmd => new Promise(
    (resolve, reject) => exec(cmd, (error, stdout, stderr) => error ? reject(stderr) : resolve())
);

/**
 * 导入插件
 *
 * @param {string} url 插件 URL
 * @param {string} name 插件名称
 * @param {boolean} force 是否强制导入
 * @return {Promise}
 */
function importPackage(url, name, force) {
    let dir = path.resolve(DIR, name);
    let prefix = Promise.resolve();
    if (exists(dir)) {
        if (!force) {
            return Promise.reject(`${name} exists`);
        }
        else {
            prefix = execute(`rm -rf ${dir}`);
        }
    }
    return prefix.then(() => execute(`git clone ${url} ${dir}`));
}

/**
 * 添加插件
 *
 * @param {string} name 插件名称
 * @param {string} url 插件 URL
 * @return {string} 插件名称
 */
function add(name, url) {
    let data = meta.get(META_NAME) || [];
    data.push({name, url});
    meta.set(META_NAME, data);
    return name;
}

/**
 * 删除插件
 *
 * @param {string} name 插件名称
 * @return {string} 插件名称
 */
function del(name) {
    let data = meta.get(META_NAME) || [];
    data = data.filter(item => item.name !== name);
    meta.set(META_NAME, data);
    return name;
}

/**
 * 获取插件的名称
 *
 * @param {string} url 插件 URL
 * @return {string} 插件名称
 */
function getName(url) {
    let name = path.basename(url);
    return name.replace(path.extname(name), '');
}

/**
 * 获取插件信息
 *
 * @public
 * @param {string=} name 插件名称
 * @return {Object|Array.<Object>}
 */
export function get(name) {
    let data = meta.get(META_NAME) || [];
    if (name) {
        data = data.find(item => item.name === name);
    }
    return data;
}

/**
 * 安装插件
 *
 * @public
 * @param {string} url 插件 URL
 * @return {Promise}
 */
export function install(url) {
    let name = getName(url);
    if (get(name)) {
        return Promise.reject(`${name} exists`);
    }

    return importPackage(url, name).then(() => add(name, url));
}

/**
 * 插件初始化
 *
 * @public
 * @return {Promise}
 */
export function init() {
    let items = get();
    if (!items.length) {
        return Promise.reject('nothing need to install');
    }

    return items.map(item => importPackage(item.url, item.name).then(() => item.name));
}

/**
 * 删除插件
 *
 * @public
 * @param {string} name 插件名称
 * @return {Promise}
 */
export function remove(name) {
    let info = get(name);
    if (!info) {
        return Promise.reject(`not found ${name}`);
    }

    let dir = path.resolve(DIR, name);
    return execute(`rm -rf ${dir}`)
        .then(() => del(name));
}

/**
 * 更新插件
 *
 * @param {string} name 插件名称
 * @return {Promise}
 */
function updatePkg(name) {
    let dir = path.resolve(DIR, name);
    return execute(`cd ${dir} && git pull`).then(() => name);
}

/**
 * 更新插件
 *
 * @public
 * @param {string=} name 插件名称，省略的话更新所有插件
 * @return {Promise}
 */
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
