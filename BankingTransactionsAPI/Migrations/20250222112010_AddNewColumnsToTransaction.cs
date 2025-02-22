using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankingTransactionsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumnsToTransaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Transactions",
                newName: "TransactionType");

            migrationBuilder.AddColumn<string>(
                name: "AccountNumber",
                table: "Transactions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExternalTransactionId",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Transactions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FullNameEnglish",
                table: "Transactions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IdentityNumber",
                table: "Transactions",
                type: "nvarchar(9)",
                maxLength: 9,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "TransactionDate",
                table: "Transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountNumber",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ExternalTransactionId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "FullNameEnglish",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "IdentityNumber",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransactionDate",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "TransactionType",
                table: "Transactions",
                newName: "Status");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
