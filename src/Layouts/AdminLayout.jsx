import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, } from "react-router-dom";
import { FiChevronsRight } from 'react-icons/fi';
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import { Routers } from '../Routes/Routers';
import { useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaUsers, FaUserPlus, FaImage, FaImages, FaCloudUploadAlt } from "react-icons/fa";
import Button from '../Components/Button';
import { HiMiniWallet } from 'react-icons/hi2';
import { MdAddToPhotos, MdSupport } from 'react-icons/md';
import { FaMoneyBills, FaMoneyBillTrendUp } from 'react-icons/fa6';
import { SiKdenlive, SiMoneygram, SiWebmoney } from 'react-icons/si';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { AuroraHero } from './AuroraHero';
import Footer from '../Components/Footer';
import { MainContent } from '../Content/MainContent';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Reducer/authReducer';
import { persistor } from '../Redux/store';
import Swal from 'sweetalert2';
import { GrMoney } from 'react-icons/gr';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.split("/")[1]?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || 'Dashboard';

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    {
      title: 'Dashboard',
      icon: <LuLayoutDashboard />,
      path: Routers.ADMIN_DASHBOARD,
    },
    {
      title: 'All User List',
      icon: <FaUsers />,
      path: Routers.ALL_USER_LIST,
    },
    {
      title: 'Banners',
      icon: <FaImage />,
      children: [
        { title: 'Add Banner', path: Routers.ADD_BANNER, icon: <MdAddToPhotos /> },
        { title: 'All Banners', path: Routers.BANNER_LIST, icon: <FaImages /> },
      ]
    },
    {
      title: 'Financial History',
      icon: <FaMoneyBills />,
      children: [
        { title: 'Daily ROI History', path: Routers.DAILY_ROI_INCOME, icon: <GiTakeMyMoney /> },
        {
          title: 'Team Performance Bouns',
          icon: <MdSupport />,
          path: Routers.TEAM_PERFORMANCE_BONUS,
        },
         { title: 'AI Trade History', path: Routers.AI_TRADE_REPORTS, icon: <GiTakeMyMoney /> },
         { title: 'Level Income History', path: Routers.SELF_INCOME, icon: <GiTakeMyMoney /> }
      ]
    },
    {
      title: 'Withdrawal History',
      icon: <HiMiniWallet />,
      path: Routers.WITHDRAWAL_HISTORY,
    },
    // {
    //   title: 'Live Account Investment',
    //   icon: <SiKdenlive />,
    //   path: Routers.LIVE_ACCOUNT_INVESTMENT,
    // },
    {
      title: 'Raise Ticket History',
      icon: <MdSupport />,
      path: Routers.RAISE_TICKET_LIST,
    },
    {
      title: 'Enquiry History',
      icon: <FaCloudUploadAlt />,
      path: Routers.ENQUIRY_HISTORY,
    },
  ];
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    setOpenAccordion(null);
  }, [location.pathname]);

 const isActive = (path) => {
  return location.pathname === path || location.pathname.startsWith(path + '/');
};


  const navigateToHomePage = () => {
    navigate(Routers.ADMIN_LOGIN);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3FB649',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        persistor.purge();
        navigateToHomePage();
        Swal.fire({
          icon: "success",
          text: 'Logout successful!',
          timer: 3000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    });
  };

  const user = useSelector((state) => state.auth);
  const name = user?.user?.name
  const email = user?.user?.email

  return (
    <div>
      <div className='absolute top-0 left-0 w-full h-screen -z-10 '>
        {/* <AuroraHero /> */}
      </div>
      <div className="flex justify-end gap-2 w-full background h-screen relative z-50 text-text-white" >
        <div className={`absolute md:relative w-[250px] py-2 z-50 h-full sidebar_background border-r-2 border-border  backdrop-blur-md flex duration-300 flex-col ${!isSidebarOpen ? "md:left-0 -left-full" : "md:-left-full left-0"}`}>
          <div className="px-4  overflow-y-auto scrollbar flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <div className='overflow-hidden'>
                {/* <h1 className='text-2xl font-bold'>Dashboard</h1> */}
                <img src={MainContent.AppLogo} className='rounded-lg h-32' alt="" />
              </div>
              <button
                onClick={toggleSidebar}
                className={`text-xl  focus:outline-none bg-white/10 text-text-white  font-medium rounded-xl p-2  ${!isSidebarOpen ? "hidden" : "block"
                  }`}
              >
                <FiChevronsRight />
              </button>
              <button
                onClick={toggleSidebar}
                className={`text-lg md:hidden  focus:outline-none rounded-xl p-1  ${isSidebarOpen ? "hidden" : "block"
                  }`}
              >
                <FiChevronsRight />
              </button>
            </div>
            <div>
              <nav className="flex flex-col gap-3 text-sm">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors duration-200 ${openAccordion === index ? '' : ''}`}
                        >
                          <span className="flex items-center gap-3">
                            {item.icon}
                            {item.title}
                          </span>
                          <IoIosArrowDown className={`transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
                        </button>

                        <div className={`ml-2 overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === index ? "max-h-[500px] mt-2" : "max-h-0"}`}>
                          <div className="flex flex-col gap-2">
                            {item.children.map((child, i) => (
                              <Link
                                key={i}
                                to={child.path}
                                className={`flex items-center gap-2 p-2 rounded-xl text-sm transition-colors duration-200 
                        ${isActive(child.path)
                                    ? 'btn-gradient backdrop-blur-md font-semibold'
                                    : ''}`}
                              >
                                {child.icon}
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 p-2 rounded-xl  transition-colors duration-200 
                ${isActive(item.path) ? 'font-semibold  btn-gradient backdrop-blur-md' : ''}`}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            <div>
              <div>
                <button onClick={handleLogout} className='px-4 text-[#FF0000] w-full py-2 flex items-center gap-4  rounded'>
                  <LuLogOut />  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex flex-col w-full h-full duration-200 ${isSidebarOpen ? "w-full" : "md:w-[calc(100%-250px)]"} flex-shrink-0`}>
          <main className="overflow-y-auto  flex flex-col md:gap-2 gap-1">
            <header className="flex items-center p-2 md:rounded-xl  text-white justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={toggleSidebar}
                  className={`text-xl focus:outline-none bg-text-white/10  rounded-xl p-2  ${!isSidebarOpen ? "hidden" : "block"
                    }`}
                >
                  <FiChevronsRight />
                </button>
                <button
                  onClick={toggleSidebar}
                  className={`text-xl  focus:outline-none bg-text-white/10   rounded-xl p-2  ${isSidebarOpen ? "hidden" : "block"
                    }`}
                >
                  <FiChevronsRight />
                </button>
                <p className='md:text-base  text-sm font-medium '>{page}</p>
              </div>
              <div className="">
                <div className='flex items-center gap-2'>
                  <div className='flex flex-col items-end'>
                    <p className="uppercase">{name}</p>
                    <p className=' text-sm text-text-color/80'>{email}</p>
                  </div>
                  <div className='w-10 h-10 rounded-xl overflow-hidden bg-text-white/10 '>
                    <img className='w-full h-full object-top object-cover' src="https://img.icons8.com/3d-fluency/94/guest-male--v3.png" alt="" />
                  </div>
                </div>
              </div>
            </header>
            <div className='p-2 md:p-1'>
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;