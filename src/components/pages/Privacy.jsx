// src/components/pages/Privacy.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Privacy = () => {
  return (
    <div className="pt-12">
      {/* Header with gradient */}
      <div className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            How we collect, use, and protect your information at DetoxIT
          </p>
          <p className="mt-4 text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              At DetoxIT, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us when you:</p>
            <ul>
              <li>Create or modify your account</li>
              <li>List a device for donation</li>
              <li>Request a device</li>
              <li>Complete forms on our platform</li>
              <li>Participate in surveys or contests</li>
              <li>Contact our support team</li>
            </ul>
            
            <p>This information may include:</p>
            <ul>
              <li>Personal identifiers (name, email address, phone number)</li>
              <li>Physical address for device shipping or pickup</li>
              <li>Profile information and preferences</li>
              <li>Device information (make, model, condition, etc.)</li>
              <li>Photos of devices you list for donation</li>
              <li>Information about your eligibility for receiving devices</li>
            </ul>
            
            <h2>Automatically Collected Information</h2>
            <p>
              When you access our platform, we may automatically collect certain information about your device, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Device type and operating system</li>
              <li>Browser type and version</li>
              <li>Usage patterns and interactions with our platform</li>
              <li>Location information (with your consent)</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Facilitate matches between device donors and recipients</li>
              <li>Process and manage device transactions</li>
              <li>Verify user identity and eligibility</li>
              <li>Communicate with you about your account and transactions</li>
              <li>Provide customer support</li>
              <li>Send you updates and promotional communications (if you've opted in)</li>
              <li>Improve and optimize our platform</li>
              <li>Analyze usage patterns and trends</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
            
            <h2>Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Other Users:</strong> When you donate or request a device, we share limited contact information with the other party to facilitate the transaction.</li>
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our platform (payment processors, shipping services, cloud storage providers, etc.).</li>
              <li><strong>Partner Organizations:</strong> Non-profit organizations and educational institutions we work with to distribute devices.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            
            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we have about you</li>
              <li>Correct inaccurate personal information</li>
              <li>Delete your personal information</li>
              <li>Restrict or object to processing of your information</li>
              <li>Data portability (receiving your data in a structured format)</li>
              <li>Withdraw consent at any time</li>
            </ul>
            
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@detoxit.org<br />
              <strong>Address:</strong> 123 Green Tech Way, Sustainable City, SC 12345
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Have Questions About Your Privacy?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Our team is committed to transparency and protecting your information. Reach out if you have any concerns.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button variant="primary">Contact Our Privacy Team</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
