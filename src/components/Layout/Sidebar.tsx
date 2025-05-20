import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase as BriefcaseBusiness, Award, UserCircle2, Star } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-md fixed h-[calc(100vh-64px)] left-0 top-16">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            `flex items-center px-6 py-3 text-gray-700 transition ${
              isActive ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700' : 'hover:bg-gray-50'
            }`
          }
        >
          <LayoutDashboard className="h-5 w-5 mr-3" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/jobs" 
          className={({ isActive }) => 
            `flex items-center px-6 py-3 text-gray-700 transition ${
              isActive ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700' : 'hover:bg-gray-50'
            }`
          }
        >
          <BriefcaseBusiness className="h-5 w-5 mr-3" />
          <span>Job Listings</span>
        </NavLink>
        
        <NavLink 
          to="/recommendations" 
          className={({ isActive }) => 
            `flex items-center px-6 py-3 text-gray-700 transition ${
              isActive ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700' : 'hover:bg-gray-50'
            }`
          }
        >
          <Star className="h-5 w-5 mr-3" />
          <span>Recommendations</span>
        </NavLink>
        
        <NavLink 
          to="/profile-setup" 
          className={({ isActive }) => 
            `flex items-center px-6 py-3 text-gray-700 transition ${
              isActive ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700' : 'hover:bg-gray-50'
            }`
          }
        >
          <UserCircle2 className="h-5 w-5 mr-3" />
          <span>Profile</span>
        </NavLink>
      </nav>
      
      <div className="p-4 border-t">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="h-5 w-5 text-indigo-700" />
            <h3 className="font-medium text-indigo-700">Pro Tip</h3>
          </div>
          <p className="text-sm text-gray-600">
            Complete your profile to get more accurate job recommendations!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;