const data = require('../data');
const ManagingTodo = require('./managingTodo');
const msgObj = require('./msg');
const TodoError = require('./todoError');
const History = require('./history');

const readline = require('readline');

const inputPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const todoError = new TodoError();
const history = new History({ maxLength: 3, msgObj });
const managingTodo = new ManagingTodo({ data, inputPrompt, msgObj, todoError, history });

console.log('0을 입력하면 프로그램이 종료됩니다.');
inputPrompt.setPrompt('명령하세요 : ');
inputPrompt.prompt();

inputPrompt.on('line', userInput => {
  if (userInput === '0') {
    inputPrompt.close();
  }

  try {
    if (!todoError.includeSeperator(userInput, '$')) {
      throw new Error(msgObj.getSeparatorError('$'));
    }

    const userInputArr = userInput.split('$');
    const methodName = userInputArr.splice(0, 1);

    if (!todoError.invalidInst(managingTodo, methodName)) {
      throw new Error(msgObj.getInvalisdInstError);
    }

    managingTodo[methodName](...userInputArr);
  } catch (error) {
    console.log(error.message);
    inputPrompt.prompt();
  }
});

inputPrompt.on('close', () => {
  process.exit();
});
