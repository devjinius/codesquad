// checkParam은 5와 6을 체크합니다.
const checkParam = require('./check.js');
const PI = Math.PI;

// 1. 반지름을 입력받아 원의 넓이를 계산하는 함수를 만든다.
const roundArea = r => {
  checkParam([r]);
  return PI * r ** 2;
};

// 2. 필요한 인자를 입력받아 사각형의 넓이를 계산하는 함수를 만든다.
const squareArea = (w, h) => {
  checkParam([w, h]);
  return w * h;
};

// 3. 필요한 인자를 입력받아 사다리꼴의 넓이를 계산하는 함수를 만든다.
const trapezoidArea = (w1, w2, h) => {
  checkParam([w1, w2, h]);
  return squareArea(w1 + w2, h / 2);
};

// 4. 필요한 인자를 입력받아 원기둥의 넒이를 계산하는 함수를 만든다.
const cylinderArea = (r, h) => {
  checkParam([r, h]);
  let cyRoundArea = roundArea(r);
  let cySquareArea = squareArea(2 * PI * r, h);
  return cyRoundArea * 2 + cySquareArea;
};

module.exports = {
  roundArea,
  trapezoidArea,
  squareArea,
  cylinderArea
};
