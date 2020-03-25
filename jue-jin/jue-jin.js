// 圣杯模式继承
function Father() {}
function Son() {}
Father.prototype.lastName = 'Jack'

// 圣杯模式  加了一个中间层
function inherit(Target, Origin) {
  function F() {}
  F.prototype = Origin.prototype
  Target.prototype = new F()
  Target.prototype.constructor = Target // 让constructor指向自己
  Target.prototype.uber = Origin.prototype // uber表示超类（爷爷辈），起存储作用，可写可不写
}

inherit(Son, Father)
var son = new Son()
var father = new Father()

Son.prototype.sex = 'male'
console.log(son.lastName) // Jack
console.log(son.sex) // male
console.log(father.sex) // undefined

// 圣杯继承 使用闭包
var inherit = (function() {
  var F = function() {}
  return function(Target, Origin) { // 形成了闭包
    F.prototype = Origin.prototype
    Target.prototype = new F()
    Target.prototype.constructor = Target
    Target.prototype.uber = Origin.prototype
  }
})()


// 封装判断类型
function type(obj) {
  const class2type = {}
  'Array Date RegExp Object Error'.split(' ').forEach(e => class2type[`[object ${e}]`] = e.toLowerCase())
  if (obj === null) return String(obj)
  return typeof obj === 'object' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
}

