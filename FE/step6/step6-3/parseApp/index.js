module.exports = {
  parse: str => {
    const Tokenizer = require('./tokenizer');
    const Lexer = require('./lexer');
    const Parser = require('./parser');
    const keyword = require('./keyword');
    const messageObj = require('./message');

    const tokenizer = new Tokenizer({ rawString: str, keyword, messageObj });
    const tokens = tokenizer.tokenize();

    const lexer = new Lexer({ keyword, messageObj, tokens });
    const lexedData = lexer.lex();

    const parser = new Parser({ lexedData, messageObj, keyword });

    return parser.run();
  }
};
