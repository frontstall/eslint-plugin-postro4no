const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/object-props');

const tester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

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
      errors: [{ messageId: 'objectLineByLine' }],
    },
    {
      code: 'function foo ({ a, b, c }) { _.map(array, cb); }',
      errors: [{ messageId: 'objectLineByLine' }],
    },
    {
      code: `
        const x = {
          a,
          b, d,
        }
      `,
      errors: [{ messageId: 'objectLineByLine' }],
    },
    {
      code: `
        const y = ({ a, b: { q, w = true, y } }) => {}
      `,
      errors: [{ messageId: 'objectLineByLine' }],
    },
  ],
});
