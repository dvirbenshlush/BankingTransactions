using BankingTransactionsAPI.Models;
using Microsoft.EntityFrameworkCore;

public class TransactionHistoryDbContext : DbContext
{
    public TransactionHistoryDbContext(DbContextOptions<TransactionHistoryDbContext> options) : base(options) { }

    public DbSet<TransactionHistory> TransactionHistories { get; set; }
    public DbSet<CustomerDetails> CustomerDetails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TransactionHistory>()
            .HasKey(t => t.Id);

        modelBuilder.Entity<TransactionHistory>()
            .Property(t => t.TransactionDate)
            .HasDefaultValueSql("GETUTCDATE()");

        base.OnModelCreating(modelBuilder);
    }
}
