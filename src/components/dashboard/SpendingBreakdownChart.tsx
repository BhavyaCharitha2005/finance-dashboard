import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useStore } from '../../store/useStore';
import Card from '../ui/Card';

const COLORS = [
  '#3b82f6',
  '#22c55e',
  '#ef4444',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
];

const SpendingBreakdownChart = () => {
  const { transactions } = useStore();

  // Group expenses by category
  const categoryData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { name: t.category, value: 0 };
      }
      acc[t.category].value += t.amount;
      return acc;
    }, {} as Record<string, { name: string; value: number }>);

  const chartData = Object.values(categoryData);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        🍩 Spending Breakdown
      </h2>
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-400">
          No expense data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`]}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default SpendingBreakdownChart;