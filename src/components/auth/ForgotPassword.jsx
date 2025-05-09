// src/components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call the API to send a password reset email
    console.log('Password reset requested for:', email);
    // Show success message
    setSubmitted(true);
  };  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-12">      {/* Header with gradient */}
      <div className="w-full bg-gradient-to-r from-teal-500 to-blue-500 p-8 mb-6 shadow-md">
        <div className="max-w-md mx-auto text-center text-white">
          <h1 className="text-3xl font-bold">Reset Your Password</h1>
          <p className="mt-2">We'll help you get back into your account</p>
        </div>
      </div>
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg overflow-hidden p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-center text-2xl font-extrabold text-gray-900">
              Password Recovery
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

        {submitted ? (          <div className="rounded-md bg-teal-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-teal-800">
                  Reset link sent
                </h3>
                <div className="mt-2 text-sm text-teal-700">
                  <p>
                    If an account exists with this email, you will receive a password reset link. 
                    Please check your inbox.
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-teal-600 hover:text-teal-500"
                  >
                    Return to login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
              >
                Send reset link
              </Button>
            </div>

            <div className="text-center">              <Link
                to="/login"
                className="text-sm font-medium text-teal-600 hover:text-teal-500"
              >
                Back to login
              </Link></div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
