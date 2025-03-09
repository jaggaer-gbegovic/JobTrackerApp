using System;
using System.ComponentModel.DataAnnotations;

namespace JobTrackerApp.Models
{
    public class JobApplication
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string Company { get; set; }
        
        [Required]
        public string Position { get; set; }
        
        public string Location { get; set; }
        
        [Required]
        public JobStatus Status { get; set; }
        
        public string Url { get; set; }
        
        public string Salary { get; set; }
        
        public string Notes { get; set; }
        
        [Required]
        public DateTime DateApplied { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
    }
    
    public enum JobStatus
    {
        Applied,
        Interviewing,
        Offered,
        Rejected
    }
}

