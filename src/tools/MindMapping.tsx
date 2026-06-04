import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface MindMapNode {
  id: string
  text: string
  children: MindMapNode[]
}

interface MindMappingProps {
  data?: MindMapNode
  onChange?: (data: MindMapNode) => void
}

export const MindMapping: React.FC<MindMappingProps> = ({
  data = { id: '0', text: 'Central Idea', children: [] },
  onChange
}) => {
  const [mindMap, setMindMap] = useState<MindMapNode>(data)
  const [newBranchText, setNewBranchText] = useState('')

  const addMainBranch = () => {
    if (newBranchText.trim()) {
      const updated = {
        ...mindMap,
        children: [...mindMap.children, {
          id: Date.now().toString(),
          text: newBranchText,
          children: []
        }]
      }
      setMindMap(updated)
      onChange?.(updated)
      setNewBranchText('')
    }
  }

  const updateNodeText = (nodeId: string, text: string, nodes: MindMapNode[] = [mindMap]): MindMapNode => {
    const result = nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, text } as MindMapNode
      }
      if (node.children.length > 0) {
        return { ...node, children: node.children.map(c => updateNodeText(nodeId, text, [c])) } as MindMapNode
      }
      return node as MindMapNode
    })[0]
    return result as MindMapNode || mindMap
  }

  const addSubNode = (parentId: string, text: string) => {
    const addToNode = (node: MindMapNode): MindMapNode => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, {
            id: Date.now().toString(),
            text,
            children: []
          }]
        }
      }
      if (node.children.length > 0) {
        return {
          ...node,
          children: node.children.map(child => addToNode(child))
        }
      }
      return node
    }
    const updated = addToNode(mindMap)
    setMindMap(updated)
    onChange?.(updated)
  }

  const deleteNode = (nodeId: string): MindMapNode => {
    const removeFromNode = (node: MindMapNode): MindMapNode => ({
      ...node,
      children: node.children
        .filter(child => child.id !== nodeId)
        .map(child => removeFromNode(child))
    })
    const updated = removeFromNode(mindMap)
    setMindMap(updated)
    onChange?.(updated)
    return updated
  }

  const MindMapNodeComponent: React.FC<{ node: MindMapNode; level: number }> = ({ node, level }) => {
    const [childText, setChildText] = useState('')
    const colors = ['bg-indigo-50', 'bg-blue-50', 'bg-purple-50', 'bg-pink-50']

    return (
      <div className="ml-4 mt-4">
        <div className={`${colors[level % colors.length]} dark:bg-slate-700 p-3 rounded-lg inline-block`}>
          <p className="font-semibold mb-2">{node.text}</p>
          {level < 2 && (
            <div className="flex gap-2 text-xs">
              <input
                type="text"
                placeholder="Add sub..."
                value={childText}
                onChange={(e) => setChildText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSubNode(node.id, childText)
                    setChildText('')
                  }
                }}
                className="px-2 py-1 border rounded dark:bg-slate-600"
              />
              <button
                onClick={() => {
                  addSubNode(node.id, childText)
                  setChildText('')
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
              >
                +
              </button>
              {level > 0 && (
                <button
                  onClick={() => deleteNode(node.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="border-l-2 border-gray-300 dark:border-gray-600">
          {node.children.map(child => (
            <MindMapNodeComponent key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect p-4 rounded-lg">
        <div className="mb-4">
          <label className="text-sm font-medium">Central Idea</label>
          <input
            type="text"
            value={mindMap.text}
            onChange={(e) => {
              const updated = { ...mindMap, text: e.target.value }
              setMindMap(updated)
              onChange?.(updated)
            }}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 mt-1"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add main branch..."
            value={newBranchText}
            onChange={(e) => setNewBranchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addMainBranch()}
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
          <button
            onClick={addMainBranch}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-lg overflow-x-auto">
        <div className="inline-block">
          <MindMapNodeComponent node={mindMap} level={0} />
        </div>
      </div>
    </div>
  )
}
