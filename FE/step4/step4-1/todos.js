const todos = require('./data');

class Todo {
  constructor(todos) {
    this.todos = todos;
    this.todoCount = this.setTodoCount(todos);
  }

  setTodoCount(todos) {
    return todos.reduce((acc, cur) => {
      acc[cur.status] =
        acc[cur.status] === undefined ? [cur.name] : acc[cur.status].concat(cur.name);
      return acc;
    }, {});
  }

  hello() {
    console.log('hello');
  }

  show(type, condition) {
    let result;
    if (type === 'status') {
      if (condition === 'all') {
        result = this.printAll();
      } else {
        result = this.printStatus(condition);
      }
    } else {
      result = this.printTags(condition);
    }
    console.log(result);
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
    const tagArr = this.todos.filter(todo => todo.tags.includes(tag)).map(obj => obj.name);
    return `${tag} 키워드 검색 결과 : ${tagArr.join(', ')}`;
  }
}

const todo = new Todo(todos);

todo.show('status', 'all');
todo.show('status', 'todo');
todo.show('status', 'doing');
todo.show('status', 'done');
todo.show('tag', 'favorite');
todo.show('tag', 'food');
todo.show('tag', 'javascript');
