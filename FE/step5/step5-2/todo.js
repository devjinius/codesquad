function Todo(obj) {
  this.name = obj.name;
  this.tags = obj.tags;
  this.status = obj.status;
  this.id = Todo.prototype.generateId();
}

Todo.prototype.id = 0;

Todo.prototype.generateId = function() {
  this.id += 1;
  return this.id;
};

module.exports = Todo;
