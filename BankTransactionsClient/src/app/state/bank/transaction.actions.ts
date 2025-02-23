import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';

export const TransactionActions = createActionGroup({
    source: 'Transaction',
    events: {
      'Deposit Transaction': props<{ transaction: Transaction }>(),
      'Withdrawal Transaction': props<{ transaction: Transaction }>(),
      'Remove Transaction': props<{ transactionId: string }>(),
      'Update Transaction': props<{ transactionId: string; quantity: number }>(),
      'Load Transaction History': emptyProps(),
    },
});

export const TransactionApiActions = createActionGroup({
  source: 'Transaction API',
  events: {
    'Load Transactions Success': props<{ transaction: Transaction[] }>(),
    'Load Transactions Failure': props<{ error: string }>(),
  },
});
