import { useStore } from '../../store/useStore';
import Card from '../ui/Card';

const SummaryCards = () => {
  const { getTotalBalance, getTotalIncome, getTotalExpenses } = useStore();

  const balance = getTotalBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();

  const cards = [
    {
      title: 'Total Balance',
      value: balance,
      icon: '💰',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Income',
      value: income,
      icon: '📈',
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Expenses',
      value: expenses,
      icon: '📉',
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card key={card.title} className={card.bg}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <p className={`text-3xl font-bold mt-1 ${card.textColor}`}>
                ₹{card.value.toLocaleString('en-IN')}
              </p>
            </div>
            <div className={`${card.iconBg} p-4 rounded-full text-2xl`}>
              {card.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;