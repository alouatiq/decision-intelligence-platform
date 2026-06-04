import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface CostBenefitItem {
  id: string
  description: string
  cost: number
  benefit: number
  timeframe: string
}

interface CostBenefitProps {
  data?: CostBenefitItem[]
  onChange?: (data: CostBenefitItem[]) => void
}

export const CostBenefitAnalysis: React.FC<CostBenefitProps> = ({ data = [], onChange }) => {
  const [items, setItems] = useState<CostBenefitItem[]>(data)
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState(0)
  const [benefit, setBenefit] = useState(0)
  const [timeframe, setTimeframe] = useState('1 year')

  const addItem = () => {
    if (description.trim() && cost > 0) {
      const newItem: CostBenefitItem = {
        id: Date.now().toString(),
        description,
        cost,
        benefit,
        timeframe
      }
      const updated = [...items, newItem]
      setItems(updated)
      onChange?.(updated)
      setDescription('')
      setCost(0)
      setBenefit(0)
    }
  }

  const deleteItem = (id: string) => {
    const updated = items.filter(i => i.id !== id)
    setItems(updated)
    onChange?.(updated)
  }

  const totalCost = items.reduce((sum, item) => sum + item.cost, 0)
  const totalBenefit = items.reduce((sum, item) => sum + item.benefit, 0)
  const netBenefit = totalBenefit - totalCost
  const roi = totalCost > 0 ? ((netBenefit / totalCost) * 100).toFixed(1) : 0

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="glass-effect p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Add Item</h3>
        <div className="space-y-3">
          <textarea
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 h-16"
          />
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Cost ($)</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Benefit ($)</label>
              <input
                type="number"
                value={benefit}
                onChange={(e) => setBenefit(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Timeframe</label>
              <input
                type="text"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
              />
            </div>
          </div>
          <button
            onClick={addItem}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Cost</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalCost.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Benefit</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalBenefit.toLocaleString()}</p>
        </div>
        <div className={`${netBenefit >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20'} p-4 rounded-lg text-center`}>
          <p className="text-sm text-gray-600 dark:text-gray-400">Net Benefit</p>
          <p className={`text-2xl font-bold ${netBenefit >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
            ${netBenefit.toLocaleString()}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{roi}%</p>
        </div>
      </div>

      {/* Items List */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-700">
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-right">Cost</th>
              <th className="px-4 py-2 text-right">Benefit</th>
              <th className="px-4 py-2 text-center">Net</th>
              <th className="px-4 py-2 text-center">Timeframe</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2 text-right text-red-600">-${item.cost}</td>
                <td className="px-4 py-2 text-right text-green-600">+${item.benefit}</td>
                <td className="px-4 py-2 text-center font-bold">${item.benefit - item.cost}</td>
                <td className="px-4 py-2 text-center text-sm">{item.timeframe}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
