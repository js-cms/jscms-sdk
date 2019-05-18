/**
 * 把link标签挂载到html中
 * @param {string} url css资源路径
 * @param {function} callback 加载后回调函数
 * @param {string} id link标签id
 */
export default function (url = '', callback = () => {}, id = '') {
  let node = document.createElement("link");
  let supportOnload = "onload" in node;
  // webkit旧内核做特殊处理
  let isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536;
  // 阈值10分钟，一秒钟执行pollCss 500次
  let protectNum = 300000;
  node.rel = "stylesheet";
  node.type = "text/css";
  node.href = url;
  if (typeof id !== "undefined") {
    node.id = id;
  }
  document.getElementsByTagName("head")[0].appendChild(node);

  // for Old WebKit and Old Firefox
  if (isOldWebKit || !supportOnload) {
    // Begin after node insertion
    setTimeout(function () {
      pollCss(node, callback, 0);
    }, 1);
    return;
  }

  if (supportOnload) {
    node.onload = onload;
    node.onerror = function () {
      onload(); // 加载失败(404)
    }
  } else {
    node.onreadystatechange = function () {
      if (/loaded|complete/.test(node.readyState)) {
        onload();
      }
    }
  }

  function onload() {
    // 确保只跑一次下载操作
    node.onload = node.onerror = node.onreadystatechange = null;
    // 清空node引用，在低版本IE，不清除会造成内存泄露
    node = null;
    callback();
  }

  // 循环判断css是否已加载成功
  /*
   * @param node -- link节点
   * @param callback -- 回调函数
   * @param step -- 计步器，避免无限循环
   */
  function pollCss(node, callback, step) {
    let sheet = node.sheet;
    let isLoaded = false;
    step += 1; // 保护，大于10分钟，则不再轮询
    if (step > protectNum) {
      isLoaded = true;
      node = null; // 清空node引用
      callback();
      return;
    }
    if (isOldWebKit) {
      // for WebKit < 536
      if (sheet) isLoaded = true;
    } else if (sheet) {
      // for Firefox < 9.0
      try {
        if (sheet.cssRules) isLoaded = true;
      } catch (ex) {
        // 火狐特殊版本，通过特定值获知是否下载成功
        // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
        // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
        // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
        if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
          isLoaded = true;
        }
      }
    }
    setTimeout(function () {
      if (isLoaded) { // 延迟20ms是为了给下载的样式留够渲染的时间
        callback();
      } else {
        pollCss(node, callback, step);
      }
    }, 20);
  }
}
