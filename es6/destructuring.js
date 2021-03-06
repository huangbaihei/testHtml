// 解构赋值 
// 本质是key名需要一样，value名可以随意取，最后解构出来得到的变量名就是value名，变量值是value(数组的key可以看做是index)
// key只是用来寻找定位的，在结构赋值的左边可以写多个
// 结构一样才能顺利解构，多层结构一样则能解构多层(对象中的key用数字就可以解构数组)

// 数组

let a = 1
let b = 2
let c = 3

let [a, b, c] = [1, 2, 3]

let [foo, [[bar], baz]] = [1, [[2], 3]]
foo // 1
bar // 2
baz // 3

let [ , , third] = ['foo', 'bar', 'baz']
third // 'baz'

let [x, , y] = [1, 2, 3]
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4]
head // 1
tail [2, 3, 4]

let [x, y, ...z] = ['a']
x // 'a'
y // undefined
z // []

let [foo] = []
let [bar, foo] = [1]

let [x, y] = [1, 2, 3]
x // 1
y // 2

let [a, [b], c] = [1, [2, 3], 4]
a // 1
b // 2
c // 4

// 报错 不可遍历的结构 不具备Iterator接口
let [foo] = 1
let [foo] = false
let [foo] = NaN
let [foo] = undefined
let [foo] = null
let [foo] = {}

let [x, y, z] = new Set(['a', 'b', 'c'])
x // 'a'

// 数据结构具有Iterator接口就可以使用数组的解构赋值
function* fibs() {
  let [a, b] = [0, 1]
  while (true) {
    yield a; 
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs()
sixth // 5

let [foo = true] = []
foo // true
let [x, y = 'b'] = ['a'] // x='a' y='b'
let [x, y = 'b'] = ['a', undefined] // x='a' y='b

let [x = 1] = [undefined]
x // 1
let [x = 1] = [null]
x // null

function f() {
  console.log('aaa')
}
let [x = f()] = [1]

let x
if ([1][0] === undefined) {
  x = f()
} else {
  x = [1][0]
}

let [x = 1, y = x] = [] // x=1 y=1
let [x = 1, y = x] = [2] // x=2 y=2
let [x = 1, y = x] = [1, 2] // x=1 y=2
let [x = y, y = 1] = [] // ReferenceError: y is not defined

// 对象

let { foo, bar } = { foo: 'aaa', bar: 'bbb' }
foo // 'aaa'
bar // 'bbb'

let { bar, foo } = { foo: 'aaa', bar: 'bbb' }
foo // 'aaa'
bar // 'bbb'
let { baz } = { foo: 'aaa', bar: 'bbb' }
baz // undefined

let { foo } = { bar: 'baz' }
foo // undefined

let { log, sin, cos } = Math
const { log } = console
log('hello') // 'hello'

let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // 'aaa'

let obj = { first: 'hello', last: 'world' }
let { first: f, last: l } = obj
f // 'hello'
l // 'world'

let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' }
let { foo: bar } = { foo: 'aaa', bar: 'bbb' }
baz // 'aaa'
foo // error: foo is not defined

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
}
let { p: [x, { y }]} = obj
x // 'Hello'
y // 'World'

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
}
let { p, p: [x, { y }] } = obj
x // 'Hello'
y // 'World'
p // ['Hello', { y: 'World' }]

const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
}
let { loc, loc: { start }, loc: { start: { line } } } = node
line // 1
loc // Object { start: Object }
start // Object { line: 1, column: 5 }

const [obj, arr] = [{}, []]
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true})
obj // { prop: 123 }
arr // [true]

// 报错
let { foo: { bar } } = { baz: 'baz' }

// 对象结构赋值可以取到继承的属性
const [obj1, obj2] = [{}, { foo: 'bar' }]
Object.setPrototypeOf(obj1, obj2)
const { foo } = obj1
foo // 'bar'

var { x = 3 } = {}
x // 3
var { x, y = 5 } = { x: 1 }
x // 1
y // 5
var { x: y = 3 } = { x: 5 }
y // 5
var { message: msg = 'Something went wrong' } = {}
msg // 'Something went wrong'

var { x = 3 } = { x: undefined }
x // 3
var { x = 3 } = { x: null }
x // null

// 错误写法
let x
// { x } = { x: 1 } // SyntaxError: syntax error

// 正确写法
let x
({ x } = { x: 1 })

({} = [true, false])
({} = 'abc')
({} = [])

let arr = [1, 2, 3]
let { 0: first, [arr.length - 1]: last } = arr
first // 1
last // 3

// 字符串

const [a, b, c, d, e] = 'hello'
a // 'h'

let { length: len } = 'hello'
len // 5

// 数值和布尔值

let { toString: s } = 123
s === Number.prototype.toString // true
let { toString: s } = true
s === Boolean.prototype.toString // true

let { prop: x } = undefined // TypeError
let { prop: y } = null // TypeError

function add([x, y]) {
  return x + y
}
add([1, 2]) // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b) // [3, 7]

function move({ x = 0, y = 0 } = {}) {
  return [x, y]
}
move({ x: 3, y: 8 }) // [3, 8]
move({ x: 3 }) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]

function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y]
}
move({ x: 3, y: 8 }) // [3, 8]
move({ x: 3 }) // [3, undefined]
move({}) // [undefined ,undefined]
move() // [0, 0]

[1, undefined, 3].map((x = 'yes') => x) // [1, 'yes', 3]

// 全部报错
// let [(a)] = [1]
// let { x: (c) } = {}
// let ({ x: c }) = {}
// let {(x: c)} = {}
// let {(x): c} = {}
// let { o: ({ p: p }) } = { o: { p: 2 } }
// function f([(z)]) { return z }
// function f([z, (x)]) { reurn x }
// ({ p: a }) = { p: 42 }
// ([a]) = [5]
// [({ p: a }), { x: c }] = [{}, {}]

// 以下正确
[(b)] = [3]
({ p: (d) } = {})
[(parseInt.prop)] = [3]

// 交换变量的值
let [x, y] = [1, 2]
[x, y] = [y, x]

// 返回一个数组
function example() {
  return [1, 2, 3]
}
let [a, b, c] = example()

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  }
}
let { foo, bar } = example()

// 参数是一组有次序的值
function f([x, y, z]) {}
f([1, 2, 3])

// 参数是一组无次序的值
function f({ x, y, z }) {}
f({ z: 3, y: 2, x: 1 })

let jsonData = {
  id: 42,
  status: 'ok',
  data: [867, 5309]
}
let { id, status, data: number } = jsonData
console.log(id, status, number) // 42, 'OK',[867, 5309]

jQuery.ajax = function(url,  {
  async = true,
  beforeSend = function() {},
  cache = true,
  complete = function() {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
}

const map = new Map()
map.set('first', 'hello')
map.set('second', 'world')
for (let [key, value] of map) {
  console.log(`${key} is ${value}`)
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [,value] of map) {
  // ...
}

const { SourceMapConsumer, SourceNode } = require('source-map')







