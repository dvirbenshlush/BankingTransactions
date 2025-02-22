using System.ComponentModel.DataAnnotations;

namespace BankingTransactionsAPI.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        [Required]
        [Range(0, 9999999999, ErrorMessage = "Amount must be up to 10 digits.")]
        public decimal Amount { get; set; }
        public string Status { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "Full Name must be up to 20 characters.")]
        [RegularExpression(@"^[\u0590-\u05FF\s'-]*$", ErrorMessage = "Full Name must be in Hebrew only.")]
        public string FullName { get; set; }
        [Required]
        [StringLength(20, ErrorMessage = "Full Name must be up to 20 characters.")]
        [RegularExpression(@"^[A-Za-z\s'-]*$", ErrorMessage = "Full Name must be in Englis only.")]
        public string FullNameEnglish { get; set; }
        [Required]
        [StringLength(9, ErrorMessage = "ID Number must be 9 digits.")]
        [RegularExpression(@"^\d{9}$", ErrorMessage = "ID Number must be 9 digits only.")]
        public string IdentityNumber { get; set; }
        [Required]
        [RegularExpression(@"^(Deposit|Withdrawal)$", ErrorMessage = "Action must be either Deposit or Withdrawal.")]
        public string TransactionType { get; set; }
        [Required]
        [StringLength(10, ErrorMessage = "Account Number must be up to 10 digits.")]
        [RegularExpression(@"^\d{1,10}$", ErrorMessage = "Account Number must be up to 10 digits only.")]
        public string AccountNumber { get; set; }
        [Required]
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
        public string ExternalTransactionId { get; set; }

    }
}
