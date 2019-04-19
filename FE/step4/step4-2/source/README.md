# todo

## step 4-2

### 파일구조

- data.js
  - todo의 초기 데이터
- todo.js
  - Todo 클래스
- index.js
  - 프로그램을 실행하는 곳

### 프로그램 설명

todo를 관리하는 프로그램입니다.

### Usage

#### Example

```
$ show$status$all
$ show$status$todo
$ show$tag$favorite

$ add$sleep$["favorite", "likes]

$ update$97989$doing

$ delete$97989
```

#### Syntax

기본구조 : `[inst]$[inst]$[inst]`

`code` 표시가 되어있으면 명령어임. 되어있지 않다면 설명임

- `show`
  - `status` : 상태
    - `all`
    - 상태명
      - `todo`
      - `doing`
      - `done`
  - `tag` : 태그검색
    - 검색할 태그
- `add`
  - name
    - tag : 배열
- `update`
  - id
    - 상태명
      - `todo`
      - `doing`
      - `done`
- `delete`
  - id

---

updated : 2019-04-19
