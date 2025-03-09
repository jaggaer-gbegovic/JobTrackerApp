using JobTrackerApp.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobTrackerApp.Services
{
    public interface IJobApplicationService
    {
        Task<IEnumerable<JobApplicationDto>> GetAllAsync();
        Task<JobApplicationDto> GetByIdAsync(string id);
        Task<JobApplicationDto> CreateAsync(JobApplicationDto jobDto);
        Task<JobApplicationDto> UpdateAsync(string id, JobApplicationDto jobDto);
        Task DeleteAsync(string id);
    }
}