// 防抖和节流  高频触发优化
// 防抖 将多次高频操作优化为只在最后一次执行（每次调用都会清空计时器重新计时，在计时满wait时间后执行一次调用）
function debounce(fn, wait, immediate) {
  let timer = null  // ? 这个我觉得不应该写在这里，这个timer应该是在外面共享的，但是这里是没法共享的
  return function() { // 闭包
    let args = arguments
    let context  = this
    if (immediate && !timer) {
      fn.apply(context, args)
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
// 节流 每隔一段时间后执行一次（每次调用都会在wait时间后才会执行这次调用）
function throttle(fn, wait, immediate) {
  let timer = null
  let callNow = immediate
  return function() { // 闭包
    let args = arguments
    let context = this
    if (callNow) {
      fn.apply(context, args)
      callNow = false
    }
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, wait)
    }
  }
}

// 手动修改this的指向
fn.call(target, 1, 2)  // 在后面枚举传进去
fn.apply(target, [1, 2]) // 装在数组里传进去
fn.bind(target)(1, 2) // 像函数一样传

function* helloWorld() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
const generator = helloWorld()
generator.next() // { value: 'hello', done: false }
generator.next() // { value: 'world', done: false }
generator.next() // { value: 'ending', done: false }
generator.next() // { value: undefined, done: true }

async function getUserByAsync() {
  let user = await fetchUser()
  return user
}
const user = await getUserByAsync()
console.log(user)

// 数组乱序
arr.sort(function() {
  return Math.random() - 0.5  // 0 <= Math.random < 1
})

// 数字数组拆解
Array.prototype.flat = function() {
  return this.toString().split(',').map(i => +i)
}

// vue生命周期

// 初始化Vue实例
function _init() {
  // 挂载属性
  initLifeCycle(vm)
  // 初始化事件系统，钩子函数等
  initEvent(vm)
  // 编译slot、vnode
  initRender(vm)
  // 触发钩子
  callHook(vm, 'beforeCreate')
  // 添加inject功能
  initInjection(vm)
  // 完成数据响应性 props/data/wacth/computed/methods
  initState(vm)
  // 添加provide功能
  initProvide(vm)
  // 触发钩子
  callHook(vm, 'created')
  // 挂载节点
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

// 挂载节点实现
function mountComponent(vm) {
  // 获取render function
  if (!this.options.render) {
    // template to render
    // Vue.compile = compileToFunctions
    let { render } = compileToFunctions()
    this.options.render = render
  }
  // 触发钩子
  callHook('beforeMounte')
  // 初始化观察者
  // render 渲染 vdom
  vdom = vm.render
  // update: 根据 diff 算出的 patchs 挂载成真实的 dom
  vm._update(vdom)
  // 触发钩子
  callHook(vm, 'mounted')
}

// 更新节点实现
function queueWacther(wacther) {
  nextTick(flushScheduleQueue)
}

// 清空队列
function flushScheduleQueue() {
  // 遍历队列中所有修改
  for(let i = 0; i < length; i++) {
    // beforeUpdate
    watcher.before()
    // 依赖局部更新节点
    watcher.update()
    callHook('updated')
  }
}

// 销毁实例实现
Vue.prototype.$destory = function() {
  // 触发钩子
  callHook(vm, 'beforeDestory')
  // 自身及子节点
  remove()
  // 删除依赖
  watcher.tearDown()
  // 删除监听
  vm.$off()
  // 触发钩子
  callHook(vm, 'destoryed')
}

// vue数据响应(数据劫持)
let data = { a: 1 }
// 数据响应性
observe(data) // 响应数据依赖
// 初始化观察者
new Watcher(data, 'name', updateComponent) // 响应组件依赖
data.a = 2
// 简单表示用于数据更新后的操作
function updateComponent() { 
  vm._update() // patchs
}
// 监视对象
function observe(obj) {
  // 遍历对象，使用get/set重新定义对象的每个属性值
  Object.keys(obj).map(key => {
    defineReactive(obj, key, obj(key))
  })
}
function defineReactive(obj, k, v) {
  // 递归子属性
  if (type(v) == 'object') observe(v)
  // 新建依赖收集器
  let dep = new Dep()
  // 定义get/set
  Object.defineProperty(obj, k, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // 当有获取该属性时，证明该对象依赖于该属性，因此被添加进收集器中
      if (Dep.target) {
        dep.addSub(Dep.target) // 将依赖对象添加进收集器数组  Dep.target为依赖该属性的依赖对象
      }
      return v
    },
    set: function reactiveSetter(nV) {
      v = nV
      dep.notify() // 遍历收集器数组通知依赖对象更新
    }
  })
}
// 依赖收集器
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.map(sub => {
      sub.update()
    })
  }
}
Dep.target = null
// 观察者
class Watcher {
  constructor(obj, key, cb) {  // cb 为劫持到数据更新以后的callback函数
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  addDep(Dep) {
    Dep.addSub(this) // 可以简单理解为将组件加到依赖收集器
  }
  update() {
    this.value = this.obj[this.key]
    this.cb(this.value) // 组件更新
  }
  before() {
    callHook('beforeUpdate')
  }
}

// diff算法的实现
function diff(oldTree, newTree) {
  // 差异收集
  let pathchs = {}
  dfs(oldTree, newTree, 0, pathchs)
  return pathchs
}
function dfs(oldNode, newNode, index, pathchs) {
  let curPathchs = []
  if (newNode) {
    // 当新旧节点的tagName和key值完全一致时
    if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
      // 继续比对属性差异
      let props = diffProps(oldNode.props, newNode.props)
      curPathchs.push({ type: 'changeProps', props })
      // 递归进入下一层级的比较
      diffChildrens(oldNode.children, newNode.children, index, pathchs)
    } else {
      // 当tagName或者key修改了后，表示已经是全新的节点，无需再比
      curPathchs.push({ type: 'replaceNode', node: newNode })
    }
  }
  // 构建出整棵差异树
  if (curPathchs.length) {
    if (pathchs[index]) {
      pathchs[index] = pathchs[index].concat(curPathchs)
    } else {
      pathchs[index] = curPathchs
    }
  }
}

// 属性对比实现
function diffProps(oldProps, newProps) {
  let propsPathchs = []
  // 遍历新旧属性列表
  // 查找增、删、改的项
  forin(oldProps, (k, v) => {
    if (!newProps.hasOwnProperty(k)) {
      propsPathchs.push({ type: 'remove', prop: k })
    } else {
      if (v !== newProps[k]) {
        propsPathchs.push({ type: 'change', prop: k, value: newProps[k] })
      }
    }
  })
  forin(newProps, (k, v) => {
    if (!oldProps.hasOwnProperty(k)) {
      propsPathchs.push({ type: 'add', prop: k, value: v })
    }
  })
  return propsPathchs
}

