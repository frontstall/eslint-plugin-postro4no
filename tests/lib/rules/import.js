const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/import');

const tester = new RuleTester({ parserOptions: { ecmaVersion: 9, sourceType: 'module' } });

tester.run('import', rule, {
  valid: [
    {
      code: 'import { a, b } from \'lala\'',
    },
    {
      code: `
        import {
          a,
          b,
          c,
        } from 'lala'
      `,
    },
    {
      code: 'import { a, b as c } from \'lala\'',
    },
    {
      code: 'import foo, { a, b as c } from \'lala\'',
    },
    {
      code: 'import foo, { a, b } from \'lala\'',
    },
  ],
  invalid: [
    {
      code: 'import { a, b, c } from \'lala\'',
      errors: [{ messageId: 'import' }],
    },
    {
      code: 'import React, { useThis, useThat, useSomeStuff } from \'react\'',
      errors: [{ messageId: 'import' }],
    },
    {
      code: `
        import {
          a,
          b, c
        } from 'lala'
      `,
      errors: [{ messageId: 'import' }],
    },
  ],
});
