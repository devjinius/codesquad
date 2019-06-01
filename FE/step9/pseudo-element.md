# pseudo-element

가상 element는 Dom Tree의 확장된 부분에 접근하고자 할 때 사용됩니다.

예를들어 첫글자나 첫번째 라인과 같은 부분에 접근할 수 있습니다.
또한 소스코드나 Dom Tree에 없는 부분도 접근 가능하다. (글자의 앞이나 뒤)

pseudo element는 :: 로 시작합니다.

- ::first-line - 첫째 줄만 select합니다.
- ::first-letter - 비슷하게 첫 글자만.
- ::before - element의 이후에 적용
- ::after - element의 이전에 적용
