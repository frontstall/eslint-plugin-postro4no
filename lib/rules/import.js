const ImportMessage = {
  id: 'import',
  value: 'Place each regular import on separate line',
};

const {
  TYPES,
  createRule,
} = require('../utils');

const {
  ImportDeclaration,
} = TYPES;

module.exports = createRule(
  ImportMessage,
  [ImportDeclaration],
  ({ type }) => type !== 'ImportDefaultSpecifier',
);
