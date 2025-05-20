import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/profileService';
import { getJobs } from '../services/jobService';
import { Profile, Job } from '../types';
import { Briefcase as BriefcaseBusiness, UserCircle2, Star, ArrowRight, Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user) {
          const userProfile = await getUserProfile(user.id);
          const allJobs = await getJobs();
          
          setProfile(userProfile);
          setRecentJobs(allJobs.slice(0, 3)); // Get first 3 jobs
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Welcome{profile ? `, ${profile.name}` : user?.name ? `, ${user.name}` : ''}!
          </h2>
          
          {!profile ? (
            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <UserCircle2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-indigo-800">Complete your profile</h3>
                  <div className="mt-2 text-sm text-indigo-700">
                    <p>Set up your profile to get personalized job recommendations!</p>
                  </div>
                  <div className="mt-3">
                    <Link
                      to="/profile-setup"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Complete Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-gray-600">
                Your profile is complete. You can now get personalized job recommendations!
              </p>
              <div className="mt-3">
                <Link
                  to="/recommendations"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Get Recommendations
                </Link>
              </div>
            </div>
          )}
          
          {/* Latest Jobs */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800">Latest Jobs</h3>
              <Link to="/jobs" className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
                View all jobs
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition">
                  <div className="flex items-start">
                    <div className="mr-3 flex-shrink-0">
                      <div className="w-10 h-10 bg-indigo-100 rounded-md flex items-center justify-center">
                        <BriefcaseBusiness className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-gray-800">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                          {job.jobType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Summary</h2>
          
          {profile ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{profile.location}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{profile.yearsOfExperience} years</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Preferred Job Type</p>
                <p className="font-medium capitalize">{profile.preferredJobType}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Skills</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <Link
                  to="/profile-setup"
                  className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                >
                  Edit profile
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <UserCircle2 className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No profile yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Create your profile to get started.
              </p>
              <div className="mt-6">
                <Link
                  to="/profile-setup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Create Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;