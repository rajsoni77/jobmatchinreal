import { JobApplication } from '../types';
import toast from 'react-hot-toast';

// Simulated API delay
const SIMULATED_DELAY = 800;

// Mock storage for applications
const mockApplications: JobApplication[] = [];

export const submitApplication = async (application: JobApplication): Promise<JobApplication> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  
  // In a real app, this would upload the file to cloud storage
  // and save the application data to a database
  
  mockApplications.push(application);
  toast.success('Application submitted successfully!');
  
  return application;
};