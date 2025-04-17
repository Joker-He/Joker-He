// ==== isNumber  函数====
const toString = Object.prototype.toString
export function is (val?:any, type?:any) {
  return toString.call(val) === `[object ${type}]`
}
export function isNumber (val?:any) {
  return is(val, 'Number')
}


export function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}