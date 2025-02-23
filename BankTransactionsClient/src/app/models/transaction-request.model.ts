export interface TransactionRequest {
    amount: number;
    status: string;
    date: string;
    fullName: string;
    fullNameEnglish: string;
    identityNumber: number;
    transactionType: 'Deposit' | 'Withdrawal';
    accountNumber: number;
    transactionDate: string;
    externalTransactionId: string;
}