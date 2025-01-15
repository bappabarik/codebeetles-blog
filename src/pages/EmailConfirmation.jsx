import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';

const EmailConfirmation = () => {
  const [error, setError] = useState('')
  const userData = useSelector(state => state.auth.userData)
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const userId = urlParams.get('userId')
    const secret = urlParams.get('secret')
    
    if ( userId && secret && !userData.emailVerification) {
        const res = authService.updateVerification(userId, secret)
        res.then(data => 
            { 
              setError('')
              dispatch(login({...userData, emailVerification:true}))
              console.log("update email confirmation::", data)
              console.log(userData);
              
          }
        )
        .catch(error => {
          setError(error.message)
        })
    } else {
      navigate('/')
    }
  }, [location.search]); // Re-run if the URL changes

  
  return (
    
      error ? 
      (<h1 className='dark:text-white'>
        {error}
      </h1>) : 
      (<div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className='dark:text-white'>Email Address is successfully verified</h1>
      <button onClick={() => navigate('/')} className=' text-blue-700'>Go to home page</button>
    </div>)
  );
};

export default EmailConfirmation;
