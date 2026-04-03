import { Menu, Bell, ShieldCheck, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PAGE_TITLES = {
  dashboard:    { title: 'Dashboard', sub: 'Your financial overview' },
  transactions: { title: 'Transactions', sub: 'All income & expenses' },
  insights:     { title: 'Insights', sub: 'Spending patterns & trends' },
};

export default function Topbar({ onMenuToggle }) {
  const { state } = useApp();
  const { activePage, role } = state;
  const info = PAGE_TITLES[activePage] || PAGE_TITLES.dashboard;

  return (
    <header style={{
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-secondary)',
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>
      {/* Left: menu + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          className="btn btn-ghost md:hidden"
          style={{ padding: '6px 8px' }}
          onClick={onMenuToggle}
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
            {info.title}
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            {info.sub}
          </p>
        </div>
      </div>

      {/* Right: role badge + bell */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          className="badge"
          style={{
            background: role === 'admin' ? 'var(--accent-blue-dim)' : 'var(--bg-card)',
            color: role === 'admin' ? 'var(--accent-blue)' : 'var(--text-secondary)',
            border: `1px solid ${role === 'admin' ? 'var(--accent-blue)' : 'var(--border)'}`,
          }}
        >
          {role === 'admin' ? <ShieldCheck size={11} /> : <Eye size={11} />}
          {role}
        </span>
        <button
          className="btn btn-ghost"
          style={{ padding: '6px 8px', position: 'relative' }}
        >
          <Bell size={16} />
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--accent-red)',
            border: '1.5px solid var(--bg-secondary)',
          }} />
        </button>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #4f7aff, #a78bfa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: 'white',
          flexShrink: 0,
        }}>
          JD
        </div>
      </div>
    </header>
  );
}
