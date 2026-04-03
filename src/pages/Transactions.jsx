import { useState } from 'react';
import { useApp } from '../context/AppContext';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import TransactionModal from '../components/transactions/TransactionModal';

export default function Transactions() {
  const { state } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Filters toolbar */}
      <div className="card animate-fade-up" style={{ padding: '14px 16px' }}>
        <TransactionFilters onAdd={() => setShowModal(true)} />
      </div>

      {/* Table */}
      <div className="card animate-fade-up delay-1" style={{ overflow: 'hidden', padding: 0 }}>
        <TransactionList />
      </div>

      {/* Add modal (admin only) */}
      {state.role === 'admin' && (
        <TransactionModal
          open={showModal}
          onClose={() => setShowModal(false)}
          editTxn={null}
        />
      )}
    </div>
  );
}
