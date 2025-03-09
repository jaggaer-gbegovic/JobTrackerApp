"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import JobList from "@/components/job-list"
import JobForm from "@/components/job-form"
import JobStats from "@/components/job-stats"
import type { JobApplication, JobStatus } from "@/types/job-application"
import { fetchJobs, createJob, updateJob, deleteJob } from "@/services/job-service"

export default function JobDashboard() {
  const [jobs, setJobs] = useState<JobApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    setIsLoading(true)
    try {
      const data = await fetchJobs()
      setJobs(data)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateJob = async (job: Omit<JobApplication, "id">) => {
    try {
      const newJob = await createJob(job)
      setJobs([...jobs, newJob])
      setIsFormOpen(false)
    } catch (error) {
      console.error("Failed to create job:", error)
    }
  }

  const handleUpdateJob = async (job: JobApplication) => {
    try {
      const updatedJob = await updateJob(job)
      setJobs(jobs.map((j) => (j.id === job.id ? updatedJob : j)))
      setEditingJob(null)
      setIsFormOpen(false)
    } catch (error) {
      console.error("Failed to update job:", error)
    }
  }

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob(id)
      setJobs(jobs.filter((job) => job.id !== id))
    } catch (error) {
      console.error("Failed to delete job:", error)
    }
  }

  const handleEditJob = (job: JobApplication) => {
    setEditingJob(job)
    setIsFormOpen(true)
  }

  const handleStatusChange = async (id: string, status: JobStatus) => {
    const job = jobs.find((job) => job.id === id)
    if (job) {
      const updatedJob = { ...job, status }
      await handleUpdateJob(updatedJob)
    }
  }

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "all") return true
    return job.status.toLowerCase() === activeTab.toLowerCase()
  })

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = new Date(a.dateApplied).getTime()
    const dateB = new Date(b.dateApplied).getTime()
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Tracker</h1>
          <p className="text-muted-foreground">Keep track of your job applications in one place</p>
        </div>
        <Button
          onClick={() => {
            setEditingJob(null)
            setIsFormOpen(true)
          }}
          className="mt-4 md:mt-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Application
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <JobStats jobs={jobs} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>Manage and track your job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
                <TabsTrigger value="offered">Offered</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <Button variant="outline" onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}>
                Sort: {sortOrder === "desc" ? "Newest First" : "Oldest First"}
              </Button>
            </div>

            <TabsContent value="all">
              <JobList
                jobs={sortedJobs}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onStatusChange={handleStatusChange}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="applied">
              <JobList
                jobs={sortedJobs}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onStatusChange={handleStatusChange}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="interviewing">
              <JobList
                jobs={sortedJobs}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onStatusChange={handleStatusChange}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="offered">
              <JobList
                jobs={sortedJobs}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onStatusChange={handleStatusChange}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="rejected">
              <JobList
                jobs={sortedJobs}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onStatusChange={handleStatusChange}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isFormOpen && (
        <JobForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false)
            setEditingJob(null)
          }}
          onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
          job={editingJob}
        />
      )}
    </div>
  )
}

