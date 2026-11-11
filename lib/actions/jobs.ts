
const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export interface CreateJobData {
    jobTitle: string
    companyName: string
    jobCategory: string
    jobType: string
    remoteAllowed: boolean
    location: string
    deadline: string
    salary: {
        min: string
        max: string
        frequency: string
    }
    responsibilities: string
    qualifications: string
}

export const createJob = async (data: CreateJobData) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error("Failed to create job")
    }

    return res.json()
}
