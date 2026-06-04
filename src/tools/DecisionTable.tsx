import React, { useState } from 'react'
import { Trash2, Trophy } from 'lucide-react'

interface DTOption {
  id: string
  name: string
}

interface DTCriterion {
  id: string
  name: string
  weight: number
  ratings: { [optionId: string]: number }
}

interface DecisionTableData {
  criteria: DTCriterion[]
  options: DTOption[]
}

interface DecisionTableProps {
  data?: DecisionTableData
  onChange?: (data: DecisionTableData) => void
}

const RATINGS = [
  { value: 1, label: '1 · Poor' },
  { value: 2, label: '2 · Fair' },
  { value: 3, label: '3 · Good' },
  { value: 4, label: '4 · Great' },
  { value: 5, label: '5 · Excellent' }
]

const MAX_RATING = 5

export const DecisionTable: React.FC<DecisionTableProps> = ({
  data = { criteria: [], options: [] },
  onChange
}) => {
  const [criteria, setCriteria] = useState<DTCriterion[]>(data.criteria)
  const [options, setOptions] = useState<DTOption[]>(data.options)
  const [newCriterion, setNewCriterion] = useState('')
  const [newWeight, setNewWeight] = useState(3)
  const [newOption, setNewOption] = useState('')

  const emit = (c: DTCriterion[], o: DTOption[]) => onChange?.({ criteria: c, options: o })

  const addCriterion = () => {
    if (!newCriterion.trim()) return
    const ratings: { [optionId: string]: number } = {}
    options.forEach(o => { ratings[o.id] = 3 })
    const updated = [
      ...criteria,
      { id: Date.now().toString(), name: newCriterion, weight: newWeight || 1, ratings }
    ]
    setCriteria(updated)
    emit(updated, options)
    setNewCriterion('')
    setNewWeight(3)
  }

  const addOption = () => {
    if (!newOption.trim()) return
    const opt = { id: Date.now().toString(), name: newOption }
    const updatedOptions = [...options, opt]
    const updatedCriteria = criteria.map(c => ({
      ...c,
      ratings: { ...c.ratings, [opt.id]: 3 }
    }))
    setOptions(updatedOptions)
    setCriteria(updatedCriteria)
    emit(updatedCriteria, updatedOptions)
    setNewOption('')
  }

  const updateWeight = (criterionId: string, weight: number) => {
    const updated = criteria.map(c =>
      c.id === criterionId ? { ...c, weight: Math.max(0, weight) } : c
    )
    setCriteria(updated)
    emit(updated, options)
  }

  const updateRating = (criterionId: string, optionId: string, rating: number) => {
    const updated = criteria.map(c =>
      c.id === criterionId ? { ...c, ratings: { ...c.ratings, [optionId]: rating } } : c
    )
    setCriteria(updated)
    emit(updated, options)
  }

  const deleteCriterion = (id: string) => {
    const updated = criteria.filter(c => c.id !== id)
    setCriteria(updated)
    emit(updated, options)
  }

  const deleteOption = (id: string) => {
    const updatedOptions = options.filter(o => o.id !== id)
    const updatedCriteria = criteria.map(c => {
      const { [id]: _removed, ...rest } = c.ratings
      return { ...c, ratings: rest }
    })
    setOptions(updatedOptions)
    setCriteria(updatedCriteria)
    emit(updatedCriteria, updatedOptions)
  }

  // Weighted points for an option = sum of (weight × rating) across all criteria
  const getPoints = (optionId: string) =>
    criteria.reduce((sum, c) => sum + c.weight * (c.ratings[optionId] ?? 0), 0)

  // Maximum achievable points = sum of (weight × max rating)
  const getMaxPoints = () =>
    criteria.reduce((sum, c) => sum + c.weight * MAX_RATING, 0)

  const getPercent = (optionId: string) => {
    const max = getMaxPoints()
    return max > 0 ? (getPoints(optionId) / max) * 100 : 0
  }

  const maxPoints = getMaxPoints()
  const bestOption = options.length
    ? [...options].sort((a, b) => getPoints(b.id) - getPoints(a.id))[0]
    : null
  const hasTable = criteria.length > 0 && options.length > 0

  return (
    <div className="space-y-6">
      {/* Add Option */}
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Add Option</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Option name (e.g. Vendor A)..."
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addOption()}
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
          <button
            onClick={addOption}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
        {options.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {options.map(opt => (
              <div key={opt.id} className="bg-white dark:bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                {opt.name}
                <button
                  onClick={() => deleteOption(opt.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Criterion */}
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Add Criterion</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Criterion / element (e.g. Cost)..."
            value={newCriterion}
            onChange={(e) => setNewCriterion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCriterion()}
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
          <div className="flex items-center gap-1">
            <label className="text-sm text-gray-500">Weight</label>
            <input
              type="number"
              min="1"
              max="10"
              value={newWeight}
              onChange={(e) => setNewWeight(Number(e.target.value))}
              className="w-16 px-2 py-2 border rounded-lg text-center dark:bg-slate-700 dark:border-slate-600"
            />
          </div>
          <button
            onClick={addCriterion}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
        {criteria.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {criteria.map(c => (
              <div key={c.id} className="bg-white dark:bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                {c.name} <span className="text-xs text-gray-400">w{c.weight}</span>
                <button
                  onClick={() => deleteCriterion(c.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      {hasTable && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700">
                <th className="px-4 py-2 text-left">Criteria / Element</th>
                <th className="px-3 py-2 text-center">Weight</th>
                {options.map(opt => {
                  const isBest = bestOption?.id === opt.id && getPoints(opt.id) > 0
                  return (
                    <th key={opt.id} className={`px-3 py-2 text-center ${isBest ? 'text-green-700 dark:text-green-400' : ''}`}>
                      <span className="flex items-center justify-center gap-1">
                        {isBest && <Trophy size={14} className="text-green-600" />}
                        {opt.name}
                        <button
                          onClick={() => deleteOption(opt.id)}
                          className="text-red-400 hover:text-red-600 ml-1"
                          title="Remove option"
                        >
                          ×
                        </button>
                      </span>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {criteria.map(c => (
                <tr key={c.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-2 font-medium">
                    <span className="flex items-center gap-2">
                      <button
                        onClick={() => deleteCriterion(c.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                      {c.name}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={c.weight}
                      onChange={(e) => updateWeight(c.id, Number(e.target.value))}
                      className="w-14 px-2 py-1 border rounded text-center dark:bg-slate-700"
                    />
                  </td>
                  {options.map(opt => (
                    <td key={opt.id} className="px-3 py-2 text-center">
                      <select
                        value={c.ratings[opt.id] ?? 3}
                        onChange={(e) => updateRating(c.id, opt.id, Number(e.target.value))}
                        className="px-2 py-1 border rounded dark:bg-slate-700 dark:border-slate-600"
                      >
                        {RATINGS.map(r => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 dark:bg-slate-700 font-semibold">
                <td className="px-4 py-3">Overall Score</td>
                <td className="px-3 py-3 text-center text-gray-400">/{maxPoints}</td>
                {options.map(opt => {
                  const isBest = bestOption?.id === opt.id && getPoints(opt.id) > 0
                  return (
                    <td
                      key={opt.id}
                      className={`px-3 py-3 text-center ${
                        isBest ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'
                      }`}
                    >
                      <div className="text-lg font-bold">{getPercent(opt.id).toFixed(0)}%</div>
                      <div className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        {getPoints(opt.id)}/{maxPoints} pts
                      </div>
                    </td>
                  )
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Best option callout */}
      {hasTable && bestOption && getPoints(bestOption.id) > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-2">
          <Trophy size={20} className="text-green-600" />
          <span className="font-bold text-green-800 dark:text-green-300">
            Best option: {bestOption.name}
          </span>
          <span className="ml-auto font-semibold text-green-700 dark:text-green-400">
            {getPercent(bestOption.id).toFixed(0)}% · {getPoints(bestOption.id)}/{maxPoints} pts
          </span>
        </div>
      )}

      {!hasTable && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add at least one option and one criterion to build your decision table.
        </p>
      )}
    </div>
  )
}
