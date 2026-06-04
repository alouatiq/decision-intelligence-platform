import React from 'react'
import { useDecisionStore, DecisionAnalysis } from '../store'
import { Trash2, Edit, Share2, Download, Clock } from 'lucide-react'
import { exportToPDF } from '../utils/pdfExport'
import { v4 as uuidv4 } from 'uuid'

type PageState = {
  type: 'dashboard' | 'tool' | 'project'
  toolId?: string
  projectId?: string
}

interface ProjectCardProps {
  project: DecisionAnalysis
  onOpen: (project: DecisionAnalysis) => void
  onDelete: (id: string) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen, onDelete }) => {
  const handleExport = async () => {
    try {
      const slides = [
        {
          title: project.name,
          content: project.description
        },
        {
          title: 'Analysis Type',
          content: project.toolType
        },
        {
          title: 'Data',
          content: JSON.stringify(project.data, null, 2)
        }
      ]
      // Using a simplified export since we don't have the actual elements
      const pdf = require('jspdf').jsPDF
      const doc = new pdf()
      slides.forEach((slide, idx) => {
        if (idx > 0) doc.addPage()
        doc.text(slide.title, 20, 20)
        doc.text(slide.content.substring(0, 200), 20, 40)
      })
      doc.save(`${project.name}.pdf`)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200 dark:border-slate-700">
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{project.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>

      <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
        <Clock size={14} />
        {new Date(project.updatedAt).toLocaleDateString()}
      </div>

      <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-xs font-medium mb-4">
        {project.toolType}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onOpen(project)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Edit size={16} className="inline mr-1" /> Open
        </button>
        <button
          onClick={handleExport}
          className="px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors"
          title="Export to PDF"
        >
          <Download size={16} />
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

interface DashboardProps {
  onNavigate: (page: PageState) => void
}

export { PageState }

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { projects, deleteProject, setCurrentProject } = useDecisionStore()

  const tools = [
    { id: 'eisenhower', name: 'Eisenhower Matrix', icon: '⚡', desc: 'Prioritize by urgency and importance' },
    { id: 'moscow', name: 'MoSCoW Method', icon: '🎯', desc: 'Must, Should, Could, Won\'t Have' },
    { id: 'rice', name: 'RICE Scoring', icon: '📊', desc: 'Reach, Impact, Confidence, Effort' },
    { id: 'swot', name: 'SWOT Analysis', icon: '🎭', desc: 'Strengths, Weaknesses, Opportunities, Threats' },
    { id: 'pestle', name: 'PESTLE Analysis', icon: '🌍', desc: 'Political, Economic, Social, Technological, Legal, Environmental' },
    { id: 'porter', name: "Porter's Five Forces", icon: '⚙️', desc: 'Industry competitive analysis' },
    { id: 'risk', name: 'Risk Matrix', icon: '⚠️', desc: 'Likelihood vs Impact assessment' },
    { id: '5whys', name: '5 Whys', icon: '❓', desc: 'Root cause analysis' },
    { id: 'fishbone', name: 'Fishbone Diagram', icon: '🦴', desc: 'Ishikawa cause-effect analysis' },
    { id: 'decision-matrix', name: 'Decision Matrix', icon: '📋', desc: 'Compare alternatives by criteria' },
    { id: 'cost-benefit', name: 'Cost-Benefit Analysis', icon: '💰', desc: 'Evaluate financial impact' },
    { id: 'mind-map', name: 'Mind Mapping', icon: '🧠', desc: 'Organize ideas hierarchically' },
    { id: '6hats', name: 'Six Thinking Hats', icon: '🎩', desc: 'Multi-perspective decision making' },
    { id: 'brainstorm', name: 'Brainstorming', icon: '💡', desc: 'Generate and organize ideas' }
  ]

  const handleCreateProject = (toolId: string) => {
    const project: DecisionAnalysis = {
      id: uuidv4(),
      name: `New ${tools.find(t => t.id === toolId)?.name} Analysis`,
      description: '',
      toolType: tools.find(t => t.id === toolId)?.name || 'Unknown',
      data: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      isShared: false,
      sharedWith: [],
      sessionId: uuidv4()
    }
    setCurrentProject(project)
    onNavigate({ type: 'tool', toolId })
  }

  const handleOpenProject = (project: DecisionAnalysis) => {
    setCurrentProject(project)
    onNavigate({ type: 'project', projectId: project.id })
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Decision Intelligence Platform
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Make better decisions with powerful analysis tools
        </p>
      </div>

      {/* Recent Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(-6).map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={handleOpenProject}
                onDelete={deleteProject}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Decision Tools</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a tool to start a new analysis. Create analysis to save and share with your team.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => handleCreateProject(tool.id)}
              className="text-left bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg hover:border-indigo-500 transition-all p-6 border border-gray-200 dark:border-slate-700 hover:border-indigo-500 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tool.desc}</p>
              <div className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                Start Analysis →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-8 border border-indigo-200 dark:border-indigo-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2 text-indigo-900 dark:text-indigo-200">💾 Save & Track</h3>
            <p className="text-gray-700 dark:text-gray-300">Save all your analyses and access them anytime</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-indigo-900 dark:text-indigo-200">👥 Collaborate</h3>
            <p className="text-gray-700 dark:text-gray-300">Work with your team in real-time sessions</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-indigo-900 dark:text-indigo-200">📊 Export</h3>
            <p className="text-gray-700 dark:text-gray-300">Download analyses as professional PDF reports</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-indigo-900 dark:text-indigo-200">🎯 Comprehensive</h3>
            <p className="text-gray-700 dark:text-gray-300">14+ decision-making frameworks and tools</p>
          </div>
        </div>
      </div>
    </div>
  )
}
