import { Search, SlidersHorizontal, Download, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { exportCSV, filterTransactions, sortTransactions } from '../../utils/helpers';

export default function TransactionFilters({ onAdd }) {
  const { state, dispatch } = useApp();
  const { search, filterType, sortBy, sortDir, role, transactions } = state;

  const handleExport = () => {
    const filtered = filterTransactions(transactions, { search, filterType });
    const sorted   = sortTransactions(filtered, sortBy, sortDir);
    exportCSV(sorted);
  };

  return (
    <div style={{
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>
      {/* Search */}
      <div style={{ position: 'relative', flex: '1 1 180px', minWidth: 160 }}>
        <Search
          size={14}
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
        />
        <input
          className="input-base"
          style={{ paddingLeft: 34 }}
          placeholder="Search transactions…"
          value={search}
          onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
        />
      </div>

      {/* Filter type */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
        {['all','income','expense'].map(f => (
          <button
            key={f}
            onClick={() => dispatch({ type: 'SET_FILTER_TYPE', payload: f })}
            style={{
              padding: '5px 12px',
              borderRadius: 7,
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'DM Sans',
              transition: 'all 0.15s',
              background: filterType === f ? 'var(--bg-card)' : 'transparent',
              color: filterType === f ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: filterType === f ? '0 1px 4px rgba(0,0,0,0.2)' : 'none',
              textTransform: 'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select
        className="input-base"
        style={{ width: 'auto', flex: '0 0 auto' }}
        value={`${sortBy}-${sortDir}`}
        onChange={e => {
          const [by, dir] = e.target.value.split('-');
          dispatch({ type: 'SET_SORT_BY', payload: by });
          dispatch({ type: 'SET_SORT_DIR', payload: dir });
        }}
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
        <option value="description-asc">A → Z</option>
        <option value="description-desc">Z → A</option>
      </select>

      {/* Export */}
      <button className="btn btn-ghost" onClick={handleExport} title="Export CSV">
        <Download size={14} />
        <span className="hidden sm:inline">Export</span>
      </button>

      {/* Add (admin only) */}
      {role === 'admin' && (
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={14} />
          Add
        </button>
      )}
    </div>
  );
}
