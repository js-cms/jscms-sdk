/**
 * 修改指定元素样式
 */
export default function style(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      let elements = document.querySelectorAll(key);
      let styleObj = object[key];
      if (elements && elements.length) {
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
          for (const styleName in styleObj) {
            if (styleObj.hasOwnProperty(key)) {
              const styleValue = styleObj[styleName];
              element[styleName] = styleValue;
            }
          }
        }
      }
    }
  }
}