/**
 * @file exists
 * @author treelite(c.xinle@gmail.com)
 */

'use strict';

import fs from 'fs';

export default function (file) {
    let res = true;
    try {
        fs.accessSync(file);
    }
    catch (e) {
        res = false;
    }
    return res;
}
