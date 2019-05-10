module.exports = {
  '[': { context: 'ArrayOpen', type: 'Array' },
  ']': { context: 'ArrayClose' },
  null: { context: 'Element', type: 'Null', value: null },
  true: { context: 'Element', type: 'Boolean', value: true },
  false: { context: 'Element', type: 'Boolean', value: false },
  undefined: { context: 'Element', type: 'Undefined', value: undefined },
  string: { context: 'Element', type: 'String' },
  number: { context: 'Element', type: 'Number' }
};
