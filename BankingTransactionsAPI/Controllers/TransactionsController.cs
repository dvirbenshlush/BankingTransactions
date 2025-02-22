using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using BankingTransactionsAPI.Models;
using BankingTransactionsAPI.Repository; 

namespace BankingTransactionsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionRepository _transactionRepository; 
        private readonly HttpClient _httpClient;
        private readonly string _secretId; 
        private readonly string _baseUrl; 
        public TransactionsController(HttpClient httpClient, TransactionRepository transactionRepository, IConfiguration configuration) // הוספת IConfiguration
        {
            _httpClient = httpClient;
            _transactionRepository = transactionRepository;
            _secretId = configuration["SecretId"]; 
            _baseUrl = configuration["BaseUrl"];
        }

        [HttpGet("GetAllTransactions")]
        public IActionResult GetAllTransactions()
        {
            var deposits = _transactionRepository.GetAllTransactions();
            var result = deposits.Select(d => new
            {
                d.Amount,
                d.AccountNumber,
                d.IdentityNumber,
                d.ExternalTransactionId,
                d.TransactionDate
            });

            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateTransaction([FromBody] Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tokenResponse = await GetTokenAsync(transaction.IdentityNumber);
            if (tokenResponse.Code != "SUCCESS")
            {
                return BadRequest("Token retrieval failed.");
            }

            var apiResponse = transaction.TransactionType == "Deposit"
                ? await CreateDepositAsync(transaction)
                : await CreateWithdrawalAsync(transaction);

            if (apiResponse.Code == "SUCCESS")
            {
                transaction.ExternalTransactionId = apiResponse.Data;
                _transactionRepository.Add(transaction);

                return Ok(transaction);
            }
            else
            {
                return BadRequest("Transaction failed.");
            }
        }

        private async Task<ApiResponse> GetTokenAsync(string userId)
        {
            var requestBody = new { userId, _secretId };
            var content = new StringContent(
                JsonSerializer.Serialize(requestBody, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }),
                Encoding.UTF8
            );
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

            await Task.Delay(500);
            return userId == "000000000"
                ? new ApiResponse { Code = "ERROR", Data = null }
                : new ApiResponse { Code = "SUCCESS", Data = "MockToken12345" };
        }

        private async Task<ApiResponse> CreateDepositAsync(Transaction transaction)
        {
            var tokenResponse = await GetTokenAsync(transaction.IdentityNumber);
            if (tokenResponse.Code != "SUCCESS")
            {
                return new ApiResponse { Code = "ERROR", Data = "Failed to get token" };
            }

            var requestBody = new TransactionDTO() { Amount = transaction.Amount, AccountNumber = transaction.AccountNumber };
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            await Task.Delay(500);
            return new ApiResponse { Code = "SUCCESS", Data = "Deposit Completed" };
        }

        private async Task<ApiResponse> CreateWithdrawalAsync(Transaction transaction)
        {
            var tokenResponse = await GetTokenAsync(transaction.IdentityNumber);
            if (tokenResponse.Code != "SUCCESS")
            {
                return new ApiResponse { Code = "ERROR", Data = "Failed to get token" };
            }

            var requestBody = new TransactionDTO() { Amount = transaction.Amount, AccountNumber = transaction.AccountNumber };
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            await Task.Delay(500);
            return new ApiResponse { Code = "SUCCESS", Data = "Withdrawal Completed" };
        }
    }
}
