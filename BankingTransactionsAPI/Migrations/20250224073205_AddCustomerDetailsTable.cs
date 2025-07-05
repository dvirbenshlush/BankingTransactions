using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingTransactionsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomerDetailsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    FullNameEnglish = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IdentityNumber = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    TransactionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerDetails", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerDetails");
        }
    }
}
