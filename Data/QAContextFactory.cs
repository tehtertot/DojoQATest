using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DojoQA.Data
{
    public class QAContextFactory : IDesignTimeDbContextFactory<QAContext>
    {
        public QAContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<QAContext>();
            optionsBuilder.UseNpgsql("server=localhost;userId=postgres;password=postgres;port=5432;database=dojoqadb;");

            return new QAContext(optionsBuilder.Options);
        }
    }
}