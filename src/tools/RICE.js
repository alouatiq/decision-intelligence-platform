import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const RICEScoring = ({ data = [], onChange }) => {
    const [items, setItems] = useState(data);
    const [name, setName] = useState('');
    const addItem = () => {
        if (name.trim()) {
            const newItem = {
                id: Date.now().toString(),
                name,
                reach: 1,
                impact: 1,
                confidence: 50,
                effort: 1
            };
            const updated = [...items, newItem];
            setItems(updated);
            onChange?.(updated);
            setName('');
        }
    };
    const updateItem = (id, field, value) => {
        const updated = items.map(item => item.id === id ? { ...item, [field]: value } : item);
        setItems(updated);
        onChange?.(updated);
    };
    const deleteItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        onChange?.(updated);
    };
    const calculateScore = (item) => {
        return (item.reach * item.impact * (item.confidence / 100)) / item.effort;
    };
    const sortedItems = [...items].sort((a, b) => calculateScore(b) - calculateScore(a));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Add Item" }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "text", placeholder: "Item name...", value: name, onChange: (e) => setName(e.target.value), onKeyPress: (e) => e.key === 'Enter' && addItem(), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" }), _jsx("button", { onClick: addItem, className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg", children: "Add Item" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100 dark:bg-slate-700", children: [_jsx("th", { className: "px-4 py-2 text-left", children: "Item" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Reach" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Impact" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Confidence %" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Effort" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Score" }), _jsx("th", { className: "px-4 py-2" })] }) }), _jsx("tbody", { children: sortedItems.map((item) => (_jsxs("tr", { className: "border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700", children: [_jsx("td", { className: "px-4 py-2", children: item.name }), _jsx("td", { className: "px-4 py-2 text-center", children: _jsx("input", { type: "number", min: "1", max: "100", value: item.reach, onChange: (e) => updateItem(item.id, 'reach', Number(e.target.value)), className: "w-16 px-2 py-1 border rounded dark:bg-slate-700" }) }), _jsx("td", { className: "px-4 py-2 text-center", children: _jsxs("select", { value: item.impact, onChange: (e) => updateItem(item.id, 'impact', Number(e.target.value)), className: "px-2 py-1 border rounded dark:bg-slate-700", children: [_jsx("option", { value: "1", children: "1 (Low)" }), _jsx("option", { value: "2", children: "2 (Med)" }), _jsx("option", { value: "3", children: "3 (High)" })] }) }), _jsx("td", { className: "px-4 py-2 text-center", children: _jsx("input", { type: "number", min: "0", max: "100", value: item.confidence, onChange: (e) => updateItem(item.id, 'confidence', Number(e.target.value)), className: "w-16 px-2 py-1 border rounded dark:bg-slate-700" }) }), _jsx("td", { className: "px-4 py-2 text-center", children: _jsx("input", { type: "number", min: "1", max: "100", value: item.effort, onChange: (e) => updateItem(item.id, 'effort', Number(e.target.value)), className: "w-16 px-2 py-1 border rounded dark:bg-slate-700" }) }), _jsx("td", { className: "px-4 py-2 text-center font-bold text-indigo-600", children: calculateScore(item).toFixed(2) }), _jsx("td", { className: "px-4 py-2 text-center", children: _jsx("button", { onClick: () => deleteItem(item.id), className: "text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) }) })] }, item.id))) })] }) })] }));
};
