const path = require('path');
const fs = require('fs-extra');

const componentsBasePath = path.resolve('./src/components/');
const componentsObj = require(`${componentsBasePath}/index.js`);

for (const key in componentsObj) {
  if (componentsObj.hasOwnProperty(key)) {
    const scriptBakPath = path.join(componentsBasePath, componentsObj[key], 'controller.bak.js');
    const templatePath = path.join(componentsBasePath, componentsObj[key], 'template.html');
    const scriptPath = path.join(componentsBasePath, componentsObj[key], 'controller.js');
    const stylePath = path.join(componentsBasePath, componentsObj[key], 'style.css');
    let template = fs.readFileSync(templatePath, 'utf-8');
    let script = fs.readFileSync(scriptPath, 'utf-8');
    let style = fs.readFileSync(stylePath, 'utf-8');
    fs.writeFileSync(scriptBakPath, script);
    script = script.replace('export default {', `export default {template: ${JSON.stringify(template)}, style: ${JSON.stringify(style)},`)
    fs.writeFileSync(scriptPath, script);
  }
}