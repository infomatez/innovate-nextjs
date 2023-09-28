import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <video autoPlay loop muted className="loader-video">
        <source src="/Loader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
