import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface RiskItem {
  id: string
  description: string
  likelihood: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  mitigation: string
}

interface RiskMatrixProps {
  data?: RiskItem[]
  onChange?: (data: RiskItem[]) => void
}

const riskLevels = {
  low: { low: 'bg-green-100', medium: 'bg-yellow-100', high: 'bg-orange-100' },
  medium: { low: 'bg-yellow-100', medium: 'bg-orange-100', high: 'bg-red-100' },
  high: { low: 'bg-orange-100', medium: 'bg-red-100', high: 'bg-red-200' }
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ data = [], onChange }) => {
  const [risks, setRisks] = useState<RiskItem[]>(data)
  const [description, setDescription] = useState('')
  const [likelihood, setLikelihood] = useState<'low' | 'medium' | 'high'>('medium')
  const [impact, setImpact] = useState<'low' | 'medium' | 'high'>('medium')
  const [mitigation, setMitigation] = useState('')

  const addRisk = () => {
    if (description.trim()) {
      const newRisk: RiskItem = {
        id: Date.now().toString(),
        description,
        likelihood,
        impact,
        mitigation
      }
      const updated = [...risks, newRisk]
      setRisks(updated)
      onChange?.(updated)
      setDescription('')
      setMitigation('')
    }
  }

  const deleteRisk = (id: string) => {
    const updated = risks.filter(r => r.id !== id)
    setRisks(updated)
    onChange?.(updated)
  }

  const levels = ['low', 'medium', 'high']

  return (
    <div className="space-y-6">
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Add Risk</h3>
        <div className="space-y-3">
          <textarea
            placeholder="Risk description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-16"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={likelihood}
              onChange={(e) => setLikelihood(e.target.value as any)}
              className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            >
              <option value="low">Low Likelihood</option>
              <option value="medium">Medium Likelihood</option>
              <option value="high">High Likelihood</option>
            </select>
            <select
              value={impact}
              onChange={(e) => setImpact(e.target.value as any)}
              className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            >
              <option value="low">Low Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="high">High Impact</option>
            </select>
          </div>
          <textarea
            placeholder="Mitigation strategy..."
            value={mitigation}
            onChange={(e) => setMitigation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-16"
          />
          <button
            onClick={addRisk}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Add Risk
          </button>
        </div>
      </div>

      {/* Risk Matrix Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-2 border"></th>
              {levels.map(l => (
                <th key={l} className="p-2 border capitalize font-bold">{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {levels.map(imp => (
              <tr key={imp}>
                <th className="p-2 border capitalize font-bold text-right">{imp}</th>
                {levels.map(like => {
                  const cellRisks = risks.filter(r => r.impact === imp && r.likelihood === like)
                  return (
                    <td
                      key={`${imp}-${like}`}
                      className={`border p-2 min-h-20 ${riskLevels[imp as keyof typeof riskLevels][like as keyof typeof riskLevels['low']]}`}
                    >
                      <div className="space-y-1">
                        {cellRisks.map(risk => (
                          <div key={risk.id} className="bg-white rounded p-1 text-xs">
                            <p className="font-medium">{risk.description}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Risk List */}
      <div className="space-y-2">
        <h3 className="font-semibold">Risk List</h3>
        {risks.map(risk => (
          <div key={risk.id} className="bg-slate-100 dark:bg-slate-700 p-3 rounded">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{risk.description}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {risk.likelihood} likelihood, {risk.impact} impact
                </p>
              </div>
              <button
                onClick={() => deleteRisk(risk.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {risk.mitigation && (
              <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                <span className="font-medium">Mitigation:</span> {risk.mitigation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
