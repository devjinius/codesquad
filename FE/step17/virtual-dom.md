# virtual dom

메모리에 있는 DOM을 말한다.

react는 메모리에 있는 DOM을 ReactDOM과 같은 라이브러리에 의해 실제 dom과 동기화하는 과정이 있으며 이를 재조정(reconciliation)이라고 부른다.

## reconciliation

react는 선언적 API로 이루어짐 ⇒ 따라서 내부적으로 어떤 작업이 돌아가는지 명확하게 눈에 보이지는 않음.

하지만 react내부의 비교알고리즘(diffing) 으로 상당히 빠른 앱을 구현할 수 있음

render는 결국 dom tree를 만드는 작업. react는 state ⇒ render로 uni direction의 flow를 가짐.
그럼 결국 새로운 트리로 기존의 트리를 대체하는 작업.
기존의 트리에서 어느 부분이 변경되었는지 비교하는 것은 O(n^3)으로 매우 많은 연산이 필요한 작업임.

따라서 2가지 기준으로 휴리스틱 추론 방식을 사용한다.

1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
2. 개발자가 `key` prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.

### diffing algorithm

1.  전체 트리를 수정할 경우

    div ⇒ button으로 변경되는 것 처럼 상위 노드가 변경되면 기존의 dom을 모두 삭제하고 다시 만든다. 따라서 componentWillUnmount() ⇒ componentDidMount() 의 과정(즉 컴포넌트를 unmount하고 다시 mount하는 작업)을 거친다.

2.  특정 속성만 변경하는 경우

    ```javascript
    <div className="before" title="stuff" />
    <div className="after" title="stuff" />
    ```

    이런 경우 돔 트리는 변경되지 않고 해당 속성만 변경된다.

    이 경우 props가 변경된 것이다. 따라서 `componentWillReceiveProps() ⇒ componentWillUpdate()` 과정을 거친다.

3.  자식의 비교

    ```html
    <ul>
      <li>first</li>
      <li>second</li>
    </ul>
    <ul>
      <li>first</li>
      <li>second</li>
      <li>third</li>
    </ul>
    ```

    이러한 경우 서로 비교하여 잘 추가한다. 트리 구조이니 li 엘리먼트를 그냥 추가하면 된다.

    그런데 문제가 되는 경우는 앞에 추가하는 경우다. 지금처럼 first-second-third가 아니라 third-first-second로 추가하는 경우 성능에 문제가 발생할 수 있다.

    이를 해결하고자 사용하는 것이 key props다.

    순서를 비교하는 것이 아니라 key를 비교한다. 그래서 key는 형제 element를 끼리만 고유하면 되고 전역에서 중복으로 사용하는 것은 무관하다.

    간혹 index를 사용하는 경우가 많은데 그 경우 사용하는 이유에 너무 반대가 된다. 즉 비교 최적화 알고리즘에 사용하려고 key를 설정하는데 비교알고리즘 최적화가 무너지는 것.

## fiber

react 에서는 virtual dom을 구현하고자 fiber를 사용한다.

> “Fiber is reimplementation of the stack. ( virtual stack frame )”

fiber는 requestIdleCallback을 이용한 가상 스택 프레임이다. js single thread가 가지는 한계로 다수의 dom 조작 시 1frame에 모든 조작이 이루어지지 못하면 애니메이션이 끊긴다.

main stack이 처리하는 작업 중 frame 사이의 남는 시간에 callback을 실행하여 이를 해결한다.

react는 fiber를 사용하여 가상 stack frame을 구현하였고 requestIdleCallback처럼 main thread에 영향을 최대한 적게 사용하며 react component들의 다양한 메서드 처리를 빠르게 보이도록 처리할 수 있다.

task를 잘게 쪼개어 우선순위를 부여하고 이를 조작하여 main thread에 부담을 최대한 줄이는 것

이 fiber가 reconciliation 작업 즉 diffing algorithm을 이용한 DOM tree 비교와 render 처리를 할 때 사용되어 react가 매우 빠르게 virtual dom 처리를 할 수 있는 것

내부 처리 성능의 최적화는 결국 개발 생산성 증가가 아니라 UX 증가가 목적.

따라서 react component가 render되는 이 모든 일련의 최적화된 작업(reconciliation, virtual dom, render, diffing)들은 모두 UX를 위함이다.
