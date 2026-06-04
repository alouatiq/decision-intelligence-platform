import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useDecisionStore } from './store';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { ToolPage } from './pages/ToolPage';
import { ProjectPage } from './pages/ProjectPage';
import { v4 as uuidv4 } from 'uuid';
function App() {
    const { darkMode, toggleDarkMode } = useDecisionStore();
    const [currentPage, setCurrentPage] = useState({ type: 'dashboard' });
    const [sessionId, setSessionId] = useState('');
    useEffect(() => {
        // Initialize session ID for real-time collaboration
        const newSessionId = uuidv4();
        setSessionId(newSessionId);
        // Enable dark mode based on system preference or saved preference
        if (darkMode || window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
    }, []);
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
    const handleNavigate = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };
    const handleThemeToggle = () => {
        toggleDarkMode();
    };
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-slate-900 transition-colors", children: [_jsx(Navigation, { currentPage: currentPage, onNavigate: handleNavigate, onThemeToggle: handleThemeToggle, darkMode: darkMode }), _jsxs("main", { className: "max-w-7xl mx-auto px-4 py-8", children: [currentPage.type === 'dashboard' && _jsx(Dashboard, { onNavigate: handleNavigate }), currentPage.type === 'tool' && currentPage.toolId && (_jsx(ToolPage, { toolId: currentPage.toolId, sessionId: sessionId, onBack: () => handleNavigate({ type: 'dashboard' }) })), currentPage.type === 'project' && currentPage.projectId && (_jsx(ProjectPage, { projectId: currentPage.projectId, onBack: () => handleNavigate({ type: 'dashboard' }) }))] }), _jsx("footer", { className: "bg-gray-50 dark:bg-slate-800 mt-12 py-6 border-t", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400", children: _jsx("p", { children: "Decision Intelligence Platform \u00A9 2026 \u2022 Make better decisions together" }) }) })] }));
}
export default App;
