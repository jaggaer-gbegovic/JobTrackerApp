using JobTrackerApp.DTOs;
using JobTrackerApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobTrackerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobApplicationsController : ControllerBase
    {
        private readonly IJobApplicationService _jobService;
        
        public JobApplicationsController(IJobApplicationService jobService)
        {
            _jobService = jobService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplicationDto>>> GetAll()
        {
            var jobs = await _jobService.GetAllAsync();
            return Ok(jobs);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplicationDto>> GetById(string id)
        {
            var job = await _jobService.GetByIdAsync(id);
            
            if (job == null)
                return NotFound();
                
            return Ok(job);
        }
        
        [HttpPost]
        public async Task<ActionResult<JobApplicationDto>> Create(JobApplicationDto jobDto)
        {
            var createdJob = await _jobService.CreateAsync(jobDto);
            return CreatedAtAction(nameof(GetById), new { id = createdJob.Id }, createdJob);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<JobApplicationDto>> Update(string id, JobApplicationDto jobDto)
        {
            var updatedJob = await _jobService.UpdateAsync(id, jobDto);
            
            if (updatedJob == null)
                return NotFound();
                
            return Ok(updatedJob);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _jobService.DeleteAsync(id);
            return NoContent();
        }
    }
}

