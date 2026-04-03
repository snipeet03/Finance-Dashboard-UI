# FinanceOS

A personal finance dashboard I built to get better at tracking where my money actually goes. Started as a weekend project, ended up being something I actually use.

Built with React, Vite, Tailwind CSS v4, and Recharts. No backend — everything lives in localStorage.

---

## Why I built this

I was tired of spreadsheets. I wanted something visual that would show me at a glance whether I was spending more than I was earning, which categories were eating my budget, and how my balance was trending month to month. So I built it.

---

## Getting started

You'll need Node 18+ and that's about it.

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`. For a production build:

```bash
npm run build
npm run preview
```

---

## What it does

**Dashboard** — The home screen. Three summary cards (balance, income, expenses), an area chart showing how your balance trended over time, a donut chart breaking down spending by category, and a list of your most recent transactions.

**Transactions** — The full ledger. Search by description or category, filter by income/expense, sort by date or amount, and export the whole thing to CSV. If you're in Admin mode you can also add, edit, and delete entries.

**Insights** — The part I spent the most time on. It generates a plain-English observation about your spending (e.g. "your expenses went up 18% this month"), shows your savings rate, your top spending category, your average monthly expense, a ranked category breakdown with progress bars, and a bar chart comparing income vs expenses month by month.

**Role switcher** — Flip between Admin and Viewer in the sidebar. Viewer is read-only; Admin unlocks add/edit/delete. Useful if you want to share the dashboard without letting someone mess with your data.

**Dark/light mode** — Toggle in the sidebar. Defaults to dark. Preference is saved.

---

## Stack

| Thing | Why |
|---|---|
| React 19 + Vite 8 | Fast dev experience, no config hell |
| Tailwind CSS v4 | Utility classes for layout/spacing, CSS variables for theming |
| Recharts | Solid charting library, composable, works well with React |
| Lucide React | Clean icon set |
| Context API + useReducer | Right-sized state management for this scope — didn't need Redux |

---

## Project layout

```
src/
├── components/
│   ├── common/
│   │   ├── Sidebar.jsx           # nav, role switcher, dark mode toggle
│   │   └── Topbar.jsx            # page title, role badge, profile
│   ├── dashboard/
│   │   ├── SummaryCards.jsx      # the three top cards
│   │   ├── BalanceTrendChart.jsx  # area chart
│   │   ├── SpendingDonutChart.jsx # category donut
│   │   └── RecentTransactions.jsx # last 6 entries
│   ├── transactions/
│   │   ├── TransactionFilters.jsx # search / filter / sort / export / add
│   │   ├── TransactionList.jsx    # table with edit & delete
│   │   └── TransactionModal.jsx   # add/edit form with validation
│   └── insights/
│       └── InsightsPage.jsx       # everything on the insights screen
├── context/
│   └── AppContext.jsx             # global state, persisted to localStorage
├── data/
│   └── mockData.js                # ~70 sample transactions, derive functions
├── pages/
│   ├── Dashboard.jsx
│   └── Transactions.jsx
└── utils/
    └── helpers.js                 # formatCurrency, sort, filter, exportCSV
```

---

## State management

One context, one reducer, explicit string actions. Nothing fancy.

```js
dispatch({ type: 'ADD_TRANSACTION', payload: { ... } })
dispatch({ type: 'SET_FILTER_TYPE', payload: 'expense' })
dispatch({ type: 'SET_ROLE', payload: 'viewer' })
dispatch({ type: 'TOGGLE_DARK' })
```

State is written to localStorage on every change and rehydrated on load. So your transactions, role, and theme survive a page refresh without any backend.

---

## Mock data

`src/data/mockData.js` has about 70 transactions spread across six months (Jan–Jun 2024) covering 11 categories — salary, freelance, rent, groceries, transport, healthcare, entertainment, shopping, utilities, savings, and investments. Enough to make the charts actually look interesting.

Three helper functions are exported alongside the raw data:

- `getSummary(transactions)` → total income, expenses, and net balance
- `getMonthlyTrend(transactions)` → grouped monthly data for the area/bar charts
- `getCategorySpending(transactions)` → sorted category totals for the donut and breakdown

---

