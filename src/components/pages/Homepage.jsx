// src/components/pages/Homepage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';

const Homepage = () => {
  const features = [
    {
      title: 'Donate Devices',
      description: 'Give your old electronics a new purpose and help bridge the digital divide.',
      icon: '🎁',
      color: 'bg-blue-100',
    },
    {
      title: 'Request Devices',
      description: 'Find the technology you need from our network of trusted donors.',
      icon: '📱',
      color: 'bg-green-100',
    },
    {
      title: 'Track Impact',
      description: 'See exactly how your contributions reduce e-waste and help communities thrive.',
      icon: '📊',
      color: 'bg-purple-100',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Register',
      description: 'Create your free account in minutes and join our community.',
    },
    {
      number: '02',
      title: 'Donate or Request',
      description: 'List your device for donation or browse available technology.',
    },
    {
      number: '03',
      title: 'Connect',
      description: 'We facilitate secure handoffs between donors and recipients.',
    },
    {
      number: '04',
      title: 'Make an Impact',
      description: 'Track your contribution to sustainability and digital access.',
    },
  ];

  const testimonials = [
    {
      quote: "Thanks to DetoxIT, our school received 25 laptops that have transformed our computer lab. Our students now have the technology they need to learn essential digital skills.",
      name: "Maria Rodriguez",
      role: "Principal, Lincoln Elementary School",
      image: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=E74C3C&color=fff&size=120",
    },
    {
      quote: "I had several devices collecting dust in my closet. DetoxIT made it easy to donate them to people who really needed them. The process was simple and rewarding.",
      name: "James Wilson",
      role: "Tech Professional & Donor",
      image: "https://ui-avatars.com/api/?name=James+Wilson&background=3498DB&color=fff&size=120",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12">
      {/* Hero Section with Enhanced Design */}
      <section className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold tracking-wide">
                MAKING TECHNOLOGY ACCESSIBLE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Revolutionizing Electronic<br />Device Recycling
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Connect with donors and recipients to give electronic devices a second
              life while reducing e-waste and digital inequality
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/login">
                <Button variant="secondary" className="px-8 py-3 text-lg">
                  Donate a Device
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="primary" className="px-8 py-3 text-lg">
                  Request a Device
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects those with unused technology to those who need it, creating a sustainable cycle that benefits everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Card key={index} elevated={true} hoverable={true}>
                <div className="text-center p-8">
                  <div className={`text-5xl mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes it easy to donate or request electronic devices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-green-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-16 h-0.5 bg-gray-200 -ml-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section with Enhanced Design */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Together, we're making a difference in communities while protecting our planet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card elevated={true}>
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-green-600 mb-3">1000+</div>
                <p className="text-xl text-gray-800 font-medium mb-2">Devices Donated</p>
                <p className="text-gray-600">Electronic devices given new life and purpose</p>
              </div>
            </Card>
            <Card elevated={true}>
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-blue-600 mb-3">500+</div>
                <p className="text-xl text-gray-800 font-medium mb-2">Happy Recipients</p>
                <p className="text-gray-600">Individuals and organizations with improved tech access</p>
              </div>
            </Card>
            <Card elevated={true}>
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-purple-600 mb-3">5000kg</div>
                <p className="text-xl text-gray-800 font-medium mb-2">E-Waste Prevented</p>
                <p className="text-gray-600">Electronic waste diverted from landfills</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the people who have experienced the impact of our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} elevated={true}>
                <div className="p-8">
                  <svg className="h-10 w-10 text-green-500 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-lg text-gray-600 mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Join our community today and be part of the solution to electronic waste and digital inequality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/login">
              <Button variant="secondary" className="px-8 py-3 text-lg">
                Donate a Device
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" className="px-8 py-3 text-lg bg-white text-green-600 hover:bg-gray-100">
                Request a Device
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:bg-opacity-10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;