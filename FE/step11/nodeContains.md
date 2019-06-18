# node contains

인자가 선택된 node의 자손인지, 아닌지에 대한 Boolean 값을 리턴합니다.

이런 API도 있는지 몰랐는데 알아두면 꽤나 쓸모있을 메서드인 것 같아 따로 정리한다.

```js
const targetArea = document.queryselector('.targetArea');
document.addEventListener('click', e => {
  console.log(targetArea.contains(e.target));
});
```

이런 방식으로 사용할 수 있다. 위 예제는 방금 클릭한 element가 targetArea 안에 존재하는지를 반환한다.

느낌은 contains라 배열에 포함되는지를 반환하는 것처럼 생겼지만, 하위 자손노드에 존재하는지를 검사한다.

---

### 참고자료

- [Node.contains-MDN문서](https://developer.mozilla.org/ko/docs/Web/API/Node/contains)
