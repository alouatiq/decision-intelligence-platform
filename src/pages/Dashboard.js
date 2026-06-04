import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDecisionStore } from '../store';
import { Trash2, Edit, Download, Clock } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
const ProjectCard = ({ project, onOpen, onDelete }) => {
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
            ];
            // Using a simplified export since we don't have the actual elements
            const pdf = require('jspdf').jsPDF;
            const doc = new pdf();
            slides.forEach((slide, idx) => {
                if (idx > 0)
                    doc.addPage();
                doc.text(slide.title, 20, 20);
                doc.text(slide.content.substring(0, 200), 20, 40);
            });
            doc.save(`${project.name}.pdf`);
        }
        catch (error) {
            console.error('Export error:', error);
        }
    };
    return (_jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200 dark:border-slate-700", children: [_jsx("h3", { className: "font-bold text-lg mb-2 text-gray-900 dark:text-white", children: project.name }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2", children: project.description }), _jsxs("div", { className: "flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400", children: [_jsx(Clock, { size: 14 }), new Date(project.updatedAt).toLocaleDateString()] }), _jsx("div", { className: "inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-xs font-medium mb-4", children: project.toolType }), _jsxs("div", { className: "flex gap-2 flex-wrap", children: [_jsxs("button", { onClick: () => onOpen(project), className: "flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors", children: [_jsx(Edit, { size: 16, className: "inline mr-1" }), " Open"] }), _jsx("button", { onClick: handleExport, className: "px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg text-sm transition-colors", title: "Export to PDF", children: _jsx(Download, { size: 16 }) }), _jsx("button", { onClick: () => onDelete(project.id), className: "px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm transition-colors", title: "Delete", children: _jsx(Trash2, { size: 16 }) })] })] }));
};
export const Dashboard = ({ onNavigate }) => {
    const { projects, deleteProject, setCurrentProject } = useDecisionStore();
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
    ];
    const handleCreateProject = (toolId) => {
        const project = {
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
        };
        setCurrentProject(project);
        onNavigate({ type: 'tool', toolId });
    };
    const handleOpenProject = (project) => {
        setCurrentProject(project);
        onNavigate({ type: 'project', projectId: project.id });
    };
    return (_jsxs("div", { className: "space-y-12", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 dark:text-white", children: "Decision Intelligence Platform" }), _jsx("p", { className: "text-xl text-gray-600 dark:text-gray-400", children: "Make better decisions with powerful analysis tools" })] }), projects.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Recent Projects" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: projects.slice(-6).map(project => (_jsx(ProjectCard, { project: project, onOpen: handleOpenProject, onDelete: deleteProject }, project.id))) })] })), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Decision Tools" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Choose a tool to start a new analysis. Create analysis to save and share with your team." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: tools.map(tool => (_jsxs("button", { onClick: () => handleCreateProject(tool.id), className: "text-left bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg hover:border-indigo-500 transition-all p-6 border border-gray-200 dark:border-slate-700 hover:border-indigo-500 group", children: [_jsx("div", { className: "text-4xl mb-3 group-hover:scale-110 transition-transform", children: tool.icon }), _jsx("h3", { className: "font-bold text-lg text-gray-900 dark:text-white mb-1", children: tool.name }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: tool.desc }), _jsx("div", { className: "mt-4 text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:translate-x-1 transition-transform", children: "Start Analysis \u2192" })] }, tool.id))) })] }), _jsxs("div", { className: "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-8 border border-indigo-200 dark:border-indigo-800", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-900 dark:text-white", children: "Key Features" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-bold mb-2 text-indigo-900 dark:text-indigo-200", children: "\uD83D\uDCBE Save & Track" }), _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: "Save all your analyses and access them anytime" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold mb-2 text-indigo-900 dark:text-indigo-200", children: "\uD83D\uDC65 Collaborate" }), _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: "Work with your team in real-time sessions" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold mb-2 text-indigo-900 dark:text-indigo-200", children: "\uD83D\uDCCA Export" }), _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: "Download analyses as professional PDF reports" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold mb-2 text-indigo-900 dark:text-indigo-200", children: "\uD83C\uDFAF Comprehensive" }), _jsx("p", { className: "text-gray-700 dark:text-gray-300", children: "14+ decision-making frameworks and tools" })] })] })] })] }));
};
