import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Briefcase as BriefcaseBusiness, Menu, UserCircle2, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseBusiness className="h-8 w-8" />
            <span className="font-bold text-xl">InReal Jobmatch Portal</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-indigo-200 px-3 py-2 rounded-md transition">
                  Dashboard
                </Link>
                <Link to="/jobs" className="hover:text-indigo-200 px-3 py-2 rounded-md transition">
                  Jobs
                </Link>
                <Link to="/recommendations" className="hover:text-indigo-200 px-3 py-2 rounded-md transition">
                  Recommendations
                </Link>
                <div className="relative ml-3 group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <UserCircle2 className="h-6 w-6" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/profile-setup" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-200 px-3 py-2 rounded-md transition">
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-white text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-100 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-800 pb-3 px-4">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="block py-2 text-indigo-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/jobs" 
                className="block py-2 text-indigo-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link 
                to="/recommendations" 
                className="block py-2 text-indigo-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recommendations
              </Link>
              <Link 
                to="/profile-setup" 
                className="block py-2 text-indigo-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 py-2 text-red-300 hover:text-red-400"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block py-2 text-indigo-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block py-2 text-indigo-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;