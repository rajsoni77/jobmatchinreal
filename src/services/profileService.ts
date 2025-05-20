import { Profile } from '../types';
import { mockProfiles } from '../data/mockData';
import toast from 'react-hot-toast';

// Simulated API delay
const SIMULATED_DELAY = 800;

// Get user profile
export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  
  const profile = mockProfiles.find(profile => profile.userId === userId);
  return profile || null;
};

// Save user profile
export const saveUserProfile = async (profile: Profile): Promise<Profile> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  
  const existingProfileIndex = mockProfiles.findIndex(p => p.userId === profile.userId);
  
  if (existingProfileIndex >= 0) {
    // Update existing profile
    mockProfiles[existingProfileIndex] = profile;
  } else {
    // Create new profile
    mockProfiles.push(profile);
  }
  
  toast.success('Profile saved successfully');
  return profile;
};