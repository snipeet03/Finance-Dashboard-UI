import { useApp } from '../context/AppContext';
import { getSummary, getMonthlyTrend, getCategorySpending } from '../data/mockData';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingDonutChart from '../components/dashboard/SpendingDonutChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';

export default function Dashboard() {
  const { state } = useApp();
  const { transactions } = state;

  const summary      = getSummary(transactions);
  const monthlyTrend = getMonthlyTrend(transactions);
  const categoryData = getCategorySpending(transactions);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary cards */}
      <SummaryCards summary={summary} />

      {/* Charts row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16,
      }}>
        <BalanceTrendChart data={monthlyTrend} />
        <SpendingDonutChart data={categoryData} />
      </div>

      {/* Recent transactions */}
      <RecentTransactions transactions={transactions} />
    </div>
  );
}
