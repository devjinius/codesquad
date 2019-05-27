- HTML안에 js,css의 위치는 어디에 위치했는가? 왜 그랬을까?

  [how browser works-process order](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_order_of_processing_scripts_and_style_sheets) 에서 설명한다.

  스크립트는 돔을 조작할 수 있기 때문에 동기적으로 작동되는 브라우저는 html parsing 작업을 멈춰버린다.
  script attribute에 `defer`를 사용해 멈추는 상황을 제어할 수 있다.
  HTML5부터는 script 옵션으로 비동기 처리가 가능하며 다른 스레드에서 처리한다.

  css는 돔을 조작하지 않는 것처럼 보여 동기적이 아닌 것처럼 보인다. 그러나 스크립트가 css정보를 요청하는 경우가 있기 때문에 문제가 된다. 파이어폭스는 스타일 시트 파싱이나 로드 시 스크립트 실행을 멈추고, 웹킷은 스크립트가 css 정보를 필요로 할 때만 스크립트를 멈추고 스타일 시트를 파싱한다.

  head 태그 안에 들어가야 성능상 문제가 없다는 글도 있지만, 현재 스타일 태그나 link text/css의 경우 body-ok하다.(W3C) 성능에 영향을 주지 않으므로 어디에 작성되어도 상관이 없다.
  그러나 의미적으로 스타일이 body안에 들어갈 이유는 없다.

- 화면을 표시하기 위해 어떤 파일들이 다운로드 되는가?

  엄청 많은 파일들.... css... js... html... image... 등등

- 특정 자원의 Request Headers 와 Response Headers의 내용을 분석.(네트워크 탭 활용)

  이건 저번 http에서 했던 내용

- 화면에 보여지기 시작하는 시간은 언제인가?

  [프론트엔드 성능 최적화 기본](https://ideveloper2.dev/blog/2019-05-18--front-end-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94-%EA%B8%B0%EB%B3%B8/)

  FP - First Paint
  FCP - First Contentful Paint
  FMP - First Meaningful Paint
  TTI - Time to Interactive
  개념을 이해하고 performance 탭을 열어보자

- DOMContentLoaded라는 이벤트는 언제 발생하는가? load랑은 어떤 차이점이 있는가?

  - DOMContentLoaded : DOM 트리가 완성되었지만, 외부 리소스가 아직 로드되어지지 않았을 때
  - load : 브라우저에 모든 리소스가 로드되었을 때
