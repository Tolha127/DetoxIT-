// src/components/pages/DeviceCatalog.jsx
import React, { useState } from 'react';
import Card from '../common/Card';

const DeviceCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'laptops',
    'smartphones',
    'tablets',
    'desktop computers',
  ];

  // Example devices data
  const devices = [
    {
      id: 1,
      name: 'MacBook Pro 2019',
      category: 'laptops',
      condition: 'Good',
      description: '13-inch, 8GB RAM, 256GB SSD',
      image: '/assets/devices/macbook.jpg',
    },
    {
      id: 2,
      name: 'iPhone 11',
      category: 'smartphones',
      condition: 'Excellent',
      description: '64GB, Black',
      image: '/assets/devices/iphone.jpg',
    },
    // Add more devices as needed
  ];

  const filteredDevices = devices.filter(
    (device) =>
      (selectedCategory === 'all' || device.category === selectedCategory) &&
      device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-12 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-12 mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Available Devices</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Browse through our collection of available devices ready to find a new home
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search devices..."
            className="p-2 border rounded-md flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <Card key={device.id}>
            <div className="p-4">
              <img
                src={device.image}
                alt={device.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{device.name}</h3>
              <p className="text-gray-600 mb-2">{device.description}</p>
              <div className="flex justify-between items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {device.condition}
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Request
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeviceCatalog;