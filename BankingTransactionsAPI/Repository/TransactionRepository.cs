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

        public IEnumerable<Transaction> GetByIdentityNumber(string identityNumber)
        {
            return _context.Transactions.Where(t => t.IdentityNumber == identityNumber).ToList();
        }
    }

}
