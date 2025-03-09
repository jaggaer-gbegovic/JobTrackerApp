"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, MoreHorizontal, CheckCircle, Clock, XCircle, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { JobApplication, JobStatus } from "@/types/job-application"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface JobListProps {
  jobs: JobApplication[]
  onEdit: (job: JobApplication) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: JobStatus) => void
  isLoading: boolean
}

export default function JobList({ jobs, onEdit, onDelete, onStatusChange, isLoading }: JobListProps) {
  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case "Applied":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Applied
          </Badge>
        )
      case "Interviewing":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Interviewing
          </Badge>
        )
      case "Offered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Offered
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No job applications found</p>
        <p className="text-sm text-muted-foreground mt-1">Add a new application to get started</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Date Applied</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.company}</TableCell>
            <TableCell>{job.position}</TableCell>
            <TableCell>{formatDate(job.dateApplied)}</TableCell>
            <TableCell>{getStatusBadge(job.status)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(job)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(job.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(job.id, "Applied")}
                    disabled={job.status === "Applied"}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Mark as Applied
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(job.id, "Interviewing")}
                    disabled={job.status === "Interviewing"}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Interviewing
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(job.id, "Offered")}
                    disabled={job.status === "Offered"}
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Mark as Offered
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(job.id, "Rejected")}
                    disabled={job.status === "Rejected"}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Mark as Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

