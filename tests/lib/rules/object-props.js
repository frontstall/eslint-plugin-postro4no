const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/object-props');

const tester = new RuleTester({ parserOptions: { ecmaVersion: 9 } });

tester.run('object', rule, {
  valid: [
    {
      code: 'const x = { a, b }',
    },
    {
      code: `
        const x = {
          a,
          b,
          c,
        }
      `,
    },
    {
      code: '({ a, b }) => {}',
    },
    {
      code: `
        ({
          a,
          b,
          c,
          d,
        }) => {}
      `,
    },
    {
      code: 'const foo = ({ a = 1, b: { x } }) => {}',
    },
    {
      code: `
        function foo ({
          a,
          b: { x },
          c: { q, y = 44 },
        })  { return _.sap(array, cb); }
      `,
    },
  ],
  invalid: [
    {
      code: 'const x = { a, b, c }',
      errors: [{ messageId: 'object' }],
    },
    {
      code: 'function foo ({ a, b, c }) { _.map(array, cb); }',
      errors: [{ messageId: 'object' }],
    },
    {
      code: `
        const x = {
          a,
          b, d,
        }
      `,
      errors: [{ messageId: 'object' }],
    },
    {
      code: `
        const y = ({ a, b: { q, w = true, y } }) => {}
      `,
      errors: [{ messageId: 'object' }],
    },
  ],
});
