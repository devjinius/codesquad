const Memory = require('./memory');
const excuteList = require('./executeList');
const transform = require('./transform');

class CPU {
  constructor(memory) {
    this.memory = memory;
    this.register = Array(8).fill(0);
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

  reset() {
    for (let i in this.register) {
      if (i === 0) this.register[i] = 0;
      else this.register[i] = undefined;
    }
  }

  execute(IR) {
    let INSTRUCTION, first, second, isVal, third;

    [INSTRUCTION, first, second, isVal, third] = this.decode(IR);
    // console.log(INSTRUCTION, first, second, isVal, third);
    const instWord = excuteList.instList[INSTRUCTION]();
    const value = excuteList[instWord].call(this, second, third, isVal);
    // console.log(value);
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

const memoryArea = new Array(131071);
const memory = new Memory(memoryArea);
const cpu = new CPU(memory);

// memory.locate([1, 2, 10]);
// console.log(memory.peek(0));
// console.log(memory.peek(2));
// console.log(cpu.fetch());
// console.log(cpu.fetch());
// console.log(cpu.fetch());

// cpu.execute(4739); // LOAD R1, R2, R3
// cpu.execute(15044); // STORE R5, R3, R4
// cpu.execute(11966); // LOAD R7, R2, #30
// cpu.execute(43432); // SUB R4, R6, #8
// cpu.execute(47354); // MOV R4, #250
// cpu.execute(30853); // ADD R4, R2, R5

// ========

memory.store(12, 100);
memory.locate([47114, 47618, 4869, 33892, 38466, 18212]);
cpu.execute(cpu.fetch());
console.log(cpu.dump());
cpu.execute(cpu.fetch());
console.log(cpu.dump());
cpu.execute(cpu.fetch());
console.log(cpu.dump());
cpu.execute(cpu.fetch());
console.log(cpu.dump());
cpu.execute(cpu.fetch());
console.log(cpu.dump());
cpu.execute(cpu.fetch());
console.log(cpu.dump());
console.log(memory.load(14));

// cpu.execute(47114); // MOV R4, 0xA0
// cpu.execute(47618); // MOV R2, 0x02
// cpu.execute(4869); // LOAD R1, R4, R5
// cpu.execute(33892); // ADD R2, R1, #4
// cpu.execute(38466); // SUB R3, R1, R2
// cpu.execute(18212); // STORE R3, R4, #4

// console.log(cpu.dump());
