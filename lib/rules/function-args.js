const FunctionMessage = {
  id: 'function',
  value: 'Each param should be on separate line',
};

const {
  TYPES,
  createRule,
} = require('../utils');

const {
  ArrowFunctionExpression,
  FunctionDeclaration,
  FunctionExpression,
  CallExpression,
} = TYPES;

module.exports = createRule(FunctionMessage, [
  ArrowFunctionExpression,
  FunctionDeclaration,
  FunctionExpression,
  CallExpression,
]);
