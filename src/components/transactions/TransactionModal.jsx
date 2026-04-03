import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Healthcare',
  'Entertainment', 'Shopping', 'Utilities', 'Savings',
  'Salary', 'Freelance', 'Investment',
];

const empty = {
  date: new Date().toISOString().slice(0, 10),
  description: '',
  amount: '',
  category: 'Food & Dining',
  type: 'expense',
};

export default function TransactionModal({ open, onClose, editTxn }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTxn) {
      setForm({ ...editTxn, amount: String(editTxn.amount) });
    } else {
      setForm(empty);
    }
    setErrors({});
  }, [editTxn, open]);

  if (!open) return null;

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Must be a positive number';
    if (!form.date) e.date = 'Required';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = { ...form, amount: parseFloat(form.amount) };

    if (editTxn) {
      dispatch({ type: 'EDIT_TRANSACTION', payload });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload });
    }
    onClose();
  };

  const label = (text, err) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
        {text}
      </label>
      {err && <span style={{ fontSize: 11, color: 'var(--accent-red)' }}>{err}</span>}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {editTxn ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className="btn btn-ghost" style={{ padding: '5px 7px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Type toggle */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Type</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['income', 'expense'].map(t => (
              <button
                key={t}
                onClick={() => set('type', t)}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans',
                  transition: 'all 0.15s',
                  background: form.type === t
                    ? (t === 'income' ? 'var(--accent-green)' : 'var(--accent-red)')
                    : 'var(--bg-secondary)',
                  color: form.type === t ? (t === 'income' ? '#0f1117' : 'white') : 'var(--text-secondary)',
                }}
              >
                {t === 'income' ? '↑ Income' : '↓ Expense'}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>
            Description {errors.description && <span style={{ color: 'var(--accent-red)', marginLeft: 6 }}>{errors.description}</span>}
          </div>
          <input
            className="input-base"
            placeholder="e.g. Grocery Store"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            style={{ borderColor: errors.description ? 'var(--accent-red)' : undefined }}
          />
        </div>

        {/* Amount */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>
            Amount ($) {errors.amount && <span style={{ color: 'var(--accent-red)', marginLeft: 6 }}>{errors.amount}</span>}
          </div>
          <input
            className="input-base"
            type="number" min="0.01" step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={e => set('amount', e.target.value)}
            style={{ borderColor: errors.amount ? 'var(--accent-red)' : undefined }}
          />
        </div>

        {/* Row: date + category */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>
              Date {errors.date && <span style={{ color: 'var(--accent-red)', marginLeft: 6 }}>{errors.date}</span>}
            </div>
            <input
              className="input-base"
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5 }}>Category</div>
            <select
              className="input-base"
              value={form.category}
              onChange={e => set('category', e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editTxn ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
