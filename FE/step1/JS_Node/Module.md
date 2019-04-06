# Module

프로그램을 한 곳에 몰아서 프로그래밍하면 여러 문제점이 발생한다.

- 코드의 재사용불가
- 중복 발생
- 복잡성 증가 => 버그 유발
- 유지보수의 어려움

지금 당장만 떠올려도 위와 같다. 따라서 어떻게하면 코드를 효율적으로 잘게 쪼갤 수 있을까? 의 결과가 모듈이다.

클래스나 라이브러리와 같은 것들이 이러한 모듈 개념에서 탄생했다.

## JS Module

JS는 원래 모듈이 없었다.

Javascript는 브라우저 위에서 돌아가기 위해 만들어졌던 언어다. 따라서 브라우저 위에 script tag로 로딩하면 하나의 전역 scope(window)로 묶인다.

이러한 JS를 client-side 밖으로 꺼내다보니 모듈 기능이 필요했다. 여기서 고안된 것이 [CommonJS, AMD](https://d2.naver.com/helloworld/12864) 다. 이에 server-side의 대표인 Node가 CommonJS 표준을 선택하여 비슷한 사양을 가졌다.

Node는 모듈단위로 Scope를 할당받는다. 이 Scope가 실행 영역이고 지역변수를 나눌 수 있는 지점이다. 모듈 객체가 이 Scope를 가진다. 동시에 모듈은 파일과 1대1 대응한다.

기본적으로 모듈객체는 private하다. 따라서 외부에서 참조가 불가능하다. 그런데 접근할 수 있는 부분이 바로 exports다. `module.exports` 이 부분은 외부에 공개되는 public영역이다.

타 언어의 객체지향의 클래스와 비슷하다. 클래스는 private와 public 영역을 나누어 멤버변수와 메서드를 관리한다. JS는 module로 class와 흡사한 형태를 만들고 module.exports로 외부에 공개한다.

`console.log(module)`을 했을때의 표준출력이다. 가장 주의깊게 볼 부분은 exports 부분이다

    Module {
      id: '.',
      exports: {},
      parent: null,
      filename: 'C:\\codesquad\\FE\\step1\\JS_Node\\module_exports\\circle.js',
      loaded: false,
      children: [],
      paths:
      [ 'C:\\codesquad\\FE\\step1\\JS_Node\\module_exports\\node_modules',
        'C:\\codesquad\\FE\\step1\\JS_Node\\node_modules',
        'C:\\codesquad\\FE\\step1\\node_modules',
        'C:\\codesquad\\FE\\node_modules',
        'C:\\codesquad\\node_modules',
        'C:\\node_modules' ] }

## exports와 require

모듈의 공개부분을 exports로 명시하고 이를 전역함수인 require()로 이용한다.

```js
// circle.js
const PI = 3.141592;

// module.exports.area = r => PI * r * r;
exports.area = r => PI * r * r;
```

주석처리 부분을 보면 위에서 봤던 module.exports object에 area를 추가한 모습이다. 이는 바로 아래의 `exports.area`와 완전히 동일하다. 일단 두개가 같다고 하자.

현재 PI는 외부에서 참조 불가능한 private변수이며 area는 공개된다. 외부에서 참조했을 경우 이 `exports` 부분만 조회가 가능하기 때문이다.

```js
// app.js (타 파일)
const circle = require('./circle.js');

console.log(circle.area(2)); // 12.56
console.log(circle.PI); // undefined
```

위의 코드처럼 타 파일(모듈)에서 require를 이용하면 exports부분을 가져온다.

area는 추가했고, PI는 추가하지 않았기 때문에 서로 결과가 상이한 것을 볼 수 있다.

## module 객체

위에서 `module.exports`, `exports` 두가지를 서로 같다고 보자고 했다. 사실 맞다. 그냥 alias다.

exports는 module.exports에의 참조이며 module.exports의 alias이다. `module.`이 쓰기 귀찮아서 줄였다고 생각하자.

exports에는 변수, 함수, 객체와 같은 값을 단 한개만 할당할 수 있다. 따라서 보통의 경우 객체를 이용하여 복수의 값을 할당한다.

## require()

전역 함수 require는 모듈을 불러오는, 정확히는 모듈의 exports 값을 불러오는 역할을 한다.

불러오는 모듈의 종류에는 코어 모듈, 외부패키지, 파일 모듈 세가지 종류가 있다.

- 코어모듈 : node가 기본적으로 포함하는 모듈.
- 외부 패키지 : npm등을 통해 설치한 외부 패키지.
- 파일 모듈 : 그 외의 모두. 패스를 명시해주어야 한다.

또한 require는 파일 path말고 디렉토리를 지정할 수도 있다.
`const myModule = require('./module');` 이렇게 말이다.

이 경우 http 처럼 자동으로 index.js를 찾는다. 만일 index.js에서
아래처럼 코딩했다면 두가지를 한꺼번에 부를 수 있다.

```js
// module/index.js
module.exports = {
  calc: require('./calc'),
  print: require('./print')
};
```

## ES6 Module

es6부터는 `export`와 `import` 두개의 키워드를 제공하면서 CommonJS를 대체한다. 이는 나중에 추후 정리하도록 하겠다.

---

### 참고자료

- [Node.js v11.13.0 Documentation](https://nodejs.org/api/modules.html)
- [Node.js의 module loading system](https://poiemaweb.com/nodejs-module)
