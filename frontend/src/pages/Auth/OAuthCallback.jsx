import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      console.log('OAuth token received and stored:', token);
      navigate('/'); // Redirect to home or dashboard
    } else {
      console.error('No token found in OAuth callback');
      navigate('/login'); // Redirect to login on error
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-text">Processing authentication...</p>
    </div>
  );
};

export default OAuthCallback;
