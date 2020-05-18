// Set
const s = new Set()
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x))
for (let i of s) {
  console.log(i)
}
// 2 3 5 4

const set = new Set([1, 2, 3, 4, 4])
// [...set]
// [1, 2, 3, 4]
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5])
items.size // 5
const set = new Set()
document.querySelectorAll('div').forEach(div => set.add(div))
set.size // 56

// 去除数组的重复成员
// [...new Set(array)]

// [...new Set('ababbc')].join('')
// 'abc'

let set = new Set()
let a = NaN
let b = NaN
set.add(a)
set.add(b)
set // Set {NaN}

let set = new Set()
set.add({})
set.size // 1
set.add({})
set.size // 2

s.add(1).add(2).add(2)
// 注意2被加入了两次
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false
s.delete(2)
s.has(2) // false

// 对象写法
const properties = {
  'width': 1,
  'height': 1
}
if (properties[someName]) {
  // do something
}
// Set的写法
const propertied = new Set()
properties.add('width')
properties.add('height')
if (properties.has(someName)) {
  // do something
}

const items = new Set([1, 2, 3, 4, 5])
const array = Array.from(items)

function dedupe(array) {
  return Array.from(new Set(array))
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]

let set = new Set(['red', 'green', 'blue'])
for (let item of set.keys()) {
  console.log(item)
}
// red
// green
// blue
for (let item of set.values()) {
  console.log(item)
}
// red
// green
// blue
for (let item of set.entries()) {
  console.log(item)
}
// ['red', 'red']
// ['green', 'green']
// ['blue', 'blue']

Set.prototype[Symbol.iterator] === Set.prototype.values
// true

let set = new Set(['red', 'green', 'blue'])
for (let x of set) {
  console.log(x)
}
// red
// green
// blue

let set = new Set([1, 4, 9])
set.forEach((value, key) => console.log(key + ':' + value))
// 1 : 1
// 4 : 4
// 9 : 9

let set = new Set(['red', 'green', 'blue'])
let arr = [...set]
// ['red', 'green', 'blue']

let arr = [3, 5, 2, 2, 5, 5]
let unique = [...new Set(arr)]
// [3, 5, 2]

let set = new Set([1, 2, 3])
set = new Set([...set].map(x => x * 2))
// 返回Set结构：[2, 4, 6]
let set = new Set([1, 2, 3, 4, 5])
set = new Set([...set].filter(x => (x % 2) == 0))
// 返回Set结构：{2, 4}

let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])
// 并集
let union = new Set([...a, ...b])
// Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x)))
// set {2, 3}
// 差集
let difference = new Set([...a].filter(x => !b.has(x)))
// Set {1}

// 方法一
let set = new Set([1, 2, 3])
set = new Set([...set].map(val => val * 2))
// set的值是2, 4, 6
// 方法二
let set = new Set([1, 2, 3])
set = new Set(Array.from(set, val => val * 2))
// set的值是2, 4, 6

// WeakSet
const ws = new WeakSet()
ws.add(1)
// TypeError: Invaild value used in weak set
ws.add(Symbol())
// TypeError: Invaild value used in weak set

const ws = new WeakSet()

const a = [[1, 2], [3, 4]]
const ws = new WeakSet(a)
// WeakSet {[1, 2], [3, 4]}

const b = [3, 4]
const ws = new WeakSet(b)
// Uncaught TypeError: Invalid value used in weak set(...)

const ws = new WeakSet()
const obj = {}
const foo = {}
ws.add(window)
ws.add(foo)
ws.has(window) // true
ws.has(foo) // false
ws.delete(window)
ws.has(window) // false

ws.size // undefined
ws.forEach // undefined
ws.forEach(function(item) {
  console.log('WeakSet has' + item)
})
// TypeError: undefined is not a function

const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method() {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用!')
    }
  }
}

// Map
const data = {}
const element = document.getElementById('myDiv')
data[element] = 'metadata'
data['[object HTMLDivElement]'] // 'metadata'

const m = new Map()
const o = {p: 'Hello World'}
m.set(o, 'content')
m.get(o) // 'content'
m.has(o) // true
m.delete(o) // true
m.has(o) // false

const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
])
map.size // 2
map.has('name') // true
map.get('name') // '张三'
map.has('title') // true
map.get('title') // 'Author'

const items = [
  ['name', '张三'],
  ['title', 'Author']
]
const map = new Map()
items.forEach(([key, value]) => map.set(key, value))

const set = new Set([
  ['foo', 1],
  ['bar', 2]
])
const m1 = new Map(set)
m1.get('foo') // 1
const m2 = new Map([['baz', 3]])
const m3 = new Map(m2)
m3.get('baz') // 3

const map = new Map()
map.set(1, 'aaa').set(1, 'bbb')
map.get(1) // 'bbb'

new Map().get('asfddfsasadf')
// undefined

const map = new Map()
map.set(['a'], 555)
map.get(['a']) // undefined

const map = new Map()
const k1 = ['a']
const k2 = ['a']
map.set(k1, 111).set(k2, 222)
map.get(k1) // 111
map.get(k2) // 222

