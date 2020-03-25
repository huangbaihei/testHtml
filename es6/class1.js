class Point {}
class ColorPoint extends Point {}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  toString() {
    return `${this.color} ${super.toString()}`
  }
}

class Point {}
class ColorPoint extends Point {
  constructor() {

  }
}
let cp = new ColorPoint() // 报错

class ColorPoint extends Point {

}
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // 报错
    super(x, y);
    this.color = color;
  }
}

let cp = new ColorPoint(25, 8, 'green');
cp instanceof ColorPoint // true
cp instanceof Point // true

class A {
  static hello() {
    console.log('hello world')
  }
}

class B extends A {

}

B.hello()

Object.getPrototypeOf(ColorPoint) === Point // true

class A {}

class B extends A {
  constructor() {
    super();
  }
}

class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}

new A // A
new B // B

class A {}
class B extends A {
  m() {
    super(); // 报错
  }
}

class A {
  p() {
    return 2;
  }
}
class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}
let p = new B();

class A {
  constructor() {
    this.p = 2; // 实例属性
  }
}
class B extends A {
  get m() {
    return super.p;
  }
}
let b = new B();
b.m //undefined  super能取到的只是原型属性

class A {}
A.prototype.x = 2;
class B extends A {
  constructor() {
    super();
    console.log(super.x); // 2
  }
}
let b = new B();

class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();  // 在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
  }
}
let b = new B();
b.m();

class A {
  constructor() {
    this.x = 1; // 实例属性
  }
}
class B extends A {
  constructor() {
    super(); // 执行了父类的构造函数
    this.x = 2;
    super.x = 3; // 赋值时是对this赋值，取值时是从原型上取
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}
let b = new B();

class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }
  myMethod(msg) {
    console.log('instance', msg);
  }
}
class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg); // super在静态方法之中指向父类，在普通方法之中指向父类的原型对象
  }
  myMethod(msg) {
    super.myMethod(msg);
  }
}
Child.myMethod(1); // static 1
var child = new Child();
child.myMethod(2); // instance 2

class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print(); // 子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
  }
}
B.x = 3;
B.m(); // 3

class A {}
class B extends A {
  constructor() {
    super();
    // console.log(super); // 报错  使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错
  }
}

class A {}
class B extends A {
  constructor() {
    super();
    console.log(super.valueOf() instanceof B); // true
  }
}
let b = new B();

var obj  = {
  toString() {
    return "Myobject: " + super.toString();
  }
}
obj.toString(); // MyObject: [object object]

class A {

}
class B extends A {

}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true

class A {}
class B {}
Object.setPrototypeOf(B.prototype, A.prototype);
Object.setPrototypeOf(B, A);
const b = new B();

Object.setPrototypeOf = function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;

B.prototype = Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

class B extends A {}

class A extends Object {

}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true

class A {

}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true

var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');
p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true

p2.__proto__.__proto__.printName = function() {
  console.log('Ha');
}

p1.printName(); // Ha

Boolean() 
Number()
String()
Array()
Date()
Function()
RegExp()
Error()
Object()

function MyArray() {
  Array.apply(this, arguments);  // 原生构造函数的this无法绑定，导致拿不到内部属性
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writeable: true,
    configurable: true,
    enumerable: true
  }
})

var colors = new MyArray();
colors[0] = "red";
colors.length // 0
colors.length = 0;
colors[0] // 'red'

var e = {};
Object.getOwnPropertyNames(Error.call(e)) //['stack']
Object.getOwnPropertyNames(e) // []

class MyArray extends Array {  // ES6 可以自定义原生数据结构（比如Array、String等）的子类，这是 ES5 无法做到的。
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1
arr.length = 0;
arr[0] // undefined

class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();
x.push(1);
x.push(2);
x // [1,2]
x.history // [[]]
x.commit();
x.history // [[], [1,2]]
x.push(3)
x // [1,2,3]
x.history // [[], [1,2]]
x.revert();
x // [1,2]

class ExtendableError extends Error {
  constructor(message) {
    super();
    this.messgae = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError('11');
myerror.message // '11'
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
// at MyError.ExtendableError
// ...


class NewObj extends Object { // 一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数。
  constructor() {
    super(...arguments);
  }
}
var o = new NewObj({attr: true})
o.attr === true // false

const a = {
  a: 'a'
}
const b = {
  b: 'b'
}
const c = { ...a, ...b } // { a: 'a', b: 'b' }

function mix(...mixins) {
  class Mix {
    constructor() {
      for (let minxin of mixins) {
        copyProperties(this, new minxin()); // 拷贝实例属性
      }
    }
  }
  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }
  return Mix;
}
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}


