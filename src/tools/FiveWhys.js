import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const FiveWhys = ({ data = [], onChange }) => {
    const [whys, setWhys] = useState(data);
    const [problem, setProblem] = useState('');
    const addLevel = () => {
        if (whys.length < 5) {
            const newLevel = {
                id: Date.now().toString(),
                level: whys.length + 1,
                question: `Why ${whys.length + 1}?`,
                answer: ''
            };
            const updated = [...whys, newLevel];
            setWhys(updated);
            onChange?.(updated);
        }
    };
    const updateLevel = (id, field, value) => {
        const updated = whys.map(w => w.id === id ? { ...w, [field]: value } : w);
        setWhys(updated);
        onChange?.(updated);
    };
    const deleteLevel = (id) => {
        const updated = whys.filter(w => w.id !== id);
        setWhys(updated);
        onChange?.(updated);
    };
    const resetAnalysis = () => {
        setWhys([]);
        setProblem('');
        onChange?.([]);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Initial Problem" }), _jsx("textarea", { placeholder: "Describe the problem you want to investigate...", value: problem, onChange: (e) => setProblem(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-20" })] }), _jsx("div", { className: "space-y-4", children: whys.map((why, index) => (_jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-500", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h4", { className: "font-bold text-lg", children: ["Why Level ", why.level] }), _jsx("button", { onClick: () => deleteLevel(why.id), className: "text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 18 }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "text", placeholder: `Why ${why.level}?`, value: why.question, onChange: (e) => updateLevel(why.id, 'question', e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 font-medium" }), _jsx("textarea", { placeholder: "Answer...", value: why.answer, onChange: (e) => updateLevel(why.id, 'answer', e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-16" })] })] }, why.id))) }), _jsxs("div", { className: "flex gap-2", children: [whys.length < 5 && (_jsxs("button", { onClick: addLevel, className: "flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg", children: ["Add Why Level ", whys.length + 1] })), whys.length > 0 && (_jsx("button", { onClick: resetAnalysis, className: "flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg", children: "Reset" }))] }), whys.length === 5 && (_jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-2 border-green-500", children: [_jsx("h3", { className: "font-bold text-green-900 dark:text-green-200 mb-3", children: "Root Cause Analysis Complete" }), _jsx("div", { className: "space-y-3", children: whys.map((why, i) => (_jsxs("div", { className: "text-sm", children: [_jsxs("p", { className: "font-semibold text-green-900 dark:text-green-200", children: ["Why ", i + 1, ": ", why.question] }), _jsx("p", { className: "text-gray-700 dark:text-gray-300 ml-4", children: why.answer })] }, why.id))) })] }))] }));
};
