const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

/** Shape of a job document as returned by the backend (GET /jobs).
 * Supports both the createJob payload shape and legacy seeded docs
 * that already use the UI field names. */
export interface ApiJob {
  _id: string

  // createJob payload shape
  jobTitle?: string
  companyName?: string
  jobCategory?: string
  jobType?: string
  remoteAllowed?: boolean
  salary?: {
    min: string
    max: string
    frequency: string
  }

  // legacy/seeded shape
  title?: string
  department?: string
  company?: string
  isRemote?: boolean
  type?: string
  compensation?: string
  applicants?: number
  status?: string
  iconTile?: string

  // shared
  location?: string
  deadline?: string
  deadlineNote?: string
  responsibilities?: string
  qualifications?: string
}

export const getJobs = async (): Promise<ApiJob[]> => {
  const res = await fetch(`${BASE_URL}/jobs`)

  if (!res.ok) {
    throw new Error("Failed to fetch jobs")
  }

  return (await res.json()) as ApiJob[]
}
