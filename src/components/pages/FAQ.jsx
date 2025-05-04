// src/components/pages/FAQ.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const FAQ = () => {
  // FAQ items with questions and answers
  const faqItems = [
    {
      question: "How does DetoxIT work?",
      answer: "DetoxIT connects people who want to donate their unused electronic devices with individuals and organizations that need them. Donors list their devices on our platform, and recipients can browse and request them. Once a match is made, we facilitate the handover process."
    },
    {
      question: "What types of devices can I donate?",
      answer: "We accept working laptops, desktop computers, tablets, smartphones, and peripherals like monitors, keyboards, and mice. The devices should be in functional condition, though minor cosmetic damage is acceptable."
    },
    {
      question: "How do I prepare my device for donation?",
      answer: "Before donating, please back up your important data, then perform a factory reset to remove all personal information. For computers, we recommend reinstalling the operating system. We have detailed guides available for different devices in our resources section."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes, if you're donating to our registered non-profit partners. After your donation is complete, you'll receive a receipt that can be used for tax purposes. Please consult with a tax professional regarding how this applies to your specific situation."
    },
    {
      question: "Who can request a device?",
      answer: "Devices are available to individuals with demonstrated need, educational institutions, non-profit organizations, and community centers. During the request process, we'll ask for information to verify eligibility."
    },
    {
      question: "How long does the donation process take?",
      answer: "Once you've listed a device, it typically takes anywhere from a few days to a few weeks to find a match, depending on demand. The actual handover process usually takes 1-2 weeks to arrange logistics."
    },
    {
      question: "How is the device handover arranged?",
      answer: "After a match is made, we provide both parties with detailed instructions. Options include direct meetups for local donations, shipping with prepaid labels for longer distances, or drop-off at one of our partner locations."
    },
    {
      question: "What happens to devices that cannot be reused?",
      answer: "Devices that are not suitable for reuse are sent to our certified e-waste recycling partners, who ensure that components are properly recycled and harmful materials are disposed of safely."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security very seriously. We never share your contact information without consent, and we have strict protocols for data handling. Please see our Privacy Policy for more details."
    },
    {
      question: "How can I get involved beyond donating a device?",
      answer: "There are many ways to support our mission! You can volunteer as a technical refurbisher, become a donor liaison, contribute financially, or help spread the word about our platform. Visit our Contact page to learn more about volunteering opportunities."
    }
  ];

  // State to track which FAQ item is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Toggle FAQ item expansion
  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };
  return (
    <div className="pt-12">
      {/* Header with gradient */}
      <div className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions about donating and requesting electronic devices through DetoxIT.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button 
                  onClick={() => toggleExpand(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  <span className="ml-6 flex-shrink-0">
                    <svg 
                      className={`w-6 h-6 transform ${expandedIndex === index ? 'rotate-180' : 'rotate-0'} transition-transform`}
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`${
                    expandedIndex === index ? 'block' : 'hidden'
                  } px-6 pb-5`}
                >
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Can't find what you're looking for? Our team is here to help with any questions you may have.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Device Preparation Guides</h3>
              <p className="text-gray-600 mb-5">Step-by-step instructions for wiping data and preparing various devices for donation.</p>
              <Button variant="outline" size="small">View Guides</Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-3">Donation Process</h3>
              <p className="text-gray-600 mb-5">Detailed walkthrough of our donation process from listing to handover.</p>
              <Button variant="outline" size="small">Learn More</Button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
              <p className="text-gray-600 mb-5">Information about how we protect your data and maintain privacy.</p>
              <Link to="/privacy">
                <Button variant="outline" size="small">Privacy Policy</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
