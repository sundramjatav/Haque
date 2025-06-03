import React from 'react';
import mission from '../../assets/Landing/mission.jpg'
import GradientHeading from './GradientHeading';

const Mission = () => {
  return (
    <section className=" mt-2 bg-gradient-to-r  text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left - Image */}
        <div className="w-full md:w-1/2">
          <img
            src={mission}
            alt="Mission"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right - Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* <h1 className="text-4xl md:text-5xl font-bold text-teal-300 mb-6">Our Mission</h1> */}
          <GradientHeading text="Our Mission" />
          <p className="text-lg md:text-xl leading-relaxed text-gray-200">
            At <span className="font-semibold text-white">Yumeko AI</span>, our mission is to empower individuals and businesses
            to achieve unparalleled financial growth through cutting-edge blockchain solutions.
            We are committed to providing secure, transparent, and innovative earning and investment
            opportunities that maximize returns and drive prosperity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
