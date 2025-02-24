using System.ComponentModel.DataAnnotations;

namespace BankingTransactionsAPI.Models
{
    public class TransactionHistory
    {
            public int Id { get; set; }
            [Required]
            [Range(0, 9999999999, ErrorMessage = "Amount must be up to 10 digits.")]
            public decimal Amount { get; set; }

            [Required]
            [StringLength(9, ErrorMessage = "ID Number must be 9 digits.")]
            [RegularExpression(@"^\d{9}$", ErrorMessage = "ID Number must be 9 digits only.")]
            public required string IdentityNumber { get; set; }
            [Required]
            [RegularExpression(@"^(Deposit|Withdrawal)$", ErrorMessage = "Action must be either Deposit or Withdrawal.")]
            public required string TransactionType { get; set; }

            [Required]
            public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

    }
}
