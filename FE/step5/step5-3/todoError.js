class TodoError {
  includeSeperator(str, seperator) {
    const regex = new RegExp('\\' + seperator);
    if (str.match(regex) === null) {
      return false;
    }
    return true;
  }

  compareStatus(originStr, changingStr) {
    if (originStr === changingStr) {
      return false;
    }
    return true;
  }

  invalidId(id) {
    if (id === undefined) {
      return false;
    }
    return true;
  }

  invalidInst(obj, inst) {
    if (obj[inst] === undefined) {
      return false;
    }
    return true;
  }

  invalidStatus(conditionArr, condition) {
    if (!conditionArr.includes(condition)) {
      return false;
    }
    return true;
  }

  isArray(inputStr) {
    const regex = /\[[\"\'\,\s\w\d]+\]/; // [로 시작하고 ]로 끝나면 통과
    if (inputStr.match(regex) === null) {
      return false;
    }
    return true;
  }
}

module.exports = TodoError;
