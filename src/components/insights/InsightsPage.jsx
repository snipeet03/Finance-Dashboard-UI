import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Award, Target, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getCategorySpending, getMonthlyTrend, CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency, percentChange } from '../../utils/helpers';

// ─── Custom bar chart tooltip ────────────────────────────────────────────────
function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 3 }}>
          <span style={{ fontSize: 12, color: p.fill }}>{p.name}</span>
          <span style={{ fontSize: 12, fontFamily: 'DM Mono', fontWeight: 600, color: 'var(--text-primary)' }}>
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Insight card ─────────────────────────────────────────────────────────────
function InsightCard({ icon: Icon, iconColor, iconBg, title, value, sub, delay = '' }) {
  return (
    <div
      className={`card animate-fade-up ${delay}`}
      style={{ padding: 20 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={iconColor} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
            {title}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'DM Mono, monospace', letterSpacing: '-0.01em' }}>
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              {sub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Category breakdown bars ──────────────────────────────────────────────────
function CategoryBreakdown({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const top5  = data.slice(0, 5);

  return (
    <div className="card animate-fade-up delay-4" style={{ padding: 20 }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
        Top Spending Categories
      </h3>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
        Where your money goes
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {top5.map((cat, i) => {
          const pct = ((cat.value / total) * 100).toFixed(1);
          const color = CATEGORY_COLORS[cat.name] || '#888';
          return (
            <div key={cat.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{cat.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{pct}%</span>
                  <span style={{ fontSize: 13, fontFamily: 'DM Mono', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {formatCurrency(cat.value)}
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Monthly income vs expense bar chart ─────────────────────────────────────
function MonthlyComparison({ data }) {
  return (
    <div className="card animate-fade-up delay-5" style={{ padding: '20px 16px 12px' }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, paddingLeft: 8 }}>
        Monthly Income vs Expenses
      </h3>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, paddingLeft: 8 }}>
        Side-by-side comparison
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barGap={4} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} dy={6} />
          <YAxis axisLine={false} tickLine={false} dx={-4} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} width={40} />
          <Tooltip content={<BarTooltip />} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
          <Bar dataKey="income"  name="Income"   fill="#00d4a0" radius={[4,4,0,0]} maxBarSize={32} />
          <Bar dataKey="expense" name="Expenses" fill="#ff5c7a" radius={[4,4,0,0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Observation banner ────────────────────────────────────────────────────────
function ObservationBanner({ monthlyData }) {
  if (monthlyData.length < 2) return null;

  const last = monthlyData[monthlyData.length - 1];
  const prev = monthlyData[monthlyData.length - 2];

  const expChange = percentChange(last.expense, prev.expense);
  const incChange = percentChange(last.income, prev.income);
  const saved     = last.income - last.expense;
  const savePct   = last.income > 0 ? ((saved / last.income) * 100).toFixed(0) : 0;

  const isGood = expChange < 0 || (expChange < 10 && incChange > 0);

  return (
    <div
      className="card animate-fade-up delay-2"
      style={{
        padding: '16px 20px',
        borderLeft: `3px solid ${isGood ? 'var(--accent-green)' : 'var(--accent-amber)'}`,
        borderRadius: '0 16px 16px 0',
        background: isGood ? 'var(--accent-green-dim)' : 'var(--accent-amber-dim)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        {isGood ? <TrendingUp size={16} color="var(--accent-green)" /> : <AlertTriangle size={16} color="var(--accent-amber)" />}
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
          {isGood ? 'Great financial health!' : 'Watch your spending'}
        </span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
        {Math.abs(expChange) > 1
          ? `Your expenses ${expChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(expChange).toFixed(1)}% compared to last month. `
          : `Your expenses stayed consistent month-over-month. `}
        {saved > 0
          ? `You saved ${formatCurrency(saved)} (${savePct}% of income) this month — keep it up!`
          : `You're spending more than you earn this month. Consider reviewing discretionary expenses.`}
      </p>
    </div>
  );
}

// ─── Main Insights page ───────────────────────────────────────────────────────
export default function InsightsPage() {
  const { state } = useApp();
  const { transactions } = state;

  const categoryData = getCategorySpending(transactions);
  const monthlyData  = getMonthlyTrend(transactions);

  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s,t)  => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);
  const savingsRate  = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0;
  const topCategory  = categoryData[0];
  const avgMonthlyExpense = monthlyData.length
    ? (monthlyData.reduce((s,m) => s + m.expense, 0) / monthlyData.length).toFixed(0)
    : 0;

  if (!transactions.length) {
    return (
      <div className="empty-state">
        <span style={{ fontSize: 40 }}>📊</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)' }}>
          No data to analyse yet
        </span>
        <span style={{ fontSize: 13 }}>Add transactions to unlock insights</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Observation */}
      <ObservationBanner monthlyData={monthlyData} />

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        <InsightCard
          icon={Award}
          iconColor="var(--accent-amber)"
          iconBg="var(--accent-amber-dim)"
          title="Top Expense Category"
          value={topCategory?.name || '—'}
          sub={topCategory ? `${formatCurrency(topCategory.value)} total` : ''}
          delay="delay-1"
        />
        <InsightCard
          icon={Target}
          iconColor="var(--accent-green)"
          iconBg="var(--accent-green-dim)"
          title="Savings Rate"
          value={`${savingsRate}%`}
          sub="of total income saved"
          delay="delay-2"
        />
        <InsightCard
          icon={Zap}
          iconColor="var(--accent-blue)"
          iconBg="var(--accent-blue-dim)"
          title="Avg Monthly Expense"
          value={formatCurrency(Number(avgMonthlyExpense))}
          sub={`across ${monthlyData.length} months`}
          delay="delay-3"
        />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <CategoryBreakdown data={categoryData} />
        <MonthlyComparison data={monthlyData} />
      </div>
    </div>
  );
}
