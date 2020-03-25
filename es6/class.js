function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return `(${this.x},${this.y})`;
}

var p = new Point(1, 2);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Point {

}
typeof Point
Point === Point.prototype.constructor  // .prototype.constructor相互抵消，prototype指向原型对象，constructor又指回构造函数

class Bar {
  doStuff() {
    console.log('stuff');
  }
}
var b = new Bar();
b.doStuff;

class Point {
  constructor() {

  }
  toString() {

  }
  toValue() {

  }
}

Point.prorotype = {
  constructor() {},
  toString() {},
  toValue() {}
}

class B{

}
let b = new B();
b.constructor === B.prototype.constructor

class Point {   // prototype对象的constructor属性，直接指向“类”的本身
  constructor() {

  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
})

class Point {
  constructor() {

  }
  toString() {

  }
}
Object.keys(Point.prototype);
Object.getOwnPropertyNames(Point.prototype);

var Point = function(x, y) {

}

Point.prototype.toString = function() {

}
Object.keys(Point.prototype);
Object.getOwnPropertyNames(Point.prototype);

class Point {

}
class Point {
  constructor() {

  }
}
class Foo{
  constructor() {
    return Object.create(null);
  }
}
new Foo instanceof Foo // false

Foo() // 会报错

class Point {

}
var point = Point(2, 3); // 错

var point = new Point(2, 3); // 对

class Point {
  constructor(x, y) {
    this.x = x;  // 在这里挂在this上的属性会成为实例的属性，不会成为原型的属性
    this.y = y;
  }
  toString() { // 这里的属性会成为原型的属性不会成为实例的私有属性
    return `(${this.x}, ${this.y})`;
  }
}
var point = new Point(2, 3);
point.toString();
point.hasOwnProperty('x');
point.hasOwnProperty('y');
point.hasOwnProperty('toString'); // false
point.__proto__.hasOwnProperty('toString') // true  实例的__proto__指向原型对象

var p1 = new Point(2, 3);
var p2 = new Point(3, 2);
p1.__proto__ === p2.__proto__ // true

p1.__proto__.printName = function() { return 'Oops'};
p1.printName()
p2.printName()
var p3 = new Point(2, 4);
p3.printName();
Object.getPrototypeOf(p1)

class Myclass {
  constructor() {

  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: ', value);
  }
}
let inst = new Myclass();
inst.prop = 123;
inst.prop

class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }
  get html() {
    return this.element.innerHTML;
  }
  set html(value) {
    this.element.innerHTML = value;
  }
}
var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
)
"get" in descriptor
"set" in descriptor

let methodName = 'getArea';
class Square {
  constructor(length) {

  }
  [methodName]() {

  }
}

const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
}
let inst = new MyClass();
inst.getClassName();
Me.name;

const MyClass = class {}

let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName();

new Foo(); // 报错
class Foo {};

{
  let Foo = class {};
  class Bar extends Foo {

  }
}
class Point {};
Point.name;

class Foo {
  constructor(...args) {
    this.args = args;
  }
  *[Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}

class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }
  print(text) {
    console.log(text);
  }
}
const logger = new Logger();
const { printName } = logger;
printName(); // 报错  因为单独提出来使用，找不到this了

class Logger{
  constructor() {
    this.printName = this.printName.bind(this); // 为方法绑定this
  }
}
class Obj {
  constructor() { // 箭头函数内部的this总是指向定义时所在的对象
    this.getThis = () => this;
  }
}
const myObj = new Obj();
myObj.getThis() === myObj // true

function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if(!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}
const logger = selfish(new Logger());

// 静态方法

class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod();
var foo = new Foo();
foo.classMethod(); // 报错

class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello

class Foo{
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {

}
Bar.classMethod(); // hello

class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + '123';
  }
}
Bar.classMethod() // hello123

class  IncreasingCounter {
  constructor () {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

class IncreasingCounter{
  _count = 0; 
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

class foo {
  bar = 'hello'; // 实例属性，不会成为原型属性，和在构造函数里挂在this上效果一样
  baz = 'world';
  constructor() {

  }
}

class Foo {

}
Foo.prop = 1; // 现在class内部只有静态方法，没有静态属性
Foo.prop // 1

// 新提案
class MyClass {
  static myStaticProp = 42;
  constructor() {
    console.log(MyClass.myStaticProp);
  }
}

class Foo {

}
Foo.prop = 1;

class Foo {
  static prop = 1;
}

// 私有方法/私有属性
class Widget {
  foo(baz) {
    this._bar(baz);
  }
  _bar(baz) {
    return this.snaf = baz;
  }
}

class Widget {
  foo(baz) {
    bar.call(this, baz);
  }
}
function bar(baz) {
  return this.snaf = baz;
}

const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass {
  foo(baz) {
    this[bar](baz);
  }
  [bar](baz) {
    return this[snaf] = baz;
  }
}

const inst = new myClass();
Reflect.ownKeys(myClass.prototype)

// 提案
// class IncreasingCounter {
//   #count = 0;
//   get value() {
//     console.log('Getting the current value');
//     return this.#count;
//   } 
//   increment() {
//     this.#count++;
//   }
// }

// const counter = new IncreasingCounter();
// counter.#count // 报错
// counter.#count = 42 // 报错

// class Point {
//   #x;
//   constructor() {
//     this.#x = +x;
//   }
//   get x() {
//     return this.#x;
//   }
//   set x(value) {
//     this.#x = +value;
//   }
// }

// class Foo {
//   #a;
//   #b;
//   constructor(a, b) {
//     this.#a = a;
//     this.#b = b;
//   }
//   #sum() {
//     return #a + #b;
//   }
//   printSum() {
//     console.log(this.#sum());
//   }
// }

// class Counter{
//   #xValue = 0;
//   constructor() {
//     super();
//   }
//   get #x() {
//     return #xValue;
//   }
//   set #x(value) {
//     this.#xValue = value;
//   }
// }

// class Foo {
//   #privateValue = 42;
//   static getPrivateValue(foo) {
//     return foo.#privateValue;
//   }
// }
// Foo.getPrivateValue(new Foo()); // 42

// class FakeMath{
//   static PI = 22 / 7;
//   static #totallyRandomNumber = 4;
//   static #computeRandomNumber() {
//     return FakeMath.#totallyRandomNumber
//   }
//   static random() {
//     console.log('I heard you like random numbers...');
//     return FakeMath.#computeRandomNumber();
//   }
// }
// FakeMath.PI
// FakeMath.random()
// FakeMath.#totallyRandomNumber // 报错
// FakeMath.#computeRandomNumber() // 报错

// 私有属性和私有方法只能在类内部调用
// 静态属性和静态方法不会被实例继承，只能通过类来调用(可以被子类继承，被子类调用)

// 实例的属性和原型的属性也是有区别的，实例属性不能被继承，不能被原型调用

function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用new命令来生成实例')
  }
}

function Person(name) {
  if(new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new命令来生成实例');
  }
}

var person = new Person('张三');
var notAPerson = Person.call(person, '张三'); // 错误

class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}
var obj = new Rectangle(3, 4);

class Rectangle {
  consturctor(length, width) {
    console.log(new.target === Rectangle);

  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length, width);
  }
}
var obj = new Square(3); // false

class Shape{
  constructor() {
    if(new.target === Shape) {
      throw new Error('本类不能被实例化');
    }
  }
}
class Rectangle extends Shape {
  constructor(length, width) {
    super();
  }
}
var x = new Shape(); // 报错
var y = new Rectangle(3, 4); // 正确



