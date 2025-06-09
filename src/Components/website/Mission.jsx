import React from 'react';
import mission from '../../assets/Landing/mission.jpg'
import GradientHeading from './GradientHeading';

const Mission = () => {
  return (
    <section className="py-8 sm:py-16 px-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 md:h-72 ">
          <img
            src={mission}
            alt="Mission"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <GradientHeading text="Our Mission" />
          <p className="text-sm md:text-lg leading-relaxed text-gray-200">
            At <span className="font-semibold text-white">Trade Mind Pro</span>, our mission is to empower individuals and businesses
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
