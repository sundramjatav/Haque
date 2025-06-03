import { FaTwitter, FaTelegramPlane, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MainContent } from "../../Content/MainContent";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Footer = () => {
    const quickLinks = ["home", "about", "packages", "faq", "contact"];

    return (
        <footer className="relative bg-bg-color/20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                {/* <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div> */}
                <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-3 lg:px-4 py-4 sm:py-12 lg:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img 
                                    src={MainContent.AppLogo} 
                                    alt="Yumeko AI Logo" 
                                    className='h-10 sm:h-12 md:h-16 lg:h-20 object-contain filter drop-shadow-lg' 
                                />
                                {/* <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20 blur-md"></div> */}
                            </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                                Your trusted platform for fast, secure, and transparent USDT & Bitcoin transactions.
                            </p>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Secure & Verified Platform</span>
                            </div>
                        </div>
                        
                        <div className="pt-2 sm:pt-4">
                            <div className="text-white font-medium text-sm sm:text-base mb-3">Follow Us</div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {[
                                    { icon: FaTwitter, color: 'hover:text-blue-400', bg: 'hover:bg-blue-400/10' },
                                    { icon: FaTelegramPlane, color: 'hover:text-blue-500', bg: 'hover:bg-blue-500/10' },
                                    { icon: FaLinkedin, color: 'hover:text-blue-600', bg: 'hover:bg-blue-600/10' },
                                    { icon: FaGithub, color: 'hover:text-gray-300', bg: 'hover:bg-gray-300/10' }
                                ].map(({ icon: Icon, color, bg }, index) => (
                                    <Link 
                                        key={index}
                                        className={`p-2 sm:p-3 rounded-xl bg-gray-800/40 text-gray-400 ${color} ${bg} transition-all duration-300 transform hover:scale-110 hover:shadow-lg border`}
                                    >
                                        <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={link} className="transform hover:translate-x-2 transition-all duration-300">
                                    <ScrollLink
                                        to={link}
                                        smooth={true}
                                        duration={500}
                                        offset={-0}
                                        className="group flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer capitalize text-xs sm:text-sm lg:text-base transition-colors duration-300"
                                    >
                                        <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 group-hover:bg-blue-300 transition-all duration-300"></div>
                                        <span className="group-hover:font-medium">{link}</span>
                                    </ScrollLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Supported Coins
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            <div className=" sm:p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl  backdrop-blur-sm">
                                <div className="text-white font-semibold text-xs sm:text-sm mb-2">USDT</div>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {['TRC20', 'ERC20', 'BEP20'].map(network => (
                                        <span key={network} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs font-medium">
                                            {network}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className=" sm:p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl  backdrop-blur-sm">
                                <div className="text-white font-semibold text-xs sm:text-sm mb-2">Bitcoin</div>
                                <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-md text-xs font-medium">
                                    BTC
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
                        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Connect With Us
                        </h3>
                        
                        <div className="flex items-start space-x-3  bg-gray-800/30 rounded-lg ">
                            <FaEnvelope className="text-blue-400 mt-1 flex-shrink-0" size={14} />
                            <div className="min-w-0 flex-1">
                                <div className="text-white font-medium text-xs sm:text-sm">Email</div>
                                <a 
                                    href="mailto:info@yumekoai.world" 
                                    className="text-gray-300 hover:text-blue-300 text-xs sm:text-sm transition-colors break-all"
                                >
                                    info@yumekoai.world
                                </a>
                            </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-start space-x-3  bg-gray-800/30 rounded-lg ">
                                <FaMapMarkerAlt className="text-green-400 mt-1 flex-shrink-0" size={14} />
                                <div className="min-w-0 flex-1">
                                    <div className="text-white font-medium text-xs sm:text-sm mb-1">London Office</div>
                                    <div className="text-gray-400 text-xs leading-relaxed">
                                        99 Bishopsgate
                                        London EC2M 3XD
                                        United Kingdom
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3  bg-gray-800/30 rounded-lg ">
                                <FaMapMarkerAlt className="text-purple-400 mt-1 flex-shrink-0" size={14} />
                                <div className="min-w-0 flex-1">
                                    <div className="text-white font-medium text-xs sm:text-sm mb-1">Dubai Office</div>
                                    <div className="text-gray-400 text-xs leading-relaxed">
                                        One Lake Plaza, Cluster T
                                        Jumeirah Lake Towers
                                        Dubai, UAE
                                        P.O. Box: 392273
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700/50">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                            © {new Date().getFullYear()} Yumeko AI. All rights reserved.
                        </div>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                            <div className="flex space-x-4 sm:space-x-6">
                                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="whitespace-nowrap">All systems operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;