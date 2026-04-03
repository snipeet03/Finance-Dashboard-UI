import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const CARDS = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    accent: '--accent-blue',
    accentDim: '--accent-blue-dim',
    trend: null,
  },
  {
    key: 'income',
    label: 'Total Income',
    icon: TrendingUp,
    accent: '--accent-green',
    accentDim: '--accent-green-dim',
    trendIcon: ArrowUpRight,
    trendPositive: true,
  },
  {
    key: 'expense',
    label: 'Total Expenses',
    icon: TrendingDown,
    accent: '--accent-red',
    accentDim: '--accent-red-dim',
    trendIcon: ArrowDownRight,
    trendPositive: false,
  },
];

export default function SummaryCards({ summary }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 16,
    }}>
      {CARDS.map((card, i) => {
        const Icon = card.icon;
        const value = summary[card.key] ?? 0;
        const delay = `delay-${i + 1}`;

        return (
          <div
            key={card.key}
            className={`card animate-fade-up ${delay}`}
            style={{ padding: '20px 22px' }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {card.label}
                </div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `var(${card.accentDim})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={17} color={`var(${card.accent})`} />
              </div>
            </div>

            {/* Amount */}
            <div style={{
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              fontFamily: 'DM Mono, monospace',
              lineHeight: 1,
            }}>
              {formatCurrency(value)}
            </div>

            {/* Sub-label */}
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
              {card.key === 'balance' && 'Net across all periods'}
              {card.key === 'income' && (
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>
                  ↑ All time earnings
                </span>
              )}
              {card.key === 'expense' && (
                <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>
                  ↓ All time spending
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
