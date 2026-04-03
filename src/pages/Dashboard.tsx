import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingBreakdownChart from '../components/dashboard/SpendingBreakdownChart';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your financial overview at a glance
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
    </div>
  );
};

export default Dashboard;