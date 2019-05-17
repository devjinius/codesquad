class Tokenizer {
  constructor({ rawString, keyword, messageObj }) {
    this.rawString = rawString;
    this.keyword = keyword;
    this.messageObj = messageObj;
  }

  isEmpty(arr) {
    return arr.length === 0 ? true : false;
  }

  isString(element) {
    return element === "'" || element === '"';
  }

  controlStack(stack, element) {
    if (this.isEmpty(stack)) {
      stack.push(element);
    } else {
      stack.pop();
    }
  }

  getAccumulator(acc, token, cur) {
    return token !== '' ? acc.concat([token, cur]) : acc.concat([cur]);
  }

  tokenize() {
    let token = '';
    const stringStack = [];

    const tokens = [...this.rawString].reduce((acc, cur) => {
      if (this.isString(cur)) {
        this.controlStack(stringStack, cur);
      }

      if (this.keyword.hasOwnProperty(cur) && this.isEmpty(stringStack)) {
        acc = this.getAccumulator(acc, token.trim(), cur);
        token = '';
        return acc;
      }

      token += cur;
      return acc;
    }, []);

    if (!this.isEmpty(stringStack)) {
      throw new Error(this.messageObj.INVALID_STRING);
    }

    if (this.isEmpty(tokens)) {
      throw new Error(this.messageObj.EMPTY_STRING);
    }

    return tokens;
  }
}

module.exports = Tokenizer;
