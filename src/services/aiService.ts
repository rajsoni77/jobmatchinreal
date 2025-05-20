import { Profile, Job, JobRecommendation } from '../types';
import { mockJobs } from '../data/mockData';

// This is a simulated AI service that would normally call an external API
// like OpenAI, Cohere, HuggingFace, etc.

// Simulated delay to mimic API call
const SIMULATED_DELAY = 1500;

interface AIJobMatchRequest {
  profile: Profile;
  jobs: Job[];
}

interface AIJobMatchResponse {
  recommendations: JobRecommendation[];
  explanation: string;
}

// This function simulates the prompt we would send to an AI service
const generateAIPrompt = (profile: Profile, jobs: Job[]): string => {
  return `
  User Profile:
  - Name: ${profile.name}
  - Location: ${profile.location}
  - Years of Experience: ${profile.yearsOfExperience}
  - Skills: ${profile.skills.join(', ')}
  - Preferred Job Type: ${profile.preferredJobType}
  ${profile.bio ? `- Bio: ${profile.bio}` : ''}

  Available Jobs:
  ${jobs.map(job => `
  Job ID: ${job.id}
  Title: ${job.title}
  Company: ${job.company}
  Location: ${job.location}
  Job Type: ${job.jobType}
  Skills Required: ${job.skills.join(', ')}
  `).join('\n')}

  Based on the user's profile, analyze each job and:
  1. Calculate a match score (0-100) considering skills match, location preference, and job type
  2. Provide a brief explanation of why each job would be a good match
  3. Return the top 3 most suitable jobs for this candidate
  `;
};

// Simulated AI matching logic
export const getAIJobMatches = async (profile: Profile): Promise<AIJobMatchResponse> => {
  console.log('AI Prompt that would be sent to AI service:');
  console.log(generateAIPrompt(profile, mockJobs));
  
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  
  // Simplified matching algorithm (in a real app, this would be done by the AI service)
  const scoredJobs = mockJobs.map(job => {
    // Calculate matched skills
    const matchedSkills = job.skills.filter(skill => 
      profile.skills.includes(skill)
    );
    
    // Calculate match score factors
    const skillMatchPercentage = matchedSkills.length / job.skills.length;
    const experienceMatch = Math.min(profile.yearsOfExperience / 5, 1); // Cap at 5 years
    const locationMatch = job.location === profile.location || job.location === 'Remote' ? 1 : 0.7;
    const jobTypeMatch = 
      (job.jobType === profile.preferredJobType) || 
      (profile.preferredJobType === 'any') ? 1 : 0.8;
    
    // Weighted match score
    const matchScore = Math.round(
      (skillMatchPercentage * 0.5 + experienceMatch * 0.2 + locationMatch * 0.15 + jobTypeMatch * 0.15) * 100
    );
    
    return {
      job,
      matchScore,
      matchedSkills
    };
  });
  
  // Sort by match score and get top 3
  const recommendations = scoredJobs
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
  
  return {
    recommendations,
    explanation: "Based on your skills, experience, and preferences, these jobs appear to be the best matches. The match score considers skill overlap, location preference, and job type compatibility."
  };
};