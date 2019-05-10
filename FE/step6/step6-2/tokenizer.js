class Tokenizer {
  constructor({ rawString }) {
    this.rawString = rawString;
  }

  removeWhiteSpace() {
    return this.rawString.replace(/\s/g, '');
  }

  tokenize() {
    const strWithoutSpace = this.removeWhiteSpace();
    return strWithoutSpace.split(/([\[\]])|,/).filter(Boolean);
  }
}

module.exports = Tokenizer;
