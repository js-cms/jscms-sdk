const fs = require('fs-extra');
const path = require('path');
const themeName = 'bokex';
const buildDir = path.resolve(__dirname + `/../dist`);
const demoDir = path.resolve(__dirname + `/../../jscms-theme-${themeName}/theme/${themeName}/static/lib/jscmssdk`);

fs.removeSync(demoDir);
fs.copySync(buildDir, demoDir);
console.log('Copy to theme complete!');
