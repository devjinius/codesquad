class Node {
  constructor({ type, value = '' }) {
    this.type = type;
    this.value = value;
    this.child = [];
  }

  pushChild(node) {
    this.child.push(node);
  }
}
module.exports = Node;
