// src/components/matching/DeviceMatching.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';

const DeviceMatching = () => {
  const [userRequirements, setUserRequirements] = useState({
    deviceType: 'laptop',
    purpose: 'education',
    minSpecs: {
      processor: 'i3',
      ram: 4,
      storage: 128,
    },
    maxBudget: 200,
    location: 'New York',
    maxDistance: 25,
  });

  const [availableDevices, setAvailableDevices] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for available devices
  const mockDevices = [
    {
      id: 1,
      deviceType: 'laptop',
      brand: 'Dell',
      model: 'Latitude E7470',
      specs: {
        processor: 'i5-6300U',
        ram: 8,
        storage: 256,
        screenSize: 14,
      },
      condition: 'Good',
      estimatedValue: 180,
      location: 'New York',
      distance: 5,
      donorRating: 4.7,
      images: ['/assets/devices/dell-latitude.jpg'],
      matchScore: 92,
    },
    {
      id: 2,
      deviceType: 'laptop',
      brand: 'HP',
      model: 'EliteBook 840 G3',
      specs: {
        processor: 'i5-6200U',
        ram: 8,
        storage: 512,
        screenSize: 14,
      },
      condition: 'Excellent',
      estimatedValue: 210,
      location: 'Brooklyn',
      distance: 12,
      donorRating: 4.3,
      images: ['/assets/devices/hp-elitebook.jpg'],
      matchScore: 87,
    },
    {
      id: 3,
      deviceType: 'laptop',
      brand: 'Lenovo',
      model: 'ThinkPad T450',
      specs: {
        processor: 'i5-5300U',
        ram: 8,
        storage: 256,
        screenSize: 14,
      },
      condition: 'Good',
      estimatedValue: 170,
      location: 'Queens',
      distance: 15,
      donorRating: 4.5,
      images: ['/assets/devices/lenovo-thinkpad.jpg'],
      matchScore: 85,
    },
    {
      id: 4,
      deviceType: 'laptop',
      brand: 'Acer',
      model: 'Aspire 5',
      specs: {
        processor: 'i3-10110U',
        ram: 4,
        storage: 128,
        screenSize: 15.6,
      },
      condition: 'Fair',
      estimatedValue: 150,
      location: 'New York',
      distance: 7,
      donorRating: 4.0,
      images: ['/assets/devices/acer-aspire.jpg'],
      matchScore: 78,
    },
  ];

  // Simulate API call to get devices and calculate matches
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      setAvailableDevices(mockDevices);
      
      // Apply matching algorithm (would be server-side in production)
      const sortedMatches = matchDevicesToRequirements(mockDevices, userRequirements);
      setMatches(sortedMatches);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [userRequirements]);

  // Simplified matching algorithm
  const matchDevicesToRequirements = (devices, requirements) => {
    return devices
      .map(device => {
        // Calculate match score based on requirements (simplified for demo)
        let score = 0;
        
        // Device type match
        if (device.deviceType === requirements.deviceType) score += 30;
        
        // Specs match
        const specsScore = calculateSpecsScore(device.specs, requirements.minSpecs);
        score += specsScore;
        
        // Budget match
        if (device.estimatedValue <= requirements.maxBudget) {
          score += 20;
        } else {
          // Reduce score based on how much over budget
          const overBudgetPercentage = (device.estimatedValue - requirements.maxBudget) / requirements.maxBudget;
          score -= Math.min(20, Math.round(overBudgetPercentage * 100));
        }
        
        // Location/distance match
        if (device.distance <= requirements.maxDistance) {
          // Full points if within half the max distance, scaled otherwise
          const distanceScore = Math.round(20 * (1 - device.distance / requirements.maxDistance));
          score += distanceScore;
        }
        
        // Condition bonus
        switch (device.condition) {
          case 'Excellent': score += 15; break;
          case 'Good': score += 10; break;
          case 'Fair': score += 5; break;
          default: break;
        }
        
        return {
          ...device,
          matchScore: Math.min(100, Math.max(0, score)),
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const calculateSpecsScore = (deviceSpecs, requiredSpecs) => {
    let score = 0;
    
    // RAM comparison (simplified)
    if (deviceSpecs.ram >= requiredSpecs.ram) {
      score += 10;
      // Bonus for exceeding requirements
      if (deviceSpecs.ram >= requiredSpecs.ram * 2) score += 5;
    }
    
    // Storage comparison (simplified)
    if (deviceSpecs.storage >= requiredSpecs.storage) {
      score += 10;
      // Bonus for exceeding requirements
      if (deviceSpecs.storage >= requiredSpecs.storage * 2) score += 5;
    }
    
    // Processor comparison (very simplified)
    const processors = {
      'i3': 1,
      'i5': 2,
      'i7': 3,
      'i9': 4
    };
    
    const requiredProcessorLevel = processors[requiredSpecs.processor.toLowerCase()] || 1;
    const deviceProcessorInfo = deviceSpecs.processor.toLowerCase();
    let deviceProcessorLevel = 1;
    
    if (deviceProcessorInfo.includes('i9')) deviceProcessorLevel = 4;
    else if (deviceProcessorInfo.includes('i7')) deviceProcessorLevel = 3;
    else if (deviceProcessorInfo.includes('i5')) deviceProcessorLevel = 2;
    else if (deviceProcessorInfo.includes('i3')) deviceProcessorLevel = 1;
    
    if (deviceProcessorLevel >= requiredProcessorLevel) {
      score += 10;
      if (deviceProcessorLevel > requiredProcessorLevel) score += 5;
    }
    
    return score;
  };

  const handleRequirementsChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties like minSpecs.ram
      const [parent, child] = name.split('.');
      setUserRequirements(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setUserRequirements(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Function to render match quality indicator
  const renderMatchQuality = (score) => {
    let colorClass = '';
    let label = '';
    
    if (score >= 90) {
      colorClass = 'bg-green-500';
      label = 'Excellent Match';
    } else if (score >= 80) {
      colorClass = 'bg-green-400';
      label = 'Great Match';
    } else if (score >= 70) {
      colorClass = 'bg-yellow-400';
      label = 'Good Match';
    } else {
      colorClass = 'bg-yellow-300';
      label = 'Fair Match';
    }
    
    return (
      <div className="flex items-center mt-1">
        <div className={`w-2 h-2 rounded-full ${colorClass} mr-2`}></div>
        <span className="text-xs text-gray-600">{label} ({score}%)</span>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Smart Device Matching</h2>
        <p className="text-gray-600">
          Our intelligent matching system finds the perfect devices for your needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar for filtering/requirements */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Your Requirements</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Device Type
              </label>
              <select
                name="deviceType"
                value={userRequirements.deviceType}
                onChange={handleRequirementsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="tablet">Tablet</option>
                <option value="smartphone">Smartphone</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Use
              </label>
              <select
                name="purpose"
                value={userRequirements.purpose}
                onChange={handleRequirementsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="education">Education</option>
                <option value="work">Professional Work</option>
                <option value="browsing">Basic Web Browsing</option>
                <option value="gaming">Light Gaming</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum RAM
              </label>
              <select
                name="minSpecs.ram"
                value={userRequirements.minSpecs.ram}
                onChange={handleRequirementsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2">2 GB</option>
                <option value="4">4 GB</option>
                <option value="8">8 GB</option>
                <option value="16">16 GB</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Budget
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  name="maxBudget"
                  value={userRequirements.maxBudget}
                  onChange={handleRequirementsChange}
                  className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Distance
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="maxDistance"
                  min="5"
                  max="100"
                  value={userRequirements.maxDistance}
                  onChange={handleRequirementsChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="text-xs text-gray-500 text-right mt-1">
                {userRequirements.maxDistance} miles
              </div>
            </div>

            <Button>
              Update Matches
            </Button>
          </div>
        </div>
        
        {/* Main content area with device cards */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : matches.length > 0 ? (
            <div className="space-y-6">
              {matches.map((device) => (
                <div key={device.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Device image */}
                    <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                      <div className="relative w-full h-48">
                        <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-semibold py-1 px-3 rounded-br-lg">
                          {device.matchScore}% Match
                        </div>
                        <div className="w-full h-full flex items-center justify-center">
                          <img 
                            src={device.images[0] || '/assets/placeholder.png'} 
                            alt={`${device.brand} ${device.model}`}
                            className="max-h-full max-w-full object-contain" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Device details */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800">
                          {device.brand} {device.model}
                        </h3>
                        <span className="text-lg font-semibold text-blue-600">${device.estimatedValue}</span>
                      </div>
                      
                      {renderMatchQuality(device.matchScore)}
                      
                      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Processor:</span>
                          <p className="text-sm font-medium">{device.specs.processor}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Memory:</span>
                          <p className="text-sm font-medium">{device.specs.ram} GB RAM</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Storage:</span>
                          <p className="text-sm font-medium">{device.specs.storage} GB</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Condition:</span>
                          <p className="text-sm font-medium">{device.condition}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Location:</span>
                          <p className="text-sm font-medium">{device.location} ({device.distance} mi)</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Donor Rating:</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">{device.donorRating}</span>
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.798-2.033c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-between items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          device.distance <= 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {device.distance <= 10 ? 'Nearby' : 'Within range'}
                        </span>
                        <div className="space-x-2">
                          <Button>View Details</Button>
                          <Button variant="outline">Request Match</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}            </div>
          ) : (
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-yellow-700 mb-2">No Matches Found</h3>
              <p className="text-yellow-600">
                Try adjusting your requirements to find more devices
              </p>
            </div>
          )}
          
          {/* Integration with Impact Calculator */}
          {matches.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-blue-100">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    See Your Environmental Impact
                  </h3>
                  <p className="text-gray-600 mb-4 md:mb-0">
                    By reusing these devices, you're helping reduce e-waste and conserving resources.
                    Discover the exact environmental benefits of your action.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to={{
                    pathname: "/impact",
                    state: { 
                      deviceType: userRequirements.deviceType,
                      quantity: matches.length
                    }
                  }}>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600">
                      Calculate Impact
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Resource Hub Connection */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Need More Help?</h3>
          <p className="text-gray-600">
            Our Education Hub can help you make an informed decision about your device needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <Link to="/resources?topic=choosing-right-device">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 text-3xl mb-2">📋</div>
              <h4 className="font-medium">Choosing the Right Device</h4>
              <p className="text-sm text-gray-500">Learn what specs you actually need</p>
            </div>
          </Link>
          
          <Link to="/resources?topic=understanding-tech-specs">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 text-3xl mb-2">🔍</div>
              <h4 className="font-medium">Understanding Tech Specs</h4>
              <p className="text-sm text-gray-500">RAM, CPU, storage explained simply</p>
            </div>
          </Link>
          
          <Link to="/resources?topic=donation-benefits">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 text-3xl mb-2">🌱</div>
              <h4 className="font-medium">Benefits of Device Reuse</h4>
              <p className="text-sm text-gray-500">Environmental and social impact</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeviceMatching;
