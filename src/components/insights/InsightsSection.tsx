import { useStore } from '../../store/useStore';
import Card from '../ui/Card';

const InsightsSection = () => {
  const { transactions } = useStore();

  // Highest spending category
  const categoryTotals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Monthly comparison
  const monthlyTotals = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expense += t.amount;
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const months = Object.keys(monthlyTotals);
  const lastMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];

  const lastMonthExpense = monthlyTotals[lastMonth]?.expense || 0;
  const prevMonthExpense = monthlyTotals[prevMonth]?.expense || 0;
  const expenseDiff = lastMonthExpense - prevMonthExpense;
  const expenseChange =
    prevMonthExpense > 0
      ? ((expenseDiff / prevMonthExpense) * 100).toFixed(1)
      : '0';

  // Biggest single expense
  const biggestExpense = transactions
    .filter((t) => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];

  // Total income and expenses
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Savings rate
  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
      : '0';

  // Income vs Expense ratio
  const ratio =
    totalExpense > 0 ? (totalIncome / totalExpense).toFixed(2) : '0';

  const insights = [
    {
      title: 'Highest Spending Category',
      value: highestCategory ? highestCategory[0] : 'N/A',
      subValue: highestCategory
        ? `₹${highestCategory[1].toLocaleString('en-IN')}`
        : '',
      icon: '🏆',
      bg: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      description: 'Your biggest spending area',
    },
    {
      title: 'Monthly Expense Change',
      value:
        expenseDiff > 0
          ? `+${expenseChange}%`
          : `${expenseChange}%`,
      subValue: `${lastMonth} vs ${prevMonth}`,
      icon: expenseDiff > 0 ? '📈' : '📉',
      bg: expenseDiff > 0 ? 'bg-red-50' : 'bg-green-50',
      iconBg: expenseDiff > 0 ? 'bg-red-100' : 'bg-green-100',
      textColor: expenseDiff > 0 ? 'text-red-600' : 'text-green-600',
      description:
        expenseDiff > 0
          ? 'Spending increased this month'
          : 'Spending decreased this month',
    },
    {
      title: 'Biggest Single Expense',
      value: biggestExpense
        ? `₹${biggestExpense.amount.toLocaleString('en-IN')}`
        : 'N/A',
      subValue: biggestExpense ? biggestExpense.description : '',
      icon: '💸',
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      textColor: 'text-red-600',
      description: 'Your largest single transaction',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      subValue: `₹${(totalIncome - totalExpense).toLocaleString('en-IN')} saved`,
      icon: '🎯',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-600',
      description: 'Percentage of income saved',
    },
    {
      title: 'Income vs Expense Ratio',
      value: `${ratio}x`,
      subValue: 'Income to expense ratio',
      icon: '⚖️',
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      textColor: 'text-purple-600',
      description:
        Number(ratio) >= 1
          ? 'You earn more than you spend'
          : 'You spend more than you earn',
    },
    {
      title: 'Total Transactions',
      value: transactions.length.toString(),
      subValue: `${transactions.filter((t) => t.type === 'income').length} income · ${transactions.filter((t) => t.type === 'expense').length} expenses`,
      icon: '📊',
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      textColor: 'text-green-600',
      description: 'Total recorded transactions',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight) => (
        <Card key={insight.title} className={insight.bg}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">
                {insight.title}
              </p>
              <p className={`text-3xl font-bold mt-2 ${insight.textColor}`}>
                {insight.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{insight.subValue}</p>
              <p className="text-xs text-gray-400 mt-2">{insight.description}</p>
            </div>
            <div className={`${insight.iconBg} p-3 rounded-full text-2xl ml-4`}>
              {insight.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InsightsSection;