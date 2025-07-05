import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';
import { TransactionActions, TransactionApiActions } from './transaction.actions';

// Initial state for Transactions and cart
export const initialTransactionsState: ReadonlyArray<Transaction> = [];
export const initialCartState: ReadonlyArray<Transaction> = [];
export const transactionHistory: ReadonlyArray<Transaction> = [];

// Reducer for Transactions (fetched from API)
export const transactionsReducer = createReducer(
    transactionHistory,
    on(TransactionApiActions.loadTransactionsSuccess, (state, { transaction }) => {
        return transaction.map(t => ({ ...t, isEditing: false }));
    }),
    on(TransactionApiActions.loadTransactionsFailure, (state, { error }) => {
    console.error('Failed to load transactions:', error);
    return state;
    }),
    on(TransactionActions.updateTransaction, (state, { transactionId, updatedTransaction }) => {
        return state.map(t => t.externalTransactionId === transactionId ? updatedTransaction : t);
      }),
);
