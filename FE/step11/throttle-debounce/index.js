import debounce from './debounce.js';
import throttling from './throttle.js';

const input = document.querySelector('#input');
input.addEventListener('input', e => {
  debounce(console.log, 500, '비동기 호출');
});

let count = 0;
const countHandler = () => {
  count += 1;
  console.log(count);
};
window.addEventListener('load', () => {
  document.addEventListener('scroll', throttling(countHandler, 2000, '비동기 호출'));
});
