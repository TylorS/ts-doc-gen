import { Node, SourceFile } from 'typescript'

export function isNodeExported(node: Node): boolean {
  if (node.getText().startsWith('export')) return true

  const exportClause = getExportClause(node.parent as SourceFile)

  if (exportClause)
    for (const { name: { text } } of exportClause.elements)
      if (node.getText().includes(text)) return true

  return false
}

function getExportClause(sourceFile: SourceFile): { elements: Array<{ name: { text: string } }> } | null {
  const { externalModuleIndicator } = sourceFile as any

  if (externalModuleIndicator) return externalModuleIndicator.exportClause

  return null
}
