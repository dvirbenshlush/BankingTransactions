using BankingTransactionsAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace BankingTransactionsAPI.Repository
{
    public class TransactionRepository
    {
        private readonly TransactionDbContext _context;

        public TransactionRepository(TransactionDbContext context)
        {
            _context = context;
        }

        public void Add(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            _context.SaveChanges();
        }
        public IEnumerable<Transaction> GetAllTransactions()
        {
            return _context.Transactions.ToList();
        }
        public IEnumerable<Transaction> GetByIdentityNumber(string identityNumber)
        {
            return _context.Transactions.Where(t => t.IdentityNumber == identityNumber).ToList();
        }

        public bool DeleteTransaction(DateTime transactionDate)
        {
            var transaction = _context.Transactions.FirstOrDefault(t => t.TransactionDate.Date == transactionDate.Date);
            if (transaction == null)
                return false;

            _context.Transactions.Remove(transaction);
            _context.SaveChanges();
            return true;
        }

        public bool UpdateTransaction(Transaction transaction)
        {
            DateTime transactionDate = transaction.TransactionDate;
            var existingTransaction = _context.Transactions.FirstOrDefault(t => t.TransactionDate == transactionDate);
            if (existingTransaction == null)
                return false;

            existingTransaction.Amount = transaction.Amount;
            existingTransaction.TransactionDate = transaction.TransactionDate;
            existingTransaction.AccountNumber = transaction.AccountNumber;
            existingTransaction.IdentityNumber = transaction.IdentityNumber;
            existingTransaction.TransactionType = transaction.TransactionType;

            _context.SaveChanges();
            return true;
        }
    }

}
