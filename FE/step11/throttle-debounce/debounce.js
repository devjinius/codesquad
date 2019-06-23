let timer;
function debounce(fn, delay, args) {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    fn(args);
  }, delay);
}

export default debounce;
