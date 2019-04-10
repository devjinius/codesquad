const errorMsg = require('./errorMsg.js');

module.exports = arg => {
  // checkParamNumber(arg.length, rightNum);
  checkNumber(arg);
};

const checkNumber = argArr => {
  for (let i of argArr) {
    if (typeof i !== 'number') {
      // throw new Error(errorMsg.NOT_A_NUMBER);
      throw new Error(errorMsg.INVALID);
    }
  }
};

// const checkParamNumber = (argNum,rightNum) => {
//     if (argNum < rightNum){
//         throw new Error(errorMsg.WRONG_PARAMNUMBER);
//     };
// };
