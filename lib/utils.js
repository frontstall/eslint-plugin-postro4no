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

const MAX_ITEMS_ON_SAME_LINE = 3;

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
          if (filtered.length < MAX_ITEMS_ON_SAME_LINE) return;

          const propsLines = filtered
            .map(({ range }) => {
              const { line } = sourceCode.getLocFromIndex(range[0]);

              return line;
            });

          const uniqLines = new Set(propsLines);

          if (uniqLines.size === propsLines.length) return;

          const errorLocationStart = filtered[0].range[0];
          const errorLocationEnd = filtered[filtered.length - 1].range[1];
          const loc = {
            start: sourceCode.getLocFromIndex(errorLocationStart),
            end: sourceCode.getLocFromIndex(errorLocationEnd),
          };

          console.log(loc);

          context.report({
            node,
            loc,
            messageId,
          });
        },
      }), {});

    return check;
  },
});

module.exports = { TYPES, createRule };
