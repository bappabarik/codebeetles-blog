import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {

  const userData = useSelector(state => state.auth.userData)
  const navigate = useNavigate()
  
  if (userData.emailVerification) {
    navigate('/')
  } else {
      return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Email Verification
        </h1>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">
          We have sent a verification email to your registered email address.
          Please check your inbox and click on the verification link to verify your account.
        </p>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Didn’t receive an email? Please check your spam folder 
        </p>
      </div>
    );
}
};

export default EmailVerification;
