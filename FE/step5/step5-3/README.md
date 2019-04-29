# todo

## step 5-2

### 파일구조

- index.js
  - 프로그램을 실행하는 곳
- todo.js
  - Todo 클래스
- managingTodo.js
  - todo를 관리하는 프로그램의 클래스
- msg.js
  - 메세지를 관리하는 객체
- todoError.js
  - 에러를 발생시키는 클래스
- history.js
  - 명령의 히스토리를 관리하는 클래스

### 프로그램 설명

todo를 관리하는 프로그램입니다.

### Usage

#### Example

```
$ show$all
$ show$todo

$ add$sleep$["favorite", "likes]

$ update$1$doing

$ delete$1
```

#### Syntax

기본구조 : `[inst]$[inst]`

`code` 표시가 되어있으면 명령어임. 되어있지 않다면 설명임

- `show`
  - `all`
  - status: 상태명
    - `todo`
    - `doing`
    - `done`
- `add`
  - name
    - tag : 배열
      - status: 상태명
        - `todo`
        - `doing`
        - `done`
- `update`
  - id
    - status: 상태명
      - `todo`
      - `doing`
      - `done`
- `delete`
  - id
- undo\$
- redo\$

---

updated : 2019-04-29
