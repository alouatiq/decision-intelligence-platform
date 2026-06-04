import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const MoSCoWMethod = ({ data = [], onChange }) => {
    const [requirements, setRequirements] = useState(data);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('must');
    const [description, setDescription] = useState('');
    const addRequirement = () => {
        if (name.trim()) {
            const newReq = {
                id: Date.now().toString(),
                name,
                category,
                description
            };
            const updated = [...requirements, newReq];
            setRequirements(updated);
            onChange?.(updated);
            setName('');
            setDescription('');
        }
    };
    const deleteRequirement = (id) => {
        const updated = requirements.filter(r => r.id !== id);
        setRequirements(updated);
        onChange?.(updated);
    };
    const categories = [
        { key: 'must', label: 'Must Have', color: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-300' },
        { key: 'should', label: 'Should Have', color: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-300' },
        { key: 'could', label: 'Could Have', color: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-300' },
        { key: 'wont', label: "Won't Have", color: 'bg-gray-50 dark:bg-gray-900/20', border: 'border-gray-300' }
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Add Requirement" }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "text", placeholder: "Requirement name...", value: name, onChange: (e) => setName(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" }), _jsx("textarea", { placeholder: "Description...", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-20" }), _jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600", children: [_jsx("option", { value: "must", children: "Must Have (Critical)" }), _jsx("option", { value: "should", children: "Should Have (Important)" }), _jsx("option", { value: "could", children: "Could Have (Nice to have)" }), _jsx("option", { value: "wont", children: "Won't Have (Out of scope)" })] }), _jsx("button", { onClick: addRequirement, className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg", children: "Add Requirement" })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: categories.map((cat) => (_jsxs("div", { className: `${cat.color} p-4 rounded-lg border-2 ${cat.border}`, children: [_jsx("h4", { className: "font-bold mb-3 text-center", children: cat.label }), _jsx("div", { className: "space-y-2", children: requirements.filter(r => r.category === cat.key).map(req => (_jsx("div", { className: "bg-white dark:bg-slate-700 p-2 rounded text-sm", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium", children: req.name }), req.description && _jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400 mt-1", children: req.description })] }), _jsx("button", { onClick: () => deleteRequirement(req.id), className: "ml-2 text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) })] }) }, req.id))) })] }, cat.key))) })] }));
};
