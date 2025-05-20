import React, { useEffect, useState } from 'react';
import { getJobs } from '../services/jobService';
import { Job } from '../types';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, Calendar, SearchIcon, Filter, Loader2 } from 'lucide-react';
import JobApplicationModal from '../components/JobApplicationModal';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const JobListings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const jobsList = await getJobs();
        setJobs(jobsList);
        setFilteredJobs(jobsList);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  useEffect(() => {
    // Apply filters
    let result = jobs;
    
    // Search term filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(
        job => 
          job.title.toLowerCase().includes(lowercasedTerm) ||
          job.company.toLowerCase().includes(lowercasedTerm) ||
          job.location.toLowerCase().includes(lowercasedTerm) ||
          job.skills.some(skill => skill.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    // Job type filter
    if (selectedJobType) {
      result = result.filter(job => job.jobType === selectedJobType);
    }
    
    setFilteredJobs(result);
  }, [searchTerm, selectedJobType, jobs]);
  
  const jobTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'Onsite' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const handleApply = (job: Job) => {
    if (!user) {
      toast.error('Please log in to apply for jobs');
      navigate('/login');
      return;
    }
    setSelectedJob(job);
  };
  
  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Job Listings</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs by title, company, location, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="w-full md:w-auto flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="block w-full md:w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {jobTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-100">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:border-indigo-300 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="mr-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                    {job.salary && (
                      <span className="text-indigo-600 font-medium text-sm md:text-base">
                        {job.salary}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                    <span className="flex items-center mr-4 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center mr-4 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted {job.postedDate}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                      {job.jobType}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {job.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => handleApply(job)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedJob && user && (
        <JobApplicationModal
          job={selectedJob}
          user={user}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default JobListings;