import { User } from '../types';
import { mockUsers } from '../data/mockData';
import toast from 'react-hot-toast';

// Simulated login delay
const SIMULATED_DELAY = 800;

// Mock login function
export const loginUser = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  
  const user = mockUsers.find(user => user.email === email);
  
  if (!user) {
    toast.error('Invalid email or password');
    throw new Error('Invalid email or password');
  }
  
  // In a real app, we would validate the password here
  toast.success('Logged in successfully');
  return user;
};

// Mock register function
export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  
  // Check if user already exists
  const existingUser = mockUsers.find(user => user.email === email);
  if (existingUser) {
    toast.error('User with this email already exists');
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name,
    email,
    profileCompleted: false,
  };
  
  // In a real app, we would save this user to a database
  mockUsers.push(newUser);
  
  toast.success('Account created successfully');
  return newUser;
};

// Mock logout function
export const logoutUser = (): void => {
  toast.success('Logged out successfully');
};