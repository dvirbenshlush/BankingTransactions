using BankingTransactionsAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace BankingTransactionsAPI.Repository
{
    public class TransactionRepository
    {
        private readonly TransactionHistoryDbContext _context;

        public TransactionRepository(TransactionHistoryDbContext context)
        {
            _context = context;
        }

        public void Add(TransactionHistory transaction)
        {
            _context.TransactionHistories.Add(transaction);
            _context.SaveChanges();
        }

        public void AddCustomerDetails(CustomerDetails customer)
        {
            _context.CustomerDetails.Add(customer);
            _context.SaveChanges();
        }
        public IEnumerable<TransactionHistory> GetAllTransactions()
        {
            return _context.TransactionHistories.ToList();
        }
        public IEnumerable<TransactionHistory> GetByIdentityNumber(string identityNumber)
        {
            return _context.TransactionHistories.Where(t => t.IdentityNumber == identityNumber).ToList();
        }

        public ApiResponse DeleteTransaction(DateTime transactionDate)
        {
            var respnse = new ApiResponse();
            var transaction = _context.TransactionHistories.FirstOrDefault(t => t.TransactionDate.Date == transactionDate.Date);
            if (transaction == null)
            {
                respnse.statusMessage = "no match for this transaction";
                return respnse;
            }

            _context.TransactionHistories.Remove(transaction);
            _context.SaveChanges();
            respnse.statusMessage = "success";
            respnse.Code = "200";
            return respnse;
        }

        public ApiResponse UpdateTransaction(TransactionHistory transaction)
        {
            var respnse = new ApiResponse();
            DateTime transactionDate = transaction.TransactionDate;
            var existingTransaction = _context.TransactionHistories.FirstOrDefault(t => t.TransactionDate == transactionDate);
            if (existingTransaction == null)
            {
                respnse.statusMessage = "no match for this transaction";
                return respnse;
            }

            existingTransaction.Amount = transaction.Amount;
            existingTransaction.TransactionDate = transaction.TransactionDate;
            existingTransaction.IdentityNumber = transaction.IdentityNumber;
            existingTransaction.TransactionType = transaction.TransactionType;

            _context.SaveChanges();
            respnse.statusMessage = "success";
            respnse.Code = "200";
            return respnse;
        }
    }

}
