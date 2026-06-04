import React, { useState } from 'react'

interface HatPerspective {
  color: string
  name: string
  description: string
  questions: string[]
  notes: string
}

interface SixThinkingHatsProps {
  data?: { [key: string]: string }
  onChange?: (data: { [key: string]: string }) => void
}

export const SixThinkingHats: React.FC<SixThinkingHatsProps> = ({
  data = {},
  onChange
}) => {
  const [perspectives, setPerspectives] = useState(data)

  const hats = [
    {
      key: 'white',
      color: 'bg-white border-gray-300',
      name: '⚪ White Hat',
      emoji: '⚪',
      description: 'Facts & Information',
      questions: [
        'What facts do we know?',
        'What information is missing?',
        'How can we get the information we need?'
      ]
    },
    {
      key: 'red',
      color: 'bg-red-100 border-red-400',
      name: '🔴 Red Hat',
      emoji: '🔴',
      description: 'Emotions & Intuition',
      questions: [
        'What is your emotional reaction?',
        'What does your gut tell you?',
        'What would you feel if this happened?'
      ]
    },
    {
      key: 'black',
      color: 'bg-gray-700 text-white border-gray-800',
      name: '⬛ Black Hat',
      emoji: '⬛',
      description: 'Critical Thinking',
      questions: [
        'What could go wrong?',
        'What are the weaknesses?',
        'Why might this not work?'
      ]
    },
    {
      key: 'yellow',
      color: 'bg-yellow-100 border-yellow-400',
      name: '🟡 Yellow Hat',
      emoji: '🟡',
      description: 'Optimism & Benefits',
      questions: [
        'What are the best possible outcomes?',
        'What are the benefits?',
        'Why would this work?'
      ]
    },
    {
      key: 'green',
      color: 'bg-green-100 border-green-400',
      name: '🟢 Green Hat',
      emoji: '🟢',
      description: 'Creativity & New Ideas',
      questions: [
        'What alternative approaches exist?',
        'What if we tried something different?',
        'What new possibilities can we explore?'
      ]
    },
    {
      key: 'blue',
      color: 'bg-blue-100 border-blue-400',
      name: '🔵 Blue Hat',
      emoji: '🔵',
      description: 'Control & Organization',
      questions: [
        'What should we focus on?',
        'What is the next step?',
        'How should we organize our thinking?'
      ]
    }
  ]

  const updatePerspective = (key: string, value: string) => {
    const updated = { ...perspectives, [key]: value }
    setPerspectives(updated)
    onChange?.(updated)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-300">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          The Six Thinking Hats technique helps you view a decision or problem from multiple perspectives.
          Think about the topic from each hat's point of view and record your insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hats.map((hat) => (
          <div
            key={hat.key}
            className={`${hat.color} border-2 p-4 rounded-lg`}
          >
            <div className="mb-3">
              <h3 className="font-bold text-lg mb-1">{hat.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{hat.description}</p>
            </div>

            <div className="mb-3 bg-white/50 dark:bg-slate-800 p-3 rounded text-xs space-y-1">
              {hat.questions.map((q, idx) => (
                <p key={idx} className="text-gray-700 dark:text-gray-300">• {q}</p>
              ))}
            </div>

            <textarea
              placeholder={`Record your ${hat.description.toLowerCase()} thoughts here...`}
              value={perspectives[hat.key] || ''}
              onChange={(e) => updatePerspective(hat.key, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-24 text-sm"
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      {Object.values(perspectives).some(v => v.trim().length > 0) && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
          <h3 className="font-bold mb-3">Decision Synthesis</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            You have now viewed this decision through 6 different perspectives. Use these insights to make a more balanced and comprehensive decision.
          </p>
        </div>
      )}
    </div>
  )
}
