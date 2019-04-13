const Memory = require('./memory.js');

class CPU {
  constructor(memory) {
    this.memory = memory;
    this.register = Array(8).fill(0);
    this.register[1] = 1;
    this.register[2] = 2;
    this.register[3] = 3;
    this.register[4] = 4;
    this.register[5] = 5;
    this.register[6] = 6;
    this.register[7] = 7;
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
    const excuteList = {
      instList: {
        '0001': () => 'LOAD',
        '0010': () => 'LOAD',
        '0011': () => 'STORE',
        '0100': () => 'STORE',
        '0101': () => 'AND',
        '0110': () => 'OR',
        '0111': () => 'ADD',
        '1000': () => 'ADD',
        '1001': () => 'SUB',
        '1010': () => 'SUB',
        '1011': () => 'MOV'
      },
      methodList: {
        LOAD: (base, offset, isVal) =>
          this.bin2dec(isVal) === 1
            ? this.register[this.bin2dec(base)] + this.bin2dec(offset)
            : this.register[this.bin2dec(base)] + this.register[this.bin2dec(offset)],
        STORE: (base, offset, isVal) =>
          this.bin2dec(isVal) === 1
            ? this.register[this.bin2dec(base)] + this.bin2dec(offset)
            : this.register[this.bin2dec(base)] + this.register[this.bin2dec(offset)],
        AND: (op1, op2) => this.register[this.bin2dec(op1)] && this.register[this.bin2dec(op2)],
        OR: (op1, op2) => this.register[this.bin2dec(op1)] || this.register[this.bin2dec(op2)],
        ADD: (op1, op2, isVal) =>
          this.bin2dec(isVal) === 1
            ? this.register[this.bin2dec(op1)] + this.bin2dec(op2)
            : this.register[this.bin2dec(op1)] + this.register[this.bin2dec(op2)],
        SUB: (op1, op2, isVal) =>
          this.bin2dec(isVal) === 1
            ? this.register[this.bin2dec(op1)] - this.bin2dec(op2)
            : this.register[this.bin2dec(op1)] - this.register[this.bin2dec(op2)],
        MOV: val => this.bin2dec(val)
      }
    };

    let INSTRUCTION, first, second, isVal, third;

    [INSTRUCTION, first, second, isVal, third] = this.decode(IR);
    console.log(INSTRUCTION, first, second, isVal, third);
    const instWord = excuteList.instList[INSTRUCTION]();
    const value = excuteList.methodList[instWord].call(this, second, third, isVal);
    console.log(value);
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
      first = binIRArr.splice(0, 3);
      second = binIRArr.splice(0, 3);
      if (binIRArr[0] !== 1) {
        third = binIRArr.splice(0, 3);
        fourth = binIRArr;
      } else {
        // offset. value인 경우
        third = binIRArr.splice(0, 1);
        fourth = binIRArr;
      }

      return [INSTRUCTION, first, second, third, fourth];
    } else {
      // MOV인경우
      first = binIRArr.splice(0, 3);
      second = binIRArr;
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

  bin2dec(bin) {
    let i = 0;
    return bin.reduceRight((acc, cur) => {
      acc += cur * this.twoPow(i);
      i++;
      return acc;
    }, 0);
  }

  twoPow(n) {
    let res = 1;
    for (let i = 0; i < n; i++) {
      res *= 2;
    }
    return res;
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
cpu.execute(4739); // LOAD R1, R2, R3
cpu.execute(15044); // STORE R5, R3, R4
cpu.execute(11966); // LOAD R7, R2, #30
cpu.execute(43432); // SUB R4, R6, #8
cpu.execute(47354); // MOV R4, #250
cpu.execute(30853); // ADD R4, R2, R5

// console.log(cpu.dump());
