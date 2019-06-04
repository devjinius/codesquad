# Flex

flex를 사용해 왔지만 잘 모르던 기초를 정리해보자.

## flex 정의

flexbox라고 불리는 모듈은 1차원 레이아웃 모델이다.

1차원 레이아웃이라고 생각해본 적이 없었는데 잘 생각해보면 1차원이다. 배열처럼 한 줄만 다룬다.

## flex container

display: flex or inline-flex인 경우 flex container라고 부른다.

flex container는 하위 items들의 레이아웃을 컨트롤한다. 이 하위 items는 `the direct children`(일차 자식)들을 의미한다.
즉 자식 요소만 정의하며 자손은 정의하지 않는 특성을 가진다.

## flex 항목에 지정하는 속성들

- flex-grow
- flex-shrink
- flex-basis

이 세가지가 있다.

보통 세가지를 같이 축약하여 사용한다.

예를들면 `flex: 1 1 auto` 이런 식으로 사용한다.

기본값은 0 1 auto다. 순서대로 grow, shrink, basis다.

### flex-grow

grow는 증가하는 비율이다 grow의 값으로는 양수가 올 수 있다. 기본은 0이며 작성한 숫자만큼 증가한다.

여기서 증가한다는 의미는 남는 공간에 대한 정의다.
남는 공간들을 형제 요소들끼리 어떤 비율로 분배할 것인가를 지정할 수 있다.

grow의 값이 모두 같다면 container 안에서 동일한 너비를 가진다.

### flex-shrink

shrink는 grow와는 조금 반대로 작동한다. grow는 남는 공간을 분배하는데 shrink는 container가 item들을 모두 수용하지 못한다면(너비가 작다면) 작동한다.

flex는 1차원 layout이기 때문에 부족한 공간이 생기면 요소의 크기를 줄인다.
이 때 어떠한 비율대로 형제 요소들을 줄일 것인가를 결정하는 것이 shrink다.

기본값은 1로 1만큼 줄어든다. 이걸 2로 바꾸면 1보다 2배로 감소하게 된다.

### flex-basis

basis는 기본 너비를 지정한다. 기본 값은 auto로 내부 컨텐츠의 크기에 따라 자동으로 변경된다.

이를 임의로 지정할 수 있는데 그게 basis다.

width 속성값, fill, max-content, inherit과 같이 다양한 값의 지정이 가능하다.
