// ─── Mock transaction data ───────────────────────────────────────────────────

const categories = [
  'Housing', 'Food & Dining', 'Transport', 'Healthcare',
  'Entertainment', 'Shopping', 'Utilities', 'Savings', 'Salary', 'Freelance', 'Investment',
];

export const CATEGORY_COLORS = {
  Housing:        '#4f7aff',
  'Food & Dining':'#00d4a0',
  Transport:      '#f5a623',
  Healthcare:     '#ff5c7a',
  Entertainment:  '#a78bfa',
  Shopping:       '#38bdf8',
  Utilities:      '#fb923c',
  Savings:        '#34d399',
  Salary:         '#00d4a0',
  Freelance:      '#818cf8',
  Investment:     '#f472b6',
};

let idCounter = 1;
const txn = (date, desc, amount, category, type) => ({
  id: `txn_${idCounter++}`,
  date,
  description: desc,
  amount,
  category,
  type, // 'income' | 'expense'
});

export const initialTransactions = [
  // January
  txn('2024-01-03', 'Monthly Salary', 5800, 'Salary', 'income'),
  txn('2024-01-04', 'Rent Payment', 1500, 'Housing', 'expense'),
  txn('2024-01-07', 'Grocery Store', 210, 'Food & Dining', 'expense'),
  txn('2024-01-09', 'Netflix Subscription', 15, 'Entertainment', 'expense'),
  txn('2024-01-12', 'Uber Ride', 28, 'Transport', 'expense'),
  txn('2024-01-14', 'Freelance Project A', 1200, 'Freelance', 'income'),
  txn('2024-01-16', 'Electric Bill', 95, 'Utilities', 'expense'),
  txn('2024-01-18', 'Restaurant – Dinner', 74, 'Food & Dining', 'expense'),
  txn('2024-01-20', 'Gym Membership', 40, 'Healthcare', 'expense'),
  txn('2024-01-22', 'Amazon Shopping', 135, 'Shopping', 'expense'),
  txn('2024-01-25', 'Savings Transfer', 500, 'Savings', 'expense'),
  txn('2024-01-28', 'Stock Dividend', 220, 'Investment', 'income'),

  // February
  txn('2024-02-02', 'Monthly Salary', 5800, 'Salary', 'income'),
  txn('2024-02-04', 'Rent Payment', 1500, 'Housing', 'expense'),
  txn('2024-02-06', 'Grocery Store', 185, 'Food & Dining', 'expense'),
  txn('2024-02-08', 'Freelance Project B', 900, 'Freelance', 'income'),
  txn('2024-02-10', 'Doctor Visit', 120, 'Healthcare', 'expense'),
  txn('2024-02-12', 'Bus Pass', 55, 'Transport', 'expense'),
  txn('2024-02-14', 'Valentine Dinner', 98, 'Food & Dining', 'expense'),
  txn('2024-02-16', 'Spotify Premium', 10, 'Entertainment', 'expense'),
  txn('2024-02-18', 'Internet Bill', 60, 'Utilities', 'expense'),
  txn('2024-02-21', 'Clothing Purchase', 210, 'Shopping', 'expense'),
  txn('2024-02-25', 'Savings Transfer', 600, 'Savings', 'expense'),
  txn('2024-02-27', 'Consulting Income', 400, 'Freelance', 'income'),

  // March
  txn('2024-03-01', 'Monthly Salary', 5800, 'Salary', 'income'),
  txn('2024-03-03', 'Rent Payment', 1500, 'Housing', 'expense'),
  txn('2024-03-05', 'Grocery Store', 240, 'Food & Dining', 'expense'),
  txn('2024-03-07', 'Freelance Project C', 1500, 'Freelance', 'income'),
  txn('2024-03-09', 'Car Fuel', 65, 'Transport', 'expense'),
  txn('2024-03-11', 'Cinema Tickets', 35, 'Entertainment', 'expense'),
  txn('2024-03-13', 'Water Bill', 45, 'Utilities', 'expense'),
  txn('2024-03-15', 'Pharmacy', 50, 'Healthcare', 'expense'),
  txn('2024-03-17', 'Online Course', 89, 'Shopping', 'expense'),
  txn('2024-03-20', 'Restaurant – Lunch', 42, 'Food & Dining', 'expense'),
  txn('2024-03-22', 'Investment Return', 350, 'Investment', 'income'),
  txn('2024-03-25', 'Savings Transfer', 700, 'Savings', 'expense'),
  txn('2024-03-28', 'Electric Bill', 88, 'Utilities', 'expense'),

  // April
  txn('2024-04-01', 'Monthly Salary', 6200, 'Salary', 'income'),
  txn('2024-04-03', 'Rent Payment', 1500, 'Housing', 'expense'),
  txn('2024-04-05', 'Grocery Store', 195, 'Food & Dining', 'expense'),
  txn('2024-04-08', 'Freelance Project D', 2000, 'Freelance', 'income'),
  txn('2024-04-10', 'Taxi', 32, 'Transport', 'expense'),
  txn('2024-04-12', 'Streaming Services', 25, 'Entertainment', 'expense'),
  txn('2024-04-14', 'Internet Bill', 60, 'Utilities', 'expense'),
  txn('2024-04-16', 'Health Checkup', 200, 'Healthcare', 'expense'),
  txn('2024-04-18', 'Books', 55, 'Shopping', 'expense'),
  txn('2024-04-21', 'Restaurant – Friends', 110, 'Food & Dining', 'expense'),
  txn('2024-04-24', 'Stock Dividend', 180, 'Investment', 'income'),
  txn('2024-04-27', 'Savings Transfer', 800, 'Savings', 'expense'),

  // May
  txn('2024-05-01', 'Monthly Salary', 6200, 'Salary', 'income'),
  txn('2024-05-03', 'Rent Payment', 1500, 'Housing', 'expense'),
  txn('2024-05-05', 'Grocery Store', 225, 'Food & Dining', 'expense'),
  txn('2024-05-07', 'Freelance Project E', 1100, 'Freelance', 'income'),
  txn('2024-05-09', 'Metro Card', 40, 'Transport', 'expense'),
  txn('2024-05-11', 'Concert Tickets', 80, 'Entertainment', 'expense'),
  txn('2024-05-13', 'Electric Bill', 102, 'Utilities', 'expense'),
  txn('2024-05-15', 'Gym Membership', 40, 'Healthcare', 'expense'),
  txn('2024-05-17', 'Amazon Shopping', 160, 'Shopping', 'expense'),
  txn('2024-05-20', 'Coffee Shop', 38, 'Food & Dining', 'expense'),
  txn('2024-05-23', 'Investment Return', 420, 'Investment', 'income'),
  txn('2024-05-27', 'Savings Transfer', 750, 'Savings', 'expense'),

  // June
  txn('2024-06-01', 'Monthly Salary', 6200, 'Salary', 'income'),
  txn('2024-06-02', 'Rent Payment', 1500, 'Housing', 'expense'),
  txn('2024-06-04', 'Grocery Store', 270, 'Food & Dining', 'expense'),
  txn('2024-06-06', 'Freelance Project F', 1800, 'Freelance', 'income'),
  txn('2024-06-08', 'Car Fuel', 72, 'Transport', 'expense'),
  txn('2024-06-10', 'Movie Streaming', 15, 'Entertainment', 'expense'),
  txn('2024-06-12', 'Water & Internet', 105, 'Utilities', 'expense'),
  txn('2024-06-14', 'Dental Visit', 180, 'Healthcare', 'expense'),
  txn('2024-06-17', 'Clothing Sale', 145, 'Shopping', 'expense'),
  txn('2024-06-20', 'Restaurant – Date', 88, 'Food & Dining', 'expense'),
  txn('2024-06-23', 'Stock Dividend', 260, 'Investment', 'income'),
  txn('2024-06-26', 'Savings Transfer', 900, 'Savings', 'expense'),
];

// Derive balance trend data (monthly)
export const getMonthlyTrend = (transactions) => {
  const map = {};
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  transactions.forEach(t => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!map[key]) map[key] = { month: months[d.getMonth()], income: 0, expense: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expense += t.amount;
  });

  return Object.values(map).map(m => ({
    ...m,
    balance: m.income - m.expense,
    net: m.income - m.expense,
  }));
};

// Category spending breakdown
export const getCategorySpending = (transactions) => {
  const map = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getSummary = (transactions) => {
  const income  = transactions.filter(t => t.type === 'income').reduce((s,t)  => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);
  return { income, expense, balance: income - expense };
};
