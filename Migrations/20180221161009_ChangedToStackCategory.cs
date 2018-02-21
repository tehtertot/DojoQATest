using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DojoQA.Migrations
{
    public partial class ChangedToStackCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Categories_CategoryId",
                table: "Tags");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Tags",
                newName: "StackCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Tags_CategoryId",
                table: "Tags",
                newName: "IX_Tags_StackCategoryId");

            migrationBuilder.CreateTable(
                name: "StackCategories",
                columns: table => new
                {
                    StackCategoryId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StackCategories", x => x.StackCategoryId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_StackCategories_StackCategoryId",
                table: "Tags",
                column: "StackCategoryId",
                principalTable: "StackCategories",
                principalColumn: "StackCategoryId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_StackCategories_StackCategoryId",
                table: "Tags");

            migrationBuilder.DropTable(
                name: "StackCategories");

            migrationBuilder.RenameColumn(
                name: "StackCategoryId",
                table: "Tags",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Tags_StackCategoryId",
                table: "Tags",
                newName: "IX_Tags_CategoryId");

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Categories_CategoryId",
                table: "Tags",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
