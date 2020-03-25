Object.is('foo', 'foo') // true
Object.is({}, {}) // false

+0 === -0 // true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0不等于-0的情况
      return x !== 0 || 1 / x === 1 / y
    }
  },
  configurable: true,
  enumerable: false,
  writable: true
})

const target = { a: 1 }
const source1 = { b: 2 }
const source2 = { c: 3 }
Object.assign(target, source1, source2)
target // { a: 1, b: 2, c: 3 }

const target = { a: 1, b: 1 }
const source1 = { b: 2, c: 2 }
const source2 = { c: 3 }
Object.assign(target, source1, source2)
target // { a: 1, b: 2, c: 3 }

const obj = { a: 1 }
Object.assign(obj) === obj // true

typeof Object.assign(2) // 'object'

Object.assign(undefined) // 报错
Object.assign(null) // 报错

let obj = { a: 1 }
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

const v1 = 'abc'
const v2 = true
const v3 = 10
const obj = Object.assign({}, v1, v2, v3)
console.log(obj) // { 0: 'a', 1: 'b', 2: 'c' }

Object(true) // { [[PrimitiveValue]]: true }
Object(10) // { [[PrimitiveValue]]: 10 }
Object('abc') // {0: 'a', 1: 'b', 2: 'c', length: 3, [[PrimitiveValue]]: 'abc' }

Object.assign({ b: 'c' }, 
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })  
)
// { b: 'c' }

Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }

const obj1 = { a: { b: 1 } }
const obj2 = Object.assign({}, obj1)
obj1.a.b = 2
obj2.a.b // 2

const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }

Object.assign([1, 2, 3], [4, 5]) // [4, 5, 3]

const source = {
  get foo() {
    return 1
  }
}
const target  = {}
Object.assign(target, source) // { foo: 1 }

class Point {
  constructor(x, y) {
    Object.assign(this, { x, y })
  }
}

Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    // ...
  },
  anotherMethod() {
    // ...
  }
})
// 等同于
SomeClass.prototype.someMethod = function (arg1, arg2) {
  // ...
}
SomeClass.prototype.anotherMethod = function () {
  // ...
}

function clone(origin) {
  return Object.assign({}, origin)
}

function clone(origin) {
  let originProto = Object.getPrototypeOf(origin)
  return Object.assign(Object.create(originProto), origin)
}

const merge = (target, ...sources) => Object.assign(target, ...sources)

const merge = (...sources) => Object.assign({}, ...sources)

const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
}
function processContent(options) {
  options = Object.assign({}, DEFAULTS, options)
  console.log(options)
  // ...
}

const DEFAULTS = {
  url: {
    host: 'example.com',
    port: 7070
  },
}
processContent({ url: { port: 8000 } })
// {
//   url: { port: 8000 }
// }

const obj = {
  foo: 123,
  get bar() {
    return 'abc'
  }
}
Object.getOwnPropertyDescriptors(obj)
// {
//   foo: {
//     value: 123,
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   bar: {
//     get: [Function: get bar],
//     set: undefined,
//     enumerable: true,
//     configurable: true
//   }
// }

function getOwnPropertyDescriptors(obj) {
  const result = {}
  for (let key of Reflect.ownKeys(obj)) {  // 除继承属性之外的所有自身属性
    result[key] = Object.getOwnPropertyDescriptor(obj, key)
  }
  return result
}

const source = {
  set foo(value) {
    console.log(value)
  }
}
const target1 = {}
Object.assign(target1, source)
Object.getOwnPropertyDescriptor(target1, 'foo')
// {
//   value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

const source = {
  set foo(value) {
    console.log(value)
  }
}
const target2 
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source))
Object.getOwnPropertyDescriptor(target2, 'foo')
// {
//   get: undefined,
//   set: [Function: set foo],
//   enumerable: true, 
//   configurable: true
// }

const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
)

const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
// 或者
const shallowClone = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

