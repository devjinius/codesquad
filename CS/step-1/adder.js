function halfadder(bitA, bitB) {
  var c = bitA && bitB ? 1 : 0;
  var s = bitA ^ bitB ? 1 : 0;
  var answer = [s, c];
  return answer;
}

function fulladder(bitA, bitB, carry) {
  var [fs, fc] = halfadder(bitA, bitB);
  var [ss, sc] = halfadder(carry, fs);
  var answer = [ss, sc || fc];
  return answer;
}

function byteadder(byteA, byteB) {
  var c = 0;
  var s = 0;
  answer = byteA
    .reduce((acc, cur, i) => {
      [s, c] = fulladder(byteA[i], byteB[i], c);
      return acc.concat(s);
    }, [])
    .concat(c);

  return answer;
}

function dec2bin(decimal) {
  var answer = [];
  while (decimal !== 0) {
    answer.push(decimal % 2);
    decimal = parseInt(decimal / 2);
  }

  return answer;
}

function bin2dec(bin) {
  return bin.reduce((acc, cur, i) => {
    acc += cur * twoPow(i);
    return acc;
  }, 0);
}

function twoPow(n) {
  var res = 1;
  for (var i = 0; i < n; i++) {
    res *= 2;
  }
  return res;
}

bin2dec(byteadder(dec2bin(90), dec2bin(100))); // 190
