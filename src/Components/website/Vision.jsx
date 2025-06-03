import React from 'react';
import vision from '../../assets/Landing/vision.jpg'
import GradientHeading from './GradientHeading';

const Vision = () => {
  return (
    <section className="bg-gradient-to-r text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Left - Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* <h2 className="text-4xl md:text-5xl font-bold text-teal-300 mb-6">Our Vision</h2> */}
          <GradientHeading text="Our Vision" />
          <p className="text-lg md:text-xl leading-relaxed text-gray-200">
            Our vision is to be the leading cryptocurrency platform recognized globally for transforming
            financial possibilities through blockchain technology. We aim to create a future where financial
            growth is accessible to everyone, fostering a community of informed and successful investors.
          </p>
          <p className="mt-4 text-white font-semibold">— Yumeko AI</p>
        </div>

        {/* Right - Image */}
        <div className="w-full md:w-1/2">
          <img
            src={vision}
            alt="Vision"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Vision;
