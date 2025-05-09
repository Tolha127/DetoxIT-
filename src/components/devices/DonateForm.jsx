// src/components/devices/DonateForm.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const DonateForm = () => {
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    condition: '',
    description: '',
    images: [],
  });

  const conditions = ['Excellent', 'Good', 'Fair', 'Needs Repair'];
  const deviceTypes = [
    'Laptop',
    'Desktop Computer',
    'Smartphone',
    'Tablet',
    'Monitor',
    'Printer',
    'Other',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Donation form data:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  return (
    <div className="pt-12">      {/* Header with gradient */}
      <div className="w-full bg-gradient-to-r from-teal-500 to-blue-500 py-12 mb-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Donate a Device</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your unused technology could help someone in need
          </p>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Device Type
          </label>
          <select            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
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
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Condition
          </label>
          <select            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select condition</option>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="Please provide details about the device's specifications and any issues..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Device Images
          </label>
          <input            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Submit Donation
        </Button>
      </form>
    </div>
    </div>
  );
};

export default DonateForm;