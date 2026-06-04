import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const MindMapping = ({ data = { id: '0', text: 'Central Idea', children: [] }, onChange }) => {
    const [mindMap, setMindMap] = useState(data);
    const [newBranchText, setNewBranchText] = useState('');
    const addMainBranch = () => {
        if (newBranchText.trim()) {
            const updated = {
                ...mindMap,
                children: [...mindMap.children, {
                        id: Date.now().toString(),
                        text: newBranchText,
                        children: []
                    }]
            };
            setMindMap(updated);
            onChange?.(updated);
            setNewBranchText('');
        }
    };
    const updateNodeText = (nodeId, text, nodes = [mindMap]) => {
        const result = nodes.map(node => {
            if (node.id === nodeId) {
                return { ...node, text };
            }
            if (node.children.length > 0) {
                return { ...node, children: node.children.map(c => updateNodeText(nodeId, text, [c])) };
            }
            return node;
        })[0];
        return result || mindMap;
    };
    const addSubNode = (parentId, text) => {
        const addToNode = (node) => {
            if (node.id === parentId) {
                return {
                    ...node,
                    children: [...node.children, {
                            id: Date.now().toString(),
                            text,
                            children: []
                        }]
                };
            }
            if (node.children.length > 0) {
                return {
                    ...node,
                    children: node.children.map(child => addToNode(child))
                };
            }
            return node;
        };
        const updated = addToNode(mindMap);
        setMindMap(updated);
        onChange?.(updated);
    };
    const deleteNode = (nodeId) => {
        const removeFromNode = (node) => ({
            ...node,
            children: node.children
                .filter(child => child.id !== nodeId)
                .map(child => removeFromNode(child))
        });
        const updated = removeFromNode(mindMap);
        setMindMap(updated);
        onChange?.(updated);
        return updated;
    };
    const MindMapNodeComponent = ({ node, level }) => {
        const [childText, setChildText] = useState('');
        const colors = ['bg-indigo-50', 'bg-blue-50', 'bg-purple-50', 'bg-pink-50'];
        return (_jsxs("div", { className: "ml-4 mt-4", children: [_jsxs("div", { className: `${colors[level % colors.length]} dark:bg-slate-700 p-3 rounded-lg inline-block`, children: [_jsx("p", { className: "font-semibold mb-2", children: node.text }), level < 2 && (_jsxs("div", { className: "flex gap-2 text-xs", children: [_jsx("input", { type: "text", placeholder: "Add sub...", value: childText, onChange: (e) => setChildText(e.target.value), onKeyPress: (e) => {
                                        if (e.key === 'Enter') {
                                            addSubNode(node.id, childText);
                                            setChildText('');
                                        }
                                    }, className: "px-2 py-1 border rounded dark:bg-slate-600" }), _jsx("button", { onClick: () => {
                                        addSubNode(node.id, childText);
                                        setChildText('');
                                    }, className: "bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded", children: "+" }), level > 0 && (_jsx("button", { onClick: () => deleteNode(node.id), className: "text-red-500 hover:text-red-700", children: _jsx(Trash2, { size: 14 }) }))] }))] }), _jsx("div", { className: "border-l-2 border-gray-300 dark:border-gray-600", children: node.children.map(child => (_jsx(MindMapNodeComponent, { node: child, level: level + 1 }, child.id))) })] }));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "text-sm font-medium", children: "Central Idea" }), _jsx("input", { type: "text", value: mindMap.text, onChange: (e) => {
                                    const updated = { ...mindMap, text: e.target.value };
                                    setMindMap(updated);
                                    onChange?.(updated);
                                }, className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 mt-1" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Add main branch...", value: newBranchText, onChange: (e) => setNewBranchText(e.target.value), onKeyPress: (e) => e.key === 'Enter' && addMainBranch(), className: "flex-1 px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" }), _jsx("button", { onClick: addMainBranch, className: "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg", children: "Add" })] })] }), _jsx("div", { className: "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-lg overflow-x-auto", children: _jsx("div", { className: "inline-block", children: _jsx(MindMapNodeComponent, { node: mindMap, level: 0 }) }) })] }));
};
