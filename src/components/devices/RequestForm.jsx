// src/components/devices/RequestForm.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    deviceType: '',
    preferredBrand: '',
    budget: '',
    purpose: '',
    specifications: '',
    urgency: 'normal',
  });

  const deviceTypes = [
    'Laptop',
    'Desktop Computer',
    'Smartphone',
    'Tablet',
    'Monitor',
    'Printer',
    'Other',
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Not Urgent' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'Urgent' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Request form data:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-12">
      {/* Header with gradient */}
      <div className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Request a Device</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Let us know what technology you need and we'll try to match you with a donor
          </p>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Request Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Device Type
          </label>
          <select
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a device type</option>
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preferred Brand (Optional)
          </label>
          <input
            type="text"
            name="preferredBrand"
            value={formData.preferredBrand}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget Range (Optional)
          </label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g., $200-$500"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Intended Purpose
          </label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Please describe how you plan to use this device..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Required Specifications
          </label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="List any specific requirements (e.g., minimum RAM, storage, processor speed)..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Urgency Level
          </label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            {urgencyLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Submit Request
        </Button>
      </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;