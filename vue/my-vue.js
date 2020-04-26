const compileUtil = {
  getVal(expr, vm) {
    // 这里触发了getter
    return expr.split('.').reduce((data, currentVal) => {
      return data[currentVal]
    }, vm.$data)
  },
  getContentVal(expr, vm) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(args[1], vm)
    })
  },
  text(node, expr, vm) {
    let value
    if (expr.indexOf('{{') !== -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        new Watcher(vm, args[1], (newVal) => {
          this.updater.textUpdater(node, this.getContentVal(expr, vm))
        })
        return this.getVal(args[1], vm)
      })
    } else {
      value = this.getVal(expr, vm)
    }
    this.updater.textUpdater(node, value)
  },
  html(node, expr, vm) {
    const value = this.getVal(expr, vm)
    new Watcher(vm, expr, (newVal) => {  // 每编译出一个都会新建一个Watcher实例
      this.updater.htmlUpdater(node, newVal)
    })
    this.updater.htmlUpdater(node, value)
  },
  model(node, expr, vm) {
    const value = this.getVal(expr, vm)
    new Watcher(vm, expr, (newVal) => {
      this.updater.modelUpdater(node, newVal)
    })
    this.updater.modelUpdater(node, value)
  },
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr]
    node.addEventListener(eventName, fn.bind(vm), false)
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value
    },
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    textUpdater(node, value) {
      node.textContent = value
    }
  }
}

class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 1.获取文档碎片对象 放入内存中减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el)

    // 2.编译模板
    this.compile(fragment)

    // 3.追加子元素到根元素
    this.el.appendChild(fragment)
  }
  compile(fragment) {
    // 1.获取子节点
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        // 是元素节点
        // 编译元素节点
        this.compileElement(child)
      } else {
        // 文本节点
        // 编译文本节点
        this.compileText(child)
      }
      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    });
  }
  compileElement(node) {
    const attributes = [...node.attributes]
    attributes.forEach(attr => {
      const { name, value } = attr
      if (this.isDirective(name)) {
        const [, directive] = name.split('-')
        const [dirName, eventName] = directive.split(':')
        // 更新数据， 数据驱动视图
        compileUtil[dirName](node, value, this.vm, eventName)
        // 删除有指令的标签上的属性
        node.removeAttribute(`v-${directive}`)
      } else if (this.isEventName(name)) {

      }
    })
  }
  compileText(node) {
    const content = node.textContent
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm)
    }
  }
  isEventName(attrName) {
    return attrName.startsWith('@')
  }
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  node2Fragment(el) {
    // 创建文档碎片
    const f = document.createDocumentFragment()
    let firstChild
    while (firstChild = el.firstChild) {  // 这里的写法看不太懂
      f.appendChild(firstChild)
    }
    return f
  }
  isElementNode(node) {
    return node.Type === 1
  }
}

// 观察者，数据监听，触发回调更新 （模板上经过编译取数据的同时就会被加一个watcher监听依赖）
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 先把旧值保存起来
    this.oldVal = this.getOldVal()
  }
  getOldVal() {
    Dep.target = this  // 暂存此时的Watcher实例到Dep的target属性中
    const oldVal = compileUtil.getVal(this.expr, this.vm) // 触发了getter
    Dep.target = null
    return oldVal
  }
  update() {
    const newVal = compileUtil.getVal(this.expr, this.vm) // 触发了getter
    if (newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}

// 依赖收集器
class Dep {
  constructor() {
    this.subs = []
  }
  // 收集观察者
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 通知观察者去更新
  notify() {
    this.subs.forEach(w => w.update())  // 因为模板上可能有多个地方订阅它，所以同一个属性可能会有多个watcher
  }
}

// 发布订阅
class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
      })
    }
  }
  defineReactive(obj, key, value) {
    // 递归遍历
    this.observe(value)
    const dep = new Dep()  // 每个被观察的对象都会新建一个依赖收集器的实例
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 订阅数据变化时，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: newVal => {
        this.observe(newVal) // 赋值一个对象的话也会对它进行递归遍历地观察，添加每个属性的发布订阅
        if (newVal !== value) {
          value = newVal
        }
        // 告诉Dep通知变化
        dep.notify()
      }
    })
  }
}




class MVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 1.实现一个数据观察者
      new Observer(this.$data)
      // 2.实现一个指令解析器
      new Compile(this.$el, this)
    }
  }
}