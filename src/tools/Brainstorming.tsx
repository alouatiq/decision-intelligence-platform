import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface BrainstormIdea {
  id: string
  text: string
  category: string
  timestamp: Date
}

interface BrainstormingProps {
  data?: BrainstormIdea[]
  onChange?: (data: BrainstormIdea[]) => void
}

export const Brainstorming: React.FC<BrainstormingProps> = ({
  data = [],
  onChange
}) => {
  const [ideas, setIdeas] = useState<BrainstormIdea[]>(data)
  const [newIdea, setNewIdea] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [categories, setCategories] = useState<string[]>(['general', 'features', 'improvements', 'risks', 'opportunities'])
  const [newCategory, setNewCategory] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'category'>('recent')

  const addIdea = () => {
    if (newIdea.trim()) {
      const idea: BrainstormIdea = {
        id: Date.now().toString(),
        text: newIdea,
        category: selectedCategory,
        timestamp: new Date()
      }
      const updated = [...ideas, idea]
      setIdeas(updated)
      onChange?.(updated)
      setNewIdea('')
    }
  }

  const deleteIdea = (id: string) => {
    const updated = ideas.filter(i => i.id !== id)
    setIdeas(updated)
    onChange?.(updated)
  }

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      const updated = [...categories, newCategory]
      setCategories(updated)
      setNewCategory('')
    }
  }

  const getGroupedIdeas = () => {
    if (sortBy === 'category') {
      return categories.map(cat => ({
        group: cat,
        ideas: ideas.filter(i => i.category === cat)
      })).filter(g => g.ideas.length > 0)
    } else {
      return [{
        group: 'All Ideas',
        ideas: [...ideas].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      }]
    }
  }

  const groupedIdeas = getGroupedIdeas()

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Add Idea</h3>
        <div className="space-y-3">
          <textarea
            placeholder="Describe your idea..."
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-20"
          />
          <div className="grid grid-cols-3 gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="New category..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
            />
            <button
              onClick={addCategory}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm"
            >
              Add Category
            </button>
          </div>
          <button
            onClick={addIdea}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Add Idea
          </button>
        </div>
      </div>

      {/* View Options */}
      <div className="flex gap-2">
        <button
          onClick={() => setSortBy('recent')}
          className={`px-4 py-2 rounded-lg ${sortBy === 'recent' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-slate-700'}`}
        >
          Recent
        </button>
        <button
          onClick={() => setSortBy('category')}
          className={`px-4 py-2 rounded-lg ${sortBy === 'category' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-slate-700'}`}
        >
          By Category
        </button>
      </div>

      {/* Ideas Display */}
      <div className="space-y-4">
        {groupedIdeas.map((group, idx) => (
          <div key={idx}>
            <h3 className="font-bold text-lg mb-3 capitalize">{group.group} ({group.ideas.length})</h3>
            <div className="grid gap-3">
              {group.ideas.map(idea => (
                <div
                  key={idea.id}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 rounded-lg border-l-4 border-indigo-500"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm mb-2">{idea.text}</p>
                      <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="bg-white dark:bg-slate-700 px-2 py-1 rounded capitalize">{idea.category}</span>
                        <span>{new Date(idea.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteIdea(idea.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {ideas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No ideas yet. Start brainstorming!</p>
        </div>
      )}
    </div>
  )
}
