"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { JobApplication } from "@/types/job-application"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"

interface JobStatsProps {
  jobs: JobApplication[]
}

export default function JobStats({ jobs }: JobStatsProps) {
  const totalJobs = jobs.length
  const applied = jobs.filter((job) => job.status === "Applied").length
  const interviewing = jobs.filter((job) => job.status === "Interviewing").length
  const offered = jobs.filter((job) => job.status === "Offered").length
  const rejected = jobs.filter((job) => job.status === "Rejected").length

  const chartData = [
    { name: "Applied", value: applied },
    { name: "Interviewing", value: interviewing },
    { name: "Offered", value: offered },
    { name: "Rejected", value: rejected },
  ]

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalJobs}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalJobs ? Math.round(((interviewing + offered + rejected) / totalJobs) * 100) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            {interviewing + offered + rejected} of {totalJobs} applications
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Application Status</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[120px]">
            {jobs.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis allowDecimals={false} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

