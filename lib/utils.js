const TYPES = {
  ObjectExpression: {
    name: 'ObjectExpression',
    propsName: 'properties',
  },
  ObjectPattern: {
    name: 'ObjectPattern',
    propsName: 'properties',
  },
  CallExpression: {
    name: 'CallExpression',
    propsName: 'arguments',
  },
  FunctionDeclaration: {
    name: 'FunctionDeclaration',
    propsName: 'params',
  },
  FunctionExpression: {
    name: 'FunctionExpression',
    propsName: 'params',
  },
  ArrowFunctionExpression: {
    name: 'ArrowFunctionExpression',
    propsName: 'params',
  },
  ImportDeclaration: {
    name: 'ImportDeclaration',
    propsName: 'specifiers',
  },
};

const createRule = (
  { id: messageId, value: messageText },
  types,
  iteratee = () => true,
) => ({
  meta: {
    messages: {
      [messageId]: messageText,
    },
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    const sourceCode = context.getSourceCode();

    const check = types
      .reduce((result, { name, propsName }) => ({
        ...result,
        [name](node) {
          const filtered = node[propsName].filter(iteratee);
          if (filtered.length < 3) return;

          const propsLines = filtered
            .map(({ start }) => {
              const { line } = sourceCode.getLocFromIndex(start);

              return line;
            });

          const uniqLines = new Set(propsLines);

          if (uniqLines.size === propsLines.length) return;

          context.report({
            node,
            messageId,
          });
        },
      }), {});

    return check;
  },
});

module.exports = { TYPES, createRule };
