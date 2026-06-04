import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface WhyLevel {
  id: string
  level: number
  question: string
  answer: string
}

interface FiveWhysProps {
  data?: WhyLevel[]
  onChange?: (data: WhyLevel[]) => void
}

export const FiveWhys: React.FC<FiveWhysProps> = ({ data = [], onChange }) => {
  const [whys, setWhys] = useState<WhyLevel[]>(data)
  const [problem, setProblem] = useState('')

  const addLevel = () => {
    if (whys.length < 5) {
      const newLevel: WhyLevel = {
        id: Date.now().toString(),
        level: whys.length + 1,
        question: `Why ${whys.length + 1}?`,
        answer: ''
      }
      const updated = [...whys, newLevel]
      setWhys(updated)
      onChange?.(updated)
    }
  }

  const updateLevel = (id: string, field: 'question' | 'answer', value: string) => {
    const updated = whys.map(w => w.id === id ? { ...w, [field]: value } : w)
    setWhys(updated)
    onChange?.(updated)
  }

  const deleteLevel = (id: string) => {
    const updated = whys.filter(w => w.id !== id)
    setWhys(updated)
    onChange?.(updated)
  }

  const resetAnalysis = () => {
    setWhys([])
    setProblem('')
    onChange?.([])
  }

  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Initial Problem</h3>
        <textarea
          placeholder="Describe the problem you want to investigate..."
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-20"
        />
      </div>

      {/* Why Levels */}
      <div className="space-y-4">
        {whys.map((why, index) => (
          <div key={why.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg">Why Level {why.level}</h4>
              <button
                onClick={() => deleteLevel(why.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder={`Why ${why.level}?`}
                value={why.question}
                onChange={(e) => updateLevel(why.id, 'question', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 font-medium"
              />
              <textarea
                placeholder="Answer..."
                value={why.answer}
                onChange={(e) => updateLevel(why.id, 'answer', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-16"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Level Button */}
      <div className="flex gap-2">
        {whys.length < 5 && (
          <button
            onClick={addLevel}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Add Why Level {whys.length + 1}
          </button>
        )}
        {whys.length > 0 && (
          <button
            onClick={resetAnalysis}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
          >
            Reset
          </button>
        )}
      </div>

      {/* Root Cause Summary */}
      {whys.length === 5 && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-2 border-green-500">
          <h3 className="font-bold text-green-900 dark:text-green-200 mb-3">Root Cause Analysis Complete</h3>
          <div className="space-y-3">
            {whys.map((why, i) => (
              <div key={why.id} className="text-sm">
                <p className="font-semibold text-green-900 dark:text-green-200">Why {i + 1}: {why.question}</p>
                <p className="text-gray-700 dark:text-gray-300 ml-4">{why.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
