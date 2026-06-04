import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const defaultData = {
    supplierPower: [],
    buyerPower: [],
    substitutes: [],
    newEntrants: [],
    competition: []
};
export const PortersFiveForces = ({ data = defaultData, onChange }) => {
    const [forces, setForces] = useState(data);
    const [inputs, setInputs] = useState({
        supplierPower: '',
        buyerPower: '',
        substitutes: '',
        newEntrants: '',
        competition: ''
    });
    const addForce = (key, threat) => {
        if (threat.trim()) {
            const updated = {
                ...forces,
                [key]: [...forces[key], { threat, intensity: 3 }]
            };
            setForces(updated);
            onChange?.(updated);
            setInputs({ ...inputs, [key]: '' });
        }
    };
    const updateIntensity = (key, index, intensity) => {
        const updated = {
            ...forces,
            [key]: forces[key].map((f, i) => i === index ? { ...f, intensity } : f)
        };
        setForces(updated);
        onChange?.(updated);
    };
    const deleteForce = (key, index) => {
        const updated = {
            ...forces,
            [key]: forces[key].filter((_, i) => i !== index)
        };
        setForces(updated);
        onChange?.(updated);
    };
    const forceCategories = [
        { key: 'supplierPower', label: 'Supplier Power', color: 'bg-blue-50 dark:bg-blue-900/20' },
        { key: 'buyerPower', label: 'Buyer Power', color: 'bg-green-50 dark:bg-green-900/20' },
        { key: 'substitutes', label: 'Threat of Substitutes', color: 'bg-purple-50 dark:bg-purple-900/20' },
        { key: 'newEntrants', label: 'Threat of New Entrants', color: 'bg-orange-50 dark:bg-orange-900/20' },
        { key: 'competition', label: 'Competitive Rivalry', color: 'bg-red-50 dark:bg-red-900/20' }
    ];
    const getAverageIntensity = (key) => {
        const items = forces[key];
        if (items.length === 0)
            return 0;
        return (items.reduce((sum, f) => sum + f.intensity, 0) / items.length).toFixed(1);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: forceCategories.map((cat) => (_jsxs("div", { className: `${cat.color} p-4 rounded-lg`, children: [_jsx("h3", { className: "font-bold mb-2", children: cat.label }), _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-3", children: ["Avg Intensity: ", getAverageIntensity(cat.key), "/5"] }), _jsx("div", { className: "space-y-2 mb-3 max-h-40 overflow-y-auto", children: forces[cat.key].map((force, idx) => (_jsxs("div", { className: "bg-white dark:bg-slate-700 p-2 rounded text-xs", children: [_jsx("p", { className: "font-medium", children: force.threat }), _jsxs("div", { className: "flex items-center justify-between mt-1", children: [_jsxs("select", { value: force.intensity, onChange: (e) => updateIntensity(cat.key, idx, Number(e.target.value)), className: "text-xs px-1 py-0.5 border rounded dark:bg-slate-600", children: [_jsx("option", { value: "1", children: "Low (1)" }), _jsx("option", { value: "2", children: "Low-Med (2)" }), _jsx("option", { value: "3", children: "Medium (3)" }), _jsx("option", { value: "4", children: "Med-High (4)" }), _jsx("option", { value: "5", children: "High (5)" })] }), _jsx("button", { onClick: () => deleteForce(cat.key, idx), className: "text-red-500 hover:text-red-700", children: "\u2715" })] })] }, idx))) }), _jsxs("div", { className: "flex gap-1", children: [_jsx("input", { type: "text", placeholder: "Add threat...", value: inputs[cat.key], onChange: (e) => setInputs({ ...inputs, [cat.key]: e.target.value }), onKeyPress: (e) => e.key === 'Enter' && addForce(cat.key, inputs[cat.key]), className: "flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-700 dark:border-slate-600" }), _jsx("button", { onClick: () => addForce(cat.key, inputs[cat.key]), className: "bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs", children: "+" })] })] }, cat.key))) }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800 p-4 rounded-lg", children: [_jsx("h3", { className: "font-bold mb-4", children: "Industry Attractiveness" }), _jsx("div", { className: "space-y-3", children: forceCategories.map((cat) => {
                            const avgStr = getAverageIntensity(cat.key);
                            const avg = typeof avgStr === 'string' ? parseFloat(avgStr) : avgStr;
                            return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-32 text-sm font-medium", children: cat.label }), _jsx("div", { className: "flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-6 overflow-hidden", children: _jsx("div", { className: "h-full bg-gradient-to-r from-green-500 to-red-500", style: { width: `${(avg / 5) * 100}%` } }) }), _jsxs("div", { className: "w-8 text-right", children: [avg.toFixed(1), "/5"] })] }, cat.key));
                        }) })] })] }));
};
