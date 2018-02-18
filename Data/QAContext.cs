using System;
using System.Linq;
using System.Threading.Tasks;
using DojoQA.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DojoQA.Data
{
    public class QAContext : IdentityDbContext<ApplicationUser>
    {
        public QAContext(DbContextOptions<QAContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<QuestionTag> QuestionTags { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<QuestionVote> QuestionVotes { get; set; }
        public DbSet<AnswerVote> AnswerVotes { get; set; }

        public override int SaveChanges()
        {
            AddTimestamps();
            return base.SaveChanges();
        }

        private void AddTimestamps()
        {
            //get Base Entity type values that have changed
            var entities = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            
            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added) 
                {
                    ((BaseEntity)entity.Entity).CreatedAt = DateTime.Now;
                }
                ((BaseEntity)entity.Entity).UpdatedAt = DateTime.Now;
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<QuestionTag>().HasKey(table => new {
                table.QuestionId, table.TagId
            });
        }
    }
}