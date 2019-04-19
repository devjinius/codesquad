class Todo {
  constructor(data) {
    this.data = data;
    this.todoCount = this.setTodoCount(data);
  }

  setTodoCount(data) {
    return data.reduce((acc, cur) => {
      acc[cur.status] =
        acc[cur.status] === undefined ? [cur.name] : acc[cur.status].concat(cur.name);
      return acc;
    }, {});
  }

  add(name, tags = '', inputPrompt) {
    // string type의 tags를 string type 배열로 만듦
    tags = tags.replace(/[\[\]\"\'\s]/g, '').split(',');

    const id = Date.now();
    const addData = { name, tags, status: 'todo', id };

    this.data.push(addData);
    this.todoCount.todo.push(name);
    console.log(`${name} 1개가 추가되었습니다.(id : ${id})`);

    setTimeout(() => this.show('status', 'all', inputPrompt), 1000);
  }

  delete(id, inputPrompt) {
    const beforeLen = this.data.length;
    let name;

    [this.data, name] = this.filterById(id);
    this.todoCount = this.setTodoCount(this.data);

    const returnMessage =
      beforeLen === this.data.length
        ? '입력하신 id가 존재하지 않습니다.'
        : `${name} todo가 목록에서 삭제되었습니다.`;

    console.log(returnMessage);

    setTimeout(() => this.show('status', 'all', inputPrompt), 1000);
  }

  // 반환값 [filteredData, deletedName]
  filterById(id) {
    let deletedName;
    return [
      this.data.filter(todo => {
        if (todo.id === Number(id)) {
          deletedName = todo.name;
          return false;
        } else {
          return true;
        }
      }),
      deletedName
    ];
  }

  update(id, status, inputPrompt) {
    let name;
    this.data.map(todo => {
      if (todo.id === Number(id)) {
        name = todo.name;
        todo.status = status;
      }
    });

    this.todoCount = this.setTodoCount(this.data);

    const returnMessage =
      name === undefined
        ? '입력하신 id가 존재하지 않습니다.'
        : `${name}가 ${status}로 변경되었습니다.`;

    setTimeout(() => {
      console.log(returnMessage);
      setTimeout(() => this.show('status', 'all', inputPrompt), 1000);
    }, 3000);
  }

  show(type, condition, inputPrompt) {
    let result;
    if (type === 'status') {
      if (condition === 'all') {
        result = this.printAll();
      } else {
        result = this.printStatus(condition);
      }
    } else if (type === 'tag') {
      result = this.printTags(condition);
    } else {
      result = '입력하신 검색 조건이 잘못 되었습니다.';
    }
    console.log(result);

    inputPrompt.prompt();
  }

  printAll() {
    return Object.entries(this.todoCount).reduce((acc, cur) => {
      return (acc += `${cur[0]}: ${cur[1].length}개 `);
    }, '현재상태 : ');
  }

  printStatus(status) {
    return `${status}리스트 총 ${this.todoCount[status].length}건 : ${this.todoCount[status].join(
      ', '
    )}`;
  }

  printTags(tag) {
    const tagArr = this.data.filter(todo => todo.tags.includes(tag)).map(obj => obj.name);
    return `${tag} 키워드 검색 결과 : ${tagArr.join(', ')}`;
  }
}

module.exports = Todo;
