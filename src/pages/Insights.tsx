import InsightsSection from '../components/insights/InsightsSection';

const Insights = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Insights</h1>
        <p className="text-sm text-gray-500 mt-1">
          Smart observations from your financial data
        </p>
      </div>

      {/* Insights Cards */}
      <InsightsSection />
    </div>
  );
};

export default Insights;