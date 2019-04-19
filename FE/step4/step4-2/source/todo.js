const message = require('./msg');

class Todo {
  constructor(data, inputPrompt) {
    this.data = data;
    this.todoCount = this.setTodoCount(data);
    this.inputPrompt = inputPrompt;
  }

  setTodoCount(data) {
    return data.reduce((acc, cur) => {
      acc[cur.status] =
        acc[cur.status] === undefined ? [cur.name] : acc[cur.status].concat(cur.name);
      return acc;
    }, {});
  }

  logMessage(message, time) {
    console.log(message);
    setTimeout(() => this.show('status', 'all', this.inputPrompt), time);
  }

  add(name, tags = '') {
    // string type의 tags를 string type 배열로 만듦
    tags = tags.replace(/[\[\]\"\'\s]/g, '').split(',');

    const id = Date.now();
    const addData = { name, tags, status: 'todo', id };

    this.data.push(addData);
    this.todoCount.todo.push(name);

    this.logMessage(message.ADD_DATA(name, id), 1000);
  }

  delete(id) {
    const beforeLen = this.data.length;
    let name;

    [this.data, name] = this.filterById(id);
    this.todoCount = this.setTodoCount(this.data);

    const returnMessage =
      beforeLen === this.data.length ? message.NOT_EXISTED_ID : message.DELETED_DATA(name);

    this.logMessage(returnMessage, 1000);
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

  update(id, status) {
    let name;
    this.data.map(todo => {
      if (todo.id === Number(id)) {
        name = todo.name;
        todo.status = status;
      }
    });

    this.todoCount = this.setTodoCount(this.data);

    const returnMessage =
      name === undefined ? message.NOT_EXISTED_ID : message.UPDATE_DATA(name, status);

    setTimeout(() => {
      this.logMessage(returnMessage, 1000);
    }, 3000);
  }

  show(type, condition) {
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
      result = message.WRONG_TYPE;
    }
    console.log(result);

    this.inputPrompt.prompt();
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
