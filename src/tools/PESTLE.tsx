import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface PESTLEItem {
  id: string
  text: string
}

interface PESTLEData {
  political: PESTLEItem[]
  economic: PESTLEItem[]
  social: PESTLEItem[]
  technological: PESTLEItem[]
  legal: PESTLEItem[]
  environmental: PESTLEItem[]
}

interface PESTLEProps {
  data?: PESTLEData
  onChange?: (data: PESTLEData) => void
}

export const PESTLEAnalysis: React.FC<PESTLEProps> = ({
  data = {
    political: [],
    economic: [],
    social: [],
    technological: [],
    legal: [],
    environmental: []
  },
  onChange
}) => {
  const [pestle, setPESTLE] = useState<PESTLEData>(data)
  const [inputs, setInputs] = useState({
    political: '',
    economic: '',
    social: '',
    technological: '',
    legal: '',
    environmental: ''
  })

  const addItem = (category: keyof PESTLEData, text: string) => {
    if (text.trim()) {
      const updated = {
        ...pestle,
        [category]: [...pestle[category], { id: Date.now().toString(), text }]
      }
      setPESTLE(updated)
      onChange?.(updated)
      setInputs({ ...inputs, [category]: '' })
    }
  }

  const deleteItem = (category: keyof PESTLEData, id: string) => {
    const updated = {
      ...pestle,
      [category]: pestle[category].filter(item => item.id !== id)
    }
    setPESTLE(updated)
    onChange?.(updated)
  }

  const categories = [
    { key: 'political' as const, label: 'Political', color: 'bg-blue-50 dark:bg-blue-900/20' },
    { key: 'economic' as const, label: 'Economic', color: 'bg-green-50 dark:bg-green-900/20' },
    { key: 'social' as const, label: 'Social', color: 'bg-purple-50 dark:bg-purple-900/20' },
    { key: 'technological' as const, label: 'Technological', color: 'bg-orange-50 dark:bg-orange-900/20' },
    { key: 'legal' as const, label: 'Legal', color: 'bg-red-50 dark:bg-red-900/20' },
    { key: 'environmental' as const, label: 'Environmental', color: 'bg-yellow-50 dark:bg-yellow-900/20' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <div key={cat.key} className={`${cat.color} p-4 rounded-lg`}>
          <h3 className="font-bold mb-3">{cat.label}</h3>
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {pestle[cat.key].map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-700 p-2 rounded flex justify-between items-start text-sm"
              >
                <span className="flex-1">{item.text}</span>
                <button
                  onClick={() => deleteItem(cat.key, item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Add..."
              value={inputs[cat.key]}
              onChange={(e) => setInputs({ ...inputs, [cat.key]: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addItem(cat.key, inputs[cat.key])}
              className="flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-700 dark:border-slate-600"
            />
            <button
              onClick={() => addItem(cat.key, inputs[cat.key])}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
