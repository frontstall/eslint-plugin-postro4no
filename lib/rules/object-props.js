const {
  TYPES,
  createRule,
} = require('../utils');

const {
  ObjectExpression,
  ObjectPattern,
} = TYPES;

const ObjectMessage = {
  id: 'object',
  value: 'Each property should be on separate line',
};

module.exports = createRule(ObjectMessage, [ObjectExpression, ObjectPattern]);
