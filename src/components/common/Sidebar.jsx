import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Sun, Moon, ShieldCheck, Eye, ChevronDown,
  Wallet
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'transactions', icon: ArrowLeftRight,   label: 'Transactions' },
  { id: 'insights',     icon: Lightbulb,        label: 'Insights' },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { state, dispatch } = useApp();
  const { activePage, role, darkMode } = state;

  const navigate = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    onClose?.();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={onClose}
          style={{ backdropFilter: 'blur(2px)' }}
        />
      )}

      <aside
        style={{
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border)',
          width: 240,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: mobileOpen ? 0 : undefined,
          height: '100vh',
          zIndex: 40,
          transition: 'transform 0.25s ease',
        }}
        className={`hidden md:flex ${mobileOpen ? '!flex' : ''}`}
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--accent-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Wallet size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                FinanceOS
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
                Personal Finance
              </div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '0 6px', marginBottom: 8 }}>
            NAVIGATION
          </div>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => navigate(item.id)}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div style={{ padding: '12px 12px 20px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Role switcher */}
          <div style={{ padding: '12px 14px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: 8 }}>
              ROLE
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['admin','viewer'].map(r => (
                <button
                  key={r}
                  onClick={() => dispatch({ type: 'SET_ROLE', payload: r })}
                  style={{
                    flex: 1,
                    padding: '5px 0',
                    borderRadius: 7,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    transition: 'all 0.15s',
                    background: role === r ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                    color: role === r ? 'white' : 'var(--text-secondary)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {r === 'admin' ? <ShieldCheck size={12} /> : <Eye size={12} />}
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Dark mode toggle */}
          <button
            className="nav-link"
            onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
            style={{ justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <div style={{
              width: 36, height: 20, borderRadius: 99,
              background: darkMode ? 'var(--accent-blue)' : 'var(--border)',
              position: 'relative', transition: 'background 0.2s',
              flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute',
                top: 2, left: darkMode ? 18 : 2,
                width: 16, height: 16,
                borderRadius: '50%',
                background: 'white',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
