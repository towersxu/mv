function defineProperty (obj, key, val) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  observe(val);
  var dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    set (newVal) {
      if (val === newVal) {
        return
      }
      val = newVal
      dep.update(newVal)
    },
    get () {
      Dep.target = dep
      return val
    }
  })
}

function observe (obj) {
  Object.keys(obj).map(key => {
    let val = obj[key]
    defineProperty(obj, key, val)
  })
}

function Dep () {
  this.subs = []
}

Dep.prototype.addSub = function (sub) {
  console.log('addSub')
  this.subs.push(sub)
}

Dep.prototype.update = function (val) {
  this.subs.forEach(function (s) {
    s.call(null, s)
  })
}