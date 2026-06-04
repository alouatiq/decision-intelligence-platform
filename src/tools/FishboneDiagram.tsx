import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface FishboneFactor {
  id: string
  name: string
}

interface FishboneData {
  problem: string
  categories: {
    people: FishboneFactor[]
    process: FishboneFactor[]
    technology: FishboneFactor[]
    environment: FishboneFactor[]
    materials: FishboneFactor[]
    management: FishboneFactor[]
  }
}

interface FishboneDiagramProps {
  data?: FishboneData
  onChange?: (data: FishboneData) => void
}

const defaultData: FishboneData = {
  problem: '',
  categories: {
    people: [],
    process: [],
    technology: [],
    environment: [],
    materials: [],
    management: []
  }
}

export const FishboneDiagram: React.FC<FishboneDiagramProps> = ({
  data = defaultData,
  onChange
}) => {
  const [fishbone, setFishbone] = useState<FishboneData>(data)
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    people: '',
    process: '',
    technology: '',
    environment: '',
    materials: '',
    management: ''
  })

  const addFactor = (category: keyof typeof fishbone.categories) => {
    const text = inputs[category]
    if (text.trim()) {
      const updated = {
        ...fishbone,
        categories: {
          ...fishbone.categories,
          [category]: [...fishbone.categories[category], { id: Date.now().toString(), name: text }]
        }
      }
      setFishbone(updated)
      onChange?.(updated)
      setInputs({ ...inputs, [category]: '' })
    }
  }

  const deleteFactor = (category: keyof typeof fishbone.categories, id: string) => {
    const updated = {
      ...fishbone,
      categories: {
        ...fishbone.categories,
        [category]: fishbone.categories[category].filter(f => f.id !== id)
      }
    }
    setFishbone(updated)
    onChange?.(updated)
  }

  const categories = [
    { key: 'people', label: 'People', color: 'bg-blue-50' },
    { key: 'process', label: 'Process', color: 'bg-green-50' },
    { key: 'technology', label: 'Technology', color: 'bg-purple-50' },
    { key: 'environment', label: 'Environment', color: 'bg-yellow-50' },
    { key: 'materials', label: 'Materials', color: 'bg-red-50' },
    { key: 'management', label: 'Management', color: 'bg-orange-50' }
  ]

  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <div className="glass-effect p-4 rounded-lg">
        <label className="text-sm font-medium">Effect/Problem</label>
        <textarea
          value={fishbone.problem}
          onChange={(e) => {
            const updated = { ...fishbone, problem: e.target.value }
            setFishbone(updated)
            onChange?.(updated)
          }}
          placeholder="What is the main problem or effect?"
          className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 mt-1 h-16"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.key} className={`${cat.color} dark:bg-slate-700 p-4 rounded-lg`}>
            <h3 className="font-bold mb-3">{cat.label}</h3>
            <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
              {fishbone.categories[cat.key as keyof typeof fishbone.categories].map(factor => (
                <div key={factor.id} className="bg-white dark:bg-slate-600 p-2 rounded flex justify-between items-start text-sm">
                  <span className="flex-1">{factor.name}</span>
                  <button
                    onClick={() => deleteFactor(cat.key as keyof typeof fishbone.categories, factor.id)}
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
                placeholder="Add factor..."
                value={inputs[cat.key]}
                onChange={(e) => setInputs({ ...inputs, [cat.key]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addFactor(cat.key as keyof typeof fishbone.categories)}
                className="flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-600 dark:border-slate-500"
              />
              <button
                onClick={() => addFactor(cat.key as keyof typeof fishbone.categories)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fishbone Diagram Visualization */}
      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg overflow-x-auto">
        <svg viewBox="0 0 1000 300" className="w-full min-h-48">
          {/* Main spine */}
          <line x1="100" y1="150" x2="900" y2="150" stroke="#4F46E5" strokeWidth="3" />
          {/* Head */}
          <polygon points="900,150 880,140 880,160" fill="#4F46E5" />

          {/* Labels on spine */}
          <text x="700" y="170" fontSize="12" fill="#666" className="dark:fill-gray-300">
            {fishbone.problem.substring(0, 30)}...
          </text>

          {/* Ribs */}
          {[
            { y: 80, label: 'People' },
            { y: 220, label: 'Process' }
          ].map((rib, idx) => (
            <g key={idx}>
              <line x1="700" y1="150" x2="700" y2={rib.y} stroke="#999" strokeWidth="1" />
              <text x="710" y={rib.y + 5} fontSize="11" fill="#666" className="dark:fill-gray-300">
                {rib.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
