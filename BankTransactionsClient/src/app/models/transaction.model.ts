export interface Transaction {
    accountNumber: string;
    amount: number;
    externalTransactionId: string;
    status?: string;
    identityNumber: string;
    transactionDate: string;
}