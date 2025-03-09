using AutoMapper;
using JobTrackerApp.Data;
using JobTrackerApp.DTOs;
using JobTrackerApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobTrackerApp.Services
{
    public class JobApplicationService : IJobApplicationService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        
        public JobApplicationService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<JobApplicationDto>> GetAllAsync()
        {
            var jobApplications = await _context.JobApplications
                .OrderByDescending(j => j.DateApplied)
                .ToListAsync();
                
            return _mapper.Map<IEnumerable<JobApplicationDto>>(jobApplications);
        }
        
        public async Task<JobApplicationDto> GetByIdAsync(string id)
        {
            var jobApplication = await _context.JobApplications
                .FirstOrDefaultAsync(j => j.Id == id);
                
            if (jobApplication == null)
                return null;
                
            return _mapper.Map<JobApplicationDto>(jobApplication);
        }
        
        public async Task<JobApplicationDto> CreateAsync(JobApplicationDto jobDto)
        {
            var jobApplication = _mapper.Map<JobApplication>(jobDto);
            
            // Ensure a new ID is generated
            jobApplication.Id = Guid.NewGuid().ToString();
            jobApplication.CreatedAt = DateTime.UtcNow;
            
            _context.JobApplications.Add(jobApplication);
            await _context.SaveChangesAsync();
            
            return _mapper.Map<JobApplicationDto>(jobApplication);
        }
        
        public async Task<JobApplicationDto> UpdateAsync(string id, JobApplicationDto jobDto)
        {
            var existingJob = await _context.JobApplications
                .FirstOrDefaultAsync(j => j.Id == id);
                
            if (existingJob == null)
                return null;
                
            // Update properties
            _mapper.Map(jobDto, existingJob);
            
            // Ensure ID doesn't change
            existingJob.Id = id;
            
            _context.JobApplications.Update(existingJob);
            await _context.SaveChangesAsync();
            
            return _mapper.Map<JobApplicationDto>(existingJob);
        }
        
        public async Task DeleteAsync(string id)
        {
            var jobApplication = await _context.JobApplications
                .FirstOrDefaultAsync(j => j.Id == id);
                
            if (jobApplication != null)
            {
                _context.JobApplications.Remove(jobApplication);
                await _context.SaveChangesAsync();
            }
        }
    }
}

