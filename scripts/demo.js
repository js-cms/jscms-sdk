setTimeout(() => {
  const fs = require('fs-extra');
  const path = require('path');
  const buildDir = path.resolve(__dirname + `/../dist`);
  const demoDir = path.resolve(__dirname + `/../demo`);
  const buildCss = `${buildDir}/jscmssdk.css`;
  const buildJs = `${buildDir}/jscmssdk.umd.js`;
  const buildMinJs = `${buildDir}/jscmssdk.umd.min.js`;
  const demoCss = `${demoDir}/jscmssdk.css`;
  const demoJs = `${demoDir}/jscmssdk.umd.js`;
  const demoMinJs = `${demoDir}/jscmssdk.umd.min.js`;
  console.log('start copy');

  fs.removeSync(demoCss);
  fs.removeSync(demoJs);
  fs.removeSync(demoMinJs);

  fs.copySync(buildCss, demoCss);
  fs.copySync(buildJs, demoJs);
  fs.copySync(buildMinJs, demoMinJs);
  console.log('copy done');
});
