class Memory {
  constructor(memoryArea) {
    this.memoryArea = memoryArea;
    this.textCounter = 0;
  }

  peek(address) {
    if (address < 0 || address > 131071) throw new RangeError('out of range exception');

    return this.memoryArea[address];
  }

  // text method
  fetch(program_count) {
    return this.memoryArea[program_count];
  }

  locate(program) {
    if (this.textCounter > 65535) throw new Error('overFlow');

    program.forEach(p => {
      this.memoryArea[this.textCounter] = p;
      this.textCounter++;
    });
  }

  // heap method
  load(address) {
    return this.memoryArea[65536 + address];
  }

  store(address, data) {
    if (address > 65535) throw new RangeError('out of range exception');
    this.memoryArea[65536 + address] = data;
  }
}

// test cases

// console.log('메모리를 초기화합니다.');
// console.log('=====================');
// const memory = new Memory(memoryArea);

// memory.locate([1, 2, 10]);
// console.log(memory.peek(0)); // 1
// console.log(memory.peek(1)); // 2
// console.log(memory.peek(2)); // 10
// console.log(memory.peek(3)); // 0
// console.log(memory.fetch(2)); // 10

// console.log('=====================');

// memory.store(22, 3);
// memory.store(20, 12);
// memory.store(0, 9);
// console.log(memory.load(22)); // 3
// console.log(memory.load(23)); // 0
// console.log(memory.peek(65556)); // 12
// console.log(memory.peek(65558)); // 3

// console.log('=====================');

// console.log(memory.peek(0)); // 1
// console.log(memory.load(0)); // 9

module.exports = Memory;
