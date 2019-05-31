setTimeout(() => {
  const fs = require('fs-extra');
  const path = require('path');
  const buildDir = path.resolve(__dirname + `/../dist`);
  const demoDir = path.resolve(__dirname + `/../demo/jscmssdk`);

  fs.removeSync(demoDir);
  fs.copySync(buildDir, demoDir);
  console.log('Copy to demo complete!');
});
