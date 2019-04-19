module.exports = {
  NOT_EXISTED_ID: '입력하신 ID가 존재하지 않습니다.',
  WRONG_TYPE: '입력하신 검색 TYPE이 잘못 되었습니다.',
  ADD_DATA: (name, id) => `${name} 1개가 추가되었습니다.(id : ${id})`,
  UPDATE_DATA: (name, status) => `${name}가 ${status}로 변경되었습니다.`,
  DELETED_DATA: name => `${name} todo가 목록에서 삭제되었습니다.`
};
