import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Send, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState(1000000);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
          headers: {
            Authorization: localStorage.getItem("authToken")
          }
        });
        setUsers(response.data.user);
        // Assuming there's an API endpoint to fetch the balance
        const balanceResponse = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            Authorization: localStorage.getItem("authToken")
          }
        });
        setBalance(balanceResponse.data.balance);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show a notification to the user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* App Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img className="h-8 w-8" src="/images/logo.avif" alt="Logo" />
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Hello</span>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-semibold">
                A
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center">
            <div className="spinner"></div> {/* You'll need to define this CSS */}
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {/* Balance Card */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Your balance</h2>
              <p className="text-3xl font-bold text-purple-700">Rs {balance.toLocaleString()}</p>
            </div>

            {/* Users Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
              <div className="mb-4">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search users..."
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
              </div>
              {users.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <li key={user._id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold mr-3">
                          {user.firstName[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                        </div>
                      </div>
                      <button 
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 
                        hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={() => {
                          navigate("/send?id=" + user._id + "&name=" + user.firstName + " " + user.lastName);
                        }} 
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send Money
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No users found</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};