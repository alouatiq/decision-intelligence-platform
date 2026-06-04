import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface Requirement {
  id: string
  name: string
  category: 'must' | 'should' | 'could' | 'wont'
  description: string
}

interface MoSCoWProps {
  data?: Requirement[]
  onChange?: (data: Requirement[]) => void
}

export const MoSCoWMethod: React.FC<MoSCoWProps> = ({ data = [], onChange }) => {
  const [requirements, setRequirements] = useState<Requirement[]>(data)
  const [name, setName] = useState('')
  const [category, setCategory] = useState<'must' | 'should' | 'could' | 'wont'>('must')
  const [description, setDescription] = useState('')

  const addRequirement = () => {
    if (name.trim()) {
      const newReq: Requirement = {
        id: Date.now().toString(),
        name,
        category,
        description
      }
      const updated = [...requirements, newReq]
      setRequirements(updated)
      onChange?.(updated)
      setName('')
      setDescription('')
    }
  }

  const deleteRequirement = (id: string) => {
    const updated = requirements.filter(r => r.id !== id)
    setRequirements(updated)
    onChange?.(updated)
  }

  const categories = [
    { key: 'must', label: 'Must Have', color: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-300' },
    { key: 'should', label: 'Should Have', color: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-300' },
    { key: 'could', label: 'Could Have', color: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-300' },
    { key: 'wont', label: "Won't Have", color: 'bg-gray-50 dark:bg-gray-900/20', border: 'border-gray-300' }
  ]

  return (
    <div className="space-y-6">
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Add Requirement</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Requirement name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
          <textarea
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-20"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="must">Must Have (Critical)</option>
            <option value="should">Should Have (Important)</option>
            <option value="could">Could Have (Nice to have)</option>
            <option value="wont">Won't Have (Out of scope)</option>
          </select>
          <button
            onClick={addRequirement}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Add Requirement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.key} className={`${cat.color} p-4 rounded-lg border-2 ${cat.border}`}>
            <h4 className="font-bold mb-3 text-center">{cat.label}</h4>
            <div className="space-y-2">
              {requirements.filter(r => r.category === cat.key).map(req => (
                <div key={req.id} className="bg-white dark:bg-slate-700 p-2 rounded text-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{req.name}</p>
                      {req.description && <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{req.description}</p>}
                    </div>
                    <button
                      onClick={() => deleteRequirement(req.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
