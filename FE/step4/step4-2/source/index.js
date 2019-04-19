const data = require('./data');
const Todo = require('./todo');
const readline = require('readline');

const todo = new Todo(data);

const inputPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('0을 입력하면 프로그램이 종료됩니다.');
inputPrompt.setPrompt('명령하세요 : ');
inputPrompt.prompt();

inputPrompt.on('line', message => {
  if (message === '0') {
    inputPrompt.close();
  }
  const userInput = message.split('$');
  const methodName = userInput.splice(0, 1);

  todo[methodName](...userInput, inputPrompt);
});

inputPrompt.on('close', () => {
  process.exit();
});
