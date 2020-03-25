const foo = 'bar'
const baz = { foo }
baz // { foo: bar }

// 等同于 
const baz = { foo: foo }

function f(x, y) {
  return { x, y }
}
// 等同于
function f(x, y) {
  return { x: x, y: y }
}
f(1, 2) // Object { x: 1, y: 2 }

const o = {
  method() {
    return 'Hello!'
  }
}
// 等同于
const o = {
  method: function() {
    return 'Hello!'
  }
}

let birth = '2000/01/01'
const Person = {
  name: '张三',
  // 等同于birth: birth
  birth,
  // 等同于hello: function() ...
  hello() {
    console.log('我的名字是', this.name)
  }
}

function getPoint() {
  const [x, y] = [1, 10]
  return { x, y }
}
getPoint() // { x: 1, y: 10 }

let ms = {}
function getItem(key) {
  return key in ms ? ms[key] : null
}
function setItem(key, value) {
  ms[key] = value
}
function clear() {
  ms = {}
}
module.exports = { getItem, setItem, clear }
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
}

const cart = {
  _wheels: 4,
  get wheels() {
    return this._wheels
  },
  set wheels(value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！')
    }
    this._wheels = value
  }
}

let user = {
  name: 'text'
}
let foo = {
  bar: 'baz'
}
console.log(user, foo) // {name: 'text'} {bar: 'baz'}
console.log({ user, foo }) // { user: { name: 'text' }, foo: { bar: 'baz' } }

const obj = {
  f() {
    this.foo = 'bar'
  }
}
new obj.f() // 报错  对象方法不能当做构造函数使用

obj.foo = true
obj['a' + 'bc'] = 123

var obj = {
  foo: true,
  abc: 123
}

let propKey = 'foo'
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
}

let lastWord = 'last word'
const a = {
  'first word': 'hello',
  [lastWord]: 'world'
}
a['first world'] // 'hello'
a[lastWord] // 'world'
a['last world'] // 'world'

let obj = {
  ['h' + 'ello']() {
    return 'hi'
  }
}
obj.hello() // hi

// 报错
const foo = 'bar'
const bar = 'abc'
// const baz = { [foo] }

// 正确
const foo = 'bar'
const baz = { [foo]: 'abc' }

const keyA = { a: 1 }
const keyB = { b: 2 }
const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
}
myObject // Object { [object Object]: 'valueB' }

const person = {
  sayName() {
    console.log('hello!')
  }
}
person.sayName.name // 'sayName'

const obj = {
  get foo() {},
  set foo(x) {}
}
obj.foo.name // TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo')
descriptor.get.name // 'get foo'
desctiptor.set.name // 'set foo'

(new Function()).name // 'anoymous'

var doSomething = function() {
  // ...
}
doSomething.bind().name // 'bound doSomething'

const key1 = Symbol('description')
const key2 = Symbol()
let obj = {
  [key1]() {},
  [key2]() {}
}
obj[key1].name // '[description]'
obj[key2].name // ''

let obj = { foo: 123 }
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: 123,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable // false
Object.getOwnPropertyDescriptor([], 'length').enumerable // false

Object.getOwnPropertyDescriptor(class { foo() {} }.prototype, 'foo').enumerable // false

// for...in // 对象自身和继承的可枚举属性 不含Symbol
Object.keys(obj) // 对象自身的可枚举属性 不含Symbol
Object.getOwnPropertyNames(obj) // 对象自身的属性 不含Symbol
Object.getOwnPropertySymbols(obj) // 对象自身的Symbol属性
Reflect.ownKeys(obj) // 对象自身的所有属性

Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 })
// ['2', '10', 'b', 'a', Symbol()]

const proto = {
  foo: 'hello'
}
const obj = {
  foo: 'world',
  find() {
    return super.foo
  }
}
Object.setPrototypeOf(obj, proto)
obj.find() // 'hello'

// super只能用在对象方法中 super其实是Object.getPrototypeOf(this)
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function() { // 这个不是对象方法，是将一个匿名函数赋值给对象属性
    return super.foo
  }
}

const proto = {
  x: 'hello',
  foo() {
    console.log(this.x) // 此处的this会绑定以proto为原型的实例
  }
}
const obj = {
  x: 'world',
  foo() {
    super.foo()
  }
}
Object.setPrototypeOf(obj, proto)
obj.foo() // 'world'

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
x // 1
y // 2
z // { a: 3, b: 4 }

let { ...z } = null // 运行时错误
let { ...z } = undefined // 运行时错误

