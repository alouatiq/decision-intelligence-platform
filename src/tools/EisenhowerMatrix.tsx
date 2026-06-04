import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface Task {
  id: string
  name: string
  importance: 'high' | 'low'
  urgency: 'high' | 'low'
}

interface EisenhowerMatrixProps {
  data?: Task[]
  onChange?: (data: Task[]) => void
}

export const EisenhowerMatrix: React.FC<EisenhowerMatrixProps> = ({ 
  data = [], 
  onChange 
}) => {
  const [tasks, setTasks] = useState<Task[]>(data)
  const [taskName, setTaskName] = useState('')
  const [importance, setImportance] = useState<'high' | 'low'>('high')
  const [urgency, setUrgency] = useState<'high' | 'low'>('high')

  const addTask = () => {
    if (taskName.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: taskName,
        importance,
        urgency
      }
      const updated = [...tasks, newTask]
      setTasks(updated)
      onChange?.(updated)
      setTaskName('')
    }
  }

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id)
    setTasks(updated)
    onChange?.(updated)
  }

  const getQuadrantTasks = (imp: 'high' | 'low', urg: 'high' | 'low') =>
    tasks.filter(t => t.importance === imp && t.urgency === urg)

  const quadrants: Array<{ title: string; importance: 'high' | 'low'; urgency: 'high' | 'low'; color: string }> = [
    { title: 'Do First', importance: 'high', urgency: 'high', color: 'bg-red-50 dark:bg-red-900/20' },
    { title: 'Schedule', importance: 'high', urgency: 'low', color: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'Delegate', importance: 'low', urgency: 'high', color: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { title: 'Eliminate', importance: 'low', urgency: 'low', color: 'bg-gray-50 dark:bg-gray-900/20' }
  ]

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Add Task</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={importance}
              onChange={(e) => setImportance(e.target.value as 'high' | 'low')}
              className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            >
              <option value="high">High Importance</option>
              <option value="low">Low Importance</option>
            </select>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as 'high' | 'low')}
              className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            >
              <option value="high">High Urgency</option>
              <option value="low">Low Urgency</option>
            </select>
          </div>
          <button
            onClick={addTask}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Matrix */}
      <div className="grid grid-cols-2 gap-4">
        {quadrants.map((quad) => (
          <div key={quad.title} className={`${quad.color} p-4 rounded-lg border-2`}>
            <h4 className="font-bold mb-3 text-center">{quad.title}</h4>
            <div className="space-y-2">
              {getQuadrantTasks(quad.importance, quad.urgency).map(task => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-slate-700 p-2 rounded flex justify-between items-start text-sm"
                >
                  <span className="flex-1">{task.name}</span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
