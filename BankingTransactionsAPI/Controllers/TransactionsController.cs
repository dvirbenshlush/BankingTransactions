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
                d.TransactionType,
                d.IdentityNumber,
                d.TransactionDate
            });

            return Ok(result);
        }

        [HttpDelete("DeleteTransaction")]
        public IActionResult DeleteTransaction(DateTime transactionDate)
        {
            var result = _transactionRepository.DeleteTransaction(transactionDate);
            return Ok(result);
        }

        [HttpPost("UpdateTransaction")]
        public IActionResult UpdateTransaction(TransactionHistory transaction)
        {
            var result = _transactionRepository.UpdateTransaction(transaction);
            return Ok(result);
        }

        [HttpPost("CreateTransaction")]
        public async Task<ApiResponse> CreateTransaction([FromBody] Transaction transaction)
        {
            var respnse = new ApiResponse();

            if (!ModelState.IsValid)
            {
                respnse.statusMessage = "Reques invalid.";
                respnse.Code = "500";
                return respnse;
            }

            var tokenResponse = await GetTokenAsync(transaction.IdentityNumber);
            if (tokenResponse.Code != "SUCCESS")
            {
                respnse.statusMessage = "Token retrieval failed.";
                respnse.Code = "500";
                return respnse;
            }

            TransactionHistory transactionHistory = new TransactionHistory()
            {
                Id = transaction.Id,
                IdentityNumber = transaction.IdentityNumber,
                TransactionType = transaction.TransactionType,
                Amount = transaction.Amount,
                TransactionDate = transaction.TransactionDate
            };

            var apiResponse = transaction.TransactionType == "Deposit"
                ? await CreateDepositAsync(transactionHistory)
                : await CreateWithdrawalAsync(transactionHistory);

            if (apiResponse.Code == "SUCCESS")
            {
                _transactionRepository.Add(transactionHistory);

                respnse.statusMessage = "success";
                respnse.Code = "200";
                return respnse;
            }
            else
            {
                respnse.statusMessage = "Transaction failed.";
                respnse.Code = "500";
                return respnse;
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

        private async Task<ApiResponse> CreateDepositAsync(TransactionHistory transaction)
        {
            var tokenResponse = await GetTokenAsync(transaction.IdentityNumber);
            if (tokenResponse.Code != "SUCCESS")
            {
                return new ApiResponse { Code = "ERROR", Data = "Failed to get token" };
            }

            var requestBody = new TransactionDTO() { Amount = transaction.Amount, IdentityNumber = transaction.IdentityNumber };
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            await Task.Delay(500);
            return new ApiResponse { Code = "SUCCESS", Data = "Deposit Completed" };
        }

        private async Task<ApiResponse> CreateWithdrawalAsync(TransactionHistory transaction)
        {
            var tokenResponse = await GetTokenAsync(transaction.IdentityNumber);
            if (tokenResponse.Code != "SUCCESS")
            {
                return new ApiResponse { Code = "ERROR", Data = "Failed to get token" };
            }

            var requestBody = new TransactionDTO() { Amount = transaction.Amount, IdentityNumber = transaction.IdentityNumber };
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            await Task.Delay(500);
            return new ApiResponse { Code = "SUCCESS", Data = "Withdrawal Completed" };
        }
    }
}
