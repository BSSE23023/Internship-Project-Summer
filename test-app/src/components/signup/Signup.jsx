import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const url = "http://localhost:8000/api/users";
      await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with Arfa Karim Tower background */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" 
           style={{ backgroundImage: "url('https://www.shutterstock.com/image-photo/lahore-pakistan-may-30-2023-600nw-2310356123.jpg')" }}>
        <div className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 w-full h-full flex flex-col justify-center items-center p-12 text-white">
          <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl max-w-md">
            <h1 className="text-4xl font-bold mb-4">Join ITU Internship Portal</h1>
            <p className="text-xl mb-6">Connect with industry leaders and find your dream internship</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="h-6 w-6 text-green-300 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Access exclusive internship opportunities</span>
              </li>
              <li className="flex items-center">
                <svg className="h-6 w-6 text-green-300 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Connect with industry mentors</span>
              </li>
              <li className="flex items-center">
                <svg className="h-6 w-6 text-green-300 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Build your professional profile</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="bg-blue-900 text-white font-bold text-xl px-4 py-3 rounded-lg mr-3">
                ITU
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Internship Portal</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-gray-600 mt-2">Join our community of students and industry partners</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={data.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={data.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={data.password}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>
              <p className="mt-1 text-sm text-gray-600">Use 8 or more characters with a mix of letters, numbers & symbols</p>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Terms</span> and <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Privacy Policy</span>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;