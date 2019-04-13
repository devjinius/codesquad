const transform = require('./transform');

module.exports = {
  instList: {
    '0001': () => 'LOAD',
    '0010': () => 'LOAD',
    '0011': () => 'STORE',
    '0100': () => 'STORE',
    '0101': () => 'AND',
    '0110': () => 'OR',
    '0111': () => 'ADD',
    '1000': () => 'ADD',
    '1001': () => 'SUB',
    '1010': () => 'SUB',
    '1011': () => 'MOV'
  },
  LOAD(base, offset, isVal) {
    return transform.bin2dec(isVal) === 1
      ? this.memory.load(this.register[transform.bin2dec(base)] + transform.bin2dec(offset))
      : this.memory.load(
          this.register[transform.bin2dec(base)] + this.register[transform.bin2dec(offset)]
        );
  },
  STORE(base, offset, isVal) {
    return transform.bin2dec(isVal) === 1
      ? this.register[transform.bin2dec(base)] + transform.bin2dec(offset)
      : this.register[transform.bin2dec(base)] + this.register[transform.bin2dec(offset)];
  },
  AND(op1, op2) {
    return this.register[transform.bin2dec(op1)] && this.register[transform.bin2dec(op2)];
  },
  OR(op1, op2) {
    return this.register[transform.bin2dec(op1)] || this.register[transform.bin2dec(op2)];
  },
  ADD(op1, op2, isVal) {
    return transform.bin2dec(isVal) === 1
      ? this.register[transform.bin2dec(op1)] + transform.bin2dec(op2)
      : this.register[transform.bin2dec(op1)] + this.register[transform.bin2dec(op2)];
  },
  SUB(op1, op2, isVal) {
    return transform.bin2dec(isVal) === 1
      ? this.register[transform.bin2dec(op1)] - transform.bin2dec(op2)
      : this.register[transform.bin2dec(op1)] - this.register[transform.bin2dec(op2)];
  },
  MOV(val) {
    return transform.bin2dec(val);
  }
};
