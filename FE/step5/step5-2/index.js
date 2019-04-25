const data = require('../data');
const ManagingTodo = require('./managingTodo');
const MSG = require('./msg');
const TodoError = require('./todoError');

const readline = require('readline');

const inputPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const msg = new MSG();
const managingTodo = new ManagingTodo(data, inputPrompt, msg);

console.log('0을 입력하면 프로그램이 종료됩니다.');
inputPrompt.setPrompt('명령하세요 : ');
inputPrompt.prompt();

inputPrompt.on('line', userInput => {
  if (userInput === '0') {
    inputPrompt.close();
  }

  const todoError = new TodoError(msg);
  try {
    todoError.includeSeperator(userInput, '$');
    const userInputArr = userInput.split('$');
    const methodName = userInputArr.splice(0, 1);

    todoError.invalidInst(managingTodo, methodName);
    managingTodo[methodName](...userInputArr);
  } catch (error) {
    console.log(error.message);
    inputPrompt.prompt();
  }
});

inputPrompt.on('close', () => {
  process.exit();
});
