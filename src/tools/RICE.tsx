import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface RICEItem {
  id: string
  name: string
  reach: number
  impact: number
  confidence: number
  effort: number
}

interface RICEProps {
  data?: RICEItem[]
  onChange?: (data: RICEItem[]) => void
}

export const RICEScoring: React.FC<RICEProps> = ({ data = [], onChange }) => {
  const [items, setItems] = useState<RICEItem[]>(data)
  const [name, setName] = useState('')

  const addItem = () => {
    if (name.trim()) {
      const newItem: RICEItem = {
        id: Date.now().toString(),
        name,
        reach: 1,
        impact: 1,
        confidence: 50,
        effort: 1
      }
      const updated = [...items, newItem]
      setItems(updated)
      onChange?.(updated)
      setName('')
    }
  }

  const updateItem = (id: string, field: keyof RICEItem, value: number) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    )
    setItems(updated)
    onChange?.(updated)
  }

  const deleteItem = (id: string) => {
    const updated = items.filter(i => i.id !== id)
    setItems(updated)
    onChange?.(updated)
  }

  const calculateScore = (item: RICEItem) => {
    return (item.reach * item.impact * (item.confidence / 100)) / item.effort
  }

  const sortedItems = [...items].sort((a, b) => calculateScore(b) - calculateScore(a))

  return (
    <div className="space-y-6">
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Add Item</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Item name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
          <button
            onClick={addItem}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Add Item
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-700">
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-center">Reach</th>
              <th className="px-4 py-2 text-center">Impact</th>
              <th className="px-4 py-2 text-center">Confidence %</th>
              <th className="px-4 py-2 text-center">Effort</th>
              <th className="px-4 py-2 text-center">Score</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr key={item.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={item.reach}
                    onChange={(e) => updateItem(item.id, 'reach', Number(e.target.value))}
                    className="w-16 px-2 py-1 border rounded dark:bg-slate-700"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <select
                    value={item.impact}
                    onChange={(e) => updateItem(item.id, 'impact', Number(e.target.value))}
                    className="px-2 py-1 border rounded dark:bg-slate-700"
                  >
                    <option value="1">1 (Low)</option>
                    <option value="2">2 (Med)</option>
                    <option value="3">3 (High)</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={item.confidence}
                    onChange={(e) => updateItem(item.id, 'confidence', Number(e.target.value))}
                    className="w-16 px-2 py-1 border rounded dark:bg-slate-700"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={item.effort}
                    onChange={(e) => updateItem(item.id, 'effort', Number(e.target.value))}
                    className="w-16 px-2 py-1 border rounded dark:bg-slate-700"
                  />
                </td>
                <td className="px-4 py-2 text-center font-bold text-indigo-600">
                  {calculateScore(item).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
