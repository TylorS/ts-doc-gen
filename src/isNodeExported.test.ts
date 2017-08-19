import * as ts from 'typescript'

import { Test, describe, given, it } from '@typed/test'

import { isNodeExported } from './isNodeExported'
import { join } from 'path'

export const test: Test = describe(`isNodeExported`, [
  given(`a Node`, [
    it(`returns true if the Node is exported`, ({ ok }) => {
      const node = parseSourceFile('./__test__/exported-function.ts')

      ok(isNodeExported(node))
    }),

    it(`returns true if there is a separate export statement`, ({ ok }) => {
      const node = parseSourceFile('./__test__/separate-export-statement.ts')
      
      ok(isNodeExported(node))
    }),

    it(`returns false if the node is not exported`, ({ notOk }) => {
      const node = parseSourceFile('./__test__/non-exported-function.ts')

      notOk(isNodeExported(node))
    }),
  ]),
])

function parseSourceFile<T extends ts.Node>(path: string): T {
  const program = ts.createProgram([ join('./src', path) ], {
    target: ts.ScriptTarget.ES2015,
    module: ts.ModuleKind.ES2015,
  })

  return program.getSourceFile(join('./src', path)).getChildren()[0] as T
}
