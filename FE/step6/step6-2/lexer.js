const Node = require('./node');

class Lexer {
  constructor({ keyword, messageObj }) {
    this.keyword = keyword;
    this.messageObj = messageObj;
  }

  makeNode(type, value) {
    return new Node({
      type: type,
      value: value
    });
  }

  isString(element) {
    return (
      (element.startsWith("'") && element.endsWith("'")) ||
      (element.startsWith('"') && element.endsWith('"'))
    );
  }

  isValidNumber(element) {
    return typeof element === 'number' && !Number.isNaN(element);
  }

  isValidString(element) {
    return element.includes('"') || element.includes("'") ? false : true;
  }

  lex(word) {
    if (this.keyword.hasOwnProperty(word)) {
      const { context, type, value } = this.keyword[word];
      return { context, newNode: this.makeNode(type, value) };
    }

    if (this.isString(word)) {
      const { context, type } = this.keyword.string;
      word = word.substring(1, word.length - 1);

      if (!this.isValidString(word)) {
        throw new Error(`${word} ${this.messageObj.INVALID_STRING}`);
      }

      return {
        context,
        newNode: this.makeNode(type, word)
      };
    }

    const numberElement = Number(word);
    const { context, type } = this.keyword.number;

    if (!this.isValidNumber(numberElement)) {
      throw new Error(`${word} ${this.messageObj.INVALID_TYPE}`);
    }

    return { context, newNode: this.makeNode(type, numberElement) };
  }
}

module.exports = Lexer;
