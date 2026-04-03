export type Role = 'admin' | 'viewer';

export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food'
  | 'Rent'
  | 'Salary'
  | 'Transport'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Utilities'
  | 'Freelance'
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export interface FilterState {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
}