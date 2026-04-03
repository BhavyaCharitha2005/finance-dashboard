import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import type { Transaction, Category, TransactionType } from '../../types';

const categories: Category[] = [
  'Food',
  'Rent',
  'Salary',
  'Transport',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Utilities',
  'Freelance',
  'Other',
];

interface TransactionModalProps {
  transaction?: Transaction;
  onClose: () => void;
}

const TransactionModal = ({ transaction, onClose }: TransactionModalProps) => {
  const { addTransaction, editTransaction } = useStore();

  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food' as Category,
    type: 'expense' as TransactionType,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: transaction.amount.toString(),
        category: transaction.category,
        type: transaction.type,
        date: transaction.date,
      });
    }
  }, [transaction]);

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.date) return;

    const data: Transaction = {
      id: transaction ? transaction.id : Date.now().toString(),
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    };

    if (transaction) {
      editTransaction(data);
    } else {
      addTransaction(data);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            {transaction ? '✏️ Edit Transaction' : '➕ Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {transaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;