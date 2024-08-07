import React from 'react';

const LoadingOverlay = ({ show }:{show:boolean}) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-primary h-24 w-24"></div>
    </div>
  );
};

export default LoadingOverlay;