// 对比子级差异
function diffChildrens(oldChild, newChild, index, pathchs) {
  // 标记子级的删除/新增/移动
  let { change, list } = diffList(oldChild, newChild, index, pathchs)
  if (change.length) {
    if (pathchs[index]) {
      pathchs[index] = pathchs[index].concat(change)
    } else {
      pathchs[index] = change
    }
  }
  // 根据key获取原本匹配的节点，进一步递归从头开始对比
  oldChild.map((item, i) => {
    let keyIndex = list.indexOf(item.key)
    if (keyIndex) {
      let node = newChild[keyIndex]
      // 进一步递归对比
      dfs(item, node, index, pathchs)
    }
  })
}

// 列表对比，主要也是根据key值查找匹配项
// 对比出新旧列表的新增/删除/移动
function diffList(oldList, newList, index, pathchs) {
  let change = []
  let list = []
  const newKeys = getKey(newList)
  oldList.map(v => {
    if (newKeys.indexOf(v.key) > -1) {
      list.push(v.key)
    } else {
      list.push(null)
    }
  })
  // 标记删除
  for (let i = list.length - 1; i >= 0; i--) {
    if (!list[i]) {
      list.splice(i, 1)
      change.push({ type: 'remove', index: i })
    }
  }
  // 标记新增和移动
  newList.map((item, i) => {
    const key = item.key
    const index = list.indexOf(key)
    if (index === -1 && key == null) {
      // 新增
      change.push({ type: 'add', node: item, index: i })
      list.splice(i, 0, key)
    } else {
      // 移动
      if (index !== i) {
        change.push({
          type: 'move',
          from: index,
          to: i
        })
        move(list, index, i)
      }
    }
  })
  return { change, list }
}

// Proxy相比于defineProperty
let data = { a: 1 }
let reactiveData = new Proxy(data, {
  get: function(target, name) {
    // ...
  },
  // ...
})

// vuex
// state: 状态中心
// mutations: 更改状态
// actions: 异步更改状态(异步完成后commit mutations)
// getters: 获取状态
// modules: 将state分成多个modules，便于管理

// 五大算法
/*
  贪心算法: 局部最优解
  分治算法: 分成多个小模块，与原问题性质相同
  动态规划: 每个状态都是过去历史的一个总结
  回溯法: 发现原先选择不优时，退回重新选择
  分支限界法
*/

// 冒泡排序（两两比较）复杂度O(n2)
function bubleSort(arr) {
  var len = arr.length
  for (let outer = len; outer >= 2; outer--) { // 这层每循环一次，最大的值都会冒泡到数组循环区域的末尾
    for(let inner = 0; inner <= outer - 1; inner++) {
      if (arr[inner] > arr[inner + 1]) {
        [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]]
      }
    }
  }
  return arr
}

// 选择排序 (遍历自身以后的元素，最小的元素跟自己调换位置) 复杂度O(n2)
function selectSort(arr) {
  var len = arr.length
  for (let i = 0; i < len - 1; i++) { // 这层每循环一次，最小的值都会被选择到数组循环区域的开头
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}

// 插入排序（即将元素插入到已排序好的数组中）复杂度O(n2)
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) { // 外循环从1开始，默认arr[0]是有序段
    for (let j = i; j > 0; j--) { // j=i，将arr[j]依次插入有序段中，从后向前遍历比对，小的就插前面
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
    }
  }
  return arr
}

// ...其他算法待补充

// webpack

