export interface User {
  id: string;
  name: string;
  email: string;
  profileCompleted: boolean;
}

export interface Profile {
  userId: string;
  name: string;
  location: string;
  yearsOfExperience: number;
  skills: string[];
  preferredJobType: 'remote' | 'onsite' | 'hybrid' | 'any';
  bio?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  skills: string[];
  jobType: 'remote' | 'onsite' | 'hybrid';
  salary?: string;
  postedDate: string;
}

export interface JobRecommendation {
  job: Job;
  matchScore: number;
  matchedSkills: string[];
}

export interface JobApplication {
  jobId: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  availability: string;
  submittedAt: string;
}