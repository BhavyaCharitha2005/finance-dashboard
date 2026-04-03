import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useStore } from '../../store/useStore';
import Card from '../ui/Card';

const BalanceTrendChart = () => {
  const { transactions } = useStore();

  // Group transactions by month and calculate running balance
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });

    if (!acc[month]) {
      acc[month] = { month, income: 0, expenses: 0 };
    }

    if (t.type === 'income') {
      acc[month].income += t.amount;
    } else {
      acc[month].expenses += t.amount;
    }

    return acc;
  }, {} as Record<string, { month: string; income: number; expenses: number }>);

  const chartData = Object.values(monthlyData).map((d) => ({
    month: d.month,
    balance: d.income - d.expenses,
    income: d.income,
    expenses: d.expenses,
  }));

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        📊 Monthly Balance Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`]}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
     }} 
/>
          
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5 }}
            name="Balance"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ fill: '#22c55e', r: 4 }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 4 }}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BalanceTrendChart;