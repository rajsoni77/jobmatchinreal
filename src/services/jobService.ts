import { Job, JobRecommendation, Profile } from '../types';
import { mockJobs } from '../data/mockData';
import toast from 'react-hot-toast';

// Simulated API delay
const SIMULATED_DELAY = 800;

// Get all jobs
export const getJobs = async (): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  return mockJobs;
};

// Get job by ID
export const getJobById = async (jobId: string): Promise<Job | null> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  
  const job = mockJobs.find(job => job.id === jobId);
  return job || null;
};

// Get AI job recommendations
export const getJobRecommendations = async (userProfile: Profile): Promise<JobRecommendation[]> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY + 1000)); // Extra delay to simulate AI processing
  
  // Simulate AI recommendation logic
  const recommendations: JobRecommendation[] = mockJobs
    .map(job => {
      // Calculate matched skills
      const matchedSkills = job.skills.filter(skill => 
        userProfile.skills.includes(skill)
      );
      
      // Calculate match score (0-100)
      const skillMatchPercentage = matchedSkills.length / job.skills.length;
      const locationMatch = job.location === userProfile.location || job.location === 'Remote' ? 1 : 0.7;
      const jobTypeMatch = 
        (job.jobType === userProfile.preferredJobType) || 
        (userProfile.preferredJobType === 'any') ? 1 : 0.8;
      
      const matchScore = Math.round(
        (skillMatchPercentage * 0.6 + locationMatch * 0.2 + jobTypeMatch * 0.2) * 100
      );
      
      return {
        job,
        matchScore,
        matchedSkills
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore) // Sort by match score (highest first)
    .slice(0, 3); // Get top 3 matches
  
  toast.success('Found job recommendations for you');
  return recommendations;
};