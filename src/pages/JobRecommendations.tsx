import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/profileService';
import { getAIJobMatches } from '../services/aiService';
import { Profile, JobRecommendation } from '../types';
import { Briefcase, MapPin, Calendar, Sparkles, Loader2, UserCircle2 } from 'lucide-react';

const JobRecommendations: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (user) {
          const userProfile = await getUserProfile(user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);
  
  const getRecommendations = async () => {
    if (!profile) return;
    
    setAnalyzing(true);
    try {
      const result = await getAIJobMatches(profile);
      setRecommendations(result.recommendations);
      setExplanation(result.explanation);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setAnalyzing(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Job Recommendations</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
          <UserCircle2 className="h-12 w-12 mx-auto text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Complete your profile first</h2>
          <p className="mt-1 text-gray-500">
            You need to complete your profile to get personalized job recommendations.
          </p>
          <div className="mt-6">
            <Link
              to="/profile-setup"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Complete Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Job Recommendations</h1>
      
      {/* AI Controls */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">AI-Powered Job Recommendations</h2>
            </div>
            <p className="mt-2 text-indigo-100">
              Our AI will analyze your profile and find the best job matches for you.
            </p>
          </div>
          
          <button
            onClick={getRecommendations}
            disabled={analyzing}
            className="flex items-center justify-center px-6 py-3 bg-white text-indigo-700 rounded-md shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-200 disabled:text-indigo-500"
          >
            {analyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Finding matches...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Find My Matches
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Results */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Matching Analysis</h2>
            <p className="text-gray-600">{explanation}</p>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800">Your Top Matches</h2>
          
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div 
                key={rec.job.id} 
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:border-indigo-300 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="mr-4 mb-4 md:mb-0 flex flex-col items-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-indigo-700">{rec.matchScore}%</span>
                    </div>
                    <span className="text-xs text-gray-500">Match</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{rec.job.title}</h3>
                      {rec.job.salary && (
                        <span className="text-indigo-600 font-medium text-sm md:text-base">
                          {rec.job.salary}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                      <div className="flex items-center mr-4 mb-2">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {rec.job.company}
                      </div>
                      <div className="flex items-center mr-4 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {rec.job.location}
                      </div>
                      <div className="flex items-center mr-4 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        Posted {rec.job.postedDate}
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                        {rec.job.jobType}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{rec.job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Skills you match:</h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.matchedSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 text-right">
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {recommendations.length === 0 && !analyzing && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-100">
          <Sparkles className="h-12 w-12 mx-auto text-indigo-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">No recommendations yet</h2>
          <p className="mt-1 text-gray-500">
            Click the "Find My Matches" button to get personalized job recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobRecommendations;