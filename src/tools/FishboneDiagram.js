import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
const defaultData = {
    problem: '',
    categories: {
        people: [],
        process: [],
        technology: [],
        environment: [],
        materials: [],
        management: []
    }
};
export const FishboneDiagram = ({ data = defaultData, onChange }) => {
    const [fishbone, setFishbone] = useState(data);
    const [inputs, setInputs] = useState({
        people: '',
        process: '',
        technology: '',
        environment: '',
        materials: '',
        management: ''
    });
    const addFactor = (category) => {
        const text = inputs[category];
        if (text.trim()) {
            const updated = {
                ...fishbone,
                categories: {
                    ...fishbone.categories,
                    [category]: [...fishbone.categories[category], { id: Date.now().toString(), name: text }]
                }
            };
            setFishbone(updated);
            onChange?.(updated);
            setInputs({ ...inputs, [category]: '' });
        }
    };
    const deleteFactor = (category, id) => {
        const updated = {
            ...fishbone,
            categories: {
                ...fishbone.categories,
                [category]: fishbone.categories[category].filter(f => f.id !== id)
            }
        };
        setFishbone(updated);
        onChange?.(updated);
    };
    const categories = [
        { key: 'people', label: 'People', color: 'bg-blue-50' },
        { key: 'process', label: 'Process', color: 'bg-green-50' },
        { key: 'technology', label: 'Technology', color: 'bg-purple-50' },
        { key: 'environment', label: 'Environment', color: 'bg-yellow-50' },
        { key: 'materials', label: 'Materials', color: 'bg-red-50' },
        { key: 'management', label: 'Management', color: 'bg-orange-50' }
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("label", { className: "text-sm font-medium", children: "Effect/Problem" }), _jsx("textarea", { value: fishbone.problem, onChange: (e) => {
                            const updated = { ...fishbone, problem: e.target.value };
                            setFishbone(updated);
                            onChange?.(updated);
                        }, placeholder: "What is the main problem or effect?", className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 mt-1 h-16" })] }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4", children: categories.map((cat) => (_jsxs("div", { className: `${cat.color} dark:bg-slate-700 p-4 rounded-lg`, children: [_jsx("h3", { className: "font-bold mb-3", children: cat.label }), _jsx("div", { className: "space-y-2 mb-3 max-h-32 overflow-y-auto", children: fishbone.categories[cat.key].map(factor => (_jsxs("div", { className: "bg-white dark:bg-slate-600 p-2 rounded flex justify-between items-start text-sm", children: [_jsx("span", { className: "flex-1", children: factor.name }), _jsx("button", { onClick: () => deleteFactor(cat.key, factor.id), className: "ml-2 text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 14 }) })] }, factor.id))) }), _jsxs("div", { className: "flex gap-1", children: [_jsx("input", { type: "text", placeholder: "Add factor...", value: inputs[cat.key], onChange: (e) => setInputs({ ...inputs, [cat.key]: e.target.value }), onKeyPress: (e) => e.key === 'Enter' && addFactor(cat.key), className: "flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-600 dark:border-slate-500" }), _jsx("button", { onClick: () => addFactor(cat.key), className: "bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs", children: "+" })] })] }, cat.key))) }), _jsx("div", { className: "bg-slate-50 dark:bg-slate-800 p-6 rounded-lg overflow-x-auto", children: _jsxs("svg", { viewBox: "0 0 1000 300", className: "w-full min-h-48", children: [_jsx("line", { x1: "100", y1: "150", x2: "900", y2: "150", stroke: "#4F46E5", strokeWidth: "3" }), _jsx("polygon", { points: "900,150 880,140 880,160", fill: "#4F46E5" }), _jsxs("text", { x: "700", y: "170", fontSize: "12", fill: "#666", className: "dark:fill-gray-300", children: [fishbone.problem.substring(0, 30), "..."] }), [
                            { y: 80, label: 'People' },
                            { y: 220, label: 'Process' }
                        ].map((rib, idx) => (_jsxs("g", { children: [_jsx("line", { x1: "700", y1: "150", x2: "700", y2: rib.y, stroke: "#999", strokeWidth: "1" }), _jsx("text", { x: "710", y: rib.y + 5, fontSize: "11", fill: "#666", className: "dark:fill-gray-300", children: rib.label })] }, idx)))] }) })] }));
};
