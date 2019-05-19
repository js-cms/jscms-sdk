const fs = require('fs-extra');
const path = require('path');

const minPath = path.resolve('./dist/umd/jscmssdk.min.js');
const testPath = path.resolve('./test/jscmssdk.min.js');

fs.copySync(minPath, testPath);