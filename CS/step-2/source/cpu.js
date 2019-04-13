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

    // decode를 통해 유의미한 비트단위로 쪼갬
    [INSTRUCTION, first, second, isVal, third] = this.decode(IR);

    const instWord = excuteList.instList[INSTRUCTION](); // 명령어 비트를 string으로 변환
    const value = excuteList[instWord].call(this, second, third, isVal); // 연산 실행

    // store인경우 메모리에 저장하고 나머지의 경우 dst.reg에 저장
    if (instWord === 'STORE') {
      this.memory.store(value, this.register[transform.bin2dec(first)]);
    } else {
      this.register[transform.bin2dec(first)] = value;
    }
  }

  // decode를 통해 유의미한 비트단위로 쪼개어 반환합니다.
  decode(IR) {
    const BIT_LENGTH = 16;
    const binIRArr = transform.dec2bin(IR); // 10진수의 int를 2진수의 배열의 형태로 만듦

    // 앞에 0이 있다면 비어 있기 때문에 0을채워 16비트로 맞춰줌
    while (binIRArr.length < BIT_LENGTH) {
      binIRArr.unshift(0);
    }

    // INSTRUCTION만 뽑는다.
    const INSTRUCTION = binIRArr.splice(0, 4).join('');
    let first, second, third, fourth;

    // 조건에 맞추어 유의미한 비트별로 splice 한다.
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
