export type JobStatus = "Applied" | "Interviewing" | "Offered" | "Rejected"

export interface JobApplication {
  id: string
  company: string
  position: string
  location: string
  status: JobStatus
  url: string
  salary: string
  notes: string
  dateApplied: string
}

