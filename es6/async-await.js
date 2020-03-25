const fs = require('fs');
const readFile = function(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    })
  })
}

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
}

const asyncReadFile = async function() {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
}

async function getStockPriceByName(name) { // Promise.resolve(return)/Promise.reject(err)
  const symbol = await getStockSymbol(name);  
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function(result) {
  console.log(reslut);
})

function timeout(ms){
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function asyncPrint(value, ms) {
  await timeout(ms); // 等待Promise改变状态
  console.log(value);
}

asyncPrint('hello world', 50);

async function timeout(ms) {
  await new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);

async function foo() {

}

const foo = async function() {

}

let obj = { async foo() {} }
obj.foo().then()

class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }
  async getAvatar(name) { // Promise.resolve(return)/Promise.reject(err)
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then();

const foo = async () => {}


async function f() {
  return 'hello world';
}

f().then(v => console.log(v))

async function f() {
  throw new Error('出错了')
}
f().then(
  v => console.log(v),
  e => console.log(e)
)

async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title/i)[1];
}

getTitle('https://tc39.github.io/ecma262/').then(console.log(res))

async function f() {
  return await 123;
}
f().then(v => console.log(v))

class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    )
  }
}
(async() => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();

function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

async function one2FiveInAsync() {
  for (let i=1; i<=5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();

async function f() {
  await Promise.reject('出错了');
}

f().then(v => console.log(v)).catch(e => console.log(e));

async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('Hello World');
}

async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {

  }
  return await Promise.resolve('hello world');
}

f().then(v => console.log(v));

async function f() {
  await Promise.reject('出错了').catch(e => console.log(e))
  return await Promise.resolve('hello world')
}

f().then(v => console.log(v))

async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  })
}

f().then(v => console.log(v)).catch(e => console.log(e))

async function f() {
  try {
    await new Promise(function(resolve, reject) {
      throw new Error('出错了');
    })
  } catch(e) {

  }
  return await ('hello world');
}

async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val2);
    console.log('Final:', val3)
  } catch (e) {
    console.log(e)
  }
}

const superagent = require('superagent');
const NUM_RETRIES = 3;
async function test() {
  let i;
  for (i = 0; i<NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(e) {
      console.log(e);
    }
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000);
})
async function test() {  // 用async/await结合延时递归实现轮询比较简便
  let res;
  try {
    res = await promise;
    console.log(1)
  } catch(e) {
    setTimeout(test, 1000);
    console.log(0);
  }
}
test();

async function myFunction() {
  try {
    await someThingThatReturnsAPromise();
  } catch(err) {
    console.log(err);
  }
}

async function myFunction() {
  await someThingThatReturnsAPromise().catch(e => console.log(e))
}

let foo = await getFoo();
let bar = await getBar();  // 这个promise会等到上面的结果回来以后才会初始化

let [foo, bar] = await Promise.all([getFoo(), getBar()]);

let fooPromise = getFoo();
let barPromise = getBar(); // 这个promise会和上面的同步初始化
let foo = await fooPromise;
let bar = await barPromise;

async function dbFuc(db) { // 错误
  let docs = [{}, {}, {}];
  docs.forEach(function(doc) {
    await db.post(doc);
  })
}

function dbFuc(db) { // 错误
  let docs = [{}, {}, {}];
  docs.forEach(async function(doc) {
    await db.post(doc);
  })
}

async function dbFuc(db) {
  let docs = [{}, {}, {}]
  for (let doc of docs) {
    await db.post(doc);
  }
}

async function dbFuc(db) {
  let docs = [{}, {}, {}]
  let promise = docs.map(doc => db.post(doc))
  let results = await Promise.all(promise)
  console.log(results);
}

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = doc.map(doc => db.post(db));
  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}

const a = () => {
  b().then(() => c());
}

const a = async () => {
  await b();
  c();
}

async function fn(args) {

}

function fn(args) { 
  return spawn(function* () {

  })
}

function spawn(genF) { // 自动执行器
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      })
    }
    step(function() { return gen.next(undefined); });
  })
}


function chainAnimationsPromise(elem, animations) {
  let ret = null;
  let p = Promise.resolve();
  for (let anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    })
  }
  return p.catch(function(e) {

  }).then(function() {
    return ret;
  })
}

function chainAnimationsPromise(elem, animations) {
  return spawn(function* () {
    let ret = null;
    try {
      for (let anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {

    }
    return ret;
  })
}

async function chainAnimationsPromise(elem, animations) {
  let ret = null;
  try {
    for (let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {

  }
  return ret;
}

function logInOrder(urls) {
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  })
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise).then(text => console.log(text));
  }, Promise.resolve());
}

async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}

async function logInOrder(urls) {
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  })
  for (const textPromise of textPromises) {
    console.log(await textPromise)
  }
}
 
const data = await fetch('https://api.example.com');  // 报错

// awaiting.js
let output;
(async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})();
main();
export { output };

import { output } from "./awaiting.js" ;
function outputPlusValue(value) {
  return output + value;
}
console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100), 1000));

let output;
export default (async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})()
export { output };

import promise, { output } from "./awaiting.js";
function outputPlusValue(value) {
  return output + value;
}
promise.then(() => {
  console.log(outputPlusValue(100));
  setTimeout(() => console.log(outputPlusValue(100)), 1000);
})

const dynamic = import(someMission);
const data = fetch(url);
export const output = someProcess((await dynamic).default, await data);

import { output } from "./awaiting.js"; // 模块加载会暂停，等在export中的await异步操作完成，暂停时后续代码不执行
function outputPlusValue(value) {
  return output + value;
}
console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100)), 1000)

const strings = await import(`/i18n/${navigator.language}`);
const connection = await dbConnector();
let jQuery;
try {
  jQuery = await import('https://cdn-a.com/jQuery');
} catch {
  jQuery = await import('https://cdn-b.com/jQuery');
}

console.log("X1");
await new Promise(r => setTimeout(r, 1000));
console.log("X2");

console.log("Y");

import "./x.js";
import "./y.js";
console.log("Z")
