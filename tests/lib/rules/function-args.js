const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/function-args');

const tester = new RuleTester({ parserOptions: { ecmaVersion: 9 } });

tester.run('function', rule, {
  valid: [
    {
      code: 'const x = (a, b) => {}',
    },
    {
      code: `
        const x = (
          a,
          b,
          c,
        ) => {}
      `,
    },
    {
      code: 'const x = ({ a, b }, c) => {}',
    },
    {
      code: `
        (
          a,
          b,
          c,
          d,
        ) => {}
      `,
    },
    {
      code: `
        const foo = (
          a = 1,
        ) => {}
      `,
    },
    {
      code: `
        foo(
          a,
          b,
          c,
        )
      `,
    },
  ],
  invalid: [
    {
      code: 'const x = function ( a, b, c ) {}',
      errors: [{ messageId: 'function' }],
    },
    {
      code: 'function foo ( a, b, c ) { _.map(array, cb); }',
      errors: [{ messageId: 'function' }],
    },
    {
      code: `
        const x = (
          a,
          b, d,
        ) => {}
      `,
      errors: [{ messageId: 'function' }],
    },
    {
      code: `
        const x = foo(a, b, c)
      `,
      errors: [{ messageId: 'function' }],
    },
  ],
});
