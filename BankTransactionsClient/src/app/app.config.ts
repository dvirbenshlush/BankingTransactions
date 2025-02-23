import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { transactionsReducer } from './state/bank/transaction.reducer';
import { provideEffects } from '@ngrx/effects';
import { TransactionEffects } from './state/bank/transaction.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      transactions: transactionsReducer, 
    }),
    provideHttpClient(),
    provideEffects([TransactionEffects]), provideAnimationsAsync()
],
};