const obj = {
  __proto__: prot, // 浏览器环境可用
  foo: 123
}

const obj = Object.create(prot)
obj.foo = 123
// 或者
const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123
  }
)

const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123
  })
)

let mix = (object) => ({
  with: (...mixins) => mixins.reduce(
    (c, mixin) => Object.create(c, Object.getOwnPropertyDescriptors(mixin)),
    object
  )
})
// multiple mixins example
let a = { a: 'a' }
let b = { b: 'b' }
let c = { c: 'c' }
let d = mix(c).with(a, b)
d.c // 'c'
d.b // 'b'
d.a // 'a'

// es5写法
const obj = {
  method: function() {
    // ...
  }
}
obj.__proto__ = someOtherObj

// es6写法
var obj = Object.create(someOtherObj)
obj.method = function() {
  // ...
}

// 浏览器中的__proto__的具体实现 
Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this)
    return Object.getPrototypeOf(_thisObj)
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError()
    }
    if (!isObject(this)) {
      return undefined
    }
    if (!isObject(proto)) {
      return undefined
    }
    let status = Reflect.setPrototypeOf(this, proto)
    if (!status) {
      throw new TypeError()
    }
  }
})
function isObject(value) {
  return Object(value) === value
}

Object.getPrototypeOf({ __proto__: null }) // null

// 格式
Object.setPrototypeOf(object, prototype)
// 用法
const o = Object.setPrototypeOf({}, null)

function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto
  return obj
}

let proto = {}
let obj = { x: 10 }
Object.setPrototypeOf(obj, proto)

proto.y = 20
proto.z = 40

obj.x // 10
obj.y // 20
obj.z // 40

Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true

Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Object.getPrototypeOf(obj)

function Rectangle() {
  // ...
}
const rec = new Rectangle()
Object.getPrototypeOf(rec) === Rectangle.prototype // true
Object.setPrototypeOf(rec, Object.prototype)
Object.getPrototypeOf(rec) === Rectangle.prototype // false

// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ''}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true

Object.getPrototypeOf(null) 
// TypeError: Cannot convert undefined or null to object
Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object

var obj = { foo: 'bar', baz: 42 }
Object.keys(obj)
// ['boo', 'baz']

let { keys, values, entries } = Object
let obj = { a: 1, b: 2, c: 3 }
for (let key of keys(obj)) {
  console.log(key) // 'a', 'b', 'c'
}
for (let value of values(obj)) {
  console.log(value) // 1, 2, 3
}
for (let [key, value] of entries(obj)) {
  console.log([key, value]) // ['a', 1], ['b', 2], ['c', 3]
}

const obj = { foo: 'bar', baz: 42 }
Object.values(obj)
// ['bar', 42]

const obj = { 100: 'a', 2: 'b', 7: 'c' }
Object.values(obj)
// ['b', 'c', 'a']

const obj = Object.create({}, { p: { value: 42 } })
Object.values(obj) // []

const obj = Object.create({}, { p:
  {
    value: 42,
    enumerable: true
  }
})
Object.values(obj) // [42]

Object.values({ [Symbol()]: 123, foo: 'abc' })
// ['abc']

Object.values('foo')
// ['f', 'o', 'o']

Object.values(42) // []
Object.values(true) // []

const obj = { foo: 'bar', baz: 42 }
Object.entries(obj)
// [['foo', 'bar'], ['baz', 42]]

Object.entries({ [Symbol()]: 123, foo: 'abc' })
// [['foo', 'abc']]

let obj = { one: 1, two: 2 }
for (let [k, v] of Object.entries(obj)) {
  console.log(`${JSON.stringify(k)}: ${JSON.stringify(v)}`)
}
// 'one': 1
// 'two': 2

const obj = { foo: 'bar', baz: 42 }
const map = new Map(Object.entries(obj))
map // Map { foo: 'bar', baz: 42 }