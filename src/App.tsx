import React, { useState, useEffect } from 'react'
import { useDecisionStore } from './store'
import { Navigation } from './components/Navigation'
import { Dashboard } from './pages/Dashboard'
import { ToolPage } from './pages/ToolPage'
import { ProjectPage } from './pages/ProjectPage'
import { Moon, Sun } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

type PageType = 'dashboard' | 'tool' | 'project'

interface PageState {
  type: PageType
  toolId?: string
  projectId?: string
}

function App() {
  const { darkMode, toggleDarkMode } = useDecisionStore()
  const [currentPage, setCurrentPage] = useState<PageState>({ type: 'dashboard' })
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    // Initialize session ID for real-time collaboration
    const newSessionId = uuidv4()
    setSessionId(newSessionId)
    
    // Enable dark mode based on system preference or saved preference
    if (darkMode || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleNavigate = (page: PageState) => {
    setCurrentPage(page as PageState)
    window.scrollTo(0, 0)
  }

  const handleThemeToggle = () => {
    toggleDarkMode()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onThemeToggle={handleThemeToggle}
        darkMode={darkMode}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage.type === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {currentPage.type === 'tool' && currentPage.toolId && (
          <ToolPage toolId={currentPage.toolId} sessionId={sessionId} onBack={() => handleNavigate({ type: 'dashboard' })} />
        )}
        {currentPage.type === 'project' && currentPage.projectId && (
          <ProjectPage projectId={currentPage.projectId} onBack={() => handleNavigate({ type: 'dashboard' })} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-800 mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Decision Intelligence Platform © 2026 • Make better decisions together</p>
        </div>
      </footer>
    </div>
  )
}

export default App
