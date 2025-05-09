// src/components/impact/ImpactCalculator.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';

const ImpactCalculator = () => {
  // SEO and accessibility enhancements
  useEffect(() => {
    // Update page title for better SEO
    document.title = 'Environmental Impact Calculator | DetoxIT';
    
    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate the environmental impact of recycling or reusing your electronic devices with DetoxIT\'s impact calculator.');
    }
    
    // Focus on main content area for accessibility
    const mainContent = document.getElementById('impact-calculator-content');
    if (mainContent) {
      mainContent.focus();
    }
  }, []);
  
  // Get any parameters passed from other components
  const location = useLocation();
  const passedParams = location.state || {};  const [deviceInfo, setDeviceInfo] = useState({
    deviceType: passedParams.deviceType || 'smartphone',
    quantity: passedParams.quantity || 1,
    lifeExtension: 12, // in months
  });

  // Impact metrics per device type (in kg CO2 equivalent)
  const impactMetrics = {
    smartphone: {
      productionEmissions: 60,
      monthlyEmissionsSaved: 1.2,
      waterSaved: 13000, // liters
      rawMaterialsSaved: 0.34, // kg
      toxicWastePrevented: 0.25, // kg
    },
    laptop: {
      productionEmissions: 210,
      monthlyEmissionsSaved: 2.8,
      waterSaved: 45000, // liters
      rawMaterialsSaved: 1.2, // kg
      toxicWastePrevented: 0.8, // kg
    },
    tablet: {
      productionEmissions: 87,
      monthlyEmissionsSaved: 1.5,
      waterSaved: 19000, // liters
      rawMaterialsSaved: 0.45, // kg
      toxicWastePrevented: 0.35, // kg
    },
    desktop: {
      productionEmissions: 310,
      monthlyEmissionsSaved: 4.2,
      waterSaved: 70000, // liters
      rawMaterialsSaved: 3.5, // kg
      toxicWastePrevented: 1.4, // kg
    },
    monitor: {
      productionEmissions: 140,
      monthlyEmissionsSaved: 2.0,
      waterSaved: 35000, // liters
      rawMaterialsSaved: 1.8, // kg
      toxicWastePrevented: 0.9, // kg
    },
    printer: {
      productionEmissions: 120,
      monthlyEmissionsSaved: 1.8,
      waterSaved: 30000, // liters
      rawMaterialsSaved: 1.5, // kg
      toxicWastePrevented: 0.7, // kg
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceInfo({
      ...deviceInfo,
      [name]: name === 'quantity' ? parseInt(value) : value,
      lifeExtension: name === 'lifeExtension' ? parseInt(value) : deviceInfo.lifeExtension,
    });
  };

  const calculateImpact = () => {
    const metrics = impactMetrics[deviceInfo.deviceType];
    if (!metrics) return null;

    const emissionsSaved = 
      (metrics.monthlyEmissionsSaved * deviceInfo.lifeExtension * deviceInfo.quantity).toFixed(1);
    const waterSaved = 
      ((metrics.waterSaved / 1000) * deviceInfo.quantity).toFixed(1); // Convert to cubic meters
    const rawMaterialsSaved = 
      (metrics.rawMaterialsSaved * deviceInfo.quantity).toFixed(2);
    const toxicWastePrevented = 
      (metrics.toxicWastePrevented * deviceInfo.quantity).toFixed(2);
    const treesEquivalent = 
      (emissionsSaved / 21).toFixed(1); // Each tree absorbs about 21kg CO2 per year

    return {
      emissionsSaved,
      waterSaved,
      rawMaterialsSaved,
      toxicWastePrevented,
      treesEquivalent,
    };
  };

  const impact = calculateImpact();
  return (
    <div id="impact-calculator-content" className="max-w-4xl mx-auto px-4 py-8" tabIndex="-1">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Environmental Impact Calculator</h2>
      <p className="text-gray-600 mb-8">
        See the positive environmental impact of extending the life of electronic devices instead of discarding them.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Device Information</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-1">
              Device Type
            </label>
            <select
              id="deviceType"
              name="deviceType"
              value={deviceInfo.deviceType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="smartphone">Smartphone</option>
              <option value="laptop">Laptop</option>
              <option value="tablet">Tablet</option>
              <option value="desktop">Desktop Computer</option>
              <option value="monitor">Monitor</option>
              <option value="printer">Printer</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="100"
              value={deviceInfo.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="lifeExtension" className="block text-sm font-medium text-gray-700 mb-1">
              Extended Life (months)
            </label>
            <input
              type="range"
              id="lifeExtension"
              name="lifeExtension"
              min="1"
              max="36"
              value={deviceInfo.lifeExtension}
              onChange={handleInputChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>{deviceInfo.lifeExtension} months</span>
              <span>36</span>
            </div>
          </div>
        </div>
      </div>

      {impact && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-6 text-center">Environmental Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
              <div className="text-3xl text-green-600 font-bold">{impact.emissionsSaved} kg</div>
              <div className="text-sm text-gray-600 mt-1">CO₂ emissions avoided</div>
              <div className="text-xs text-gray-500 mt-2">
                Equivalent to {impact.treesEquivalent} trees absorbing CO₂ for a year
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <div className="text-3xl text-blue-600 font-bold">{impact.waterSaved} m³</div>
              <div className="text-sm text-gray-600 mt-1">Water saved</div>
              <div className="text-xs text-gray-500 mt-2">
                That's approximately {(impact.waterSaved * 1000 / 150).toFixed(0)} showers worth of water
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <div className="text-3xl text-purple-600 font-bold">{impact.toxicWastePrevented} kg</div>
              <div className="text-sm text-gray-600 mt-1">Toxic waste prevented</div>
              <div className="text-xs text-gray-500 mt-2">
                Including heavy metals and hazardous chemicals
              </div>
            </div>
          </div>
            <div className="text-center mt-6">
            <p className="text-gray-700 mb-4">
              By giving this device a second life, you're making a real difference!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button>
                Share Your Impact
              </Button>
              <Button variant="outline">
                Generate Certificate
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Resource Hub Connection */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Learn More About E-Waste Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="p-4">
              <img 
                src="/assets/resources/ewaste-crisis.jpg" 
                alt="E-Waste Crisis" 
                className="w-full h-40 object-cover rounded mb-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/300x150/e2e8f0/475569?text=E-Waste+Crisis';
                }}
              />
              <h4 className="font-medium text-gray-900 mb-2">The Growing E-Waste Crisis</h4>
              <p className="text-gray-600 text-sm mb-3">
                Learn about the increasing problem of electronic waste and its global implications.
              </p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/resources?topic=ewaste'}>
                Read Article
              </Button>
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <img 
                src="/assets/resources/recycling-guide.jpg" 
                alt="Proper Recycling Guide" 
                className="w-full h-40 object-cover rounded mb-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/300x150/e2e8f0/475569?text=Recycling+Guide';
                }}
              />
              <h4 className="font-medium text-gray-900 mb-2">Proper E-Waste Recycling Guide</h4>
              <p className="text-gray-600 text-sm mb-3">
                Step-by-step guide to ensure your electronics are recycled responsibly.
              </p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/resources?topic=recycling'}>
                View Guide
              </Button>
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <img 
                src="/assets/resources/digital-divide.jpg" 
                alt="Digital Divide Impact" 
                className="w-full h-40 object-cover rounded mb-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/300x150/e2e8f0/475569?text=Digital+Divide';
                }}
              />
              <h4 className="font-medium text-gray-900 mb-2">Bridging the Digital Divide</h4>
              <p className="text-gray-600 text-sm mb-3">
                How reusing electronics helps provide access to technology for underserved communities.
              </p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/resources?topic=digital-divide'}>
                Read Article
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;
