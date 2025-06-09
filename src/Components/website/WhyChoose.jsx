import React from 'react';
import { Shield, TrendingUp, Users, Zap, Star, Award, Globe, Lock } from 'lucide-react';
import GradientHeading from './GradientHeading';

const WhyChoose = () => {
  const features = [
    {
      icon: <Users size={32} />,
      title: "Expertise",
      description: "A team of seasoned crypto professionals guiding your journey.",
      detail: "Our experienced team brings decades of combined expertise in cryptocurrency, blockchain technology, and financial markets to ensure your success."
    },
    {
      icon: <Shield size={32} />,
      title: "Security",
      description: "Robust and transparent measures to protect your investments.",
      detail: "Advanced encryption, multi-layer security protocols, and regular audits ensure your assets are protected with bank-level security."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Growth",
      description: "Solutions engineered for exponential financial growth.",
      detail: "Strategic algorithms and market analysis tools designed to maximize your investment potential and accelerate wealth building."
    },
    {
      icon: <Zap size={32} />,
      title: "Future Ready",
      description: "Join us to build a brighter, decentralized financial future.",
      detail: "Stay ahead of the curve with cutting-edge technology and innovative solutions that adapt to the evolving digital economy."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Star size={24} />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs"
    },
    {
      icon: <Award size={24} />,
      title: "Award Winning",
      description: "Recognized excellence in AI and cryptocurrency solutions"
    },
    {
      icon: <Globe size={24} />,
      title: "Global Reach",
      description: "Serving clients worldwide with localized expertise"
    },
    {
      icon: <Lock size={24} />,
      title: "Privacy First",
      description: "Your data privacy and confidentiality is our top priority"
    }
  ];

  return (
    <div className="py-8 sm:py-16 px-5">
      <div className="flex flex-col gap-10">
        <div className="max-w-7xl mx-auto text-center">
          <GradientHeading text="Why Choose Trade Mind Pro" />
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover what makes us the preferred choice for cryptocurrency enthusiasts and investors worldwide
          </p>
        </div>
        <div className="max-w-7xl mx-auto  rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group border border-gray-700 p-6 rounded-xl hover:shadow-2xl transition-all duration-500 hover:border-teal-400 hover:bg-gray-800/50 cursor-pointer transform hover:-translate-y-2"
              >
                <div className="text-bg-color mb-4 flex gap-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold  mb-3 text-bg-color transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 text-white mb-4">
                  {feature.description}
                </p>
                <p className="text-xs text-gray-400 text-white">
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;