import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionService } from '../../services/transaction.service';
import { TransactionActions, TransactionApiActions } from './transaction.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TransactionEffects {
    loadTransactionHistory$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TransactionActions.loadTransactionHistory),
            mergeMap(() =>
            this.transactionService.getTransactionHistory().pipe(
                map(transaction =>  TransactionApiActions.loadTransactionsSuccess({ transaction })),
                catchError(error => of(TransactionApiActions.loadTransactionsFailure({ error })))
            )
            )
        )
    });

    constructor(
        private actions$: Actions,
        private transactionService: TransactionService
    ) {}
}
