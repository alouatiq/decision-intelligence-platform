import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const DecisionMatrix = ({ data = { criteria: [], alternatives: [] }, onChange }) => {
    const [criteria, setCriteria] = useState(data.criteria);
    const [alternatives, setAlternatives] = useState(data.alternatives);
    const [newCriteria, setNewCriteria] = useState('');
    const [newAlternative, setNewAlternative] = useState('');
    const addCriteria = () => {
        if (newCriteria.trim()) {
            const updated = [...criteria, newCriteria];
            setCriteria(updated);
            onChange?.({ criteria: updated, alternatives });
            setNewCriteria('');
        }
    };
    const addAlternative = () => {
        if (newAlternative.trim()) {
            const scores = {};
            criteria.forEach(c => { scores[c] = 5; });
            const alt = {
                id: Date.now().toString(),
                name: newAlternative,
                scores
            };
            const updated = [...alternatives, alt];
            setAlternatives(updated);
            onChange?.({ criteria, alternatives: updated });
            setNewAlternative('');
        }
    };
    const updateScore = (altId, criterion, score) => {
        const updated = alternatives.map(alt => alt.id === altId ? { ...alt, scores: { ...alt.scores, [criterion]: score } } : alt);
        setAlternatives(updated);
        onChange?.({ criteria, alternatives: updated });
    };
    const deleteAlternative = (id) => {
        const updated = alternatives.filter(a => a.id !== id);
        setAlternatives(updated);
        onChange?.({ criteria, alternatives: updated });
    };
    const deleteCriteria = (index) => {
        const updated = criteria.filter((_, i) => i !== index);
        setCriteria(updated);
        onChange?.({ criteria: updated, alternatives });
    };
    const getAltScore = (alt) => Object.values(alt.scores).reduce((a, b) => a + b, 0) / criteria.length;
    const sortedAlts = [...alternatives].sort((a, b) => getAltScore(b) - getAltScore(a));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Add Criteria" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Criteria name...", value: newCriteria, onChange: (e) => setNewCriteria(e.target.value), onKeyPress: (e) => e.key === 'Enter' && addCriteria(), className: "flex-1 px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" }), _jsx("button", { onClick: addCriteria, className: "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg", children: "Add" })] }), criteria.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: criteria.map((crit, idx) => (_jsxs("div", { className: "bg-white dark:bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm", children: [crit, _jsx("button", { onClick: () => deleteCriteria(idx), className: "text-red-500 hover:text-red-700", children: "\u00D7" })] }, idx))) }))] }), criteria.length > 0 && (_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Add Alternative" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Alternative name...", value: newAlternative, onChange: (e) => setNewAlternative(e.target.value), onKeyPress: (e) => e.key === 'Enter' && addAlternative(), className: "flex-1 px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" }), _jsx("button", { onClick: addAlternative, className: "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg", children: "Add" })] })] })), alternatives.length > 0 && criteria.length > 0 && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100 dark:bg-slate-700", children: [_jsx("th", { className: "px-4 py-2 text-left", children: "Alternative" }), criteria.map((crit, idx) => (_jsx("th", { className: "px-4 py-2 text-center", children: crit }, idx))), _jsx("th", { className: "px-4 py-2 text-center", children: "Avg Score" }), _jsx("th", { className: "px-4 py-2" })] }) }), _jsx("tbody", { children: sortedAlts.map((alt) => (_jsxs("tr", { className: "border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700", children: [_jsx("td", { className: "px-4 py-2 font-medium", children: alt.name }), criteria.map((crit) => (_jsx("td", { className: "px-4 py-2 text-center", children: _jsx("input", { type: "number", min: "1", max: "10", value: alt.scores[crit] || 5, onChange: (e) => updateScore(alt.id, crit, Number(e.target.value)), className: "w-12 px-2 py-1 border rounded text-center dark:bg-slate-700" }) }, crit))), _jsx("td", { className: "px-4 py-2 text-center font-bold text-indigo-600", children: getAltScore(alt).toFixed(1) }), _jsx("td", { className: "px-4 py-2 text-center", children: _jsx("button", { onClick: () => deleteAlternative(alt.id), className: "text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) }) })] }, alt.id))) })] }) }))] }));
};
