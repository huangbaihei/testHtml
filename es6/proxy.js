var obj = new Proxy({}, {
  get(target, propKey, receiver) {
    console.log(`getting${propKey}`)
    return Reflect.get(target, propKey, receiver)
  },
  set(target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`)
    return Reflect.set(target, propKey, value, receiver)
  }
})

obj.count = 1
// setting count!
++obj.count
// getting count!
// setting count!
// 2

var proxy = new Proxy({}, {
  get(target, propKey) {
    return 35
  }
})

proxy.time // 35
proxy.name // 35
proxy.title // 35

var target = {}
var handler = {}
var proxy = new Proxy(target, handler)
proxy.a = 'b'
target.a // 'b'

var object = { proxy: new Proxy(target, handler) }

var proxy = new Proxy({}, {
  get(target, propKey) {
    return 35
  }
})
let obj = Object.create(proxy)
obj.time // 35

var handler = {
  get(target, name) {
    if (name === 'prototype') {
      return Object.prototype
    }
    return 'Hello,' + name
  },
  apply(target, thisBinding, args) {
    return args[0]
  },
  construct(target, args) {
    return { value: args[1] }
  }
}
var fproxy = new Proxy(function(x, y) {
  return x + y
}, handler)

fproxy(1, 2) // 1
new fproxy(1, 2) // { value: 2 }
fproxy.prototype === Object.prototype // true
fproxy.foo === 'Hello, foo' // true

var person = {
  name: '张三'
}
var proxy = new Proxy(person, {
  get(target, propKey) {
    if (propKey in target) {
      return target[proKey]
    } else {
      throw new ReferenceError(`Prop name"${propKey}"does not exist`)
    }
  }
})
proxy.name // '张三'
proxy.age // 抛出一个错误

let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET' + propertyKey)
    return target[propertyKey]
  }
})
let obj = Object.create(proto)
obj.foo // 'GET foo'

function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey)
      if (index < 0) {
        propKey = String(target.length + index)
      }
      return Reflect.get(target, propKey, receiver)
    }
  }
  let target = []
  target.push(...elements)
  return new Proxy(targetk, handler)
}
let arr = createArray('a', 'b', 'c')
arr[-1] // c

var pipe = function(value) {
  var funcStack = []
  var oproxy = new Proxy({}, {
    get(pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val)
        }, value)
      }
      funcStack.push(window[fnName])
      return oproxy
    }
  })
  return oproxy
}
var double = n => n * 2
var pow = n => n * n
var reverseInt = n => n.toString().split('').reverse().join('') | 0
pipe(3).double.pow.reverseInt.get // 63

const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property)
      for (let prop of Object.keys(atts)) {
        el.setArribute(prop, attrs[prop])
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child)
        }
        el.appendChild(child)
      }
      return el
    }
  }
})
const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '...actually that\'s if'))
)
document.body.appendChild(el)

const proxy = new Proxy({}, {
  get(target, key, receiver) {
    return receiver
  }
})
proxy.getReceiver === proxy // true

const proxy = new Proxy({}, {
  get(target, key, receiver) {
    return receiver
  }
})
const d = Object.create(proxy)
d.a === d // true

const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  }
})
const handler = {
  get(target, propKey) {
    return 'abc'
  }
}
const proxy = new Proxy(target, hanlder)

proxy.foo
// TypeError: Invariant check failed

let validator = {
  set(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }
    // 对于满足条件的age属性以及其他属性，直接保存
    obj[prop] = value
  }
}
let person = new Proxy({}, validator)
person.age = 100
person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错

const handler = {
  get(target, key) {
    invarivant(key, 'get')
    return target[key]
  },
  set(target, key, value) {
    invarivant(key, 'set')
    target[key] = value
    return true
  }
}
function invariant (key, action) {
  if (key[0] === '-') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property

const handler = {
  set(obj, prop, value, receiver) {
    obj[prop] = receiver
  }
}
const proxy = new Proxy({}, handler)
proxy.foo = 'bar'
proxy.foo === proxy // true

const handler = {
  set(obj, prop, value, receiver) {
    obj[prop] = receiver
  }
}
const proxy = new Proxy({}, handler)
const myObj = {}
Object.setPrototypeOf(myObj, proxy)
myObj.foo = 'bar'
myObj.foo === myObj // true

const obj = {}
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false
})
const handler = {
  set(obj, prop, value, receiver) {
    obj[prop] = 'baz'
  }
}
const proxy = new Proxy(obj, handler)
proxy.foo = 'baz'
proxy.foo // 'bar'

'use strict'
const handler = {
  set(obj, prop, value, receiver) {
    obj[prop] = receiver
    // 无论有没有下面这一行，都会报错
    return false
  }
}
const proxy = new Proxy({}, handler)
proxy.foo = 'bar'
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'

var handler = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments)
  }
}

var target = function() {
  return 'I am the target'
}
var handler = {
  apply() {
    return 'I am the proxy'
  }
}
var p = new Proxy(target, handler)
p()
// 'I am the proxy'

var twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  }
}
function sum (left, right) {
  return left + right
}
var proxy = new Proxy(sum, twice)
proxy(1,2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

Reflect.apply(proxy, null, [9, 10]) // 38

var handler = {
  has (target, key) {
    if (key[0] === '-') {
      return false
    }
    return key in target
  }
}
var target = { _prop: 'foo', prop: 'foo' }
var proxy = new Proxy(target, handler)
'_prop' in proxy // false

var obj = { a: 10 }
Object.preventExtensions(obj)
var p = new Proxy(obj, {
  has(target, prop) {
    return false
  }
})
'a' in p // TypeError is thrown

let stu1 = { name: '张三', score: 59 }
let stu2 = { name: '李四', score: 99 }
let handler = {
  has (target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`)
      return false
    }
    return prop in target
  }
}
let oproxy1 = new Proxy(stu1, handler)
let oproxy2 = new Proxy(stu2, handler)
'score' in oproxy1
// 张三 不及格
// false
'score' in oproxy2
// true
for (let a in oproxy1) {
  console.log(oproxy1[a])
}
// 张三
// 59
for (let b in oproxy2) {
  console.log(oproxy2[b])
}
// 李四
// 99

