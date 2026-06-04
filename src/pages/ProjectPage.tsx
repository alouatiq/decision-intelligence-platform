import React, { useState } from 'react'
import { useDecisionStore } from '../store'
import { ArrowLeft, Save, Download, Share2, Edit2 } from 'lucide-react'
import { exportToPDF } from '../utils/pdfExport'

interface ProjectPageProps {
  projectId: string
  onBack: () => void
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ projectId, onBack }) => {
  const { currentProject, updateProject } = useDecisionStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(currentProject?.name || '')
  const [editedDesc, setEditedDesc] = useState(currentProject?.description || '')

  if (!currentProject || currentProject.id !== projectId) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Project not found</p>
        <button onClick={onBack} className="mt-4 text-indigo-600 hover:text-indigo-700">
          Go Back
        </button>
      </div>
    )
  }

  const handleSave = () => {
    if (editedName.trim()) {
      updateProject(projectId, {
        name: editedName,
        description: editedDesc
      })
      setIsEditing(false)
    }
  }

  const handleExport = async () => {
    try {
      // Create a temporary container for export
      const container = document.createElement('div')
      container.innerHTML = `
        <h1>${currentProject.name}</h1>
        <p>${currentProject.description}</p>
        <p>Tool: ${currentProject.toolType}</p>
        <pre>${JSON.stringify(currentProject.data, null, 2)}</pre>
      `
      document.body.appendChild(container)

      await exportToPDF(container.id, `${currentProject.name}.pdf`)
      document.body.removeChild(container)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export PDF. Please try again.')
    }
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

      {/* Project Info */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full text-3xl font-bold px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            />
            <textarea
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-24"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentProject.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{currentProject.description}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Edit2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pt-4 border-t">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tool Type</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentProject.toolType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Created</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(currentProject.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Updated</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(currentProject.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Session</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {currentProject.sessionId?.substring(0, 8)}...
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Download size={18} />
                Export PDF
              </button>
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </>
        )}
      </div>

      {/* Data Display */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border">
        <h2 className="font-bold text-lg mb-4">Analysis Data</h2>
        <pre className="bg-white dark:bg-slate-700 p-4 rounded overflow-auto max-h-96 text-sm">
          {JSON.stringify(currentProject.data, null, 2)}
        </pre>
      </div>
    </div>
  )
}
