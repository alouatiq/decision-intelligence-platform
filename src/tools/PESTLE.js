import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const PESTLEAnalysis = ({ data = {
    political: [],
    economic: [],
    social: [],
    technological: [],
    legal: [],
    environmental: []
}, onChange }) => {
    const [pestle, setPESTLE] = useState(data);
    const [inputs, setInputs] = useState({
        political: '',
        economic: '',
        social: '',
        technological: '',
        legal: '',
        environmental: ''
    });
    const addItem = (category, text) => {
        if (text.trim()) {
            const updated = {
                ...pestle,
                [category]: [...pestle[category], { id: Date.now().toString(), text }]
            };
            setPESTLE(updated);
            onChange?.(updated);
            setInputs({ ...inputs, [category]: '' });
        }
    };
    const deleteItem = (category, id) => {
        const updated = {
            ...pestle,
            [category]: pestle[category].filter(item => item.id !== id)
        };
        setPESTLE(updated);
        onChange?.(updated);
    };
    const categories = [
        { key: 'political', label: 'Political', color: 'bg-blue-50 dark:bg-blue-900/20' },
        { key: 'economic', label: 'Economic', color: 'bg-green-50 dark:bg-green-900/20' },
        { key: 'social', label: 'Social', color: 'bg-purple-50 dark:bg-purple-900/20' },
        { key: 'technological', label: 'Technological', color: 'bg-orange-50 dark:bg-orange-900/20' },
        { key: 'legal', label: 'Legal', color: 'bg-red-50 dark:bg-red-900/20' },
        { key: 'environmental', label: 'Environmental', color: 'bg-yellow-50 dark:bg-yellow-900/20' }
    ];
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: categories.map((cat) => (_jsxs("div", { className: `${cat.color} p-4 rounded-lg`, children: [_jsx("h3", { className: "font-bold mb-3", children: cat.label }), _jsx("div", { className: "space-y-2 mb-4 max-h-48 overflow-y-auto", children: pestle[cat.key].map(item => (_jsxs("div", { className: "bg-white dark:bg-slate-700 p-2 rounded flex justify-between items-start text-sm", children: [_jsx("span", { className: "flex-1", children: item.text }), _jsx("button", { onClick: () => deleteItem(cat.key, item.id), className: "ml-2 text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 14 }) })] }, item.id))) }), _jsxs("div", { className: "flex gap-1", children: [_jsx("input", { type: "text", placeholder: "Add...", value: inputs[cat.key], onChange: (e) => setInputs({ ...inputs, [cat.key]: e.target.value }), onKeyPress: (e) => e.key === 'Enter' && addItem(cat.key, inputs[cat.key]), className: "flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-700 dark:border-slate-600" }), _jsx("button", { onClick: () => addItem(cat.key, inputs[cat.key]), className: "bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs", children: "+" })] })] }, cat.key))) }));
};