let map = new Map()
map.set(-0, 123)
map.get(+0) // 123

map.set(true, 1)
map.set('true', 2)
map.get(true) // 1

map.set(undefined, 3)
map.set(null, 4)
map.get(undefined) // 3

map.set(NaN, 123)
map.get(NaN) // 123

const map = new Map()
map.set('foo', true)
map.set('bar', false)
map.size // 2

const m = new Map()
m.set('edition', 6) // 键是字符串
m.set(262, 'standard') // 键是数值
m.set(undefined, 'nah') // 键是undefined

let map = new Map().set(1, 'a').set(2, 'b').set(3, 'c')

const m = new Map()
const hello = function() {
  console.log('hello')
}
m.set(hello, 'Hello ES6!') // 键是函数
m.get(hello) // 'Hello ES6!'

const m = new Map()
m.set('edition', 6)
m.set(262, 'standard')
m.set(undefined, 'nah')

m.has('edition') // true
m.has('years') // false
m.has(262) // true
m.has(undefined) // true

const m = new Map()
m.set(undefined, 'nah')
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false

let map = new Map()
map.set('foo', true)
map.set('bar', false)

map.size // 2
map.clear()
map.size // 0

const map = new Map([
  ['F', 'no'],
  ['T', 'yes']
])
for (let key of map.keys()) {
  console.log(key)
}
// 'F'
// 'T'

for (let value of map.values()) {
  console.log(value)
}
// 'no'
// 'yes'

for (let item of map.entries()) {
  console.log(item[0], item[1])
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value)
}
// 'F' 'no'
// 'T' 'yes'

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value)
}
// 'F' 'no'
// 'T' 'yes'

map[Symbol.iterator] === map.entries
// true

const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [2, 'three']
])

// [...map.keys()]
// [1, 2, 3]

// [...map.values()]
// ['one', 'two', 'three']

// [...map.entries()]
// [[1, 'one'], [2, 'two'], [3, 'three']]

// [...map]
// [[1, 'one'], [2, 'two'], [3, 'three']]

const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c')

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
)
// 产生Map结构{1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
)
// 产生Map结构{2 => '_a', 4 => '_b', 6 => '_c'}

map.forEach(function(value, key, map) {
  console.log('Key: %s, Value: %s', key, value)
})

const reporter = {
  report: function(key, value) {
    console.log(("key: %s, Value: %s", key, value))
  }
}
map.forEach(function(value, key, map) {
  this.reporter(key, value)
}, reporter)

const myMap = new Map()
  .set(true, 7)
  .set({ foo: 3 }, ['abc'])
// [...myMap]
// [[true, 7],[{ foo: 3 }, ['abc']]]

new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

function strMapToObj(strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}
const myMap = new Map()
  .set('yes', true)
  .set('no', false)
strMapToObj(myMap)
// { yes: true, no: false }

let obj = { 'a': 1, 'b': 2 }
let map = new Map(Object.entries(obj))

function objToStrMap(obj) {
  let strMap = new Map()
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}
objToStrMap({yes: true, no: false})
// Map {'yes' => true, 'no' => false}

function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap))
}
let myMap = new Map().set('yes', true).set('no', false)
strMapToJson(myMap)
// '{"yes": true, "no": false}'

function mapToArrayJson(map) {
  return JSON.stringify([...map])
}
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc'])
mapToArrayJson(myMap)
// '[[true, 7],[{"foo": 3}, ["abc"]]]'

function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr))
}
jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr))
}
jsonToMap('[[true, 7],[{"foo": 3}, ["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc]}

// WeakMap
const wm1 = new WeakMap()
const key = {foo: 1}
wm1.set(key, 2)
wm1.get(key) // 2

const k1 = [1, 2, 3]
const k2 = [4, 5, 6]
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']])
wm2.get(k2) // 'bar'

const map = new WeakMap()
map.set(1, 2)
// TypeError: 1 is not an object
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key

const e1 = document.getElementById('foo')
const e2 = document.getElementById('bar')
const arr = [
  [e1, 'foo元素'],
  [e2, 'bar元素']
]

// 不需要e1和e2的时候
// 必须手动删除引用
arr[0] = null
arr[1] = null

const wm = new WeakMap()
const element = document.getElementById('example')
wm.set(element, 'some information')
wm.get(element) // "some information"

const wm = new WeakMap()
let key = {}
let obj = {foo: 1}
wm.set(key, obj)
obj = null
wm.get(key)
// Object {foo: 1}

const wm = new WeakMap()
// size、forEach、clear方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined

let myWeakmap = new WeakMap()
myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0}
)
document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'))
  logoData.timesClicked++
}, false)

const _counter = new WeakMap()
const _action = new WeakMap()
class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter)
    _action.set(this, action)
  }
  dec() {
    let counter = _counter.get(this)
    if (counter < 1) return
    counter--
    _counter.set(this, counter)
    if (counter === 0) {
      _action.get(this)()
    }
  }
}
const c = new Countdown(2, () => console.log('DONE'))

c.dec()
c.dec()
// DONE