(function(modules) {
  // 模拟require函数, 从内存中加载模块：
  function __webpack_require__(moduleId) {
    // 缓存模块
    if (installedModules[moduleId]) {
      return installModules[moduleId].exports
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    }
    // 执行代码
    module[moduleId].call(module.exports, module, module.exports, __webpack_require__)
    // Flag: 标记是否加载完成
    module.l = true
    return module.exports
  }
  // ...
  // 开始执行加载入口文件：
  return __webpack_require__(__webpack_require__.s = './src/index.js')
})({
  './src/index.js': function(module, __webpack_exports__, __webpack_require__) {
    // 使用eval执行编译后的代码
    // 继续递归引用模块内部依赖
    // 实际情况并不是使用模板字符串，这里是为了代码的可读性
    eval(`
      __webpack_require__.r(__webpack_exports__)
      //
      var _test__WEBPACK_IMPORTED_MODULE_0 = __webpack_require__('test', './src/test.js')
    `)
  },
  './src/test.js': function(module, __webpack_exports__, __webpack_require__) {
    // ...
  }
})

// html-loader/index.js
module.exports = function(htmlSource) {
  // 返回处理后的代码字符串
  // 删除html文件中所有注释
  return htmlSource.replace(/<!--[\w\W]*?-->/g, '')
}

// 常用loader
/*
  file-loader
  url-loader
  babel-loader
  ts-loader
  style-loader
  css-loader
  postcss-loader
  less-loader/sass-loader
*/

class Plugin {
  // 注册插件时，会调用apply方法
  // apply方法接收compiler对象
  // 通过compiler上提供的Api,可以对事件进行监听，执行相应的操作
  apply(compiler) {
    // complicaton 是监听每次编译循环
    // 每次文件变化，都会生成新的compilation对象并触发该事件
    compiler.plugin('compilation', function(compilation) {})
  }
}

// webpack.config.js
module.export = {
  plugins: [
    new Plugin(options)
  ]
}

// 观察者模式实现事件的订阅与广播
const { SyncHook } = require('tapable')
const hook = new SyncHook(['arg'])
// 订阅
hook.tap('event', arg => {
  // 'event-hook'
  console.log(arg)
})
// 广播
hook.call('event-hook')

// Compiler 全局唯一，从启动生存到结束
// Compilation 对应每次编译，每轮编译循环均会重新创建

// 常用的Plugin
/*
  UglifyJsPlugin
  CommosChunkPlugin
  ProvidePlugin
  html-webpack-plugin
  extract-text-webpack-plugin/mini-css-extract-plugin
  DefinePlugin
  optimize-css-assets-webpack-plugin
  webpack-bundle-analyzer
  compression-webpack-plugin
  happypack
  EnvironmentPlugin
*/

// webpack编译优化
/*
  代码优化（无用代码消除DCE，删除不可能执行的代码；摇树优化Tree-shaking，消除那些引用了但未被使用的模块代码）UglifyJs webpack-deep-scope-plugin
  代码分割（code-spliting分割成多份懒加载或异步加载，按页面、功能、文件修改频率拆分）SplitChunksPlugin
  作用域提升（scope hoisting 将分散模块分到同一作用域，避免代码重复引入）
  编译性能优化：
    升级webpack
    dev-server/模块热替换(HMR), 监听文件变动时忽略node_modules
    缩小编译范围(modules, mainFields, noParse, includes/exclude, alias)
    babel-loader,忽略node_modules,使用cacheDirectory缓存编译结果
    多进程并发,webpack-parallel-uglify-plugin多进程并发压缩js,HappyPack多进程并发文件Loader解析
    第三方库模块缓存,DllPlugin和DllReferencePlugin提前打包并缓存
    使用分析，Webpack Analyse/Webpack-bundle-analyzer打包分析，配置profile: true监控各个编译阶段的耗时
    source-map,开发时用cheap-module-eval-source-map,生产时用hidden-source-map
*/

// 代理服务器在客户端代理转发客户端请求，则是正向代理；在服务端分配转发请求，则是反向代理。这两种的配置方式是不一样的