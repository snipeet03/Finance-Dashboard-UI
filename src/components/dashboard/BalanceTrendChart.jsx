import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import { formatCurrency } from '../../utils/helpers';

// Custom tooltip
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      minWidth: 160,
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>
        {label}
      </div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: p.color, fontWeight: 500 }}>{p.name}</span>
          <span style={{ fontSize: 12, fontFamily: 'DM Mono', fontWeight: 600, color: 'var(--text-primary)' }}>
            {formatCurrency(p.value, true)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BalanceTrendChart({ data }) {
  return (
    <div className="card animate-fade-up delay-4" style={{ padding: '20px 16px 12px' }}>
      <div style={{ marginBottom: 20, paddingLeft: 8 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Balance Trend
        </h2>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
          Monthly income vs. expenses
        </p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00d4a0" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#00d4a0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ff5c7a" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#ff5c7a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#4f7aff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4f7aff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} dy={6} />
          <YAxis
            axisLine={false} tickLine={false} dx={-4}
            tickFormatter={v => `$${(v/1000).toFixed(0)}k`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone" dataKey="income" name="Income"
            stroke="#00d4a0" strokeWidth={2}
            fill="url(#gradIncome)" dot={false} activeDot={{ r: 4, fill: '#00d4a0' }}
          />
          <Area
            type="monotone" dataKey="expense" name="Expenses"
            stroke="#ff5c7a" strokeWidth={2}
            fill="url(#gradExpense)" dot={false} activeDot={{ r: 4, fill: '#ff5c7a' }}
          />
          <Area
            type="monotone" dataKey="balance" name="Net"
            stroke="#4f7aff" strokeWidth={2}
            fill="url(#gradBalance)" dot={false} activeDot={{ r: 4, fill: '#4f7aff' }}
            strokeDasharray="6 3"
          />
          <Legend
            iconType="circle" iconSize={7}
            wrapperStyle={{ fontSize: 11, paddingTop: 12, color: 'var(--text-secondary)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
