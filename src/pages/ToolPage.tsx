import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

interface ToolPageProps {
  toolId: string
  sessionId: string
  onBack: () => void
}

export const ToolPage: React.FC<ToolPageProps> = ({ toolId, sessionId, onBack }) => {
  const toolComponents: { [key: string]: any } = {}

  // Dynamically import tools
  const [toolData, setToolData] = useState({})

  const toolConfigs = {
    eisenhower: { name: 'Eisenhower Matrix', component: 'EisenhowerMatrix' },
    moscow: { name: 'MoSCoW Method', component: 'MoSCoWMethod' },
    rice: { name: 'RICE Scoring', component: 'RICEScoring' },
    swot: { name: 'SWOT Analysis', component: 'SWOTAnalysis' },
    pestle: { name: 'PESTLE Analysis', component: 'PESTLEAnalysis' },
    risk: { name: 'Risk Matrix', component: 'RiskMatrix' },
    '5whys': { name: '5 Whys', component: 'FiveWhys' },
    fishbone: { name: 'Fishbone Diagram', component: 'FishboneDiagram' },
    'decision-matrix': { name: 'Decision Matrix', component: 'DecisionMatrix' },
    'cost-benefit': { name: 'Cost-Benefit Analysis', component: 'CostBenefitAnalysis' },
    'mind-map': { name: 'Mind Mapping', component: 'MindMapping' },
    '6hats': { name: 'Six Thinking Hats', component: 'SixThinkingHats' },
    brainstorm: { name: 'Brainstorming', component: 'Brainstorming' },
    porter: { name: "Porter's Five Forces", component: 'PortersFiveForces' }
  } as const

  const toolConfig = toolConfigs[toolId as keyof typeof toolConfigs]

  if (!toolConfig) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Tool not found</p>
        <button onClick={onBack} className="mt-4 text-indigo-600 hover:text-indigo-700">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{toolConfig.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Session ID: {sessionId.substring(0, 8)}... (Real-time collaboration enabled)
        </p>
      </div>

      {/* Tool Placeholder */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {toolConfig.name} tool interface will be loaded here
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Dynamic tool loading system ready for component injection
          </p>
        </div>
      </div>
    </div>
  )
}
