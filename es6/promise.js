const promise = new Promise(function(resolve, reject) {
  if (success) {
    resolve(value);
  } else {
    reject(err);
  }
})

promise.then(function(value) {

}, function(err) {

})


function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  })
}

timeout(100).then((value) => {
  console.log(value);
})

let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
})

promise.then(function() {
  console.log('resolved')
})

console.log('hi')


function loadImageAsync(url){
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.onload = () => {
      resolve();
    }
    image.onerror = () => {
      reject(new Error('Could not load image at ' + url));
    }
    image.src = url;
  })
}

const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if(this.readyState !== 4){
        return;
      }
      if(this.status == 200) {
        resolve(this.response);
      }  else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();
  })
  return promise;
}

getJSON('/posts.json').then(
  function(json) {
    console.log('Contents', json);
  },
  function(error) {
    console.error('出错了', error);
  }
)

const p1 = new Promise(function(resolve, reject){
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function(resolve, reject){
  setTimeout(() => resolve(p1), 1000)
})

p2.then(result => console.log(result)).catch(error => console.log(error))

new Promise((resolve, reject) => {
  return resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
})

getJSON('/posts.json').then(function(json) {
  return json.post;
}).then(function(post) {

})

getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  console.log('resolve:', comments);
}, function(err) {
  console.log('rejected:', err);
})

getJSON('/posts.json').then(function(posts) {

}).catch(function(error) {
  console.log('发生错误', error)
})

p.then((val) => console.log('fulfilled:', val))
  .catch(err => console.log('rejected', err))

p.then(val => console.log('fulfilled:', val))
  .then(null, err => console.log('rejected:', err))

const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
})

promise.catch(function(error) {
  console.log(error);
})

const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
})

promise.catch(function(error) {
  console.log(error);
})

const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
})

promise.catch(function(error) {
  console.log(error);
})

const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
})

promise.then(function(value) {console.log(value)}).catch(function(error) {console.log(error)})

getJSON('/post/1.josn').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments){
  // some code
}).catch(function(error){
  // 
})

promise.then(function(data) {

}, function(err) {

})

promise.then(function(data) {

}).catch(function(err) {

})

const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    resolve(x + 2);
  })
}

someAsyncThing().then(function() {
  console.log('everything is great');
})

setTimeOut(() => { console.log(123) }, 2000)

process.on('unhanledRejection', function(err, p) {
  throw err;
})

const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  setTimeout(function(){throw new Error('test')})
})
promise.then(function(value){console.log(value)});

const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    resolve(x + 2);
  })
}

someAsyncThing().catch(function(error){
  console.log('oh no', error);
}).then(function(){
  console.log('carry on')
})

Promise.resolve().catch(function(error){
  console.log('oh no', error);
}).then(function(){console.log('carry on')})

const someAsyncThing = function() {
  return new Promise(function(resolve, reject){
    resolve(x+2);
  })
}

someAsyncThing().then(function(){
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  y+2;
}).then(function() {
  console.log('carry on');
})

someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  y+2;
}).catch(function(error) {
  console.log('carry on', error);
})

promise.then(result => {}).catch(error => {}).finally(() => {})

server.listen(port).then(function() {

}).finally(server.stop);

promise.finally(() => {

})

promise.then(
  result => {
    return result;
  },
  error => {
    return error;
  }
)

Promise.prototype.finally = function(callback) {
  let P = this.constructor; // 构造函数  Promise.prototype为原型对象
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {throw reason})
  )
}

Promise.resolve(2).then(() => {}, () => {})
Promise.resolve(2).finally(() => {})
Promise.reject(3).then(() => {}, () => {})
Promise.reject(3).finally(() => {})

const p = Promise.all([p1, p2, p3]);

const promises = [2,3,5,7,11,13].map(function(id){
  return getJSON(`/post/${id}.json`);
})

Promise.all(promises).then(function(posts) {

}).catch(function(reason) {

})

const databasePromise = connectDatabase();
const booksPromise = databasePromise.then(findAllBooks);
const userPromise = databasePromise.then(getCurrentUser);
Promise.all([booksPromise, userPromise]).then(([books, user]) => {
  pickTopRecommendations(books, user);
})

const p1 = new Promise((resolve, reject) => {
  resolve('hello');
}).then(result => result).catch(e => e)

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
}).then(result => result).catch(e => e)

Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e))

const p = Promise.race([p1, p2, p3])

const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])

p.then().catch()

const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fecth('/api-3'),
]
await Promise.allSettled(promises);
removeLoadingIndicator();

const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.allSettled([resolved, rejected]);
allSettledPromise.then(function(results) {
  console.log(results);
})

const promises = [fetch('index/html'), fetch('https://does-not-exist/')];
const results = await Promise.allSettled(promises);
const successfulPromises = results.filter(p => p.status === 'fulfilled');
const errors = results.filter(p => p.status == 'rejected').map(p => p.reason);

const urls = [];
const requests = urls.map(x => fecth(x));
try {
  await Promise.all(requests);
  console.log('所有请求成功');
} catch(e) {
  console.log('至少一个请求失败')
}

const promises = [
  fecth('/endpiont-a').then(() => 'a'),
  fecth('/endpiont-b').then(() => 'b'),
  fecth('/endpiont-c').then(() => 'c'),
]
try {
  const first = await Promise.any(promise);
  console.log(first);
} catch(error) {
  console.log(error);
}

// new AggregateError() extends Array -> AggregateError

// const err = newAggregateError();
// err.push(new Error('first Error'));
// err.push(new Error('second Error'));
// throw err;

Promise.any(promises).then(
  first => {

  },
  error => {

  }
)

var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);
Promise.any([resolved, rejected, alsoRejected]).then(function(result) {
  console.log(result);
})
Promise.any([rejected, alsoRejected]).catch(function(results){
  console.log(results)
})

const jsPromise = Promise.resolve($.ajax('/whatever.json'));

Promise.resolve('foo');
new Promise(resolve => resolve('foo'));

let thenable = {
  then: function(resolve, reject){
    resolve(42);
  }
}

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);
})

const p = Promise.resolve('Hello');
p.then(function(s) {
  console.log(s); 
})

const p = Promise.resolve();
p.then(function() {

})

setTimeout(function() {
  console.log('three');
}, 0);
Promise.resolve().then(function() {
  console.log('two');
})
console.log('one');

const p = Promise.reject('出错了');
const p = new Promise((resolve, reject) => reject('出错了'));
p.then(null, function(s) {
  console.log(s);
})

const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
}
Promise.reject(thenable).catch(e => {
  console.log(e === thenable);
})

const preloadImage = function(path) {
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  })
}

function getFoo() {
  return new Promise(function(resolve, reject) {
    resolve('foo');
  })
}
const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch(e) {
    console.log(e);
  }
}
function run(generator) {
  const it = generator();
  function go(result) {
    if (result.done) return result.value;
    return result.value.then(function(value) {
      return go(it.next(value));
    }, function(error) {
      return go(it.throw(error));
    })
  }
  go(it.next());
}

run(g)

Promise.resolve().then(f);

const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');

(async () => f())().then()

(async () => f())().then().catch()

const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');

const f = () => console.log('now')
Promise.try(f);
console.log('next');

function getUsername(userId) {
  return database.users.get({ id: userId }).then(function(user) {
    return user.name;
  }).catch()
}

try {
  database.users.get({ id: userId }).then().catch()
} catch (e) {

}

Promise.try(() => database.users.get({ id: userId }))
.then().catch()