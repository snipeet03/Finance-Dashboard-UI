import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';
import { genId } from '../utils/helpers';

// ─── State shape ─────────────────────────────────────────────────────────────
const defaultState = {
  transactions: initialTransactions,
  search: '',
  filterType: 'all',       // 'all' | 'income' | 'expense'
  sortBy: 'date',          // 'date' | 'amount' | 'description'
  sortDir: 'desc',         // 'asc' | 'desc'
  role: 'admin',           // 'admin' | 'viewer'
  darkMode: true,
  activePage: 'dashboard', // 'dashboard' | 'transactions' | 'insights'
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':      return { ...state, search: action.payload };
    case 'SET_FILTER_TYPE': return { ...state, filterType: action.payload };
    case 'SET_SORT_BY':     return { ...state, sortBy: action.payload };
    case 'SET_SORT_DIR':    return { ...state, sortDir: action.payload };
    case 'SET_ROLE':        return { ...state, role: action.payload };
    case 'SET_PAGE':        return { ...state, activePage: action.payload };
    case 'TOGGLE_DARK':     return { ...state, darkMode: !state.darkMode };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [
          { ...action.payload, id: genId() },
          ...state.transactions,
        ],
      };

    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case 'LOAD_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Hydrate from localStorage on first load
  const [state, dispatch] = useReducer(reducer, defaultState, (init) => {
    try {
      const saved = localStorage.getItem('financeApp');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...init, ...parsed, activePage: 'dashboard' };
      }
    } catch (_) {}
    return init;
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('financeApp', JSON.stringify(state));
  }, [state]);

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.darkMode) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Custom hook ─────────────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export default AppContext;
