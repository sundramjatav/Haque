import React from 'react';
import { Shield, TrendingUp, Users, Zap, Star, Award, Globe, Lock } from 'lucide-react';

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
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative  overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-blue-600/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose <span className="text-teal-400">Yumeko AI</span>?
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover what makes us the preferred choice for cryptocurrency enthusiasts and investors worldwide
          </p>
        </div>
         <div className="max-w-7xl mb-10 text-white mx-auto bg-gray-900/60 border border-gray-700 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group border border-gray-700 p-6 rounded-xl hover:shadow-2xl transition-all duration-500 hover:border-teal-400 hover:bg-gray-800/50 cursor-pointer transform hover:-translate-y-2"
              >
                <div className="text-teal-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300 text-white mb-4">
                  {feature.description}
                </p>
                <p className="text-xs text-gray-400 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features Section */}
   



   

    </div>
  );
};

export default WhyChoose;