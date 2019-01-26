export function setOptions(obj, options) {
  for (let key in options) {
    if (options[key] !== undefined) {
      obj[key] = options[key];
    }
  }
}
