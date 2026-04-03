import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function RecentTransactions({ transactions }) {
  const { dispatch } = useApp();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (!recent.length) {
    return (
      <div className="card animate-fade-up" style={{ padding: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
          Recent Transactions
        </h2>
        <div className="empty-state">
          <span style={{ fontSize: 28 }}>💳</span>
          <span>No transactions yet</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-up" style={{ padding: '20px 0 0' }}>
      <div style={{ padding: '0 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Recent Transactions
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
            Last 6 activity entries
          </p>
        </div>
        <button
          className="btn btn-ghost"
          style={{ fontSize: 12, padding: '5px 12px' }}
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'transactions' })}
        >
          View all
        </button>
      </div>

      <div>
        {recent.map((txn, i) => (
          <div
            key={txn.id}
            className="table-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 20px',
              animationDelay: `${i * 0.04}s`,
            }}
          >
            {/* Icon */}
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: txn.type === 'income' ? 'var(--accent-green-dim)' : 'var(--accent-red-dim)',
            }}>
              {txn.type === 'income'
                ? <ArrowUpRight size={16} color="var(--accent-green)" />
                : <ArrowDownLeft size={16} color="var(--accent-red)" />
              }
            </div>

            {/* Description */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {txn.description}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                {formatDate(txn.date, 'short')} · {txn.category}
              </div>
            </div>

            {/* Amount */}
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 13,
              fontWeight: 600,
              color: txn.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)',
              flexShrink: 0,
            }}>
              {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
