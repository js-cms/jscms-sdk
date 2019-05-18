const path = require('path');
const fs = require('fs-extra');

const componentsBasePath = path.resolve('./src/components/');
const componentsObj = require(`${componentsBasePath}/index.js`);

for (const key in componentsObj) {
  if (componentsObj.hasOwnProperty(key)) {
    const scriptBakPath = path.join(componentsBasePath, componentsObj[key], 'controller.bak.js');
    const scriptPath = path.join(componentsBasePath, componentsObj[key], 'controller.js');
    let bakScript = fs.readFileSync(scriptBakPath, 'utf-8');
    fs.writeFileSync(scriptPath, bakScript);
    fs.removeSync(scriptBakPath);
  }
}