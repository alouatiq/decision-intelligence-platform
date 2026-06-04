import React, { useState } from 'react'
import { ArrowLeft, Download } from 'lucide-react'
import { EisenhowerMatrix } from '../tools/EisenhowerMatrix'
import { MoSCoWMethod } from '../tools/MoSCoW'
import { RICEScoring } from '../tools/RICE'
import { SWOTAnalysis } from '../tools/SWOT'
import { PESTLEAnalysis } from '../tools/PESTLE'
import { RiskMatrix } from '../tools/RiskMatrix'
import { FiveWhys } from '../tools/FiveWhys'
import { FishboneDiagram } from '../tools/FishboneDiagram'
import { DecisionMatrix } from '../tools/DecisionMatrix'
import { DecisionTable } from '../tools/DecisionTable'
import { CostBenefitAnalysis } from '../tools/CostBenefitAnalysis'
import { MindMapping } from '../tools/MindMapping'
import { SixThinkingHats } from '../tools/SixThinkingHats'
import { Brainstorming } from '../tools/Brainstorming'
import { PortersFiveForces } from '../tools/PortersFiveForces'
import { exportToPDF } from '../utils/pdfExport'

interface ToolPageProps {
  toolId: string
  sessionId: string
  onBack: () => void
}

export const ToolPage: React.FC<ToolPageProps> = ({ toolId, sessionId, onBack }) => {
  const [exporting, setExporting] = useState(false)

  const toolConfigs = {
    eisenhower: {
      name: 'Eisenhower Matrix',
      component: EisenhowerMatrix,
      goal: 'Spend your time on what truly matters by separating what is important from what is merely urgent.',
      howItWorks: 'Sort each task into a 2×2 grid of urgency vs. importance: do the important & urgent now, schedule the important & not-urgent, delegate the urgent & unimportant, and drop the rest.',
      developer: 'Attributed to U.S. President Dwight D. Eisenhower; popularised by Stephen Covey in The 7 Habits of Highly Effective People (1989).'
    },
    moscow: {
      name: 'MoSCoW Method',
      component: MoSCoWMethod,
      goal: 'Agree on priorities for a project or release by ranking requirements by necessity.',
      howItWorks: 'Label each item Must have, Should have, Could have, or Won\'t have (this time). The "Musts" define the minimum viable outcome; the "Won\'ts" are explicitly out of scope.',
      developer: 'Created by Dai Clegg at Oracle in 1994; widely used in Agile and the DSDM framework.'
    },
    rice: {
      name: 'RICE Scoring',
      component: RICEScoring,
      goal: 'Prioritise features or ideas objectively by their expected value relative to the effort required.',
      howItWorks: 'Score each item as Reach × Impact × Confidence ÷ Effort. Higher scores rise to the top, reducing gut-feel bias.',
      developer: 'Developed by the product team at Intercom (Sean McBride) to prioritise their roadmap.'
    },
    swot: {
      name: 'SWOT Analysis',
      component: SWOTAnalysis,
      goal: 'Understand your position before acting on a decision or strategy.',
      howItWorks: 'List internal Strengths and Weaknesses and external Opportunities and Threats in four quadrants, then craft strategy that leverages strengths and guards against threats.',
      developer: 'Commonly attributed to Albert Humphrey at the Stanford Research Institute in the 1960s–70s.'
    },
    pestle: {
      name: 'PESTLE Analysis',
      component: PESTLEAnalysis,
      goal: 'Scan the big-picture external environment that could affect your decision.',
      howItWorks: 'Examine Political, Economic, Social, Technological, Legal and Environmental factors to surface opportunities and risks outside your control.',
      developer: 'Originated as "ETPS" by Harvard professor Francis Aguilar in Scanning the Business Environment (1967).'
    },
    risk: {
      name: 'Risk Matrix',
      component: RiskMatrix,
      goal: 'Decide which risks deserve attention first.',
      howItWorks: 'Plot each risk by Likelihood against Impact on a grid; the high-likelihood / high-impact corner is your priority for mitigation.',
      developer: 'Rooted in formal risk-management practice, notably the U.S. military standard MIL-STD-882.'
    },
    '5whys': {
      name: '5 Whys',
      component: FiveWhys,
      goal: 'Find the real root cause of a problem instead of treating its symptoms.',
      howItWorks: 'Start with the problem and ask "Why?" repeatedly (about five times), each answer feeding the next question, until you reach the underlying cause.',
      developer: 'Created by Sakichi Toyoda and used within the Toyota Production System.'
    },
    fishbone: {
      name: 'Fishbone Diagram',
      component: FishboneDiagram,
      goal: 'Brainstorm and organise every possible cause of a problem.',
      howItWorks: 'Place the problem at the "head" and branch out "bones" for cause categories (People, Process, Equipment, Materials…), filling in contributing factors.',
      developer: 'Developed by Japanese quality-control expert Kaoru Ishikawa in the 1960s (also called the Ishikawa diagram).'
    },
    'decision-matrix': {
      name: 'Decision Matrix',
      component: DecisionMatrix,
      goal: 'Choose between options rationally when several criteria matter.',
      howItWorks: 'Score each option against weighted criteria, multiply and total them; the highest weighted score is the strongest choice.',
      developer: 'Also known as the Pugh Matrix, after design engineer Stuart Pugh who formalised it.'
    },
    'decision-table': {
      name: 'Decision Table',
      component: DecisionTable,
      goal: 'Pick the best option when your criteria carry different importance.',
      howItWorks: 'List your criteria and give each a weight, list your options, then rate each option 1–5 (Poor→Excellent) on every criterion. Each option scores Σ(weight × rating), shown as points and a percentage so the strongest option stands out.',
      developer: 'A weighted scoring model, central to the decision-analysis method developed by Charles Kepner and Benjamin Tregoe in the 1960s.'
    },
    'cost-benefit': {
      name: 'Cost-Benefit Analysis',
      component: CostBenefitAnalysis,
      goal: 'Decide whether an action is worthwhile by weighing what it costs against what it returns.',
      howItWorks: 'List and value all costs and all benefits over time, then compare the totals (often as a net benefit or a benefit-to-cost ratio).',
      developer: 'Introduced by French engineer Jules Dupuit in 1848 and later formalised in modern welfare economics.'
    },
    'mind-map': {
      name: 'Mind Mapping',
      component: MindMapping,
      goal: 'Organise ideas around a central topic to aid thinking, planning and memory.',
      howItWorks: 'Start with one central idea and branch outward into related sub-topics, creating a radial, visual hierarchy.',
      developer: 'Popularised by British author Tony Buzan in the 1970s.'
    },
    '6hats': {
      name: 'Six Thinking Hats',
      component: SixThinkingHats,
      goal: 'Examine a decision from every angle by separating distinct modes of thinking.',
      howItWorks: 'Everyone "wears" one hat at a time — facts (white), feelings (red), caution (black), benefits (yellow), creativity (green), process (blue) — so the group thinks in the same mode at once.',
      developer: 'Created by Maltese psychologist Edward de Bono in 1985.'
    },
    brainstorm: {
      name: 'Brainstorming',
      component: Brainstorming,
      goal: 'Generate as many ideas as possible before judging any of them.',
      howItWorks: 'Capture ideas freely with no criticism, welcome bold suggestions and build on others’, then organise and evaluate afterward.',
      developer: 'Popularised by advertising executive Alex Osborn in Applied Imagination (1953).'
    },
    porter: {
      name: "Porter's Five Forces",
      component: PortersFiveForces,
      goal: 'Assess how competitive and profitable an industry is before entering or investing.',
      howItWorks: 'Weigh five forces — competitive rivalry, supplier power, buyer power, threat of substitutes, and threat of new entrants — to see where the power lies.',
      developer: 'Created by Harvard Business School professor Michael E. Porter in 1979.'
    }
  } as const

  const toolConfig = toolConfigs[toolId as keyof typeof toolConfigs]

  const handleExport = async () => {
    setExporting(true)
    try {
      const filename = `${toolConfig?.name || 'analysis'}.pdf`
      await exportToPDF('tool-export-content', filename)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setExporting(false)
    }
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
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Download size={18} />
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>

      {/* Exportable content: title + the live tool result */}
      <div id="tool-export-content" className="space-y-6 bg-white dark:bg-slate-800 p-2 rounded-lg">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{toolConfig.name}</h1>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-1">🎯 Goal</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{toolConfig.goal}</p>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-1">⚙️ How it works</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{toolConfig.howItWorks}</p>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-1">👤 Developed by</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{toolConfig.developer}</p>
            </div>
          </div>
        </div>

        {/* Tool Component */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700">
          <ToolComponent />
        </div>
      </div>
    </div>
  )
}
