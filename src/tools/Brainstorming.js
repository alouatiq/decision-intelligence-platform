import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
export const Brainstorming = ({ data = [], onChange }) => {
    const [ideas, setIdeas] = useState(data);
    const [newIdea, setNewIdea] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [categories, setCategories] = useState(['general', 'features', 'improvements', 'risks', 'opportunities']);
    const [newCategory, setNewCategory] = useState('');
    const [sortBy, setSortBy] = useState('recent');
    const addIdea = () => {
        if (newIdea.trim()) {
            const idea = {
                id: Date.now().toString(),
                text: newIdea,
                category: selectedCategory,
                timestamp: new Date()
            };
            const updated = [...ideas, idea];
            setIdeas(updated);
            onChange?.(updated);
            setNewIdea('');
        }
    };
    const deleteIdea = (id) => {
        const updated = ideas.filter(i => i.id !== id);
        setIdeas(updated);
        onChange?.(updated);
    };
    const addCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory)) {
            const updated = [...categories, newCategory];
            setCategories(updated);
            setNewCategory('');
        }
    };
    const getGroupedIdeas = () => {
        if (sortBy === 'category') {
            return categories.map(cat => ({
                group: cat,
                ideas: ideas.filter(i => i.category === cat)
            })).filter(g => g.ideas.length > 0);
        }
        else {
            return [{
                    group: 'All Ideas',
                    ideas: [...ideas].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                }];
        }
    };
    const groupedIdeas = getGroupedIdeas();
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "glass-effect p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Add Idea" }), _jsxs("div", { className: "space-y-3", children: [_jsx("textarea", { placeholder: "Describe your idea...", value: newIdea, onChange: (e) => setNewIdea(e.target.value), className: "w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-20" }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsx("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600", children: categories.map(cat => (_jsx("option", { value: cat, children: cat }, cat))) }), _jsx("input", { type: "text", placeholder: "New category...", value: newCategory, onChange: (e) => setNewCategory(e.target.value), className: "px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" }), _jsx("button", { onClick: addCategory, className: "bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm", children: "Add Category" })] }), _jsx("button", { onClick: addIdea, className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg", children: "Add Idea" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setSortBy('recent'), className: `px-4 py-2 rounded-lg ${sortBy === 'recent' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-slate-700'}`, children: "Recent" }), _jsx("button", { onClick: () => setSortBy('category'), className: `px-4 py-2 rounded-lg ${sortBy === 'category' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-slate-700'}`, children: "By Category" })] }), _jsx("div", { className: "space-y-4", children: groupedIdeas.map((group, idx) => (_jsxs("div", { children: [_jsxs("h3", { className: "font-bold text-lg mb-3 capitalize", children: [group.group, " (", group.ideas.length, ")"] }), _jsx("div", { className: "grid gap-3", children: group.ideas.map(idea => (_jsx("div", { className: "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 rounded-lg border-l-4 border-indigo-500", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm mb-2", children: idea.text }), _jsxs("div", { className: "flex gap-2 text-xs text-gray-600 dark:text-gray-400", children: [_jsx("span", { className: "bg-white dark:bg-slate-700 px-2 py-1 rounded capitalize", children: idea.category }), _jsx("span", { children: new Date(idea.timestamp).toLocaleDateString() })] })] }), _jsx("button", { onClick: () => deleteIdea(idea.id), className: "text-red-500 hover:text-red-700 ml-2", children: _jsx(Trash2, { size: 16 }) })] }) }, idea.id))) })] }, idx))) }), ideas.length === 0 && (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "No ideas yet. Start brainstorming!" }) }))] }));
};
