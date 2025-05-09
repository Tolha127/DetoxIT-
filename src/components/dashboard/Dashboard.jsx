// src/components/dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    location: 'New York, USA',
    phone: '(555) 123-4567',
    notifications: true,
  });

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Mock statistics data
  const stats = [
    { label: 'Devices Donated', value: 3, icon: '📱', color: 'from-green-400 to-green-600' },
    { label: 'Requests Made', value: 1, icon: '🔍', color: 'from-blue-400 to-blue-600' },
    { label: 'Environmental Impact', value: '12kg', subtext: 'CO₂ Saved', icon: '🌱', color: 'from-teal-400 to-teal-600' },
    { label: 'Matches Made', value: 1, icon: '🤝', color: 'from-purple-400 to-purple-600' },
  ];

  const mockDonations = [
    {
      id: 1,
      deviceType: 'Laptop',
      brand: 'Dell',
      model: 'XPS 13',
      status: 'Pending',
      date: '2024-03-15',
      image: 'https://ui-avatars.com/api/?name=Laptop&background=0D8ABC&color=fff&size=80',
      recipient: null,
    },
    {
      id: 2,
      deviceType: 'Smartphone',
      brand: 'Samsung',
      model: 'Galaxy S21',
      status: 'Completed',
      date: '2024-03-10',
      image: 'https://ui-avatars.com/api/?name=Phone&background=27AE60&color=fff&size=80',
      recipient: 'Lincoln Elementary School',
    },
    {
      id: 3,
      deviceType: 'Tablet',
      brand: 'Apple',
      model: 'iPad Air',
      status: 'In Progress',
      date: '2024-04-20',
      image: 'https://ui-avatars.com/api/?name=Tablet&background=8E44AD&color=fff&size=80',
      recipient: 'Community Center',
    }
  ];

  const mockRequests = [
    {
      id: 1,
      deviceType: 'Laptop',
      specifications: 'Minimum 8GB RAM, 256GB storage for educational purposes',
      status: 'In Progress',
      date: '2024-03-14',
      urgency: 'High',
    },
    {
      id: 2,
      deviceType: 'Tablet',
      specifications: 'Any modern tablet suitable for reading digital textbooks',
      status: 'Matched',
      date: '2024-03-12',
      urgency: 'Medium',
    },
  ];

  // Recent activity timeline data
  const activities = [
    { 
      id: 1, 
      action: 'Device Donated', 
      description: 'Your Samsung Galaxy S21 was successfully donated to Lincoln Elementary School', 
      date: 'Mar 10, 2024',
      icon: '🎁',
      iconBg: 'bg-green-500'
    },
    { 
      id: 2, 
      action: 'Request Matched', 
      description: 'Your request for a Tablet has been matched with a donor', 
      date: 'Mar 12, 2024',
      icon: '🤝',
      iconBg: 'bg-blue-500'
    },
    { 
      id: 3, 
      action: 'New Donation', 
      description: 'You started a new donation process for Dell XPS 13', 
      date: 'Mar 15, 2024',
      icon: '📱',
      iconBg: 'bg-purple-500'
    },
    { 
      id: 4, 
      action: 'Listing Updated', 
      description: 'You added new photos to your iPad Air donation listing', 
      date: 'Apr 20, 2024',
      icon: '📷',
      iconBg: 'bg-yellow-500'
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'donations', label: 'My Donations', icon: '🎁' },
    { id: 'requests', label: 'My Requests', icon: '📝' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Matched':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-12 pb-16">      {/* Header with gradient */}
      <div className="w-full bg-gradient-to-r from-teal-600 to-blue-600 py-10 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg border-2 border-white border-opacity-40">
                <span className="text-white font-bold text-2xl">JD</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Welcome back, John!</h1>
                <p className="text-white text-opacity-90">
                  Thank you for contributing to a more sustainable world
                </p>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm py-2 px-4 rounded-lg text-white shadow-md border border-white border-opacity-30">
                <div className="flex items-center">
                  <div className="text-yellow-300 mr-2">⭐</div>
                  <div>
                    <span className="font-semibold block">Silver Contributor</span>
                    <span className="text-sm opacity-80">3 donations · 1 matched request</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs navigation - modern pill style */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-teal-700 shadow'
                    : 'text-gray-700 hover:text-teal-700'
                } mr-1 last:mr-0`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                  <div className="p-4 flex items-start">
                    <div className={`rounded-full p-3 bg-gradient-to-br ${stat.color} text-white mr-4`}>
                      <div className="text-xl">{stat.icon}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                      {stat.subtext && (
                        <div className="text-xs text-gray-400">{stat.subtext}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">⚡</span>
                  Quick Actions
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">                <Link to="/donate">
                  <div className="border border-teal-200 bg-teal-50 hover:bg-teal-100 transition-colors rounded-lg p-4 text-center cursor-pointer">
                    <div className="text-4xl mb-2">🎁</div>
                    <h3 className="font-medium text-teal-800">Donate a Device</h3>
                    <p className="text-sm text-teal-600 mt-1">Share tech with others</p>
                  </div>
                </Link>                <Link to="/request">
                  <div className="border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg p-4 text-center cursor-pointer">
                    <div className="text-4xl mb-2">📋</div>
                    <h3 className="font-medium text-blue-800">Request a Device</h3>
                    <p className="text-sm text-blue-600 mt-1">Find the tech you need</p>
                  </div>
                </Link>
                <div className="border border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors rounded-lg p-4 text-center cursor-pointer">
                  <div className="text-4xl mb-2">🔍</div>
                  <h3 className="font-medium text-purple-800">Browse Catalog</h3>
                  <p className="text-sm text-purple-600 mt-1">See available devices</p>
                </div>
                <div className="border border-yellow-200 bg-yellow-50 hover:bg-yellow-100 transition-colors rounded-lg p-4 text-center cursor-pointer">
                  <div className="text-4xl mb-2">📊</div>
                  <h3 className="font-medium text-yellow-800">Impact Report</h3>
                  <p className="text-sm text-yellow-600 mt-1">View your contributions</p>
                </div>
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">⏱️</span>
                  Recent Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {activities.map((activity, index) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {index !== activities.length - 1 ? (
                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div>
                              <div className={`${activity.iconBg} h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white`}>
                                <span className="text-white text-lg">{activity.icon}</span>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {activity.action}
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  {activity.date}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-gray-700">
                                {activity.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Donations</h2>
              <Link to="/donate">
                <Button variant="primary" className="flex items-center">
                  <span className="mr-1">+</span> New Donation
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockDonations.map((donation) => (
                <Card key={donation.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="bg-gray-50 p-4 flex items-center border-b border-gray-200">
                    <div className="h-16 w-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={donation.image} 
                        alt={donation.deviceType} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{donation.deviceType}</h3>
                      <p className="text-sm text-gray-500">
                        {donation.brand} {donation.model}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(donation.status)}`}
                      >
                        {donation.status}
                      </span>
                      <span className="text-sm text-gray-500">{donation.date}</span>
                    </div>
                    
                    {donation.recipient && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Recipient:</p>
                        <p className="text-sm font-medium">{donation.recipient}</p>
                      </div>
                    )}
                    
                    <div className="mt-3 flex justify-end space-x-3">
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        View Details
                      </button>
                      <button className="text-xs text-green-600 hover:text-green-800 font-medium">
                        {donation.status === 'Completed' ? 'View Certificate' : 'Edit'}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Requests</h2>
              <Link to="/request">
                <Button variant="primary" className="flex items-center">
                  <span className="mr-1">+</span> New Request
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="bg-gray-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{request.deviceType}</h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgency)}`}
                      >
                        {request.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Requested: {request.date}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Specifications:</p>
                      <p className="text-sm">{request.specifications}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}
                      >
                        {request.status}
                      </span>
                      
                      <div className="flex space-x-3">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                        <button className="text-xs text-green-600 hover:text-green-800 font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>                      <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="notifications"
                          name="notifications"
                          type="checkbox"
                          checked={profileData.notifications}
                          onChange={handleProfileChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                          Receive email notifications for matches and updates
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="primary" className="w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 mt-8">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">Account Security</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        placeholder="••••••••••"
                      />
                    </div>                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        placeholder="••••••••••"
                      />
                    </div>                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        placeholder="••••••••••"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="secondary" className="w-full sm:w-auto">
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
                </div>
                <div className="p-6 text-center">
                  <div className="h-28 w-28 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-4 text-white text-4xl font-bold">
                    JD
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-500 mt-1">{profileData.email}</p>
                  
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Account Status</h4>
                    <div className="flex justify-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Member since March 2024</p>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm transition-colors duration-200">
                      Upload Profile Picture
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 mt-6">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">Connected Accounts</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">G</div>
                        <span className="text-sm font-medium text-gray-800">Google</span>
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Connect</button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mr-3">F</div>
                        <span className="text-sm font-medium text-gray-800">Facebook</span>
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Connect</button>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <div className="bg-sky-100 p-2 rounded-full text-sky-600 mr-3">T</div>
                        <span className="text-sm font-medium text-gray-800">Twitter</span>
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;