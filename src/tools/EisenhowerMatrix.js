import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const EisenhowerMatrix = ({ data = [], onChange }) => {
    const [tasks, setTasks] = useState(data);
    const [taskName, setTaskName] = useState('');
    const [importance, setImportance] = useState('high');
    const [urgency, setUrgency] = useState('high');
    const addTask = () => {
        if (taskName.trim()) {
            const newTask = {
                id: Date.now().toString(),
                name: taskName,
                importance,
                urgency
            };
            const updated = [...tasks, newTask];
            setTasks(updated);
            onChange?.(updated);
            setTaskName('');
        }
    };
    const deleteTask = (id) => {
        const updated = tasks.filter(t => t.id !== id);
        setTasks(updated);
        onChange?.(updated);
    };
    const getQuadrantTasks = (imp, urg) => tasks.filter(t => t.importance === imp && t.urgency === urg);
    const quadrants = [
        { title: 'Do First', importance: 'high', urgency: 'high', color: 'bg-red-50 dark:bg-red-900/20' },
        { title: 'Schedule', importance: 'high', urgency: 'low', color: 'bg-blue-50 dark:bg-blue-900/20' },
        { title: 'Delegate', importance: 'low', urgency: 'high', color: 'bg-yellow-50 dark:bg-yellow-900/20' },
        { title: 'Eliminate', importance: 'low', urgency: 'low', color: 'bg-gray-50 dark:bg-gray-900/20' }
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Add Task" }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "text", placeholder: "Task name...", value: taskName, onChange: (e) => setTaskName(e.target.value), onKeyPress: (e) => e.key === 'Enter' && addTask(), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("select", { value: importance, onChange: (e) => setImportance(e.target.value), className: "px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600", children: [_jsx("option", { value: "high", children: "High Importance" }), _jsx("option", { value: "low", children: "Low Importance" })] }), _jsxs("select", { value: urgency, onChange: (e) => setUrgency(e.target.value), className: "px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600", children: [_jsx("option", { value: "high", children: "High Urgency" }), _jsx("option", { value: "low", children: "Low Urgency" })] })] }), _jsx("button", { onClick: addTask, className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg", children: "Add Task" })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: quadrants.map((quad) => (_jsxs("div", { className: `${quad.color} p-4 rounded-lg border-2`, children: [_jsx("h4", { className: "font-bold mb-3 text-center", children: quad.title }), _jsx("div", { className: "space-y-2", children: getQuadrantTasks(quad.importance, quad.urgency).map(task => (_jsxs("div", { className: "bg-white dark:bg-slate-700 p-2 rounded flex justify-between items-start text-sm", children: [_jsx("span", { className: "flex-1", children: task.name }), _jsx("button", { onClick: () => deleteTask(task.id), className: "ml-2 text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) })] }, task.id))) })] }, quad.title))) })] }));
};
