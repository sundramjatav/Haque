import React from 'react'

const GradientHeading = ({ text , className}) => {
  return (
    <h2 className={`text-4xl md:text-6xl mb-4 font-semibold tracking-tight leading-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent ${className} `}>
      {text}
    </h2>
  );
};

export default GradientHeading