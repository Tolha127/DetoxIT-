// src/components/diagnostics/DeviceDiagnostics.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const DeviceDiagnostics = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [diagnosticsData, setDiagnosticsData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    year: '',
    powerOn: null,
    batteryHealth: null,
    screenCondition: null,
    inputsWorking: null,
    storageWorking: null,
    internetConnectivity: null,
    audioWorking: null,
    additionalIssues: '',
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setDiagnosticsData({
        ...diagnosticsData,
        [name]: value === 'true', // Convert to boolean
      });
    } else {
      setDiagnosticsData({
        ...diagnosticsData,
        [name]: value,
      });
    }
  };

  const deviceTypes = [
    'Laptop',
    'Desktop',
    'Smartphone',
    'Tablet',
    'Monitor',
    'Printer',
    'Other',
  ];

  const steps = [
    {
      title: 'Device Information',
      fields: ['deviceType', 'brand', 'model', 'year'],
    },
    {
      title: 'Basic Functions',
      fields: ['powerOn', 'batteryHealth'],
    },
    {
      title: 'Display & Input',
      fields: ['screenCondition', 'inputsWorking'],
    },
    {
      title: 'Storage & Connectivity',
      fields: ['storageWorking', 'internetConnectivity', 'audioWorking'],
    },
    {
      title: 'Additional Issues',
      fields: ['additionalIssues'],
    },
  ];

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      generateResults();
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const isStepComplete = () => {
    const currentFields = steps[activeStep].fields;
    
    // Check if any required field is empty
    return !currentFields.some(field => {
      const value = diagnosticsData[field];
      
      // For boolean fields (like powerOn), check if they're null
      if (typeof value === 'boolean' || value === null) {
        return value === null;
      }
      
      // For additional issues, always allow (it's optional)
      if (field === 'additionalIssues') {
        return false;
      }
      
      // For string fields, check if empty
      return value === '';
    });
  };

  const calculateScore = (data) => {
    let score = 0;
    let maxScore = 0;
    let details = {};

    // Power on is essential
    if (data.powerOn) {
      score += 25;
    } else {
      return { score: 0, maxScore: 100, percentage: 0, condition: 'Non-functional', details: { 
        powerOn: { label: 'Power', status: 'critical', message: 'Device does not power on' }
      }};
    }
    maxScore += 25;

    // Battery health (only applies to portable devices)
    if (['Laptop', 'Smartphone', 'Tablet'].includes(data.deviceType)) {
      if (data.batteryHealth) {
        score += 15;
        details.batteryHealth = { label: 'Battery', status: 'good', message: 'Battery holds charge' };
      } else {
        details.batteryHealth = { label: 'Battery', status: 'warning', message: 'Battery needs replacement' };
      }
      maxScore += 15;
    } else {
      details.batteryHealth = { label: 'Battery', status: 'na', message: 'Not applicable' };
    }

    // Screen condition
    if (data.screenCondition === true) {
      score += 20;
      details.screenCondition = { label: 'Display', status: 'good', message: 'Screen works properly' };
    } else if (data.screenCondition === false) {
      details.screenCondition = { label: 'Display', status: 'warning', message: 'Screen has issues' };
    } else {
      details.screenCondition = { label: 'Display', status: 'unknown', message: 'Not tested' };
    }
    maxScore += 20;

    // Input devices
    if (data.inputsWorking === true) {
      score += 15;
      details.inputsWorking = { label: 'Input devices', status: 'good', message: 'Keyboard/touchpad/mouse work properly' };
    } else if (data.inputsWorking === false) {
      details.inputsWorking = { label: 'Input devices', status: 'warning', message: 'Input devices have issues' };
    } else {
      details.inputsWorking = { label: 'Input devices', status: 'unknown', message: 'Not tested' };
    }
    maxScore += 15;

    // Storage
    if (data.storageWorking === true) {
      score += 15;
      details.storageWorking = { label: 'Storage', status: 'good', message: 'Storage works properly' };
    } else if (data.storageWorking === false) {
      details.storageWorking = { label: 'Storage', status: 'warning', message: 'Storage has issues' };
    } else {
      details.storageWorking = { label: 'Storage', status: 'unknown', message: 'Not tested' };
    }
    maxScore += 15;

    // Internet connectivity
    if (data.internetConnectivity === true) {
      score += 10;
      details.internetConnectivity = { label: 'Internet', status: 'good', message: 'Internet connectivity works' };
    } else if (data.internetConnectivity === false) {
      details.internetConnectivity = { label: 'Internet', status: 'warning', message: 'Internet connectivity issues' };
    } else {
      details.internetConnectivity = { label: 'Internet', status: 'unknown', message: 'Not tested' };
    }
    maxScore += 10;

    // Audio
    if (data.audioWorking === true) {
      score += 10;
      details.audioWorking = { label: 'Audio', status: 'good', message: 'Audio works properly' };
    } else if (data.audioWorking === false) {
      details.audioWorking = { label: 'Audio', status: 'warning', message: 'Audio has issues' };
    } else {
      details.audioWorking = { label: 'Audio', status: 'unknown', message: 'Not tested' };
    }
    maxScore += 10;

    // Calculate percentage and determine condition
    const percentage = Math.round((score / maxScore) * 100);
    let condition = '';

    if (percentage >= 90) condition = 'Excellent';
    else if (percentage >= 75) condition = 'Good';
    else if (percentage >= 50) condition = 'Fair';
    else if (percentage >= 25) condition = 'Needs Repair';
    else condition = 'Non-functional';

    return {
      score,
      maxScore,
      percentage,
      condition,
      details,
    };
  };

  const generateResults = () => {
    const evaluationResults = calculateScore(diagnosticsData);
    
    // Calculate approximate value range based on device type, condition, and age
    let valueEstimate = { low: 0, high: 0 };
    const currentYear = new Date().getFullYear();
    const deviceAge = currentYear - parseInt(diagnosticsData.year || currentYear);
    
    // Base value ranges by device type (in good condition)
    const baseValues = {
      'Laptop': { low: 150, high: 400 },
      'Desktop': { low: 150, high: 500 },
      'Smartphone': { low: 100, high: 300 },
      'Tablet': { low: 80, high: 250 },
      'Monitor': { low: 50, high: 150 },
      'Printer': { low: 40, high: 120 },
      'Other': { low: 30, high: 100 },
    };
    
    // Adjust for condition
    if (diagnosticsData.deviceType) {
      const baseValue = baseValues[diagnosticsData.deviceType] || baseValues['Other'];
      
      // Adjust for condition percentage
      valueEstimate.low = Math.round(baseValue.low * (evaluationResults.percentage / 100));
      valueEstimate.high = Math.round(baseValue.high * (evaluationResults.percentage / 100));
      
      // Adjust for age (depreciation)
      const ageFactor = Math.max(0.3, 1 - (deviceAge * 0.15)); // Minimum 30% of original value
      valueEstimate.low = Math.round(valueEstimate.low * ageFactor);
      valueEstimate.high = Math.round(valueEstimate.high * ageFactor);
    }
    
    // Generate recommendations
    let recommendations = [];
    const details = evaluationResults.details;
    
    if (!diagnosticsData.powerOn) {
      recommendations.push('Consider professional diagnostic for power issues');
    }
    
    if (details.batteryHealth?.status === 'warning') {
      recommendations.push('Battery replacement recommended');
    }
    
    if (details.screenCondition?.status === 'warning') {
      recommendations.push('Screen repair or replacement may be needed');
    }
    
    if (details.inputsWorking?.status === 'warning') {
      recommendations.push('Input device repair or cleaning recommended');
    }
    
    if (details.storageWorking?.status === 'warning') {
      recommendations.push('Storage device may need replacement');
    }
    
    if (evaluationResults.percentage < 50) {
      recommendations.push('Consider donating for parts or proper recycling');
    } else {
      recommendations.push('Device is suitable for donation or continued use after addressing issues');
    }
    
    setResults({
      ...evaluationResults,
      valueEstimate,
      recommendations,
    });
  };

  const renderProgressSteps = () => {
    return (
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
            onClick={() => index < activeStep && setActiveStep(index)}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${index < activeStep ? 'bg-green-500 text-white' : 
                  index === activeStep ? 'bg-blue-500 text-white' : 
                  'bg-gray-200 text-gray-600'}
                ${index < activeStep ? 'cursor-pointer' : ''}
              `}
            >
              {index + 1}
            </div>
            <div className={`text-xs mt-1 ${index === activeStep ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFormStep = () => {
    const currentStep = steps[activeStep];
    
    switch (activeStep) {
      case 0: // Device Information
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-1">
                Device Type*
              </label>
              <select
                id="deviceType"
                name="deviceType"
                value={diagnosticsData.deviceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Device Type</option>
                {deviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand*
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={diagnosticsData.brand}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Apple, Dell, Samsung"
              />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                Model*
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={diagnosticsData.model}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. MacBook Pro, Inspiron 15, Galaxy S21"
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year*
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={diagnosticsData.year}
                onChange={handleInputChange}
                min="2000"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. 2019"
              />
            </div>
          </div>
        );
        
      case 1: // Basic Functions
        return (
          <div className="space-y-6">
            <div>
              <p className="font-medium text-gray-700 mb-2">Does the device power on?*</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="powerOn"
                    value="true"
                    checked={diagnosticsData.powerOn === true}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="powerOn"
                    value="false"
                    checked={diagnosticsData.powerOn === false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>
            
            {['Laptop', 'Smartphone', 'Tablet'].includes(diagnosticsData.deviceType) && (
              <div>
                <p className="font-medium text-gray-700 mb-2">Does the battery hold a charge?*</p>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="batteryHealth"
                      value="true"
                      checked={diagnosticsData.batteryHealth === true}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="batteryHealth"
                      value="false"
                      checked={diagnosticsData.batteryHealth === false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">If the device doesn't have a battery or you're unsure, select "No"</p>
              </div>
            )}
            
            {!['Laptop', 'Smartphone', 'Tablet'].includes(diagnosticsData.deviceType) && diagnosticsData.deviceType && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Battery health check is not applicable for this device type.</p>
              </div>
            )}
          </div>
        );
        
      case 2: // Display & Input
        return (
          <div className="space-y-6">
            <div>
              <p className="font-medium text-gray-700 mb-2">Is the screen/display working properly?*</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="screenCondition"
                    value="true"
                    checked={diagnosticsData.screenCondition === true}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes, fully functional</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="screenCondition"
                    value="false"
                    checked={diagnosticsData.screenCondition === false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No, has issues</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">Check for dead pixels, cracks, color issues, touch responsiveness</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-700 mb-2">Are input devices working properly?*</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputsWorking"
                    value="true"
                    checked={diagnosticsData.inputsWorking === true}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputsWorking"
                    value="false"
                    checked={diagnosticsData.inputsWorking === false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">Keyboard, touchpad, mouse, touchscreen, buttons, etc.</p>
            </div>
          </div>
        );
        
      case 3: // Storage & Connectivity
        return (
          <div className="space-y-6">
            <div>
              <p className="font-medium text-gray-700 mb-2">Does the storage work properly?*</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="storageWorking"
                    value="true"
                    checked={diagnosticsData.storageWorking === true}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="storageWorking"
                    value="false"
                    checked={diagnosticsData.storageWorking === false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">Can the device read/write files properly?</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-700 mb-2">Does internet connectivity work?*</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="internetConnectivity"
                    value="true"
                    checked={diagnosticsData.internetConnectivity === true}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="internetConnectivity"
                    value="false"
                    checked={diagnosticsData.internetConnectivity === false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">WiFi, Ethernet, Cellular data connectivity</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-700 mb-2">Does audio work properly?*</p>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="audioWorking"
                    value="true"
                    checked={diagnosticsData.audioWorking === true}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="audioWorking"
                    value="false"
                    checked={diagnosticsData.audioWorking === false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">Speakers, microphone, headphone jack</p>
            </div>
          </div>
        );
        
      case 4: // Additional Issues
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="additionalIssues" className="block text-sm font-medium text-gray-700 mb-1">
                Any other issues or notes? (Optional)
              </label>
              <textarea
                id="additionalIssues"
                name="additionalIssues"
                value={diagnosticsData.additionalIssues}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe any other issues, cosmetic damage, or additional information about the device"
              ></textarea>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const renderStatusIndicator = (status) => {
    switch (status) {
      case 'good':
        return (
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            Good
          </div>
        );
      case 'warning':
        return (
          <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
            Issue
          </div>
        );
      case 'critical':
        return (
          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
            Critical
          </div>
        );
      case 'na':
        return (
          <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
            N/A
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
            Unknown
          </div>
        );
    }
  };

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Diagnostic Results</h2>
          <Button
            onClick={() => {
              setActiveStep(0);
              setResults(null);
            }}
            variant="outline"
          >
            Start New Diagnostic
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {diagnosticsData.brand} {diagnosticsData.model} ({diagnosticsData.year})
                </h3>
                <p className="text-gray-600">{diagnosticsData.deviceType}</p>
              </div>
              <div className="mt-3 md:mt-0 bg-gray-100 px-4 py-2 rounded-full">
                <span className="font-semibold">{results.percentage}%</span> Overall Score
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex justify-between text-sm">
                <div className="text-gray-600">Device Condition:</div>
                <div className={`font-medium ${
                  results.percentage >= 75 ? 'text-green-600' : 
                  results.percentage >= 50 ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {results.condition}
                </div>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className={`h-2 rounded-full ${
                    results.percentage >= 75 ? 'bg-green-500' : 
                    results.percentage >= 50 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${results.percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Component Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(results.details).map(([key, detail]) => (
                  <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <div className="text-gray-700">{detail.label}</div>
                    <div className="flex items-center">
                      {renderStatusIndicator(detail.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Estimated Value</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ${results.valueEstimate.low} - ${results.valueEstimate.high}
                  </span>
                </div>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Based on condition, age, and market trends
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-blue-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Save Report
              </Button>
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0v3H7V4h6zm-5 7a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 110 2 1 1 0 010-2z" clipRule="evenodd" />
                </svg>
                Print Report
              </Button>
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share Results
              </Button>
            </div>
          </div>
        </div>        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-3">What's Next?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h5 className="font-medium text-green-800 mb-2">Ready to Donate?</h5>
                <p className="text-sm text-gray-600 mb-4">
                  Help bridge the digital divide by donating your device to someone in need.
                </p>
                <Button>
                  Start Donation Process
                </Button>
              </div>
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h5 className="font-medium text-blue-800 mb-2">Need Repair Options?</h5>
                <p className="text-sm text-gray-600 mb-4">
                  Get information about repair services or DIY repair guides.
                </p>
                <Button variant="outline">
                  Find Repair Options
                </Button>
              </div>
              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <h5 className="font-medium text-yellow-800 mb-2">Find Replacement Parts</h5>
                <p className="text-sm text-gray-600 mb-4">
                  Browse our Community Marketplace for compatible parts.
                </p>
                <Link to={`/marketplace?searchQuery=${diagnosticsData.brand} ${diagnosticsData.model} parts`}>
                  <Button variant="outline" className="border-yellow-500 text-yellow-700 hover:bg-yellow-100">
                    Find Parts
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Next Steps
              </h4>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link to="/impact" className="text-sm text-blue-600 hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Calculate your environmental impact
                </Link>
                <Link to="/matching" className="text-sm text-blue-600 hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Find potential recipients
                </Link>
                <Link to="/resources" className="text-sm text-blue-600 hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Learn about proper recycling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">Device Health Check</h2>
        <p className="text-lg opacity-90">
          Diagnose your device condition and get recommendations for donation, repurposing, or recycling
        </p>
      </div>

      {results ? (
        renderResults()
      ) : (
        <>
          {renderProgressSteps()}
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">{steps[activeStep].title}</h3>
            {renderFormStep()}
          </div>
          
          <div className="flex justify-between">
            <Button 
              onClick={handlePrevStep}
              variant="outline"
              className={activeStep === 0 ? 'invisible' : ''}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={!isStepComplete()}
            >
              {activeStep === steps.length - 1 ? 'See Results' : 'Next'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceDiagnostics;
