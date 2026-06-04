import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useDecisionStore = create()(persist((set) => ({
    projects: [],
    currentProject: null,
    darkMode: false,
    addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
    })),
    updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) => p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p),
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
}), { name: 'decision-store' }));