var handler = {
  construct (target, args, newTarget) {
    return new target(...args)
  }
}

var p = new Proxy(function(){}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '))
    return { value: args[0] * 10 }
  }
})
(new p(1)).value
// "called: 1"
// 10

var p = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    return 1
  }
})
new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object

var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete')
    delete target[key]
    return true
  }
}
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}
var target = { _prop: 'foo'}
var proxy = new Proxy(target, handler)
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property

var handler = {
  defineProperty (target, key, descriptor) {
    return false
  }
}
var target = {}
var proxy = new Proxy(target, handler)
proxy.foo = 'bar' // 不会生效

var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') return
    return Object.getOwnPropertyDescriptor(target, key)
  }
}
var target = { _foo: 'bar', baz: 'tar' }
var proxy = new Proxy(target, handler)
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }

var proto = {}
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto
  }
})
Object.getPrototypeOf(p) === proto // true

var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called")
    return true
  }
})
Object.isExtensible(p)
// "called"
// true

Object.isExtensible(proxy) === Object.isExtensible(target)

var p = new Proxy({}, {
  isExtensible: function(target) {
    return false
  }
})
Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')

let target = {
  a: 1, 
  b: 2,
  c: 3
}
let handler = {
  ownKeys(target) {
    return ['a']
  }
}
let proxy = new Proxy(target, handler)
Object.keys(proxy)
// ['a']

let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
}
let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_')
  }
}
let proxy = new Proxy(target, handler)
for (let key of Object.keys(proxy)) {
  console.log(target[key])
}
// "baz"

let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4'
}
Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
})
let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key']
  }
}
let proxy = new Proxy(target, handler)
Object.keys(proxy)
// ['a']

var p = new Proxy({}, {
  ownKeys: function(target) {
    return ['a', 'b', 'c']
  }
})
Object.getOwnPropertyNames(p)
// ['a', 'b', 'c']

const obj = { hello: 'world' }
const proxy = new Proxy(obj, {
  ownKeys: function() {
    reutrn ['a', 'b']
  }
})
for (let key in proxy) {
  console.log(key) // 没有任何输出
}

var obj = {}
var p = new Proxy(obj, {
  ownKeys: function(target) {
    return [123, true, undefined, null, {}, []]
  }
})
Object.getOwnPropertyNames(p)
// uncaught TypeError: 123 is not a valid property name

var obj = {}
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10
})
var p = new Proxy(obj, {
  ownKeys: function(target) {
    retrun ['b']
  }
})
Object.getOwnPropertyName(p)
// uncauget TypeError: 'ownKeys' on proxy: trap result did not include 'a'

var obj = {
  a: 1
}
Object.preventExtensions(obj)
var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b']
  }
})
Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible

var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true
  }
})
Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible

var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called')
    Object.preventExtensions(target)
    return true
  }
})
Object.preventExtensions(proxy)
// "called"
// Proxy{}

var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden')
  }
}
var proto = {}
var target = function() {}
var proxy = new Proxy(target, handler)
Object.setPrototypeOf(proxy, proto)
// Error: Changing the prototype is forbidden

let target = {}
let handler = {}
let { proxy, revoke } = Proxy.revocable(target, handler)
proxy.foo = 123
proxy.foo // 123
revoke()
proxy.foo // TypeError: Revoked

const target = {
  m: function () {
    console.log(this === proxy)
  }
}
const handler = {}
const proxy = new Proxy(target, handler)
target.m() // false
proxy.m() // true

const _name = new WeakMap()
class Person {
  constructor(name) {
    _name.set(this, name)
  }
  get name() {
    return _name.get(this)
  }
}
const jane = new Person('jane')
jane.name // 'Jane
const proxy = new Proxy(jane, {})
proxy.name // undefined

const target = new Date()
const handler = {}
const proxy = new Proxy(target, handler)
proxy.getDate()
// TypeError: this is not a Date object.

const target = new Date('2015-01-01')
const handler = {
  get (target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target)
    }
    return Reflect.get(target, prop)
  }
}
const proxy = new Proxy(target, handler)
proxy.getDate() // 1

const service = createWebService('http://example.com/data')
service.employees().then(json => {
  const employees = JSON.parse(json)
  // ...
})

function createWebService(baseUrl) {
  return new Proxy({}, {
    get (target, propKey, receiver) {
      return () => httpGet(baseUrl + '/' + propKey)
    }
  })
}
