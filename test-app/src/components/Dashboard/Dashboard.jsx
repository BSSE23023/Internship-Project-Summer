import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  ChartBarIcon, 
  UserCircleIcon,
  CogIcon,
  BellIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with API calls
    setUserData({
      firstName: "Ali",
      lastName: "Khan",
      email: "ali.khan@student.itu.edu.pk",
      skills: ["JavaScript", "React", "Node.js"],
      role: "student",
      profileCompletion: 85
    });
    
    setInternships([
      {
        id: 1,
        position: "Frontend Developer Intern",
        companyName: "TechSolutions Inc.",
        description: "Work on cutting-edge React applications for enterprise clients.",
        type: "Full-time",
        duration: "3 months",
        location: "Lahore",
        skills: ["React", "JavaScript", "CSS"],
        posted: "2 days ago",
        applications: 24
      },
      {
        id: 2,
        position: "Data Science Intern",
        companyName: "DataInsights Ltd.",
        description: "Help develop machine learning models for predictive analytics.",
        type: "Part-time",
        duration: "6 months",
        location: "Remote",
        skills: ["Python", "Pandas", "Scikit-learn"],
        posted: "1 week ago",
        applications: 18
      }
    ]);
    
    setApplications([
      { 
        id: 1, 
        position: "Frontend Developer Intern", 
        company: "TechSolutions Inc.",
        status: "pending",
        date: "2023-06-15"
      },
      { 
        id: 2, 
        position: "Data Science Intern", 
        company: "DataInsights Ltd.",
        status: "approved",
        date: "2023-06-10"
      }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleApply = (internshipId) => {
    const appliedInternship = internships.find(i => i.id === internshipId);
    setApplications([
      ...applications, 
      { 
        id: Date.now(), 
        position: appliedInternship.position,
        company: appliedInternship.companyName,
        status: "pending",
        date: new Date().toISOString().split('T')[0]
      }
    ]);
  };

  // Status badge styling
  const getStatusClass = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Elegant Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center">
            <div className="bg-white text-blue-900 font-bold text-xl px-3 py-2 rounded-md mr-3">
              ITU
            </div>
            <h1 className="text-xl font-bold">Internship Portal</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === "dashboard" 
                    ? "bg-white/20 backdrop-blur-sm" 
                    : "hover:bg-white/10"
                }`}
              >
                <ChartBarIcon className="h-5 w-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("internships")}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === "internships" 
                    ? "bg-white/20 backdrop-blur-sm" 
                    : "hover:bg-white/10"
                }`}
              >
                <BriefcaseIcon className="h-5 w-5 mr-3" />
                Internships
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("applications")}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === "applications" 
                    ? "bg-white/20 backdrop-blur-sm" 
                    : "hover:bg-white/10"
                }`}
              >
                <AcademicCapIcon className="h-5 w-5 mr-3" />
                Applications
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === "profile" 
                    ? "bg-white/20 backdrop-blur-sm" 
                    : "hover:bg-white/10"
                }`}
              >
                <UserCircleIcon className="h-5 w-5 mr-3" />
                Profile
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-all"
              >
                <BuildingOfficeIcon className="h-5 w-5 mr-3" />
                Companies
              </button>
            </li>
            <li>
              <button
                className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-all"
              >
                <CalendarIcon className="h-5 w-5 mr-3" />
                Events
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-white/80 hover:text-white transition-colors"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Clean Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search internships, companies..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="p-1 rounded-full text-gray-500 hover:text-blue-600">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="p-1 rounded-full text-gray-500 hover:text-blue-600">
                <CogIcon className="h-6 w-6" />
              </button>
              
              <div className="flex items-center">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {userData?.firstName?.charAt(0) || "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{userData?.firstName} {userData?.lastName}</p>
                  <p className="text-xs text-gray-500 capitalize">{userData?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Hero Section with Arfa Tower Background */}
        <div className="relative bg-gradient-to-r from-blue-900 to-purple-800">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ 
              backgroundImage: "url('https://shahidinternational.com/wp-content/uploads/2019/09/arfa-1280x720-770x497.jpg')" 
            }}
          ></div>
          
          <div className="relative z-10 px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h1 className="text-3xl font-bold text-white">Welcome back, {userData?.firstName}!</h1>
                  <p className="text-xl text-blue-200 mt-2">Information Technology University of Lahore</p>
                  
                  <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-white">Profile Completion: {userData?.profileCompletion || 0}%</p>
                    <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                      <div 
                        className="bg-teal-400 h-2 rounded-full" 
                        style={{ width: `${userData?.profileCompletion || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-white text-lg font-medium">Upcoming Deadline</p>
                  <p className="text-white text-2xl font-bold mt-1">May 15</p>
                  <p className="text-blue-200 mt-1">Summer Internship Applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="bg-white py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <p className="text-2xl font-bold text-blue-900">{internships.length}</p>
                <p className="text-gray-600">Internships</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl font-bold text-purple-800">{applications.length}</p>
                <p className="text-gray-600">Applications</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl font-bold text-blue-500">{userData?.profileCompletion || 0}%</p>
                <p className="text-gray-600">Profile Strength</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl font-bold text-teal-500">3</p>
                <p className="text-gray-600">Interviews</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Featured Internships */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Featured Internships</h2>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View All
                      </button>
                    </div>
                    
                    <div className="space-y-5">
                      {internships.map((internship) => (
                        <div 
                          key={internship.id} 
                          className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <div className="flex items-center">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                <div className="ml-4">
                                  <h3 className="text-lg font-bold text-gray-800">{internship.position}</h3>
                                  <p className="text-blue-700 font-medium">{internship.companyName}</p>
                                </div>
                              </div>
                              
                              <p className="mt-4 text-gray-600">{internship.description}</p>
                              
                              <div className="mt-4 flex flex-wrap gap-2">
                                {internship.skills?.map((skill, index) => (
                                  <span 
                                    key={index} 
                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0">
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {internship.type}
                              </span>
                              <div className="mt-3 text-sm text-gray-500">
                                <p className="flex items-center">
                                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {internship.location}
                                </p>
                                <p className="mt-1 flex items-center">
                                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {internship.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                            <div className="text-sm text-gray-500">
                              <span>Posted: {internship.posted}</span>
                              <span className="mx-2">•</span>
                              <span>{internship.applications} applications</span>
                            </div>
                            <button 
                              onClick={() => handleApply(internship.id)}
                              className="mt-3 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* University Events */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">University Events</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-100 rounded-xl p-4 flex">
                        <div className="bg-blue-500 text-white w-16 h-16 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-sm">MAY</span>
                          <span className="text-xl font-bold">15</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-bold text-gray-800">Career Fair 2023</h3>
                          <p className="text-gray-600 text-sm mt-1">Meet top employers and find internship opportunities</p>
                          <div className="mt-2 flex items-center text-gray-500 text-sm">
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>10:00 AM - 4:00 PM</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-100 rounded-xl p-4 flex">
                        <div className="bg-purple-500 text-white w-16 h-16 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-sm">MAY</span>
                          <span className="text-xl font-bold">22</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-bold text-gray-800">Resume Workshop</h3>
                          <p className="text-gray-600 text-sm mt-1">Learn how to create a professional resume</p>
                          <div className="mt-2 flex items-center text-gray-500 text-sm">
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>2:00 PM - 4:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  {/* Applications Summary */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">My Applications</h2>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View All
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.id} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <div>
                            <h3 className="font-medium text-gray-800">{app.position}</h3>
                            <p className="text-sm text-gray-500">{app.company}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs ${getStatusClass(app.status)}`}>
                              {app.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">Applied: {app.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Profile Completion */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Strength</h2>
                    
                    <div className="mb-6">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                          style={{ width: `${userData?.profileCompletion || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-sm text-gray-600 mt-1">
                        {userData?.profileCompletion || 0}% complete
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Personal Information</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Education</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Skills</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">Work Experience</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">Projects</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      Complete Your Profile
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
                        <DocumentTextIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-medium">Upload Resume</p>
                      </button>
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
                        <BriefcaseIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="font-medium">Find Internships</p>
                      </button>
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
                        <BuildingOfficeIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="font-medium">Company Directory</p>
                      </button>
                      <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
                        <CalendarIcon className="h-8 w-8 text-teal-500 mx-auto mb-2" />
                        <p className="font-medium">View Events</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        {/* Footer */}
// Replace the entire footer with this fixed version
<footer className="bg-gray-900 text-white py-8">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-white text-blue-900 font-bold text-xl px-3 py-2 rounded-md mr-3">
            ITU
          </div>
          <h3 className="text-xl font-bold">Internship Portal</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Connecting ITU students with industry leaders for valuable internship experiences.
        </p>
      </div>
      
      <div>
        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
        <ul className="space-y-2 text-gray-400">
          <li><span className="hover:text-white transition-colors cursor-pointer">Home</span></li>
          <li><span className="hover:text-white transition-colors cursor-pointer">Internships</span></li>
          <li><span className="hover:text-white transition-colors cursor-pointer">Companies</span></li>
          <li><span className="hover:text-white transition-colors cursor-pointer">Events</span></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-lg mb-4">Resources</h4>
        <ul className="space-y-2 text-gray-400">
          <li><span className="hover:text-white transition-colors cursor-pointer">Resume Tips</span></li>
          <li><span className="hover:text-white transition-colors cursor-pointer">Interview Prep</span></li>
          <li><span className="hover:text-white transition-colors cursor-pointer">Career Guides</span></li>
          <li><span className="hover:text-white transition-colors cursor-pointer">FAQs</span></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-start">
            <svg className="h-5 w-5 mt-0.5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Arfa Software Technology Park, Lahore</span>
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+92 42 123 4567</span>
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>careers@itu.edu.pk</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
      <p>© {new Date().getFullYear()} Information Technology University, Lahore. All rights reserved.</p>
    </div>
  </div>
</footer>
      </div>
    </div>
  );
};

export default Dashboard;