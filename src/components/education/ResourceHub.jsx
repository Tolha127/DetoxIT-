// src/components/education/ResourceHub.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';

const ResourceHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'ewaste', name: 'E-Waste Facts' },
    { id: 'recycling', name: 'Proper Recycling' },
    { id: 'repair', name: 'Repair Guides' },
    { id: 'impact', name: 'Environmental Impact' },
    { id: 'digital-divide', name: 'Digital Divide' },
  ];
  
  const resources = [
    {
      id: 1,
      title: 'The Growing E-Waste Crisis',
      description: 'Learn about the increasing problem of electronic waste and its global implications.',
      category: 'ewaste',
      resourceType: 'article',
      readTime: '5 min read',
      image: '/assets/resources/ewaste-crisis.jpg',
      featured: true,
    },
    {
      id: 2,
      title: 'How to Properly Wipe Your Device Before Donation',
      description: 'Step-by-step guide to ensure all personal data is removed from your device.',
      category: 'recycling',
      resourceType: 'tutorial',
      readTime: '7 min read',
      image: '/assets/resources/data-wipe.jpg',
      featured: false,
    },
    {
      id: 3,
      title: 'DIY Battery Replacement for Common Smartphones',
      description: 'Learn how to safely replace batteries in popular smartphone models.',
      category: 'repair',
      resourceType: 'video',
      readTime: '15 min watch',
      image: '/assets/resources/battery-repair.jpg',
      featured: false,
    },
    {
      id: 4,
      title: 'Environmental Impact of Smartphone Manufacturing',
      description: 'Understand the resources required to produce a single smartphone.',
      category: 'impact',
      resourceType: 'infographic',
      readTime: '3 min read',
      image: '/assets/resources/phone-manufacturing.jpg',
      featured: false,
    },
    {
      id: 5,
      title: 'Bridging the Digital Divide: Why Tech Access Matters',
      description: 'Exploring how access to technology affects education, employment, and quality of life.',
      category: 'digital-divide',
      resourceType: 'article',
      readTime: '6 min read',
      image: '/assets/resources/digital-divide.jpg',
      featured: true,
    },
    {
      id: 6,
      title: 'Hazardous Materials in Electronics and Their Effects',
      description: 'Learn about the dangerous substances in e-waste and why proper disposal is critical.',
      category: 'ewaste',
      resourceType: 'article',
      readTime: '8 min read',
      image: '/assets/resources/hazardous-materials.jpg',
      featured: false,
    },
    {
      id: 7,
      title: 'Common Laptop Issues and Their Solutions',
      description: 'Troubleshooting guide for the most frequent laptop problems.',
      category: 'repair',
      resourceType: 'tutorial',
      readTime: '10 min read',
      image: '/assets/resources/laptop-repair.jpg',
      featured: false,
    },
    {
      id: 8,
      title: 'Finding Certified E-waste Recyclers Near You',
      description: 'How to locate and verify legitimate electronic recycling facilities.',
      category: 'recycling',
      resourceType: 'guide',
      readTime: '4 min read',
      image: '/assets/resources/recycling-centers.jpg',
      featured: false,
    },
    {
      id: 9,
      title: 'The Carbon Footprint of Your Digital Life',
      description: 'Calculating the environmental cost of everyday technology use.',
      category: 'impact',
      resourceType: 'calculator',
      readTime: 'Interactive',
      image: '/assets/resources/carbon-footprint.jpg',
      featured: true,
    },
    {
      id: 10,
      title: 'Technology Access in Underserved Communities',
      description: 'Case studies on technology initiatives in disadvantaged areas.',
      category: 'digital-divide',
      resourceType: 'research',
      readTime: '12 min read',
      image: '/assets/resources/underserved-tech.jpg',
      featured: false,
    },
    {
      id: 11,
      title: 'Extending Your Phones Lifespan: Simple Maintenance Tips',
      description: 'Easy ways to make your smartphone last longer and perform better.',
      category: 'repair',
      resourceType: 'guide',
      readTime: '5 min read',
      image: '/assets/resources/phone-maintenance.jpg',
      featured: false,
    },
    {
      id: 12,
      title: 'E-Waste Legislation Around the World',
      description: 'Compare how different countries regulate electronic waste.',
      category: 'ewaste',
      resourceType: 'article',
      readTime: '9 min read',
      image: '/assets/resources/ewaste-laws.jpg',
      featured: false,
    },
  ];
  
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const featuredResources = filteredResources.filter(resource => resource.featured);

  // Function to get appropriate badge color for resource type
  const getBadgeColor = (resourceType) => {
    switch (resourceType) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'tutorial':
        return 'bg-green-100 text-green-800';
      case 'guide':
        return 'bg-purple-100 text-purple-800';
      case 'infographic':
        return 'bg-yellow-100 text-yellow-800';
      case 'calculator':
        return 'bg-indigo-100 text-indigo-800';
      case 'research':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">      <div className="bg-gradient-to-r from-teal-600 to-blue-500 rounded-lg p-8 mb-10 text-white shadow-md">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">E-Waste Education Hub</h1>
          <p className="text-xl mb-6">
            Explore our comprehensive resources about electronic waste, device repair, environmental impact, 
            and the importance of technology access.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && activeCategory === 'all' && !searchTerm && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={resource.image || '/assets/placeholder.jpg'}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getBadgeColor(resource.resourceType)}`}>
                      {resource.resourceType.charAt(0).toUpperCase() + resource.resourceType.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{resource.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <Button variant="outline">Read More</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {activeCategory !== 'all' 
            ? `${categories.find(c => c.id === activeCategory).name}`
            : searchTerm 
              ? 'Search Results' 
              : 'All Resources'
          }
        </h2>
        
        {filteredResources.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-yellow-700 mb-2">No resources found</h3>
            <p className="text-yellow-600">
              Try adjusting your search terms or selecting a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gray-200">
                  <img
                    src={resource.image || '/assets/placeholder.jpg'}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getBadgeColor(resource.resourceType)}`}>
                      {resource.resourceType.charAt(0).toUpperCase() + resource.resourceType.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{resource.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Category: {categories.find(c => c.id === resource.category).name}
                    </span>
                    <Button size="sm" variant="outline">Read More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integration with Diagnostics Tools */}
      <div className="mt-16 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-8 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Apply Your Knowledge</h2>
              <p className="text-gray-600 mb-4">
                Ready to put what you've learned into practice? Use our diagnostic tools to check your device's health and make informed decisions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">                  <div className="flex-shrink-0 bg-teal-100 rounded-full p-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-md font-medium text-gray-900">Check Device Health</h3>
                    <p className="text-sm text-gray-500">Run comprehensive diagnostics to evaluate your device's condition</p>
                  </div>
                </div>
                <div className="flex items-start">                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-md font-medium text-gray-900">Calculate Environmental Impact</h3>
                    <p className="text-sm text-gray-500">See how much of a difference your device reuse makes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-100 rounded-full p-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-md font-medium text-gray-900">Find Parts or Replacements</h3>
                    <p className="text-sm text-gray-500">Browse our community marketplace for components</p>
                  </div>
                </div>
              </div>              <div className="mt-6">
                <Link to="/diagnostics">
                  <Button variant="primary">
                    Start Device Diagnostics
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-6 lg:mt-0">
              <img 
                src="/assets/resources/diagnostics-preview.jpg" 
                alt="Diagnostics Tools" 
                className="rounded-lg shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/e2e8f0/475569?text=Diagnostics+Tools';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest resources, tips, and e-waste news
          </p>          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Button variant="primary">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
