/**
 * 动态加载style标签
 * @param {String} styleString css代码
 * @param {String} id 标签id
 */
export default function (styleString = '', id = '') {
  let style = document.createElement("style");
  style.type = "text/less";
  if (id) style.id = id;
  try {
    style.appendChild(document.createTextNode(styleString));
  } catch (ex) {
    style.styleSheet.cssText = styleString; //针对IE
  }
  let head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}
