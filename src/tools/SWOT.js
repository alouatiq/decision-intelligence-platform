import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const SWOTAnalysis = ({ data = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
}, onChange }) => {
    const [swot, setSWOT] = useState(data);
    const [inputs, setInputs] = useState({
        strengths: '',
        weaknesses: '',
        opportunities: '',
        threats: ''
    });
    const addItem = (category, text) => {
        if (text.trim()) {
            const updated = {
                ...swot,
                [category]: [...swot[category], { id: Date.now().toString(), text }]
            };
            setSWOT(updated);
            onChange?.(updated);
            setInputs({ ...inputs, [category]: '' });
        }
    };
    const deleteItem = (category, id) => {
        const updated = {
            ...swot,
            [category]: swot[category].filter(item => item.id !== id)
        };
        setSWOT(updated);
        onChange?.(updated);
    };
    const categories = [
        { key: 'strengths', label: 'Strengths', color: 'bg-green-50 dark:bg-green-900/20', icon: '💪' },
        { key: 'weaknesses', label: 'Weaknesses', color: 'bg-red-50 dark:bg-red-900/20', icon: '⚠️' },
        { key: 'opportunities', label: 'Opportunities', color: 'bg-blue-50 dark:bg-blue-900/20', icon: '🎯' },
        { key: 'threats', label: 'Threats', color: 'bg-yellow-50 dark:bg-yellow-900/20', icon: '⛔' }
    ];
    return (_jsx("div", { className: "grid grid-cols-2 gap-4", children: categories.map((cat) => (_jsxs("div", { className: `${cat.color} p-4 rounded-lg`, children: [_jsxs("h3", { className: "font-bold text-lg mb-3", children: [cat.icon, " ", cat.label] }), _jsx("div", { className: "space-y-2 mb-4", children: swot[cat.key].map(item => (_jsxs("div", { className: "bg-white dark:bg-slate-700 p-2 rounded flex justify-between items-start text-sm", children: [_jsx("span", { className: "flex-1", children: item.text }), _jsx("button", { onClick: () => deleteItem(cat.key, item.id), className: "ml-2 text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) })] }, item.id))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Add item...", value: inputs[cat.key], onChange: (e) => setInputs({ ...inputs, [cat.key]: e.target.value }), onKeyPress: (e) => e.key === 'Enter' && addItem(cat.key, inputs[cat.key]), className: "flex-1 px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:border-slate-600" }), _jsx("button", { onClick: () => addItem(cat.key, inputs[cat.key]), className: "bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-sm", children: "Add" })] })] }, cat.key))) }));
};
