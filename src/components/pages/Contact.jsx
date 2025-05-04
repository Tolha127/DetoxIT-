// src/components/pages/Contact.jsx
import React, { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, this would send the form data to an API
    setIsSubmitted(true);
    // Reset the form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const contactMethods = [
    {
      title: 'Email Us',
      description: 'Our team is here to help with any questions.',
      contact: 'support@detoxit.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Call Us',
      description: 'Speak directly with our customer support team.',
      contact: '(555) 123-4567',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: 'Visit Us',
      description: 'Drop by our office for in-person assistance.',
      contact: '123 Tech Street, Innovation City, ST 12345',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];
  return (
    <div className="pt-12">
      {/* Header with gradient */}
      <div className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions, suggestions, or need assistance? We're here to help!
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} elevated={true}>
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-3">{method.description}</p>
                  <p className="text-green-600 font-medium">{method.contact}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Send Us a Message</h2>
              {isSubmitted ? (
                <div className="rounded-md bg-green-50 p-6 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Message Sent</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Thank you for contacting us! We'll get back to you as soon as possible.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Card>
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <Button type="submit" variant="primary" className="w-full">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>
            
            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Our Location</h2>
              <Card elevated={true}>
                <div className="h-96">
                  {/* In a real app, this would be integrated with a map service like Google Maps */}
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">DetoxIT Headquarters</h3>
                      <p className="text-gray-600">123 Tech Street, Innovation City, ST 12345</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">How quickly will I receive a response?</h3>
                <p className="text-gray-600">
                  We aim to respond to all inquiries within 24-48 business hours. For urgent matters, please call our support line directly.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">How can I track my device donation?</h3>
                <p className="text-gray-600">
                  Once you've completed the donation process, you can track the status of your device in the dashboard after logging into your account.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">How do I become a volunteer?</h3>
                <p className="text-gray-600">
                  We're always looking for passionate volunteers! Please use the contact form above and mention "Volunteer Opportunity" in the subject line.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Can organizations make bulk donations?</h3>
                <p className="text-gray-600">
                  Yes! For corporate or bulk donations, please contact our team directly at corporate@detoxit.com or call our office.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
