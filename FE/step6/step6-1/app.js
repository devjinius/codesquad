const Node = require('./node');

const tokenizer = {
  removeWhiteSpace: str => str.replace(/\s/g, ''),

  tokenize(str) {
    strWithoutSpace = this.removeWhiteSpace(str);
    return strWithoutSpace.split(/([\[\]])|,/).filter(Boolean);
  }
};

const lexer = {
  makeNode(element) {
    element = Number(element);
    return new Node({
      type: 'number',
      value: element
    });
  },

  lex(word) {
    if (word === '[') {
      return { context: 'ArrayOpen', newNode: new Node({ type: 'Array' }) };
    }

    if (word === ']') {
      return { context: 'ArrayClose', newNode: undefined };
    }

    return { context: 'Element', newNode: this.makeNode(word) };
  }
};

class Parser {
  constructor({ tokenizer, lexer }) {
    this.lexer = lexer;
    this.tokenizer = tokenizer;
    this.queue = [];
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

  parse(str) {
    this.queue = tokenizer.tokenize(str);
    const word = this.queue.shift();
    if (word === '[') {
      const root = new Node({ type: 'Array' });
      const parsedTree = this.arrayParse(root);
      return parsedTree;
    }
  }
}

const str = '[123, [22, 33], 444]';
const str2 = '[123, 22, 33, 444]';

const parser = new Parser({ lexer, tokenizer });
const result = parser.parse(str);
console.log(JSON.stringify(result, null, 2));

console.log('======================================');

const result2 = parser.parse(str2);
console.log(JSON.stringify(result2, null, 2));
