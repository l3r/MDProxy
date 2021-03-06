let fs = require('fs');
let path = require('path');
const shell = require('shelljs');

class Helper {
  getTpl(p) {
    return fs.readFileSync(`${path.resolve(p)}.html`, {encoding: 'utf8'});
  }
  showMsg(msg) {
    let sb = document.getElementById('message');
    sb.MaterialSnackbar.showSnackbar({
      message: msg,
      timeout: 3000
    });
  }
  upgradeMDLElements(selector) {
    setTimeout(() => {
      if (selector instanceof NodeList) {
        return componentHandler.upgradeElements(selector);
      }
      if (selector instanceof HTMLElement) {
        return componentHandler.upgradeElements([selector]);
      }
      if (typeof selector == 'string') {
        return componentHandler.upgradeElements(document.querySelectorAll(selector));
      }
    }, 0);
  }
  writeProxyConfig(config) {
    // 写入规则配置文件
    let configStr = JSON.stringify(config, null, '\t');
    let configJsStr = `module.exports = ${configStr};`;
    fs.writeFileSync(path.resolve(__dirname, '../../backend/config.js'), configJsStr, {encoding: 'utf8'})
  }
  sureConfigExist() {
    // 一些目录和文件的初始化工作

    let tempDir = path.resolve(__dirname, '../../.temp');
    shell.mkdir('-p', tempDir); // ftl编译结果存放目录

    // 删除请求log文件
    shell.rm('-f', path.resolve(__dirname, '../../.request.log'));

    let configFile = path.resolve(__dirname, '../../backend/config.js'); // 规则配置文件
    let exist = fs.existsSync(configFile);
    if (!exist) {
      this.writeProxyConfig({
        "dirMatches": {

        },
        "fileMatches": {

        },
        "reverses": {

        },
        "port": 8004
      })
    }
  }
}

module.exports = new Helper();