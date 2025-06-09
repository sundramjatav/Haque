import React from 'react';
import vision from '../../assets/Landing/vision.jpg'
import GradientHeading from './GradientHeading';

const Vision = () => {
  return (
    <section className="py-8 sm:py-16 px-5">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">  
        <div className="w-full md:w-1/2 text-center md:text-left">
          <GradientHeading text="Our Vision" />
          <p className="text-sm md:text-lg leading-relaxed text-gray-200">
            Our vision is to be the leading cryptocurrency platform recognized globally for transforming
            financial possibilities through blockchain technology. We aim to create a future where financial
            growth is accessible to everyone, fostering a community of informed and successful investors.
          </p>
          <p className="mt-4 text-white font-semibold">— Trade Mind Pro</p>
        </div>

        <div className="w-full md:w-1/2 md:h-72 ">
          <img
            src={vision}
            alt="Vision"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Vision;
