import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
export const ToolPage = ({ toolId, sessionId, onBack }) => {
    const toolComponents = {};
    // Dynamically import tools
    const [toolData, setToolData] = useState({});
    const toolConfigs = {
        eisenhower: { name: 'Eisenhower Matrix', component: 'EisenhowerMatrix' },
        moscow: { name: 'MoSCoW Method', component: 'MoSCoWMethod' },
        rice: { name: 'RICE Scoring', component: 'RICEScoring' },
        swot: { name: 'SWOT Analysis', component: 'SWOTAnalysis' },
        pestle: { name: 'PESTLE Analysis', component: 'PESTLEAnalysis' },
        risk: { name: 'Risk Matrix', component: 'RiskMatrix' },
        '5whys': { name: '5 Whys', component: 'FiveWhys' },
        fishbone: { name: 'Fishbone Diagram', component: 'FishboneDiagram' },
        'decision-matrix': { name: 'Decision Matrix', component: 'DecisionMatrix' },
        'cost-benefit': { name: 'Cost-Benefit Analysis', component: 'CostBenefitAnalysis' },
        'mind-map': { name: 'Mind Mapping', component: 'MindMapping' },
        '6hats': { name: 'Six Thinking Hats', component: 'SixThinkingHats' },
        brainstorm: { name: 'Brainstorming', component: 'Brainstorming' },
        porter: { name: "Porter's Five Forces", component: 'PortersFiveForces' }
    };
    const toolConfig = toolConfigs[toolId];
    if (!toolConfig) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-red-600", children: "Tool not found" }), _jsx("button", { onClick: onBack, className: "mt-4 text-indigo-600 hover:text-indigo-700", children: "Go Back" })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("button", { onClick: onBack, className: "flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium", children: [_jsx(ArrowLeft, { size: 20 }), "Back to Dashboard"] }), _jsxs("div", { className: "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: toolConfig.name }), _jsxs("p", { className: "text-gray-600 dark:text-gray-400", children: ["Session ID: ", sessionId.substring(0, 8), "... (Real-time collaboration enabled)"] })] }), _jsx("div", { className: "bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700", children: _jsxs("div", { className: "text-center py-12", children: [_jsxs("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: [toolConfig.name, " tool interface will be loaded here"] }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-500", children: "Dynamic tool loading system ready for component injection" })] }) })] }));
};
