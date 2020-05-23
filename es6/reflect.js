// 老写法
try {
  Object.defineProperty(target, property, attributes)
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}

// 老写法
'assign' in Object // true
// 新写法
Reflect.has(Object, 'assign') // true

Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver)
    if (success) {
      console.log(`property ${name} on ${target} set to value`)
    }
    return success
  }
})

var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name)
    return Reflect.get(target, name)
  },
  deleteProperty(target, name) {
    console.log('delete' + name)
    return Reflect.deleteProperty(target, name)
  },
  has(target, name) {
    console.log('has' + name)
    return Reflect.has(target, name)
  }
})

// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1

var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  }
}
Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3

var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  }
}
var myReceiverOject = {
  foo: 4,
  bar: 4,
}
Reflect.get(myObject, 'baz', myReceiverOject) // 8

Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错

var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value
  }
}
myObject.foo // 1
Reflect.set(myObject, 'foo', 2)
myObject.foo // 2
Reflect.set(myObject, 'bar', 3)
myObject.foo // 3

var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value
  }
}
var myReceiverObject = {
  foo: 0
}
Reflect.set(myObject, 'bar', 1, myReceiverObject)
myObject.foo // 4
myReceiverObject.foo // 1

let p = {
  a: 'a'
}
let handler = {
  set(target, key, value, receiver) {
    console.log('set')
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attributes) {
    console.log('defineProperty')
    Reflect.defineProperty(target, key, attributes)
  }
}
let obj = new Proxy(p, handler)
obj.a = 'A'
// set
// defineProperty

let p = {
  a: 'a'
}

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value)
  },
  defineProperty(target, key, attributes) {
    console.log('defineProperty')
    Reflect.defineProperty(target, key, attribute)
  }
}
let obj = new Proxy(p, handler)
obj.a = 'A'
// set

Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错

var myObject = {
  foo: 1
}
// 旧写法
'foo' in myObject // true
// 新写法
Reflect.has(myObject, 'foo') // true

const myObj = { foo: 'bar' }
// 旧写法
delete myObj.foo
// 新写法
Reflect.deleteProperty(myObj, 'foo')

function Greeting(name) {
  this.name = name
}
// new的写法
const instance = new Greeting('张三')
// Reflect.construct的写法
const instance = Reflect.construct(Greeting, ['张三'])

const myObj = new FancyThing()
// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype
// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype

Object.getPrototypeOf(1) // Number{[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1) // 报错

const myObj = {}
// 旧写法
Object.setPrototypeOf(myObj, Array.prototype)
// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype)
myObj.length // 0

Reflect.setPrototypeOf({}, null)
// true
Reflect.setPrototypeOf(Object.freeze({}), null)
// false

Object.setPrototypeOf(1, {})
// 1
Reflect.setPrototypeOf(1, {})
// TypeError: Reflect.setPrototypeOf called on non-object

Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Reflect.setPrototypeOf(null, {})
// TypeError: Reflect.setPrototypeOf called on non-object

const ages = [11, 33, 12, 54, 18, 96]
// 旧写法
const youngest = Math.min.apply(Math, ages)
const oldest = Math.max.apply(Math, ages)
const type = Object.prototype.toString.call(youngest)
// 新写法
const youngest = Reflect.apply(Math.min, Math, ages)
const oldest = Reflect.apply(Math.max, Math, ages)
const type = Reflect.apply(Object.prototype.toString, youngest, [])

function MyDate() {
  /*...*/
}
// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
})
// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
})

const p = new Proxy({}, {
  defineProperty(target, prop, descriptor) {
    console.log(descriptor)
    return Reflect.defineProperty(target, prop, descriptor)
  }
})
p.foo = 'bar'
// {value: "bar", writable: true, enumerable: true, configurable: true}
p.foo // "bar"

var myObject = {}
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false
})
// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden')
// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden')

const myObject = {}
// 旧写法
Object.isExtensible(myObject) // true
// 新写法
Reflect.isExtensible(myObject) // true

Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错

var myObject = {}
// 旧写法
Object.preventExtensions(myObject) // Object {}
// 新写法
Reflect.preventExtensions(myObject) // true

// ES5环境
Object.preventExtensions(1) // 报错
// ES6环境
Object.preventExtensions(1) // 1
// 新写法
Reflect.preventExtensions(1) // 报错

var myObject = {
  foo: 1, 
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4
}
// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']
Object.getOwnPropertySymbols(myObject)
// [Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]

const person = observable({
  name: '张三',
  age: 20
})
function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print)
person.name = '李四'
// 输出
// 李四， 20

const queuedObservers = new Set()

const observe = fn => queuedObservers.add(fn)
const observable = obj => new Proxy(obj, { set })

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  queuedObservers.forEach(observer => observer())
  return result
}

