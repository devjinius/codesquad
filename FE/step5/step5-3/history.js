class History {
  constructor({ maxLength, msgObj }) {
    this.maxLength = maxLength;
    this.msgObj = msgObj;
    this.history = [];
    this.tempHistory = [];
  }

  append({ methodName, todo, changeStatus = '' }) {
    this.history.push({ methodName, todo, changeStatus });

    if (this.history.length > this.maxLength) {
      this.history.shift();
    }

    this.tempHistory = [];
  }

  undo() {
    if (this.history.length === 0) {
      throw new Error(this.msgObj.getUndoError);
    }
    const undoData = this.history.pop();
    this.tempHistory.push(undoData);

    return undoData;
  }

  redo() {
    if (this.tempHistory.length === 0) {
      throw new Error(this.msgObj.getRedoError);
    }
    const redoData = this.tempHistory.pop();
    this.history.push(redoData);

    return redoData;
  }
}

module.exports = History;
