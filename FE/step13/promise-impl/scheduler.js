module.exports = {
  queue: [],

  getQueueLength() {
    return this.queue.length;
  },

  getNext() {
    return this.queue.shift();
  },

  push(item) {
    this.queue.push(item);
  }
};
