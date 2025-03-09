"use client"

import type { JobApplication } from "@/types/job-application"

// Mock data for demonstration
const MOCK_JOBS: JobApplication[] = [
  {
    id: "1",
    company: "Tech Solutions Inc.",
    position: "Full Stack Developer",
    location: "Seattle, WA",
    status: "Interviewing",
    url: "https://example.com/job1",
    salary: "$120,000",
    notes: "Had first interview on 3/5, second round scheduled for next week.",
    dateApplied: "2025-03-01",
  },
  {
    id: "2",
    company: "Digital Innovations",
    position: ".NET Developer",
    location: "Remote",
    status: "Applied",
    url: "https://example.com/job2",
    salary: "$110,000",
    notes: "Applied through company website. Used referral from John.",
    dateApplied: "2025-03-05",
  },
  {
    id: "3",
    company: "Cloud Systems",
    position: "Backend Engineer",
    location: "San Francisco, CA",
    status: "Rejected",
    url: "https://example.com/job3",
    salary: "$130,000",
    notes: "Rejected after technical interview. Need to improve on system design questions.",
    dateApplied: "2025-02-20",
  },
  {
    id: "4",
    company: "Startup XYZ",
    position: "React Developer",
    location: "New York, NY",
    status: "Offered",
    url: "https://example.com/job4",
    salary: "$115,000",
    notes: "Received offer! Need to negotiate salary.",
    dateApplied: "2025-02-15",
  },
]

// In a real application, these functions would make API calls to your ASP.NET Core backend
// For demonstration, we're using localStorage to persist data

// Helper to initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (typeof window === "undefined") return MOCK_JOBS

  const storedJobs = localStorage.getItem("jobApplications")
  if (!storedJobs) {
    localStorage.setItem("jobApplications", JSON.stringify(MOCK_JOBS))
    return MOCK_JOBS
  }
  return JSON.parse(storedJobs)
}

// Fetch all jobs
export const fetchJobs = async (): Promise<JobApplication[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would be:
  // const response = await fetch('/api/jobs')
  // return response.json()

  return initializeStorage()
}

// Create a new job
export const createJob = async (job: Omit<JobApplication, "id">): Promise<JobApplication> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would be:
  // const response = await fetch('/api/jobs', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(job)
  // })
  // return response.json()

  const newJob = {
    ...job,
    id: Date.now().toString(),
  }

  const jobs = initializeStorage()
  const updatedJobs = [...jobs, newJob]
  localStorage.setItem("jobApplications", JSON.stringify(updatedJobs))

  return newJob
}

// Update an existing job
export const updateJob = async (job: JobApplication): Promise<JobApplication> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would be:
  // const response = await fetch(`/api/jobs/${job.id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(job)
  // })
  // return response.json()

  const jobs = initializeStorage()
  const updatedJobs = jobs.map((j) => (j.id === job.id ? job : j))
  localStorage.setItem("jobApplications", JSON.stringify(updatedJobs))

  return job
}

// Delete a job
export const deleteJob = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would be:
  // await fetch(`/api/jobs/${id}`, {
  //   method: 'DELETE'
  // })

  const jobs = initializeStorage()
  const updatedJobs = jobs.filter((job) => job.id !== id)
  localStorage.setItem("jobApplications", JSON.stringify(updatedJobs))
}

