export interface Transaction {
    isEditing?: boolean;
    accountNumber: string;
    amount: number;
    externalTransactionId: string;
    status?: string;
    identityNumber: string;
    transactionDate: Date;
}