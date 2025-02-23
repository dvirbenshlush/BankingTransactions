import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';

export const selectTransactions = createFeatureSelector<ReadonlyArray<Transaction>>('transactions');
