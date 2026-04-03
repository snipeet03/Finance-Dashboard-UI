# 💰 FinanceOS — Personal Finance Dashboard

A clean, modern, and fully responsive finance dashboard built with **React**, **Vite**, **Tailwind CSS v4**, and **Recharts**.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# 1. Unzip / enter the project folder
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Features

### Dashboard Overview
- Summary Cards — Total Balance, Total Income, Total Expenses
- Balance Trend Chart — Area chart: monthly income, expenses & net
- Spending Donut Chart — Category-wise expense breakdown
- Recent Transactions — Latest 6 entries with quick-navigate link

### Transactions
- Full table with Date, Description, Category, Type, Amount
- Live Search — by description, category, or amount
- Type Filter — All / Income / Expense toggle
- Sort — newest, oldest, highest/lowest amount, A-Z
- Export CSV — filtered & sorted data
- Add / Edit / Delete (Admin role only) with form validation

### Role-Based UI
- Admin — full CRUD access
- Viewer — read-only, no mutation controls
- Role switcher in sidebar, instant effect

### Insights
- Observation Banner — auto-generated financial health summary
- KPI Cards — top expense category, savings rate, avg monthly expense
- Category Breakdown — ranked bars with animated progress
- Monthly Bar Chart — income vs expense side-by-side

### Dark / Light Mode
- Sidebar toggle, persists via localStorage

### localStorage Persistence
- All data, role, and theme survive page reloads

---

## Project Structure

```
src/
├── components/
│   ├── common/          Sidebar, Topbar
│   ├── dashboard/       SummaryCards, BalanceTrendChart, SpendingDonutChart, RecentTransactions
│   ├── transactions/    TransactionFilters, TransactionList, TransactionModal
│   └── insights/        InsightsPage
├── context/             AppContext.jsx (Context API + useReducer)
├── data/                mockData.js (70+ transactions, helper derivations)
├── pages/               Dashboard.jsx, Transactions.jsx
├── utils/               helpers.js (format, sort, filter, export)
├── App.jsx
├── main.jsx
└── index.css
```

---

## Design Decisions

- **Dark-first** midnight palette with full light mode via CSS variables
- **DM Sans** for UI + **DM Mono** for numbers — readable and distinct
- **Context API + useReducer** — clear actions, no Redux overhead
- LocalStorage persistence on every state change
- Role-based UI uses conditional rendering (not CSS hide)
- CSS Grid auto-fit for fluid responsive layouts
- Chart components receive pre-computed data — no logic inside charts
