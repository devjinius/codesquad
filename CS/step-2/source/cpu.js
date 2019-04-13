const excuteList = require('./executeList');
const transform = require('./transform');

class CPU {
  constructor(memory) {
    this.memory = memory;
    this.register = Array(8).fill(0);
  }

  fetch() {
    const program = this.memory.fetch(this.register[0]);
    this.register[0] += 1;
    return program;
  }

  dump() {
    return this.register.filter((r, i) => i !== 0);
  }

  reset() {
    this.register.forEach((register, i) => (this.register[i] = 0));
  }

  execute(IR) {
    let INSTRUCTION, first, second, isVal, third;

    [INSTRUCTION, first, second, isVal, third] = this.decode(IR);

    const instWord = excuteList.instList[INSTRUCTION]();
    const value = excuteList[instWord].call(this, second, third, isVal);

    if (instWord === 'STORE') {
      this.memory.store(value, this.register[transform.bin2dec(first)]);
    } else {
      this.register[transform.bin2dec(first)] = value;
    }
  }

  // 2진수로 표현된 명령어를 규칙에 따라 해석합니다.
  decode(IR) {
    const BIT_LENGTH = 16;
    const binIRArr = transform.dec2bin(IR);

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
}

// test cases

// cpu.execute(4739); // LOAD R1, R2, R3
// cpu.execute(15044); // STORE R5, R3, R4
// cpu.execute(11966); // LOAD R7, R2, #30
// cpu.execute(43432); // SUB R4, R6, #8
// cpu.execute(47354); // MOV R4, #250
// cpu.execute(30853); // ADD R4, R2, R5

module.exports = CPU;
