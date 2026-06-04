import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const CostBenefitAnalysis = ({ data = [], onChange }) => {
    const [items, setItems] = useState(data);
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);
    const [benefit, setBenefit] = useState(0);
    const [timeframe, setTimeframe] = useState('1 year');
    const addItem = () => {
        if (description.trim() && cost > 0) {
            const newItem = {
                id: Date.now().toString(),
                description,
                cost,
                benefit,
                timeframe
            };
            const updated = [...items, newItem];
            setItems(updated);
            onChange?.(updated);
            setDescription('');
            setCost(0);
            setBenefit(0);
        }
    };
    const deleteItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        onChange?.(updated);
    };
    const totalCost = items.reduce((sum, item) => sum + item.cost, 0);
    const totalBenefit = items.reduce((sum, item) => sum + item.benefit, 0);
    const netBenefit = totalBenefit - totalCost;
    const roi = totalCost > 0 ? ((netBenefit / totalCost) * 100).toFixed(1) : 0;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Add Item" }), _jsxs("div", { className: "space-y-3", children: [_jsx("textarea", { placeholder: "Description...", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-16" }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Cost ($)" }), _jsx("input", { type: "number", value: cost, onChange: (e) => setCost(Number(e.target.value)), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Benefit ($)" }), _jsx("input", { type: "number", value: benefit, onChange: (e) => setBenefit(Number(e.target.value)), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Timeframe" }), _jsx("input", { type: "text", value: timeframe, onChange: (e) => setTimeframe(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" })] })] }), _jsx("button", { onClick: addItem, className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg", children: "Add Item" })] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center", children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Total Cost" }), _jsxs("p", { className: "text-2xl font-bold text-red-600 dark:text-red-400", children: ["$", totalCost.toLocaleString()] })] }), _jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center", children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Total Benefit" }), _jsxs("p", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: ["$", totalBenefit.toLocaleString()] })] }), _jsxs("div", { className: `${netBenefit >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20'} p-4 rounded-lg text-center`, children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Net Benefit" }), _jsxs("p", { className: `text-2xl font-bold ${netBenefit >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`, children: ["$", netBenefit.toLocaleString()] })] }), _jsxs("div", { className: "bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center", children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "ROI" }), _jsxs("p", { className: "text-2xl font-bold text-purple-600 dark:text-purple-400", children: [roi, "%"] })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100 dark:bg-slate-700", children: [_jsx("th", { className: "px-4 py-2 text-left", children: "Description" }), _jsx("th", { className: "px-4 py-2 text-right", children: "Cost" }), _jsx("th", { className: "px-4 py-2 text-right", children: "Benefit" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Net" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Timeframe" }), _jsx("th", { className: "px-4 py-2" })] }) }), _jsx("tbody", { children: items.map((item) => (_jsxs("tr", { className: "border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700", children: [_jsx("td", { className: "px-4 py-2", children: item.description }), _jsxs("td", { className: "px-4 py-2 text-right text-red-600", children: ["-$", item.cost] }), _jsxs("td", { className: "px-4 py-2 text-right text-green-600", children: ["+$", item.benefit] }), _jsxs("td", { className: "px-4 py-2 text-center font-bold", children: ["$", item.benefit - item.cost] }), _jsx("td", { className: "px-4 py-2 text-center text-sm", children: item.timeframe }), _jsx("td", { className: "px-4 py-2 text-center", children: _jsx("button", { onClick: () => deleteItem(item.id), className: "text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) }) })] }, item.id))) })] }) })] }));
};
