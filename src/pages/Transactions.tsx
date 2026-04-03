import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';

const Transactions = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and explore your transactions
        </p>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Transaction List */}
      <TransactionList />
    </div>
  );
};

export default Transactions;