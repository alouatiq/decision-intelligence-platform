import React, { useState } from 'react'
import { ArrowLeft, Share2 } from 'lucide-react'
import { EisenhowerMatrix } from '../tools/EisenhowerMatrix'
import { MoSCoWMethod } from '../tools/MoSCoW'
import { RICEScoring } from '../tools/RICE'
import { SWOTAnalysis } from '../tools/SWOT'
import { PESTLEAnalysis } from '../tools/PESTLE'
import { RiskMatrix } from '../tools/RiskMatrix'
import { FiveWhys } from '../tools/FiveWhys'
import { FishboneDiagram } from '../tools/FishboneDiagram'
import { DecisionMatrix } from '../tools/DecisionMatrix'
import { CostBenefitAnalysis } from '../tools/CostBenefitAnalysis'
import { MindMapping } from '../tools/MindMapping'
import { SixThinkingHats } from '../tools/SixThinkingHats'
import { Brainstorming } from '../tools/Brainstorming'
import { PortersFiveForces } from '../tools/PortersFiveForces'

interface ToolPageProps {
  toolId: string
  sessionId: string
  onBack: () => void
}

export const ToolPage: React.FC<ToolPageProps> = ({ toolId, sessionId, onBack }) => {
  const [copied, setCopied] = useState(false)

  const toolConfigs = {
    eisenhower: { name: 'Eisenhower Matrix', component: EisenhowerMatrix },
    moscow: { name: 'MoSCoW Method', component: MoSCoWMethod },
    rice: { name: 'RICE Scoring', component: RICEScoring },
    swot: { name: 'SWOT Analysis', component: SWOTAnalysis },
    pestle: { name: 'PESTLE Analysis', component: PESTLEAnalysis },
    risk: { name: 'Risk Matrix', component: RiskMatrix },
    '5whys': { name: '5 Whys', component: FiveWhys },
    fishbone: { name: 'Fishbone Diagram', component: FishboneDiagram },
    'decision-matrix': { name: 'Decision Matrix', component: DecisionMatrix },
    'cost-benefit': { name: 'Cost-Benefit Analysis', component: CostBenefitAnalysis },
    'mind-map': { name: 'Mind Mapping', component: MindMapping },
    '6hats': { name: 'Six Thinking Hats', component: SixThinkingHats },
    brainstorm: { name: 'Brainstorming', component: Brainstorming },
    porter: { name: "Porter's Five Forces", component: PortersFiveForces }
  } as const

  const toolConfig = toolConfigs[toolId as keyof typeof toolConfigs]

  const handleShareSession = () => {
    navigator.clipboard.writeText(sessionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!toolConfig) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Tool not found: {toolId}</p>
        <button onClick={onBack} className="mt-4 text-indigo-600 hover:text-indigo-700">
          Go Back
        </button>
      </div>
    )
  }

  const ToolComponent = toolConfig.component

  return (
    <div className="space-y-6">
      {/* Header with buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <button
          onClick={handleShareSession}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            copied
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50'
          }`}
        >
          <Share2 size={18} />
          {copied ? 'Copied!' : 'Share Session'}
        </button>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{toolConfig.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Session ID: <span className="font-mono font-bold">{sessionId.substring(0, 8)}...</span> (Real-time collaboration enabled)
        </p>
      </div>

      {/* Tool Component */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700">
        <ToolComponent />
      </div>
    </div>
  )
}
