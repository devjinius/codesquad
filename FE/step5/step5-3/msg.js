const msgObject = {
  add(name, id) {
    return `${name}이(가) 추가됐습니다.(id: ${id})`;
  },

  delete(name, status) {
    return `${name}이(가) ${status} 목록에서 삭제됐습니다`;
  },

  update(name, status) {
    return `${name}이(가) ${status}로 상태가 변경되었습니다.`;
  },

  getSeparatorError(seperator) {
    return `${seperator}가 없습니다. 다시 입력해주세요.`;
  },

  getSameStatusError(originStr, changingStr) {
    return `원래의 상태 '${originStr}'가 변경 할 상태 '${changingStr}'와 같습니다. 다시 입력해주세요.`;
  },

  getIsNotArrayError(notArray) {
    return `입력하신 ${notArray}를 배열의 형태로 입력해주세요.`;
  },

  getUndoMessage(methodName) {
    return `이전 명령(${methodName})이 취소 되었습니다.`;
  },

  getRedoMessage(methodName) {
    return `취소 했던 명령(${methodName})을 다시 실행했습니다.`;
  },

  getInvalidIdError: `입력 하신 id가 존재하지 않습니다. 다시 입력해주세요.`,

  getInvalisdInstError: `입력 하신 명령어가 존재하지 않습니다. 다시 입력해주세요.`,

  getInvalidStatusError: `입력 하신 상태가 존재하지 않습니다. 다시 입력해주세요.`,

  getUndoError: '취소할 명령이 없습니다.',

  getRedoError: '되돌릴 명령이 없습니다.'
};
module.exports = msgObject;
