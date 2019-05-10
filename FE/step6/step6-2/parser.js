const Node = require('./node');

class Parser {
  constructor({ lexer, tokens }) {
    this.lexer = lexer;
    this.queue = tokens;
  }

  arrayParse(node) {
    while (this.queue.length !== 0) {
      const word = this.queue.shift();
      const lexedData = this.lexer.lex(word);

      if (lexedData.context === 'ArrayClose') {
        return node;
      }

      if (lexedData.context === 'ArrayOpen') {
        lexedData.newNode = this.arrayParse(lexedData.newNode);
      }

      node.pushChild(lexedData.newNode);
    }

    return node;
  }

  parse() {
    const word = this.queue.shift();
    if (word === '[') {
      const root = new Node({ type: 'Array' });
      const parsedTree = this.arrayParse(root);
      return parsedTree;
    }
  }
}

module.exports = Parser;
