import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
const riskLevels = {
    low: { low: 'bg-green-100', medium: 'bg-yellow-100', high: 'bg-orange-100' },
    medium: { low: 'bg-yellow-100', medium: 'bg-orange-100', high: 'bg-red-100' },
    high: { low: 'bg-orange-100', medium: 'bg-red-100', high: 'bg-red-200' }
};
export const RiskMatrix = ({ data = [], onChange }) => {
    const [risks, setRisks] = useState(data);
    const [description, setDescription] = useState('');
    const [likelihood, setLikelihood] = useState('medium');
    const [impact, setImpact] = useState('medium');
    const [mitigation, setMitigation] = useState('');
    const addRisk = () => {
        if (description.trim()) {
            const newRisk = {
                id: Date.now().toString(),
                description,
                likelihood,
                impact,
                mitigation
            };
            const updated = [...risks, newRisk];
            setRisks(updated);
            onChange?.(updated);
            setDescription('');
            setMitigation('');
        }
    };
    const deleteRisk = (id) => {
        const updated = risks.filter(r => r.id !== id);
        setRisks(updated);
        onChange?.(updated);
    };
    const levels = ['low', 'medium', 'high'];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Add Risk" }), _jsxs("div", { className: "space-y-3", children: [_jsx("textarea", { placeholder: "Risk description...", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-16" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("select", { value: likelihood, onChange: (e) => setLikelihood(e.target.value), className: "px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600", children: [_jsx("option", { value: "low", children: "Low Likelihood" }), _jsx("option", { value: "medium", children: "Medium Likelihood" }), _jsx("option", { value: "high", children: "High Likelihood" })] }), _jsxs("select", { value: impact, onChange: (e) => setImpact(e.target.value), className: "px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600", children: [_jsx("option", { value: "low", children: "Low Impact" }), _jsx("option", { value: "medium", children: "Medium Impact" }), _jsx("option", { value: "high", children: "High Impact" })] })] }), _jsx("textarea", { placeholder: "Mitigation strategy...", value: mitigation, onChange: (e) => setMitigation(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-16" }), _jsx("button", { onClick: addRisk, className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg", children: "Add Risk" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full border-collapse text-sm", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "p-2 border" }), levels.map(l => (_jsx("th", { className: "p-2 border capitalize font-bold", children: l }, l)))] }) }), _jsx("tbody", { children: levels.map(imp => (_jsxs("tr", { children: [_jsx("th", { className: "p-2 border capitalize font-bold text-right", children: imp }), levels.map(like => {
                                        const cellRisks = risks.filter(r => r.impact === imp && r.likelihood === like);
                                        return (_jsx("td", { className: `border p-2 min-h-20 ${riskLevels[imp][like]}`, children: _jsx("div", { className: "space-y-1", children: cellRisks.map(risk => (_jsx("div", { className: "bg-white rounded p-1 text-xs", children: _jsx("p", { className: "font-medium", children: risk.description }) }, risk.id))) }) }, `${imp}-${like}`));
                                    })] }, imp))) })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-semibold", children: "Risk List" }), risks.map(risk => (_jsxs("div", { className: "bg-slate-100 dark:bg-slate-700 p-3 rounded", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: risk.description }), _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400 capitalize", children: [risk.likelihood, " likelihood, ", risk.impact, " impact"] })] }), _jsx("button", { onClick: () => deleteRisk(risk.id), className: "text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) })] }), risk.mitigation && (_jsxs("p", { className: "text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded", children: [_jsx("span", { className: "font-medium", children: "Mitigation:" }), " ", risk.mitigation] }))] }, risk.id)))] })] }));
};
