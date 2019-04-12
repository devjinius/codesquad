const myReduce = (arr, callback, init) => {
  if (typeof init === 'undefined') {
    init = 0;
  }
  for (let elem of arr) {
    init = callback(init, elem);
  }

  return init;
};

const arr = [1, 2, 3, 4, 5];

const result = myReduce(arr, (acc, cur) => acc + cur);
const result2 = myReduce(arr, (acc, cur) => acc.concat(cur), []);

console.log(result);
console.log(result2);
