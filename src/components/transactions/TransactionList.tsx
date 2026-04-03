import { useState } from 'react';
import { useStore } from '../../store/useStore';
import TransactionModal from './TransactionModal';
import type { Transaction } from '../../types';

const categoryEmojis: Record<string, string> = {
  Food: '🍔',
  Rent: '🏠',
  Salary: '💼',
  Transport: '🚗',
  Entertainment: '🎬',
  Healthcare: '🏥',
  Shopping: '🛍️',
  Utilities: '💡',
  Freelance: '💻',
  Other: '📦',
};

const TransactionList = () => {
  const { getFilteredTransactions, role, deleteTransaction } = useStore();
  const transactions = getFilteredTransactions();
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingTransaction(undefined);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingTransaction(undefined);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Transactions
          </h2>
          <p className="text-sm text-gray-400">
            {transactions.length} transaction
            {transactions.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Add Button - Admin Only */}
        {role === 'admin' && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            ➕ Add Transaction
          </button>
        )}
      </div>

      {/* Empty State */}
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-medium">No transactions found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                {role === 'admin' && (
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  {/* Description */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {t.description}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{categoryEmojis[t.category] || '📦'}</span>
                      {t.category}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">
                      {new Date(t.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </td>

                  {/* Type Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        t.type === 'income'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {t.type === 'income' ? '📈 Income' : '📉 Expense'}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    <p
                      className={`text-sm font-bold ${
                        t.type === 'income'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '-'}₹
                      {t.amount.toLocaleString('en-IN')}
                    </p>
                  </td>

                  {/* Actions - Admin Only */}
                  {role === 'admin' && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(t)}
                          className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default TransactionList;