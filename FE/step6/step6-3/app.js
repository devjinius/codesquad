const parseApp = require('./parseApp');

const str =
  "['1  [ ] a3',[null,false,['11',[112233],{'easy' : ['hello', {'a':'a'}, 'world']},112],55, '99'],{'a':'str', 'b':[912,[5656,33],{'key' : 'innervalue', 'newkeys': [1,2,3,4,5]}]}, true]";

try {
  const result = parseApp.parse(str);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.log(error.message);
}
