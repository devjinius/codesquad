class Todo {
  constructor(obj) {
    this.name = obj.name;
    this.tags = obj.tags;
    this.status = obj.status;
    this.id = Todo.generateId();
  }

  static generateId() {
    Todo.id += 1;
    return Todo.id;
  }
}
Todo.id = 0;

module.exports = Todo;
