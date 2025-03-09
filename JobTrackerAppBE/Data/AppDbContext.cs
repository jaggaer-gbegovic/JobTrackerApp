using JobTrackerApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace JobTrackerApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        
        public DbSet<JobApplication> JobApplications { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure JobApplication entity
            modelBuilder.Entity<JobApplication>()
                .Property(j => j.Status)
                .HasConversion<string>();
                
            // Add any additional configurations here
        }
        
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // Automatically set UpdatedAt when entities are modified
            foreach (var entry in ChangeTracker.Entries<JobApplication>())
            {
                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }
            
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}

