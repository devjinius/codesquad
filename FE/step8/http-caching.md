# HTTP caching

웹 자원을 요청할 때 같은 자원을 재요청하지 않기 위해 사본을 만들어 저장하는데 이를 캐싱이라 한다.

아주 간단한 예로 랜딩 페이지의 로고 같은 것은 랜딩 페이지를 도착할 때마다 요청한다. 이를 캐싱해놓으면 재 요청을 보내지 않으므로 네트워크 트래픽을 줄인다.

네트워크 트래픽말고도 장점이 한가지 더 있다.
통신은 물리적인 거리와도 연관이 있다. 그 속도마저 너무 빨라 우리 눈에 보이지는 않지만 거리에 따라 속도가 다르다.

만일 실제 서버와 클라이언트의 물리적인 거리가 멀고 요청하는 자원의 크기가 크고 양이 많다면 속도가 느려질 수 있다.
쉽게 유튜브를 떠올리자.
유튜브의 실제 서버가 미국에 있다고 가정하면 한국 클라이언트들은 미국 클라이언트들보다 현저히 응답 속도가 느릴 수 있다.
이럴 때 한국에 캐시서버를 만들어 이 문제를 해결할 수 있을 것이다.

## 캐싱의 종류

캐싱에는 public, private로 크게 두가지 종류가 있다. 거창한 것은 아니다.

### public caching

public caching의 다른 명칭으로는 proxy cache, cache proxy server등으로도 부른다.

큰 회사나 ISP(Internet Sevice Provider)의 방화벽에 설치된다.

### private caching

브라우저가 저장하는 캐시다. 브라우저는 자주 쓰이는 자원을 개인용 컴퓨터의 디스크와 메모리에 캐시해 놓은 후 불러온다.

![caching-in-browser](https://user-images.githubusercontent.com/24724691/61453854-32920980-a99a-11e9-91ba-728a2aaf2e18.PNG)

브라우저에서 개발자도구를 열면 위와 같은 화면을 볼 수 있다.

## Cache-control

캐시를 컨트롤하는 방법이다. 이 자원은 필히 캐시되어야 한다 / 캐시되면 안된다 / 캐시된 자원을 24시간동안만 사용하고 그 뒤로는 다시 받아라 / 등의 명령을 내리는 것이 캐시 컨트롤이다.

현대의 브라우저에서는 이 HTTP-header를 이용하여 캐시 컨트롤을 한다.
header는 HTTP 1.0과 1.1버전에 따라 조금 다르다.

|            | 1.0 req           | 1.0 res       | 1.1 req       | 1.1 req       |
| ---------- | ----------------- | ------------- | ------------- | ------------- |
| validation | If-Modified-Since | Last-Modified | If-None-Match | ETag          |
| freshness  | Pragma            | Expires       | Cache-Control | Cache-Control |

사용할 때에는 1.1의 방법이 좋으므로 1.0은 알아만 보고 1.1의 방법을 중심으로 알아보자.

### Cache-control header

cache control의 헤더는 request, response 모두 사용ㅇ이 가능하다.

`Cache-Control: no-store`
`Cache-Control: no-cache, no-store, must-revalidate`

위와 같이 두가지 표기법 모두 사용 가능하다.

- `Cache-Control: no-store` : 캐시하지 않음. 캐시를 저장(store)하지 않음을 의미하며 사본을 만드는 것을 금지한다.
- `Cache-Control: no-cache` : 사본을 저장은 한다. 즉 캐싱은 발생하지만 서버와 재검사(revalidation) 과정을 거치고 클라이언트에게 제공된다. 영어의 더 나은 표기는 **DO NOT Serve from cache without revalidation** 다.
- `Pragma: no-cache` : no-cache와 동일하다.

`no-store, no-cache`는 검증되지 않은 캐시가 제공되는 것을 막는다.

- `Cache-Control: private` : private caching에서만 가능
- `Cache-Control: public` : 모두 가능
- `Cache-Control: max-age=<seconds>` : cache가 유효한 시간. 즉 freshness를 보장할 수 있는 시간을 말한다. 요청을 보냈던 시간으로부터 상대적인 시간을 나타내며 초로 표기한다.
- `Cache-Control: s-maxage=<seconds>` : shared(공유)에서만 작동. 즉 public에서 작동함. maxage의 하이픈이 변경된것에 주의하자.
- `Cache-Control: must-revalidate` : 특정한 상황(네트워크 연결 끊김)일 때 freshness하지 않아도 캐시 파일을 제공하는 경우가 있다. 이를 막는다.
- `Cache-Control: proxy-revalidate` : shared(proxy)에서 작동하는 revalidate
- `Cache-Control: no-transform` : 이미지와 같은 리소스들에 저장 최적화를 위해 포맷하는 경우 이를 막는다.
