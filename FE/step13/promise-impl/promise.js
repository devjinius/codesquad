const scheduler = require('./scheduler');

class MyPromise {
  constructor(exe) {
    this.state = 'pending';
    this.value = '';

    try {
      exe(MyPromise.resolve.bind(this), MyPromise.reject.bind(this));
    } catch (e) {
      MyPromise.reject(e);
    }
  }

  static resolve(value) {
    if (scheduler.getQueueLength() !== 0) {
      const { onFulfilled, onRejected, nextPromise } = scheduler.getNext();
      nextPromise.state = 'fulfilled';

      try {
        nextPromise.value = onFulfilled(value);
        MyPromise.resolve.call(this, nextPromise.value);
      } catch (e) {
        nextPromise.value = onRejected(e);
        MyPromise.reject.call(this, nextPromise.value);
      }
    }
  }

  static reject(reason) {
    if (scheduler.getQueueLength() !== 0) {
      const onRejected = scheduler.getNext().onRejected;
      MyPromise.reject.call(this, onRejected(reason));
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = v => v;
    }

    if (typeof onRejected !== 'function') {
      onRejected = v => v;
    }

    return new MyPromise((resolve, reject) => {
      scheduler.push({ onFulfilled, onRejected, nextPromise: this });
    });
  }

  catch(onRejected) {
    const onFulfilled = v => v;
    return new MyPromise((resolve, reject) => {
      scheduler.push({ onFulfilled, onRejected, nextPromise: this });
    });
  }
}

let myFirstPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'Success!', id: 123123 });
  }, 2000);
});

myFirstPromise
  .then(successMessage => {
    return successMessage.name;
  })
  .then(data => {
    console.log(`data is ${data}`);
  })
  .catch(error => console.log(`oops, this is ${error}`));

// error test code
// myFirstPromise
//   .then(successMessage => {
//     successMessage.hello();
//   })
//   .then(data => {
//     console.log(`data is ${data}`);
//   })
//   .catch(error => console.log(`oops, I found error! error: [${error}]`));
