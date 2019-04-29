const Todo = require('./todo');

class ManagingTodo {
  constructor({ data, inputPrompt, msgObj, todoError, history }) {
    this.countedStatus = { todo: 0, doing: 0, done: 0 };
    this.managedlist = this.initManagedlist(data);
    this.msgObj = msgObj;
    this.inputPrompt = inputPrompt;
    this.todoError = todoError;
    this.history = history;
  }

  add(name, tags = '[]', status = 'todo') {
    if (!this.todoError.invalidStatus(Object.keys(this.countedStatus), status)) {
      throw new Error(this.msgObj.getInvalidStatusError);
    }

    if (!this.todoError.isArray(tags)) {
      throw new Error(this.msgObj.getIsNotArrayError(tags));
    }

    tags = tags.replace(/[\[\]\"\'\s]/g, '').split(','); // 통과된 입력을 올바른 배열로 변환

    const newTodo = new Todo({ name, tags, status });

    this.controlTodoList({
      methodName: 'add',
      targetTodo: newTodo,
      message: this.msgObj.add(newTodo.name, newTodo.id)
    });

    this.history.append({ methodName: 'add', todo: newTodo });
  }

  delete(id) {
    if (typeof id === 'string') {
      id = parseInt(id);
    }

    const [deletedTodo, deletedTodoId] = this.findTodoById(id);

    if (!this.todoError.invalidId(deletedTodoId)) {
      throw new Error(this.msgObj.getInvalidIdError);
    }

    this.controlTodoList({
      methodName: 'delete',
      targetTodo: deletedTodo,
      message: this.msgObj.delete(deletedTodo.name, deletedTodo.status)
    });

    this.history.append({ methodName: 'delete', todo: deletedTodo });
  }

  update(id, changeStatus) {
    if (typeof id === 'string') {
      id = parseInt(id);
    }

    const [changeTargetTodo, changeTargetTodoId] = this.findTodoById(id);

    if (!this.todoError.invalidStatus(Object.keys(this.countedStatus), changeStatus)) {
      throw new Error(this.msgObj.getInvalidStatusError);
    }
    if (!this.todoError.invalidId(changeTargetTodoId)) {
      throw new Error(this.msgObj.getInvalidIdError);
    }
    if (!this.todoError.compareStatus(changeTargetTodo.status, changeStatus)) {
      throw new Error(this.msgObj.getSameStatusError(changeTargetTodo.status, changeStatus));
    }

    this.controlTodoList({
      methodName: 'update',
      targetTodo: Object.assign({}, changeTargetTodo),
      message: this.msgObj.update(changeTargetTodo.name, changeStatus),
      changeStatus,
      isUndo: false
    });

    this.history.append({
      methodName: 'update',
      todo: changeTargetTodo,
      changeStatus
    });
  }

  controlTodoList({ methodName, targetTodo, message, changeStatus, isUndo = false }) {
    switch (methodName) {
      case 'add':
        this.managedlist.push(targetTodo);
        this.countedStatus[targetTodo.status] += 1;

        this.printMsg(message, 1000);
        break;

      case 'delete':
        this.managedlist = this.managedlist.filter(todo => todo.id !== targetTodo.id);
        this.countedStatus[targetTodo.status] -= 1;

        this.printMsg(message, 1000);
        break;

      case 'update':
        if (isUndo) {
          const tempStatus = targetTodo.status;
          targetTodo.status = changeStatus;
          changeStatus = tempStatus;
        }

        this.countedStatus[targetTodo.status] -= 1;
        this.countedStatus[changeStatus] += 1;
        targetTodo.status = changeStatus;

        setTimeout(() => {
          this.printMsg(message, 1000);
        }, 3000);
        break;
    }
  }

  initManagedlist(data) {
    return data.map(todo => {
      const newTodo = new Todo(todo);
      this.countedStatus[newTodo.status] += 1;
      return newTodo;
    });
  }

  countStatus() {
    return Object.entries(this.countedStatus).reduce(
      (acc, cur) => (acc += `${cur[0]} : ${cur[1]}개 `),
      `현재상태 : `
    );
  }

  filterbyStatus(status = 'todo') {
    const filteredArrByStatus = this.managedlist
      .filter(todo => todo.status === status)
      .map(todo => todo.name);

    return `${status} 총 ${filteredArrByStatus.length}건 : ${filteredArrByStatus.join(', ')}`;
  }

  show(status) {
    let outputStr = '';
    const searchStatusArr = ['all', ...Object.keys(this.countedStatus)];

    if (!this.todoError.invalidStatus(searchStatusArr, status)) {
      throw new Error(this.msgObj.getInvalidStatusError);
    }

    if (status === 'all') {
      outputStr = this.countStatus();
    } else {
      outputStr = this.filterbyStatus(status);
    }
    console.log(outputStr);
    this.inputPrompt.prompt();
  }

  findTodoById(id) {
    const targetTodo = this.managedlist.find(todo => todo.id === id);
    const targetTodoId = targetTodo === undefined ? undefined : targetTodo.id;

    return [targetTodo, targetTodoId];
  }

  printMsg(msg, time) {
    console.log(msg);
    setTimeout(() => {
      this.show('all');
    }, time);
  }

  undo() {
    const { methodName, todo, changeStatus } = this.history.undo();
    switch (methodName) {
      case 'add':
        this.controlTodoList({
          methodName: 'delete',
          targetTodo: todo,
          message: this.msgObj.getUndoMessage(methodName)
        });
        break;
      case 'delete':
        this.controlTodoList({
          methodName: 'add',
          targetTodo: todo,
          message: this.msgObj.getUndoMessage(methodName)
        });
        break;
      case 'update':
        this.controlTodoList({
          methodName,
          targetTodo: todo,
          message: this.msgObj.getUndoMessage(methodName),
          changeStatus,
          isUndo: true
        });
    }
  }

  redo() {
    const { methodName, todo, changeStatus } = this.history.redo();
    switch (methodName) {
      case 'add':
        this.controlTodoList({
          methodName,
          targetTodo: todo,
          message: this.msgObj.getRedoMessage(methodName)
        });
        break;
      case 'delete':
        this.controlTodoList({
          methodName,
          targetTodo: todo,
          message: this.msgObj.getRedoMessage(methodName)
        });
        break;
      case 'update':
        this.controlTodoList({
          methodName,
          targetTodo: todo,
          message: this.msgObj.getRedoMessage(methodName),
          changeStatus,
          isUndo: false
        });
    }
  }
}
module.exports = ManagingTodo;
