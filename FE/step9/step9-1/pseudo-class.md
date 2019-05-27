# pseudo-class

한글로 가상 클래스라고 한다. element의 특별한 상태를 선택하는 selector다. 가장 대표적인 예로 :hover가 있습니다.

## 간단설명

가상 클래스는 Dom Tree 외부에 있거나 simple selector로 접근할 수 없는 것에 select하기 위해 도입되었다.

가상클래스는 colon + name 으로 구성 되어있으며 name은 대소문자를 구별하지 않습니다.

## Dynamic pseudo class

동적인 가상 클래스는 Dom Tree나 Document source에 나타나지 않는 특징으로 나뉩니다.

### link

link와 관련된 가상 클래스.

- :link - 방문하지 않은 링크
- :visited - 방문한 링크

### user-action

브라우저가 user action에 따라 반응하며 렌더링을 체인지 할 때를 select하는 가상 클래스.

- :hover - element에 point할 경우. activate와는 무관함
- :active - 활성화 된 동안. 예를들어 버튼을 클릭하고 있는 동안
- :focus - element가 focus된 동안. 예를들어 input 창에 입력하고 있는 동안. 이 selector는 keyboard, mouse, other forms of input을 모두 지원한다.

### combine dynamic pseudo class

`a:focus:hover` 와 같이 동적 가상 클래스를 조합할 수도 있다.

## target

문서 내에서 a태그와 id를 이용해 이동 시, element가 targeting 되었을 때를 selector로 선택할 수 있다.

[예제](https://codepen.io/eugene94/pen/KLeVro)

## The UI element states

- :enabled
- :disabled
- :checked - Radio나 checkbox는 토글형식이 될 수 있어 그런 경우에 사용합니다.

## structural

- :nth-child(n) - 셀렉터에 해당하는 모든 요소 중 앞에서 n번째 자식인 요소를 선택한다.
- :nth-last-child(n) - 셀렉터에 해당하는 모든 요소 중 뒤에서 n번째 자식인 요소를 선택한다.
