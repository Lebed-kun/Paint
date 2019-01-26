export function setOptions(obj, options) {
  for (let key in obj) {
    if (options[key] !== undefined) {
      obj[key] = options[key];
    }
  }
}
