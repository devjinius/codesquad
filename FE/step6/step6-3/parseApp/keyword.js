module.exports = {
  '[': { context: 'ArrayOpen', type: 'Array' },
  ']': { context: 'ArrayClose' },
  null: { context: 'Element', type: 'Null', value: null },
  true: { context: 'Element', type: 'Boolean', value: true },
  false: { context: 'Element', type: 'Boolean', value: false },
  string: { context: 'Element', type: 'String' },
  number: { context: 'Element', type: 'Number' },
  '{': { context: 'ObjectOpen', type: 'Object' },
  '}': { context: 'ObjectClose' },
  ':': { context: 'ObjectSeperator' },
  ',': { context: 'Seperator' }
};
