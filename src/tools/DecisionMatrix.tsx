import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface DecisionAlternative {
  id: string
  name: string
  scores: { [key: string]: number }
}

interface DecisionMatrixProps {
  data?: { criteria: string[]; alternatives: DecisionAlternative[] }
  onChange?: (data: { criteria: string[]; alternatives: DecisionAlternative[] }) => void
}

export const DecisionMatrix: React.FC<DecisionMatrixProps> = ({
  data = { criteria: [], alternatives: [] },
  onChange
}) => {
  const [criteria, setCriteria] = useState<string[]>(data.criteria)
  const [alternatives, setAlternatives] = useState<DecisionAlternative[]>(data.alternatives)
  const [newCriteria, setNewCriteria] = useState('')
  const [newAlternative, setNewAlternative] = useState('')

  const addCriteria = () => {
    if (newCriteria.trim()) {
      const updated = [...criteria, newCriteria]
      setCriteria(updated)
      onChange?.({ criteria: updated, alternatives })
      setNewCriteria('')
    }
  }

  const addAlternative = () => {
    if (newAlternative.trim()) {
      const scores: { [key: string]: number } = {}
      criteria.forEach(c => { scores[c] = 5 })
      const alt: DecisionAlternative = {
        id: Date.now().toString(),
        name: newAlternative,
        scores
      }
      const updated = [...alternatives, alt]
      setAlternatives(updated)
      onChange?.({ criteria, alternatives: updated })
      setNewAlternative('')
    }
  }

  const updateScore = (altId: string, criterion: string, score: number) => {
    const updated = alternatives.map(alt =>
      alt.id === altId ? { ...alt, scores: { ...alt.scores, [criterion]: score } } : alt
    )
    setAlternatives(updated)
    onChange?.({ criteria, alternatives: updated })
  }

  const deleteAlternative = (id: string) => {
    const updated = alternatives.filter(a => a.id !== id)
    setAlternatives(updated)
    onChange?.({ criteria, alternatives: updated })
  }

  const deleteCriteria = (index: number) => {
    const updated = criteria.filter((_, i) => i !== index)
    setCriteria(updated)
    onChange?.({ criteria: updated, alternatives })
  }

  const getAltScore = (alt: DecisionAlternative) =>
    Object.values(alt.scores).reduce((a, b) => a + b, 0) / criteria.length

  const sortedAlts = [...alternatives].sort((a, b) => getAltScore(b) - getAltScore(a))

  return (
    <div className="space-y-6">
      {/* Add Criteria */}
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Add Criteria</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Criteria name..."
            value={newCriteria}
            onChange={(e) => setNewCriteria(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCriteria()}
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
          <button
            onClick={addCriteria}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
        {criteria.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {criteria.map((crit, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                {crit}
                <button
                  onClick={() => deleteCriteria(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Alternative */}
      {criteria.length > 0 && (
        <div className="glass-effect p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Add Alternative</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Alternative name..."
              value={newAlternative}
              onChange={(e) => setNewAlternative(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addAlternative()}
              className="flex-1 px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            />
            <button
              onClick={addAlternative}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Matrix */}
      {alternatives.length > 0 && criteria.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700">
                <th className="px-4 py-2 text-left">Alternative</th>
                {criteria.map((crit, idx) => (
                  <th key={idx} className="px-4 py-2 text-center">{crit}</th>
                ))}
                <th className="px-4 py-2 text-center">Avg Score</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {sortedAlts.map((alt) => (
                <tr key={alt.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-2 font-medium">{alt.name}</td>
                  {criteria.map((crit) => (
                    <td key={crit} className="px-4 py-2 text-center">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={alt.scores[crit] || 5}
                        onChange={(e) => updateScore(alt.id, crit, Number(e.target.value))}
                        className="w-12 px-2 py-1 border rounded text-center dark:bg-slate-700"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-2 text-center font-bold text-indigo-600">
                    {getAltScore(alt).toFixed(1)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteAlternative(alt.id)}
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
      )}
    </div>
  )
}
