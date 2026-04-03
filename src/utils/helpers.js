// ─── Formatting helpers ──────────────────────────────────────────────────────

/**
 * Format a number as USD currency
 */
export const formatCurrency = (amount, compact = false) => {
  if (compact && Math.abs(amount) >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string as human-readable
 */
export const formatDate = (dateStr, style = 'medium') => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: style === 'short' ? 'short' : 'long',
    day: 'numeric',
    year: style === 'full' ? 'numeric' : undefined,
  });
};

/**
 * Get relative time (e.g. "3 days ago")
 */
export const getRelativeTime = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
};

/**
 * Calculate % change between two values
 */
export const percentChange = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Generate a unique ID
 */
export const genId = () => `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/**
 * Sort array of transactions
 */
export const sortTransactions = (txns, sortBy, sortDir) => {
  return [...txns].sort((a, b) => {
    let av, bv;
    if (sortBy === 'date')   { av = new Date(a.date); bv = new Date(b.date); }
    if (sortBy === 'amount') { av = a.amount; bv = b.amount; }
    if (sortBy === 'description') { av = a.description; bv = b.description; }
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1  : -1;
    return 0;
  });
};

/**
 * Filter transactions
 */
export const filterTransactions = (txns, { search, filterType }) => {
  return txns.filter(t => {
    const matchType = filterType === 'all' || t.type === filterType;
    const q = search.toLowerCase();
    const matchSearch = !q
      || t.description.toLowerCase().includes(q)
      || t.category.toLowerCase().includes(q)
      || String(t.amount).includes(q);
    return matchType && matchSearch;
  });
};

/**
 * Export transactions as CSV
 */
export const exportCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map(t =>
    [t.date, `"${t.description}"`, t.category, t.type, t.amount].join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `transactions_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
