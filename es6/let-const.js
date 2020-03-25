{
  let a = 10
  var b = 1
}
a // ReferenceError: a is not defined
b // 1

for (let i = 0; i < 10; i++) {
  // ...
}
console.log(i) // ReferenceError: i is not defined

var a = []
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]() // 10

var a = []
for (let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]() // 6

for(let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i)
}
// abc
// abc
// abc

// var的情况
console.log(foo) // 输出undefined
var foo = 2

// let的情况
console.log(bar) // 报错ReferenceError
let bar = 2

var tmp = 123
if (true) { // 暂时性死区
  tmp = 'abc' // ReferenceError
  let tmp
}

if (true) {
  // TDZ开始
  tmp = 'abc' // ReferenceError
  console.log(tmp) // ReferenceError
  let tmp // TDZ结束
  console.log(tmp) // undefined
  tmp = 123 
  console.log(tmp) // 123
}

typeof x // ReferenceError
let x

typeof undeclared_variable // undefined

function bar(x = y, y = 2) {
  return [x, y]
}
bar() // 报错

function bar(x = 2, y = x) {
  return [x, y]
}
bar() // [2, 2]

// 不报错
var x = x

// 报错
let x = x // ReferenceError: x is not defined

// 报错
function func() {
  let a = 10
  var a = 1
}

// 报错
function func() {
  let a = 10
  let a = 1
}

function func(arg) {
  let arg
}
func() // 报错

function func(arg) {
  {
    let arg
  }
}
func() // 不报错

var tmp =  new Date()
function f() {
  console.log(tmp)
  if(false) {
    var tmp = 'hello world'
  }
}
f() // undefined

var a = 'hello'
for(var i = 0; i < a.length; i++) {
  console.log(s[i])
}
console.log(i) // 5

function f1() {
  let n = 5
  if(true) {
    let n = 10
  }
  console.log(n) // 5
}

{{{{
  {let insane = 'Hello World'}
  console.log(insane) // 报错
}}}}

{{{{
  let insane = 'Hello World'
  {let insane = 'Hello World'}
}}}}

// IIFE 写法
(function () {
  var tmp = '...'
  '...'
}())

// 块级作用域写法
{
  let tmp = '...'
  '...'
}

// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
  // ...
}

function f() {
  console.log('I am outside!')
}
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() {
      console.log('I am inside!')
    }
  }
  f()
}())

// ES5环境
function f() {
  console.log('I am outside!')
}
(function () {
  function f() {
    console.log('I am inside!')
  }
  if (false) {

  }
  f()
})

// 浏览器的ES6环境
function f() {
  console.log('I am outside!')
}
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() {
      console.log('I am inside!')
    }
  }
  f();
}())
// Uncaught TypeError: f is not a function

// 浏览器的ES6环境
function f() {
  console.log('I am outside!')
}
(function() {
  var f = undefined
  if (false) {
    function f() {
      console.log('I am inside!')
    }
  }
  f()
}())
// Uncaught TypeError: f is not a function

// 块级作用域内的函数声明语句，建议不要使用
{
  let a = 'secret'
  function f() {
    return a
  }
}
// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret'
  let f = function() {
    return a
  }
}

// 报错
if (true) let x = 1

// 不报错
if (true) {
  let x = 1
}

// 不报错
'use strict'
if (true) {
  function f() {}
}
// 报错
'use strict'
if (true) function f() {}

const PI = 3.1415
PI // 3.1415
PI = 3 // TypeError: Assignment to constant variable

const foo // SyntaxError: Missing initializer in const deciaration

if (true) {
  const MAX = 5
}
MAX // Uncaught ReferenceError: MAX is not defined

if (true) {
  console.log(MAX) // ReferenceError
  const MAX
}

var message = 'Hello'
let age = 25
// 以下两行都会报错
const message = 'Goodbye!'
const age = 30

const foo = {}
// 为foo添加一个属性，可以成功
foo.prop = 123
foo.prop // 123
// 将foo指向另一个对象，报错
foo = {} // TypeError: "foo" is read-only

const a = []
a.push('Hello') // 可执行
a.length = 0 // 可执行
a = ['Dave'] // 报错

const foo = Object.freeze({})
// 常规模式下，下面一行不起作用
// 严格模式时，该行会报错
foo.prop = 123

const constantize = (obj) => { 
  Object.freeze(obj) // 只冻结第一层属性(内存地址)
  Object.keys.forEach((key, i) => { // 遍历属性递归将对象彻底冻结
    if (typeof obj[key] === 'object') {
      constantize(obj[key])
    }
  })
}

window.a = 1
a // 1
a = 2
window.a // 2

var a = 1
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用的方法，写成this.a
window.a // 1
let b = 1
window.b // undefined

// 取顶层对象(勉强可以使用的方法)
// 方法一
(typeof window !==  'undefined' ? window : (typeof process === 'object' && typeof require === 'function' && typeof global === 'object') ? global : this)
// 方法二
var getGlobal = function() {
  if (typeof self !== 'undefined') { return self }
  if (typeof window !== 'undefined') { return window }
  if (typeof global !== 'undefined') { return global }
  throw new Error('unable to locate global object')
}





