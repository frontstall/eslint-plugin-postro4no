const {
  ObjectExpression,
  ObjectPattern,
} = require('../utils');

module.exports = {
  meta: {
    messages: {
      objectLineByLine: 'Each property should be on separate line',
    },
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    const sourceCode = context.getSourceCode();

    const check = [ObjectExpression, ObjectPattern]
      .reduce((result, selector) => ({
        ...result,
        [selector](node) {
          if (node.properties.length < 3) return;

          const propsLines = node.properties
            .map(({ start }) => {
              const { line } = sourceCode.getLocFromIndex(start);

              return line;
            });

          const uniqLines = new Set(propsLines);

          if (uniqLines.size === propsLines.length) return;

          context.report({
            node,
            messageId: 'objectLineByLine',
          });
        },
      }), {});

    return check;
  },
};
