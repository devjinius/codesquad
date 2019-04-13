const Memory = require('./memory');
const CPU = require('./cpu');

const memoryArea = new Array(131071);
const memory = new Memory(memoryArea);
const cpu = new CPU(memory);

const program = [47114, 47618, 4869, 33892, 38466, 18212];

// 메모리에 프로그램 locate
memory.locate(program);

// 메모리에 데이터 locate
memory.store(12, 100);

console.log(`프로그램을 실행하기 전 데이터 : ${memory.load(14)}`);

program.forEach(() => {
  cpu.execute(cpu.fetch());
  console.log(cpu.dump());
});

console.log(`프로그램을 실행한 후 데이터 : ${memory.load(14)}`);

cpu.reset();
console.log(cpu.dump());
