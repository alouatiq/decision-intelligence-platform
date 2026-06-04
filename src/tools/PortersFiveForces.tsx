import React, { useState } from 'react'

interface Threat {
  id: string
  name: string
  score: number
}

interface PortersForce {
  threat: string
  intensity: 1 | 2 | 3 | 4 | 5
}

interface PortersData {
  supplierPower: PortersForce[]
  buyerPower: PortersForce[]
  substitutes: PortersForce[]
  newEntrants: PortersForce[]
  competition: PortersForce[]
}

interface PortersProps {
  data?: PortersData
  onChange?: (data: PortersData) => void
}

const defaultData: PortersData = {
  supplierPower: [],
  buyerPower: [],
  substitutes: [],
  newEntrants: [],
  competition: []
}

export const PortersFiveForces: React.FC<PortersProps> = ({
  data = defaultData,
  onChange
}) => {
  const [forces, setForces] = useState<PortersData>(data)
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    supplierPower: '',
    buyerPower: '',
    substitutes: '',
    newEntrants: '',
    competition: ''
  })

  const addForce = (key: keyof PortersData, threat: string) => {
    if (threat.trim()) {
      const updated = {
        ...forces,
        [key]: [...forces[key], { threat, intensity: 3 as const }]
      }
      setForces(updated)
      onChange?.(updated)
      setInputs({ ...inputs, [key]: '' })
    }
  }

  const updateIntensity = (key: keyof PortersData, index: number, intensity: 1 | 2 | 3 | 4 | 5) => {
    const updated = {
      ...forces,
      [key]: forces[key].map((f, i) => i === index ? { ...f, intensity } : f)
    }
    setForces(updated)
    onChange?.(updated)
  }

  const deleteForce = (key: keyof PortersData, index: number) => {
    const updated = {
      ...forces,
      [key]: forces[key].filter((_, i) => i !== index)
    }
    setForces(updated)
    onChange?.(updated)
  }

  const forceCategories = [
    { key: 'supplierPower', label: 'Supplier Power', color: 'bg-blue-50 dark:bg-blue-900/20' },
    { key: 'buyerPower', label: 'Buyer Power', color: 'bg-green-50 dark:bg-green-900/20' },
    { key: 'substitutes', label: 'Threat of Substitutes', color: 'bg-purple-50 dark:bg-purple-900/20' },
    { key: 'newEntrants', label: 'Threat of New Entrants', color: 'bg-orange-50 dark:bg-orange-900/20' },
    { key: 'competition', label: 'Competitive Rivalry', color: 'bg-red-50 dark:bg-red-900/20' }
  ] as const

  const getAverageIntensity = (key: keyof PortersData) => {
    const items = forces[key]
    if (items.length === 0) return 0
    return (items.reduce((sum, f) => sum + f.intensity, 0) / items.length).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Porter's Five Forces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forceCategories.map((cat) => (
          <div key={cat.key} className={`${cat.color} p-4 rounded-lg`}>
            <h3 className="font-bold mb-2">{cat.label}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Avg Intensity: {getAverageIntensity(cat.key)}/5
            </p>
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
              {forces[cat.key].map((force, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-700 p-2 rounded text-xs">
                  <p className="font-medium">{force.threat}</p>
                  <div className="flex items-center justify-between mt-1">
                    <select
                      value={force.intensity}
                      onChange={(e) => updateIntensity(cat.key, idx, Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                      className="text-xs px-1 py-0.5 border rounded dark:bg-slate-600"
                    >
                      <option value="1">Low (1)</option>
                      <option value="2">Low-Med (2)</option>
                      <option value="3">Medium (3)</option>
                      <option value="4">Med-High (4)</option>
                      <option value="5">High (5)</option>
                    </select>
                    <button
                      onClick={() => deleteForce(cat.key, idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Add threat..."
                value={inputs[cat.key]}
                onChange={(e) => setInputs({ ...inputs, [cat.key]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addForce(cat.key, inputs[cat.key])}
                className="flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-700 dark:border-slate-600"
              />
              <button
                onClick={() => addForce(cat.key, inputs[cat.key])}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Intensity Chart */}
      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
        <h3 className="font-bold mb-4">Industry Attractiveness</h3>
        <div className="space-y-3">
          {forceCategories.map((cat) => {
            const avgStr = getAverageIntensity(cat.key)
            const avg = typeof avgStr === 'string' ? parseFloat(avgStr) : avgStr
            return (
              <div key={cat.key} className="flex items-center gap-3">
                <div className="w-32 text-sm font-medium">{cat.label}</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-red-500"
                    style={{ width: `${(avg / 5) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-right">{avg.toFixed(1)}/5</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
