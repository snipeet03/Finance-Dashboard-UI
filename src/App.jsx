import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/common/Sidebar';
import Topbar from './components/common/Topbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import InsightsPage from './components/insights/InsightsPage';

function AppInner() {
  const { state } = useApp();
  const { activePage } = state;
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'insights':     return <InsightsPage />;
      default:             return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 0, minWidth: 0 }}
        className="md:ml-[240px]"
      >
        <Topbar onMenuToggle={() => setMobileOpen(v => !v)} />
        <main style={{ flex: 1, padding: '24px 20px', maxWidth: 1200, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          {renderPage()}
        </main>
        <footer style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
          FinanceOS · Built with React + Recharts · Data stored locally
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
