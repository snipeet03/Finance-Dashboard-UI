import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: d.payload.fill, marginBottom: 4 }}>
        {d.name}
      </div>
      <div style={{ fontFamily: 'DM Mono', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
        {formatCurrency(d.value)}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
        {d.payload.percent?.toFixed(1)}% of total
      </div>
    </div>
  );
}

export default function SpendingDonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  // Add percent to each entry
  const enriched = data.map(d => ({ ...d, percent: (d.value / total) * 100 }));

  return (
    <div className="card animate-fade-up delay-5" style={{ padding: '20px 16px 12px' }}>
      <div style={{ marginBottom: 8, paddingLeft: 8 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Spending by Category
        </h2>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
          Expense breakdown
        </p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={enriched}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {enriched.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name] || '#888'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle" iconSize={7}
            formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>}
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
