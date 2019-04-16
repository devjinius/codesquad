const Memory = require('./memory');
const CPU = require('./cpu');

const memoryArea = new Array(131071);
const memory = new Memory(memoryArea);
const cpu = new CPU(memory);

const program = [47264, 47618, 4869, 33892, 38466, 18212]; // 예시 프로그램
const program2 = [45578, 46082, 46598, 6240, 10883, 27909, 24326, 15939]; // AND, OR 조건을 이용한 프로그램

// 메모리에 데이터 locate
memory.store(162, 100);
memory.store(10, true);
memory.store(8, false);

// 메모리에 프로그램 locate
memory.locate(program);

console.log(`프로그램을 실행하기 전 데이터 : ${memory.load(164)}`);

program.forEach(() => {
  cpu.execute(cpu.fetch());
  console.log(cpu.dump());
});

console.log(`프로그램을 실행한 후 데이터 : ${memory.load(164)}`);

console.log('=================================================');

// 메모리에 프로그램 locate
memory.locate(program2);

console.log(`프로그램을 실행하기 전 데이터 : ${memory.load(16)}`);

program2.forEach(_ => {
  cpu.execute(cpu.fetch());
  console.log(cpu.dump());
});

console.log(`프로그램을 실행한 후 데이터 : ${memory.load(16)}`);

console.log('=================================================');

cpu.reset();
console.log(cpu.dump());
