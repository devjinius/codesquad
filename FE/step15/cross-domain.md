# CROSS DOMAIN

## same origin policy

js에서의 다른 자원 요청은 원칙적으로 동일한 도메인에서만 허용한다. 이를 same-origin policy라고 한다.

정확히는 동일한 protocol, port, host인 경우에만 허용한다.

개발을 하다보면 이런 원칙(policy)을 깨트리고 통신해야 하는 경우가 많다. 외부의 자원을 XHR, AJAX통신을 통해 이용하는 것은 너무 당연하게도 많이 사용한다.

이 원칙을 깨트리며 통신하는 방법이 JSONP, CORS가 있다.

## CORS

CORS는 크로스 도메인 이슈를 해결하는 사실상의 표준 방법이다. 프론트 측에서는 따로 설정할 것이 없다. 백엔드 서버측에서 HTTP response Header에 허용 가능한 도메인을 설정해줘야 한다.

## JSONP

json padding이라고 한다. 과정은 다음과 같다.

1. 이용할 서버 응답이후 실행되는 콜백함수를 만든다.
2. 콜백함수 이름을 이용할 서버에 보낸다.
3. 이용하는 서버에서 콜백함수에 JSON 데이터를 넣고 대신 실행한다.

`<script src=”http://codesquad.com/cards?callback=addCardsToDOM&q=jin”></script>`

```js
const query = request.q;
const data = model.find(query);
request.callback(data);
```

코드는 예시라 정확하지 않지만 이러한 방식으로 진행된다.
