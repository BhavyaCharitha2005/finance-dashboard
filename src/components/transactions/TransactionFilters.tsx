import { useStore } from '../../store/useStore';
import type { Category, TransactionType } from '../../types';

const categories = [
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

const TransactionFilters = () => {
  const {
    filters,
    setSearch,
    setTypeFilter,
    setCategoryFilter,
    setSortBy,
    setSortOrder,
    resetFilters,
  } = useStore();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="flex-1 min-w-48">
          <input
            type="text"
            placeholder="🔍 Search transactions..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => setTypeFilter(e.target.value as TransactionType | 'all')}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        {/* Sort Order */}
        <select
          value={filters.sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;