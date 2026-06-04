import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface SWOTItem {
  id: string
  text: string
}

interface SWOTData {
  strengths: SWOTItem[]
  weaknesses: SWOTItem[]
  opportunities: SWOTItem[]
  threats: SWOTItem[]
}

interface SWOTProps {
  data?: SWOTData
  onChange?: (data: SWOTData) => void
}

export const SWOTAnalysis: React.FC<SWOTProps> = ({
  data = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  },
  onChange
}) => {
  const [swot, setSWOT] = useState<SWOTData>(data)
  const [inputs, setInputs] = useState({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  })

  const addItem = (category: keyof SWOTData, text: string) => {
    if (text.trim()) {
      const updated = {
        ...swot,
        [category]: [...swot[category], { id: Date.now().toString(), text }]
      }
      setSWOT(updated)
      onChange?.(updated)
      setInputs({ ...inputs, [category]: '' })
    }
  }

  const deleteItem = (category: keyof SWOTData, id: string) => {
    const updated = {
      ...swot,
      [category]: swot[category].filter(item => item.id !== id)
    }
    setSWOT(updated)
    onChange?.(updated)
  }

  const categories = [
    { key: 'strengths' as const, label: 'Strengths', color: 'bg-green-50 dark:bg-green-900/20', icon: '💪' },
    { key: 'weaknesses' as const, label: 'Weaknesses', color: 'bg-red-50 dark:bg-red-900/20', icon: '⚠️' },
    { key: 'opportunities' as const, label: 'Opportunities', color: 'bg-blue-50 dark:bg-blue-900/20', icon: '🎯' },
    { key: 'threats' as const, label: 'Threats', color: 'bg-yellow-50 dark:bg-yellow-900/20', icon: '⛔' }
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((cat) => (
        <div key={cat.key} className={`${cat.color} p-4 rounded-lg`}>
          <h3 className="font-bold text-lg mb-3">{cat.icon} {cat.label}</h3>
          <div className="space-y-2 mb-4">
            {swot[cat.key].map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-700 p-2 rounded flex justify-between items-start text-sm"
              >
                <span className="flex-1">{item.text}</span>
                <button
                  onClick={() => deleteItem(cat.key, item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add item..."
              value={inputs[cat.key]}
              onChange={(e) => setInputs({ ...inputs, [cat.key]: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addItem(cat.key, inputs[cat.key])}
              className="flex-1 px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:border-slate-600"
            />
            <button
              onClick={() => addItem(cat.key, inputs[cat.key])}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-sm"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
