class Parser {
  constructor({ lexedData, keyword, messageObj }) {
    this.lexedData = lexedData;
    this.keyword = keyword;
    this.messageObj = messageObj;
    this.parseStack = [];
  }

  getNextToken() {
    return this.lexedData.shift();
  }

  isOpeningContext(context) {
    return context === this.keyword['['].context || context === this.keyword['{'].context;
  }

  isClosingContext(context) {
    return context === this.keyword[']'].context || context === this.keyword['}'].context;
  }

  isSeperatorContext(context) {
    return context === this.keyword[','].context;
  }

  isObjectSeperatorContext(context) {
    return context === this.keyword[':'].context;
  }

  isValidPair(currentContext) {
    const pairContext = this.parseStack[this.parseStack.length - 1];

    if (currentContext === this.keyword[']'].context && pairContext === this.keyword['['].context) {
      return true;
    }

    if (currentContext === this.keyword['}'].context && pairContext === this.keyword['{'].context) {
      return true;
    }

    return false;
  }

  isValidNextToken() {
    if (this.lexedData.length === 0) {
      return true;
    }

    const frontPeek = this.lexedData[0].context;

    if (this.isClosingContext(frontPeek)) {
      return true;
    }

    if (this.isSeperatorContext(frontPeek)) {
      this.getNextToken();
      return true;
    }

    return false;
  }

  isValidClosing(context) {
    return !this.isValidPair(context) || !this.isValidNextToken();
  }

  passObjectSeperator() {
    if (!this.isObjectSeperatorContext(this.getNextToken().context)) {
      throw new Error(this.messageObj.INVALID_OBJECT);
    }
  }

  getValueNode() {
    const valueToken = this.getNextToken();
    valueToken.newNode.context = 'value';

    if (this.isOpeningContext(valueToken.context)) {
      valueToken.newNode = this.run(valueToken, valueToken.newNode.type);
    }

    if (!this.isValidNextToken()) {
      throw new Error(this.messageObj.INVALID_OBJECT);
    }
    return valueToken.newNode;
  }

  parse(node, parseType) {
    while (this.lexedData.length !== 0) {
      const lexedToken = this.getNextToken();
      const { context } = lexedToken;
      let { newNode } = lexedToken;

      if (this.isClosingContext(context)) {
        if (!this.isValidClosing()) {
          throw new Error(this.messageObj.INVALID_GROUP);
        }

        this.parseStack.pop();
        return node;
      }

      if (this.isOpeningContext(context)) {
        newNode = this.run(lexedToken, newNode.type);
      }

      if (parseType === 'Array') {
        if (this.isSeperatorContext(context)) {
          throw new Error(this.messageObj.START_SEPERATOR);
        }

        if (!this.isValidNextToken()) {
          throw new Error(this.messageObj.INVALID_ARRAY);
        }
      }

      if (parseType === 'Object') {
        newNode.context = 'key';
        this.passObjectSeperator();
        newNode.child.push(this.getValueNode());
      }

      node.pushChild(newNode);
    }
  }

  run(lexedToken = undefined) {
    if (lexedToken === undefined) {
      lexedToken = this.getNextToken();
    }

    const { context, newNode } = lexedToken;

    if (this.isOpeningContext(context)) {
      this.parseStack.push(context);

      return this.parse(newNode, newNode.type);
    }
  }
}

module.exports = Parser;
