/**
 * @file Metadata
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';
import _exists from './util/exists';

/**
 * 元数据文件路径
 *
 * @const
 * @type {string}
 */
const FILE = path.resolve(os.homedir(), '.vmm');

/**
 * 保存元数据
 *
 * @type {function(Object)}
 */
let save = data => fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');

/**
 * 元数据是否存在
 *
 * @public
 * @return {boolean}
 */
export function exists() {
    return _exists(FILE);
}

/**
 * 初始化元数据
 *
 * @public
 */
export function init() {
    save({});
}

/**
 * 获取元数据
 *
 * @public
 * @param {string=} name 字段名
 * @return {*}
 */
export function get(name) {
    let data = fs.readFileSync(FILE, 'utf8');
    data = JSON.parse(data);
    return name ? data[name] : data;
}

/**
 * 设置元数据
 *
 * @public
 * @param {string} name 字段名
 * @param {*} data 数据
 */
export function set(name, data) {
    let meta = get();
    meta[name] = data;
    save(meta);
}
