const Memory = require('./memory.js');

class CPU {
  constructor(memory) {
    this.memory = memory;
    this.register = [];
    for (let i = 0; i < 8; i++) {
      if (i === 0) this.register[i] = 0;
      else this.register[i] = undefined;
    }
  }

  reset() {
    for (let i in this.register) {
      if (i === 0) this.register[i] = 0;
      else this.register[i] = undefined;
    }
  }

  fetch() {
    const program = memory.fetch(this.register[0]);
    this.register[0] += 1;
    return program;
  }

  dump() {
    return this.register.filter((r, i) => i !== 0);
  }

  reset() {
    this.register.forEach((r, i) => {
      if (i === 0) {
        this.register[i] = 0;
      } else {
        this.register[i] = undefined;
      }
    });
  }

  execute(IR) {
    let INSTRUCTION, first, second, third, fourth;

    [INSTRUCTION, first, second, third, fourth] = this.decode(IR);
    // console.log(INSTRUCTION, first, second, third, fourth);
    switch (INSTRUCTION) {
      case '0001':
      case '0010':
        console.log('LOAD');
        break;
      case '0011':
      case '0100':
        console.log('STORE');
        break;
      case '0101':
        console.log('AND');
        break;
      case '0110':
        console.log('OR');
        break;
      case '0111':
      case '1000':
        console.log('ADD');
        break;
      case '1001':
      case '1010':
        console.log('SUB');
        break;
      case '1011':
        console.log('MOV');
        break;
    }
  }

  // 2진수로 표현된 명령어를 규칙에 따라 해석합니다.
  decode(IR) {
    const BIT_LENGTH = 16;
    const binIRArr = this.dec2bin(IR);

    // 16비트로 맞춰줌
    while (binIRArr.length < BIT_LENGTH) {
      binIRArr.unshift(0);
    }

    // INSTRUCTION만 뽑는다.
    const INSTRUCTION = binIRArr.splice(0, 4).join('');
    let first, second, third, fourth;

    if (INSTRUCTION !== '1011') {
      first = binIRArr.splice(0, 3).join('');
      second = binIRArr.splice(0, 3).join('');

      if (binIRArr[0] !== 1) {
        third = binIRArr.splice(0, 3).join('');
        fourth = binIRArr.join('');
      } else {
        // offset. value인 경우
        third = binIRArr.splice(0, 1).join('');
        fourth = binIRArr.join('');
      }

      return [INSTRUCTION, first, second, third, fourth];
    } else {
      // MOV인경우
      first = binIRArr.splice(0, 3).join('');
      second = binIRArr.join('');
      return [INSTRUCTION, first, second];
    }
  }

  dec2bin(decimal) {
    var answer = [];
    while (decimal !== 0) {
      answer.unshift(decimal % 2);
      decimal = Math.floor(decimal / 2);
    }

    return answer;
  }
}

const memoryArea = new Uint16Array(131071);
const memory = new Memory(memoryArea);
const cpu = new CPU(memory);

// memory.locate([1, 2, 10]);
// console.log(memory.peek(0));
// console.log(memory.peek(2));
// console.log(cpu.fetch());
// console.log(cpu.fetch());
// console.log(cpu.fetch());
cpu.execute(4739);
cpu.execute(15044);
cpu.execute(11966);
cpu.execute(43432);
cpu.execute(47354);

// console.log(cpu.dump());
