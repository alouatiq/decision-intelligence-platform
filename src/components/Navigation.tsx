import React from 'react'
import { Compass, Menu, X, Moon, Sun } from 'lucide-react'

interface PageState {
  type: 'dashboard' | 'tool' | 'project'
  toolId?: string
  projectId?: string
}

interface NavigationProps {
  currentPage: PageState
  onNavigate: (page: PageState) => void
  onThemeToggle: () => void
  darkMode: boolean
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  onThemeToggle,
  darkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate({ type: 'dashboard' })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Compass size={24} className="text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline text-gray-900 dark:text-white">
              DIP
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate({ type: 'dashboard' })}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage.type === 'dashboard'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Dashboard
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <button
              onClick={() => {
                onNavigate({ type: 'dashboard' })
                setMobileMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              Dashboard
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
