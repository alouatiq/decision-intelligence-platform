import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface DecisionAnalysis {
  id: string
  name: string
  description: string
  toolType: string
  data: any
  createdAt: Date
  updatedAt: Date
  isShared: boolean
  sharedWith: string[]
  sessionId?: string
}

interface DecisionStore {
  projects: DecisionAnalysis[]
  currentProject: DecisionAnalysis | null
  darkMode: boolean
  
  // Projects
  addProject: (project: DecisionAnalysis) => void
  updateProject: (id: string, updates: Partial<DecisionAnalysis>) => void
  deleteProject: (id: string) => void
  setCurrentProject: (project: DecisionAnalysis) => void
  
  // Theme
  toggleDarkMode: () => void
}

export const useDecisionStore = create<DecisionStore>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,
      darkMode: false,
      
      addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
      })),
      
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
        ),
        currentProject: state.currentProject?.id === id
          ? { ...state.currentProject, ...updates, updatedAt: new Date() }
          : state.currentProject
      })),
      
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject
      })),
      
      setCurrentProject: (project) => set({ currentProject: project }),
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
    }),
    { name: 'decision-store' }
  )
)
