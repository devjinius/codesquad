// step-1에서 사용했던 dec2bin과 bin2dec을 아주 조금 변형하여 재사용함.

module.exports = {
  dec2bin(decimal) {
    var answer = [];
    while (decimal !== 0) {
      answer.unshift(decimal % 2);
      decimal = Math.floor(decimal / 2);
    }

    return answer;
  },

  bin2dec(bin) {
    let i = 0;
    return bin.reduceRight((acc, cur) => {
      acc += cur * this.twoPow(i);
      i++;
      return acc;
    }, 0);
  },

  twoPow(n) {
    let res = 1;
    for (let i = 0; i < n; i++) {
      res *= 2;
    }
    return res;
  }
};
