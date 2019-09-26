export function addClass(el,className){
   if(hasClass(el,className)){
       return;
   }
   let newClass = el.className.split(" ");
   newClass.push(className);
   el.className = newClass.join(" ")
}
export function hasClass(el,className){
    let reg = new RegExp('(^||\\s)'+className+'(\\s|$)');
    return reg.test(el.className)
}

export function getData(el, name, val) {
    const prefix = 'data-'
    if (val) {
      console.log(111)
      return el.setAttribute(prefix + name, val)
    }
    console.log(el, name, val)
    return el.getAttribute(prefix + name)
}


let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}


export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}