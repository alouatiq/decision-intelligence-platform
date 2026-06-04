import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useDecisionStore } from '../store';
import { ArrowLeft, Download, Share2, Edit2 } from 'lucide-react';
import { exportToPDF } from '../utils/pdfExport';
export const ProjectPage = ({ projectId, onBack }) => {
    const { currentProject, updateProject } = useDecisionStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(currentProject?.name || '');
    const [editedDesc, setEditedDesc] = useState(currentProject?.description || '');
    if (!currentProject || currentProject.id !== projectId) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-red-600", children: "Project not found" }), _jsx("button", { onClick: onBack, className: "mt-4 text-indigo-600 hover:text-indigo-700", children: "Go Back" })] }));
    }
    const handleSave = () => {
        if (editedName.trim()) {
            updateProject(projectId, {
                name: editedName,
                description: editedDesc
            });
            setIsEditing(false);
        }
    };
    const handleExport = async () => {
        try {
            // Create a temporary container for export
            const container = document.createElement('div');
            container.innerHTML = `
        <h1>${currentProject.name}</h1>
        <p>${currentProject.description}</p>
        <p>Tool: ${currentProject.toolType}</p>
        <pre>${JSON.stringify(currentProject.data, null, 2)}</pre>
      `;
            document.body.appendChild(container);
            await exportToPDF(container.id, `${currentProject.name}.pdf`);
            document.body.removeChild(container);
        }
        catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export PDF. Please try again.');
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("button", { onClick: onBack, className: "flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium", children: [_jsx(ArrowLeft, { size: 20 }), "Back to Dashboard"] }), _jsx("div", { className: "bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700", children: isEditing ? (_jsxs("div", { className: "space-y-4", children: [_jsx("input", { type: "text", value: editedName, onChange: (e) => setEditedName(e.target.value), className: "w-full text-3xl font-bold px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" }), _jsx("textarea", { value: editedDesc, onChange: (e) => setEditedDesc(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-24" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: handleSave, className: "flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium", children: "Save Changes" }), _jsx("button", { onClick: () => setIsEditing(false), className: "flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-medium", children: "Cancel" })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: currentProject.name }), _jsx("p", { className: "text-gray-600 dark:text-gray-400 mt-2", children: currentProject.description })] }), _jsx("button", { onClick: () => setIsEditing(true), className: "p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(Edit2, { size: 20 }) })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pt-4 border-t", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Tool Type" }), _jsx("p", { className: "font-medium text-gray-900 dark:text-white", children: currentProject.toolType })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Created" }), _jsx("p", { className: "font-medium text-gray-900 dark:text-white", children: new Date(currentProject.createdAt).toLocaleDateString() })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Updated" }), _jsx("p", { className: "font-medium text-gray-900 dark:text-white", children: new Date(currentProject.updatedAt).toLocaleDateString() })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Session" }), _jsxs("p", { className: "font-medium text-gray-900 dark:text-white", children: [currentProject.sessionId?.substring(0, 8), "..."] })] })] }), _jsxs("div", { className: "flex flex-wrap gap-3 pt-4 border-t", children: [_jsxs("button", { onClick: handleExport, className: "flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors", children: [_jsx(Download, { size: 18 }), "Export PDF"] }), _jsxs("button", { className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors", children: [_jsx(Share2, { size: 18 }), "Share"] })] })] })) }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border", children: [_jsx("h2", { className: "font-bold text-lg mb-4", children: "Analysis Data" }), _jsx("pre", { className: "bg-white dark:bg-slate-700 p-4 rounded overflow-auto max-h-96 text-sm", children: JSON.stringify(currentProject.data, null, 2) })] })] }));
};
