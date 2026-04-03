import { create } from 'zustand';
import type { Transaction, Role, FilterState, Category, TransactionType } from '../types';
import { mockTransactions } from '../data/mockData';

interface StoreState {
  // Data
  transactions: Transaction[];
  role: Role;
  filters: FilterState;

  // Role Actions
  setRole: (role: Role) => void;

  // Transaction Actions
  addTransaction: (transaction: Transaction) => void;
  editTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;

  // Filter Actions
  setSearch: (search: string) => void;
  setTypeFilter: (type: TransactionType | 'all') => void;
  setCategoryFilter: (category: Category | 'all') => void;
  setSortBy: (sortBy: 'date' | 'amount') => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  resetFilters: () => void;

  // Computed
  getFilteredTransactions: () => Transaction[];
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
}

const defaultFilters: FilterState = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
};

export const useStore = create<StoreState>((set, get) => ({
  // Initial Data
  transactions: mockTransactions,
  role: 'viewer',
  filters: defaultFilters,

  // Role Actions
  setRole: (role) => set({ role }),

  // Transaction Actions
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  editTransaction: (transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  // Filter Actions
  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),

  setTypeFilter: (type) =>
    set((state) => ({ filters: { ...state.filters, type } })),

  setCategoryFilter: (category) =>
    set((state) => ({ filters: { ...state.filters, category } })),

  setSortBy: (sortBy) =>
    set((state) => ({ filters: { ...state.filters, sortBy } })),

  setSortOrder: (sortOrder) =>
    set((state) => ({ filters: { ...state.filters, sortOrder } })),

  resetFilters: () => set({ filters: defaultFilters }),

  // Computed Functions
  getFilteredTransactions: () => {
    const { transactions, filters } = get();
    let filtered = [...transactions];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter((t) =>
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    // Sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return filters.sortOrder === 'desc'
          ? b.amount - a.amount
          : a.amount - b.amount;
      }
    });

    return filtered;
  },

  // Summary Calculations
  getTotalIncome: () => {
    const { transactions } = get();
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getTotalExpenses: () => {
    const { transactions } = get();
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getTotalBalance: () => {
    const { getTotalIncome, getTotalExpenses } = get();
    return getTotalIncome() - getTotalExpenses();
  },
}));