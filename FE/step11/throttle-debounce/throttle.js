function throttling(fn, delay) {
  let isRunning = false;
  let nextTime = 0;
  return (...args) => {
    isRunning = performance.now() - nextTime > delay || nextTime == 0;
    console.log('event 발생');
    if (isRunning) {
      fn.call(this, ...args);
      nextTime = performance.now();
    }
  };
}

export default throttling;
