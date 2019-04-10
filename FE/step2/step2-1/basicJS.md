# JS

## scope

### 스코프란

scope는 한글로 유효범위다.

이 유효범위는 식별자(변수, 함수와 같은 이름)를 찾는 규칙이다. 스코프는 서로 중첩되며 내부에서 외부의 참조는 가능하지만 외부에서 내부로의 참조는 불가능하다. 쉽게 이러한 규칙이 스코프다.

### 자바스크립트 스코프의 특징

스코프는 블럭레벨, 함수레벨 스코프처럼 차이가 조금 있다. JS는 기본적으로는 함수레벨 스코프를 가진다.

함수레벨 스코프는 함수 코드 블럭 내에서 선언된 식별자는 하위로만 사용 가능하며 외부에서는 사용 불가능하다.

```js
var x = 0;

function foo() {
  var y = 3;
  console.log(x);
}

console.log(y); // Uncaught ReferenceError: y is not defined
```

위 코드는 함수레벨 스코프를 나타낸다.

```js
var x = 0;

if (1) {
  var y = 3;
  console.log(x);
}

console.log(y);
```

위 코드는 블럭레벨 스코프를 보인다. 함수레벨에서는 `ReferenceError`가 발생하는데 블럭레벨에서는 아무 에러가 없다.

ES6 이전에서는 블럭 스코프를 사용하기위해 즉시 실행 함수 표현식(IIFE)을 사용하여 전역 스코프의 오염을 막았다.

```js
var a = 10; // 전역변수

(function foo() {
  var b = 20; // 지역변수
})();

console.log(a); // 10
console.log(b); // "b" is not defined
```

ES6에서는 `let`과 `const`를 사용하여 블럭레벨 스코프를 사용할 수 있게 되었다.

```js
var x = 0;
{
  var x = 1;
  console.log(x); // 1
}
console.log(x); // 1

let y = 0;
{
  let y = 1;
  console.log(y); // 1
}
console.log(y); // 0
```

### 렉시컬 스코프

상위의 스코프를 결정하는 규칙에는 두가지가 있다. Dynamic scope, Static(Lexical) scope 이건 tokenizer, lexer, parser와 같은 내용이 들어가 길어지니 추후 정리하자.

### 암묵적 전역 변수

```js
function foo() {
  var x = 7;
  function bar() {
    x = 10;
  }
}

foo();
console.log(x); // ?
```

`var`나 `let` 키워드를 사용하지 않았는데 변수가 만들어졌다.

이 과정을 따라가보자.

1. 엔진은 스코프에 의거하여 먼저 함수블럭인 foo()의 x라는 식별자가 선언되었는지 확인한다.
2. x가 없으니 상위로 올라가 전역 스코프에 x가 있는지 확인한다.
3. 전역에도 존재하지 않으니 전역에 새로 변수를 만든다.

이를 암묵적 전역 변수라고 한다. 이 경우 전역 스코프를 오염시키게 되므로 지양한다.

### let과 const

추가적인 let과 const의 특징이다.

#### 변수 중복선언 불허용

```js
var x = 1;
var x = 5;

let y = 2;
let y = 3; // Uncaught SyntaxError: Identifier 'y' has already been declared
```

var는 변수를 중복으로 선언해도 무관하나 let은 안된다.

#### const 참조변수 중복가능

const는 값 변경이 불가능한 변수다. 다만 그 값이 참조 변수인 경우 참조하는 메모리가 값이다. 따라서 참조변수의 내용은 변경이 가능하다.

```js
const x = 3;
x = 5; // error

const arr = [];
arr.push(2);
```

위는 안되고 아래는 된다.

#### hoisting

호이스팅은 선언 이전에 참조 가능한 것이다.

하나씩 알아보자.

변수를 만드는 것은 실제로 3단계로 나누어진다.

> 선언 단계(Declaration phase)
> 변수를 실행 컨텍스트의 변수 객체(Variable Object)에 등록한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.

> 초기화 단계(Initialization phase)
> 변수 객체(Variable Object)에 등록된 변수를 위한 공간을 메모리에 확보한다. 이 단계에서 변수는 undefined로 초기화된다.

> 할당 단계(Assignment phase)
> undefined로 초기화된 변수에 실제 값을 할당한다.

예를들어 `var x = 5` 라고 코드를 적으면

```js
var x;
x = undefined;
x = 5;
```

이런 과정이다. var 키워드로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어진다.

js는 var 선언문이나 function 선언문 등을 해당 스코프의 선두로 옮긴 것 처럼 작동하는데 이를 호이스팅이라고 한다.

스코프의 맨 위로 옮기기 때문에 메모리가 할당되어 식별자를 선언하기 이전에 사용하는 아래와 같은 코드가 동작한다.

```js
foo();

function foo() {
  console.log('hello');
}
```

그런데 let이나 const를 사용하면 선언과 초기화가 나누어진다. 호이스팅 시 선언만 이루어지고 초기화는 나중에 코드가 실행될 때 이루어진다. 초기화 이전까지를 TDZ라고 부르며 이 단계에서는 메모리에 값이 없다.

따라서 RefferenceError가 발생한다.

### 함수의 기본 return

## 함수 안에 return을 넣어주지 않으면 `return undefined`가 자동으로 출력된다.

### 참고자료

- [poiemaweb-scope](https://poiemaweb.com/js-scope)
- [poiemaweb-let, const와 블록 레벨 스코프](https://poiemaweb.com/es6-block-scope)
