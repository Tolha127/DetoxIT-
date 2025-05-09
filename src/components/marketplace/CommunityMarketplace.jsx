// src/components/marketplace/CommunityMarketplace.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CommunityMarketplace = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('grid');
  
  // Mock data for marketplace listings
  const listings = [
    {
      id: 1,
      title: 'MacBook Pro 2018 - Parts Only',
      category: 'laptops',
      condition: 'For Parts',
      price: 120,
      location: 'Brooklyn, NY',
      distance: 4.2,
      seller: {
        name: 'Michael T.',
        rating: 4.8,
        verified: true,
      },
      images: ['/assets/marketplace/macbook-parts.jpg'],
      description: 'MacBook Pro 2018 with water damage. Screen and keyboard don\'t work, but logic board, SSD and other components are still functional.',
      listedDate: '2025-05-02T15:30:00',
      type: 'sale',
      featured: false,
    },
    {
      id: 2,
      title: 'Broken iPhone Screens - Bulk Lot',
      category: 'smartphones',
      condition: 'Broken',
      price: 75,
      location: 'Queens, NY',
      distance: 7.8,
      seller: {
        name: 'RecycleTech',
        rating: 4.9,
        verified: true,
      },
      images: ['/assets/marketplace/iphone-screens.jpg'],
      description: 'Lot of 20 broken iPhone screens from various models (6-11). Good for parts, repair practice, or craft projects.',
      listedDate: '2025-05-05T10:15:00',
      type: 'sale',
      featured: true,
    },
    {
      id: 3,
      title: 'Looking for Laptop RAM - 8GB DDR4',
      category: 'components',
      condition: 'Any',
      price: 30,
      location: 'Manhattan, NY',
      distance: 2.3,
      seller: {
        name: 'Alex R.',
        rating: 4.6,
        verified: false,
      },
      images: ['/assets/marketplace/ram-wanted.jpg'],
      description: 'Looking for 8GB DDR4 laptop RAM to upgrade my old computer. Willing to pay up to $30 for working modules.',
      listedDate: '2025-05-07T14:20:00',
      type: 'wanted',
      featured: false,
    },
    {
      id: 4,
      title: 'Dell Monitor - Working but Scratched',
      category: 'monitors',
      condition: 'Used',
      price: 45,
      location: 'Bronx, NY',
      distance: 10.6,
      seller: {
        name: 'Jasmine W.',
        rating: 4.2,
        verified: true,
      },
      images: ['/assets/marketplace/dell-monitor.jpg'],
      description: 'Dell 24" monitor with scratch across the screen. Still works perfectly, selling cheap. Great for second display or less-demanding use.',
      listedDate: '2025-05-08T09:45:00',
      type: 'sale',
      featured: false,
    },
    {
      id: 5,
      title: 'Bulk Computer Fans - Working',
      category: 'components',
      condition: 'Used',
      price: 25,
      location: 'Staten Island, NY',
      distance: 15.1,
      seller: {
        name: 'PCParts',
        rating: 4.7,
        verified: true,
      },
      images: ['/assets/marketplace/computer-fans.jpg'],
      description: 'Lot of 15 working computer case and CPU fans. Pulled from working systems during upgrades. Various sizes and models.',
      listedDate: '2025-05-01T11:30:00',
      type: 'sale',
      featured: false,
    },
    {
      id: 6,
      title: 'Samsung Galaxy S8 - Cracked Screen',
      category: 'smartphones',
      condition: 'Damaged',
      price: 60,
      location: 'Manhattan, NY',
      distance: 3.2,
      seller: {
        name: 'David P.',
        rating: 4.5,
        verified: true,
      },
      images: ['/assets/marketplace/galaxy-cracked.jpg'],
      description: 'Samsung Galaxy S8 with cracked screen but otherwise working perfectly. Factory reset and ready to use or repair.',
      listedDate: '2025-05-06T16:40:00',
      type: 'sale',
      featured: false,
    },
    {
      id: 7,
      title: 'Seeking Old Mechanical Keyboards for Parts',
      category: 'peripherals',
      condition: 'Any',
      price: 20,
      location: 'Brooklyn, NY',
      distance: 5.3,
      seller: {
        name: 'KeyboardRestorer',
        rating: 5.0,
        verified: true,
      },
      images: ['/assets/marketplace/mech-keyboard.jpg'],
      description: 'Looking for old mechanical keyboards in any condition for restoration projects. Particularly interested in IBM, Cherry, and Alps switches.',
      listedDate: '2025-05-04T08:15:00',
      type: 'wanted',
      featured: true,
    },
    {
      id: 8,
      title: 'Miscellaneous PC Parts Lot',
      category: 'components',
      condition: 'Mixed',
      price: 100,
      location: 'Queens, NY',
      distance: 8.9,
      seller: {
        name: 'ComputerSalvage',
        rating: 4.6,
        verified: true,
      },
      images: ['/assets/marketplace/pc-parts-lot.jpg'],
      description: 'Mixed lot of PC components including motherboards, CPUs, RAM, and more. Some working, some for parts only. Great for DIY projects or repairs.',
      listedDate: '2025-05-03T13:10:00',
      type: 'sale',
      featured: false,
    },
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'laptops', name: 'Laptops & Parts' },
    { id: 'smartphones', name: 'Phones & Tablets' },
    { id: 'components', name: 'Computer Components' },
    { id: 'monitors', name: 'Monitors & Displays' },
    { id: 'peripherals', name: 'Peripherals' },
    { id: 'other', name: 'Other Electronics' },
  ];

  // Filter listings
  const filteredListings = listings.filter(listing => {
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || listing.category === selectedCategory;
    
    // Filter by price range
    const priceMatch = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && priceMatch && searchMatch;
  });

  // Sort listings with featured items first
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then sort by date (newest first)
    return new Date(b.listedDate) - new Date(a.listedDate);
  });

  // Helper function to format the date
  const formatListingDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Render grid view
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img 
                  src={listing.images[0] || '/assets/placeholder.jpg'} 
                  alt={listing.title}
                  className="object-cover w-full h-full"
                />
              </div>
              
              {/* Type badge (Sale or Wanted) */}
              <div className={`absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white ${
                listing.type === 'sale' ? 'bg-blue-600' : 'bg-purple-600'
              }`}>
                {listing.type === 'sale' ? 'FOR SALE' : 'WANTED'}
              </div>
              
              {/* Featured tag */}
              {listing.featured && (
                <div className="absolute top-0 right-0 px-2 py-1 bg-yellow-500 text-white text-xs font-bold">
                  FEATURED
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{listing.title}</h3>
                <span className="font-bold text-green-600">${listing.price}</span>
              </div>
              
              <div className="flex items-center mb-3">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                  listing.condition === 'For Parts' ? 'bg-red-100 text-red-700' :
                  listing.condition === 'Broken' || listing.condition === 'Damaged' ? 'bg-yellow-100 text-yellow-700' :
                  listing.condition === 'Used' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {listing.condition}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {formatListingDate(listing.listedDate)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{listing.description}</p>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{listing.location} ({listing.distance} mi)</span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600">{listing.seller.rating}</span>
                  </div>
                  {listing.seller.verified && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <Button>View Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render list view
  const renderListView = () => {
    return (
      <div className="space-y-4">
        {sortedListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 relative">
                <div className="aspect-w-4 aspect-h-3 md:h-full bg-gray-200">
                  <img 
                    src={listing.images[0] || '/assets/placeholder.jpg'} 
                    alt={listing.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                {/* Type badge (Sale or Wanted) */}
                <div className={`absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white ${
                  listing.type === 'sale' ? 'bg-blue-600' : 'bg-purple-600'
                }`}>
                  {listing.type === 'sale' ? 'FOR SALE' : 'WANTED'}
                </div>
                
                {/* Featured tag */}
                {listing.featured && (
                  <div className="absolute top-0 right-0 px-2 py-1 bg-yellow-500 text-white text-xs font-bold">
                    FEATURED
                  </div>
                )}
              </div>
              
              <div className="md:w-3/4 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        listing.condition === 'For Parts' ? 'bg-red-100 text-red-700' :
                        listing.condition === 'Broken' || listing.condition === 'Damaged' ? 'bg-yellow-100 text-yellow-700' :
                        listing.condition === 'Used' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {listing.condition}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatListingDate(listing.listedDate)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Category: {categories.find(c => c.id === listing.category)?.name || listing.category}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-lg text-green-600">${listing.price}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{listing.description}</p>
                
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{listing.location} ({listing.distance} mi)</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <span className="mr-1">Seller:</span>
                      <span className="font-medium">{listing.seller.name}</span>
                      {listing.seller.verified && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-600">{listing.seller.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-0">
                    <Button>View Details</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render guided search for marketplace section
  const renderMarketplaceGuidedSearch = () => {
    return (
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">I'm looking for...</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Working Parts</h4>
                <p className="text-xs text-gray-500">Functional components for repairs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Latest Listings</h4>
                <p className="text-xs text-gray-500">Most recent items added</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Deals Under $50</h4>
                <p className="text-xs text-gray-500">Budget-friendly options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Community Marketplace</h1>
          <p className="text-xl mb-6 opacity-90">
            Buy, sell, or request tech components for repairs, upcycling, and creative projects.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for parts, components, and more..."
              className="w-full px-4 py-3 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-4 px-6 font-medium text-lg ${
            activeTab === 'marketplace'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('marketplace')}
        >
          Parts Marketplace
        </button>
        <button
          className={`py-4 px-6 font-medium text-lg ${
            activeTab === 'repair'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('repair')}
        >
          Repair Services
        </button>
      </div>

      {activeTab === 'marketplace' ? (
        <>
          {/* Marketplace guided search */}
          {renderMarketplaceGuidedSearch()}
          
          {/* Main content area with sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-5 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                
                {/* Category filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-600">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price range filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>$0</span>
                      <span>Up to ${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Listing type filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Listing Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">For Sale</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">Wanted</span>
                    </label>
                  </div>
                </div>
                
                {/* Condition filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Condition</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">Used (Working)</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">Damaged</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">For Parts Only</span>
                    </label>
                  </div>
                </div>
                
                {/* Distance filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Distance</h4>
                  <div className="px-2">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      defaultValue={25}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>1 mile</span>
                      <span>50 miles</span>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col space-y-2">
                  <Button>Apply Filters</Button>
                  <Button variant="outline">Reset</Button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:w-3/4">
              {/* Results controls */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600">
                    Showing <span className="font-medium">{sortedListings.length}</span> results
                  </p>
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="text-sm text-gray-600">Sort by:</div>
                  <select className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option value="newest">Newest</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="condition">Condition</option>
                  </select>
                  <div className="flex border rounded overflow-hidden">
                    <button
                      className={`p-2 ${viewType === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
                      onClick={() => setViewType('grid')}
                      title="Grid View"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      className={`p-2 ${viewType === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
                      onClick={() => setViewType('list')}
                      title="List View"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Listings */}
              {sortedListings.length > 0 ? (
                viewType === 'grid' ? renderGridView() : renderListView()
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium text-yellow-700 mb-2">No listings found</h3>
                  <p className="text-yellow-600">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
              
              {/* Add new listing button - fixed position */}
              <div className="fixed bottom-10 right-10">
                <button className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Repair Services Tab Content (simplified for demo)
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Repair Services Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            Connect with repair specialists in your area who can help extend device lifespans.
          </p>
          <Button variant="outline">Get Notified When Available</Button>
        </div>
      )}
        {/* Feature Integration Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-center">Maximize Your Device's Potential</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-100">
            <div className="h-12 w-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-medium text-center mb-3">Check Device Health</h4>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Unsure about your device's condition? Run our diagnostics to find out which parts need attention.
            </p>
            <Link to="/diagnostics" className="block">
              <Button variant="outline" className="w-full">
                Run Diagnostics
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg p-5 shadow-sm border border-green-100">
            <div className="h-12 w-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h4 className="font-medium text-center mb-3">Calculate Your Impact</h4>
            <p className="text-sm text-gray-600 mb-4 text-center">
              See the environmental impact of buying used parts instead of new components.
            </p>
            <Link to="/impact" className="block">
              <Button variant="outline" className="w-full">
                Calculate Impact
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg p-5 shadow-sm border border-purple-100">
            <div className="h-12 w-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="font-medium text-center mb-3">Learn Repair Skills</h4>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Access educational resources to learn how to repair and maintain your devices.
            </p>
            <Link to="/resources?topic=repair" className="block">
              <Button variant="outline" className="w-full">
                View Guides
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Community guidelines */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Community Marketplace Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex">
            <div className="mr-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium mb-1">Safety First</h4>
              <p className="text-sm text-gray-600">Always meet in public places and inspect items before purchase.</p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium mb-1">Accurate Descriptions</h4>
              <p className="text-sm text-gray-600">Be honest about condition and any defects in your listings.</p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium mb-1">Recycling Focus</h4>
              <p className="text-sm text-gray-600">Our marketplace aims to reduce e-waste through reuse and repair.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityMarketplace;
