using AutoMapper;
using JobTrackerApp.DTOs;
using JobTrackerApp.Models;
using System;

namespace JobTrackerApp.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Map from Entity to DTO
            CreateMap<JobApplication, JobApplicationDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
                
            // Map from DTO to Entity
            CreateMap<JobApplicationDto, JobApplication>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<JobStatus>(src.Status)))
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
        }
    }
}

