import { useState } from 'react';
import { Pencil, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate, filterTransactions, sortTransactions } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../data/mockData';
import TransactionModal from './TransactionModal';

function ConfirmDelete({ txn, onConfirm, onCancel }) {
  if (!txn) return null;
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal-box" style={{ maxWidth: 380 }}>
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🗑️</div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Delete Transaction?
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
            "<strong>{txn.description}</strong>" will be permanently removed.
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={() => onConfirm(txn.id)}
              style={{ background: 'var(--accent-red)', color: 'white' }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TransactionList() {
  const { state, dispatch } = useApp();
  const { transactions, search, filterType, sortBy, sortDir, role } = state;

  const [editTxn, setEditTxn] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTxn, setDeleteTxn] = useState(null);

  const filtered = filterTransactions(transactions, { search, filterType });
  const sorted   = sortTransactions(filtered, sortBy, sortDir);

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    setDeleteTxn(null);
  };

  const handleEdit = (txn) => {
    setEditTxn(txn);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditTxn(null);
  };

  if (!sorted.length) {
    return (
      <>
        <div className="empty-state">
          <span style={{ fontSize: 40 }}>💸</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)' }}>
            No transactions found
          </span>
          <span style={{ fontSize: 13 }}>
            {search || filterType !== 'all' ? 'Try adjusting your filters' : 'Add your first transaction'}
          </span>
        </div>
        <TransactionModal open={showModal} onClose={closeModal} editTxn={editTxn} />
      </>
    );
  }

  return (
    <>
      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Transaction', 'Category', 'Date', 'Type', 'Amount', role === 'admin' ? 'Actions' : ''].map(h => (
                <th key={h} style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((txn, i) => (
              <tr key={txn.id} className="table-row" style={{ animationDelay: `${i * 0.02}s` }}>
                {/* Description */}
                <td style={{ padding: '12px 16px', minWidth: 160 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: txn.type === 'income' ? 'var(--accent-green-dim)' : 'var(--accent-red-dim)',
                    }}>
                      {txn.type === 'income'
                        ? <ArrowUpRight size={14} color="var(--accent-green)" />
                        : <ArrowDownLeft size={14} color="var(--accent-red)" />
                      }
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {txn.description}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td style={{ padding: '12px 16px' }}>
                  <span className="badge" style={{
                    background: `${CATEGORY_COLORS[txn.category] || '#888'}18`,
                    color: CATEGORY_COLORS[txn.category] || '#888',
                  }}>
                    {txn.category}
                  </span>
                </td>

                {/* Date */}
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                  {formatDate(txn.date, 'short')}
                </td>

                {/* Type */}
                <td style={{ padding: '12px 16px' }}>
                  <span className="badge" style={{
                    background: txn.type === 'income' ? 'var(--accent-green-dim)' : 'var(--accent-red-dim)',
                    color: txn.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)',
                  }}>
                    {txn.type}
                  </span>
                </td>

                {/* Amount */}
                <td style={{
                  padding: '12px 16px',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  color: txn.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)',
                  whiteSpace: 'nowrap',
                }}>
                  {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                </td>

                {/* Actions (admin only) */}
                {role === 'admin' && (
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn-ghost"
                        style={{ padding: '5px 7px' }}
                        onClick={() => handleEdit(txn)}
                        title="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '5px 7px' }}
                        onClick={() => setDeleteTxn(txn)}
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Count */}
      <div style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
        Showing {sorted.length} of {transactions.length} transactions
      </div>

      <TransactionModal open={showModal} onClose={closeModal} editTxn={editTxn} />
      <ConfirmDelete txn={deleteTxn} onConfirm={handleDelete} onCancel={() => setDeleteTxn(null)} />
    </>
  );
}