let { ...x, y, z } = someObject // 句法错误
let { x, ...y, ...z } = someObject //句法错误

let obj = { a: { b: 1 } }
let { ...x } = obj
obj.a.b = 2
x.a.b // 2

let o1 = { a: 1 }
let o2 = { b: 2 }
o2.__proto__ = o1
let { ...o3 } = o2
o3 // { b: 2 }
o3.a // undefined

const o = Object.create({ x: 1, y: 2 }) // 这样以{ x: 1, y: 2 }为原型创建对象o
o.z = 3
let { x, ...newObj } = o // 扩展运算符的解构赋值只能读取对象自身的属性，单纯的结构赋值还可以读取继承属性
let { y, z } = newObj
x // 1
y // undefined
z // 3

// let { x, ...{ y, z } } = o // SyntaxError: ...must be followed by an identifier in declaration contexts

function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用x和y参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig)
}

let z = { a: 3, b: 4 }
let n = { ...z }
n // { a: 3, b: 4 }

let foo = { ...['a', 'b', 'c'] }
foo // { 0: 'a', 1: 'b', 2: 'c' }

const obj = {}
// { ...obj, a: 1 } // { a: 1 }

// 等同于{ ...Object(1) }
// { ...1 } // {}

// 等同于{ ...Object(true) }
// { ...true } // {}

// 等同于{ ...Object(undefined) }
// { ...undefined } // {}

// 等同于{ ...Object(null) }
// { ...null } // {}

// { ...'hello' } // { 0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o' }

let aClone = { ...a }
// 等同于
let aClone = Object.assign({}, a) // 只拷贝对象实例的自身属性

// 拷贝对象自身和继承属性的方法
// 写法一
const clone1 = { // __proto__在非浏览器环境不可用
  __proto__: Object.getPrototypeOf(obj), // 获取obj原型属性
  ...obj
}
// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
)
// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptor(obj)
)

let ab = { ...a, ...b }
// 等同于
let ab = Object.assign({}, a, b)

let aWithOverrides = { ...a, x: 1, y: 2 }
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } }
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y }
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 })

let newVersion = {
  ...previousVersion,
  name: 'New Name'  // Override the name property
}

let aWithDefaults = { x: 1, y: 2, ...a }
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a)
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a)

const obj = {
  ...(x > 1 ? { a: 1 } : {}),
  b: 2
}

// 并不会抛出错误，因为x属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throw new Error('not throw yet')
  }
}
// 会抛出错误，因为x属性被执行了
let runtimeError = {
  ...a,
  ...{
    get x() {
      throw new Error('throw now')
    }
  }
}

const firstName = (message && message.body && message.body.user && message.body.user.firstName) || 'default'

const fooInput  = myForm.querySelector('input[name=foo]')
const fooValue = fooInput ? fooInput.value : undefined

// 链判断运算符
const firstNmae = message?.body?.user?.firstName || 'default'
const fooValue = myForm.querySelector('input[name=foo]')?.value

obj?.prop // 对象属性
obj?.[expr] // 同上
func?.(...args) // 函数或对象方法的调用

iterator.return?.()

if (myForm.checkValidity?.() === false) {
  // 表单校验失败
  return
}

a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

a?.[++x]
// 等同于
a == null ? undefined : a[++x]

delete a?.b
// 等同于
a === null ? undefined : delete a.b

(a?.b).c
// 等价于
(a == null ? undefined : a.b).c

// 以下会报错
// 构造函数
new a?.()
new a?.b()
// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`
// 链判断运算符的左侧是super
// super?.()
// super?.foo
// 链运算符用于赋值运算符左侧
a?.b = c

const headerText = response.settings.headerText || 'Hello, world!'
const animationDuration = response.settings.animationDuration || 300
const showSplashScreen = response.settings.showSplashScreen || true

const headerText = response.settings.headerText ?? 'Hello, world!'
const animationDuration = response.settings.animationDuration ?? 300
const showSplashScreen = response.settings.showSplashScreen ?? true

const animationDuration  = response.setting?.animationDuration ?? 300

function Component(props) {
  const enable = props.enabled ?? true
  // ...
}

function Component(props) {
  const {
    enabled: enable = true
  } = props
  // ...
}

// 以下报错
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || rhs

// 以下正确
(lhs && middle) ?? fhs
lhs && (middle ?? fhs)

(lhs ?? middle) && rhs
lhs ?? (middle && rhs)

(lhs || middle) ?? rhs
lhs || (middle ?? rhs)

(lhs ?? middle) || rhs
lhs ?? (middle || rhs)