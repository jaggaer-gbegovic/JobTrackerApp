using System;
using System.ComponentModel.DataAnnotations;
using JobTrackerApp.Models;

namespace JobTrackerApp.DTOs
{
    public class JobApplicationDto
    {
        public string Id { get; set; }
        
        [Required]
        public string Company { get; set; }
        
        [Required]
        public string Position { get; set; }
        
        public string Location { get; set; }
        
        [Required]
        public string Status { get; set; }
        
        public string Url { get; set; }
        
        public string Salary { get; set; }
        
        public string Notes { get; set; }
        
        [Required]
        public DateTime DateApplied { get; set; }
    }
}

