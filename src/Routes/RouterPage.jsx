import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../Layouts/AdminLayout';
import UserLayout from '../Layouts/UserLayout';
import UserDashboard from '../Pages/Userpanel/UserDashboard/UserDashboard';
import { Routers } from './Routers';
import AdminDashboard from '../Pages/Adminpanel/AdminDashboard/AdminDashboard';
import AddBanner from '../Pages/Adminpanel/AddBanner/AddBanner';
import AllUsers from '../Pages/Adminpanel/AllUsers/AllUsers';
import BannerList from '../Pages/Adminpanel/AddBanner/BannerList';
import WithdrawalHistory1 from '../Pages/Adminpanel/Withdrawal/WithdrawalHistory';
import WithdrawalHistory2 from '../Pages/Userpanel/Withdrawal/WithdrawalHistory';
import RaiseTicketList1 from '../Pages/Adminpanel/RaiseTicket/RaiseTicketList';
import RaiseTicketList2 from '../Pages/Userpanel/RaiseTicket/RaiseTicketList';
import ReferralHistory from '../Pages/Adminpanel/FinancialHistory.jsx/ReferralHistory';
import LevelIncomeHistory from '../Pages/Adminpanel/FinancialHistory.jsx/LevelIncomeHistory';
import InvestmentHistory from '../Pages/Adminpanel/FinancialHistory.jsx/InvestmentHistory';
import AddWithdrawal from '../Pages/Userpanel/Withdrawal/AddWithdrawal';
import AddTopup from '../Pages/Userpanel/Topup/AddTopup';
import TopupHistory from '../Pages/Userpanel/Topup/TopupHistory';
import AddRaise from '../Pages/Userpanel/RaiseTicket/AddRaise';

import RankLeaderBoard from '../Pages/Userpanel/MyAccount/RankLeaderBoard';
import Profile from '../Pages/Userpanel/MyAccount/Profile';
import Login from '../Pages/Userpanel/Login/Login';
import Register from '../Pages/Userpanel/Register/Register';
import AdminLogin from '../Pages/Adminpanel/Login/AdminLogin';
import Home from '../Pages/LandingPage/Home';
import { adminProfile } from '../Api/admin.api';
import { loginSuccess } from '../Redux/Reducer/authReducer';
import { userProfile } from '../Api/user.api';
import OurPlans from '../Pages/Userpanel/Plans/OurPlans';
import MatchingIncomeHistory from '../Pages/Adminpanel/FinancialHistory.jsx/MatchingIncomeHistory';
import TradingIncomeHistory from '../Pages/Adminpanel/FinancialHistory.jsx/TradingIncomeHistory';
import DirectReferralIncome from '../Pages/Userpanel/IncomeDetails/DirectReferralIncome';
import GenerationIncome from '../Pages/Userpanel/IncomeDetails/GenerationIncome';
import GlobalAchieversBonus from '../Pages/Userpanel/IncomeDetails/GlobalAchieversBonus';
import MatchingIncome from '../Pages/Userpanel/IncomeDetails/MatchingIncome';
import TradingProfitIncome from '../Pages/Userpanel/IncomeDetails/TradingProfitIncome';
import InvestmentReports from '../Pages/Userpanel/InvestmentReports';
import DirectReferral from '../Pages/Userpanel/DirectReferral';
import GlobalIncomeHistory from '../Pages/Adminpanel/FinancialHistory.jsx/GlobalIncomeHistory';
import RankIncomeHistory from '../Pages/Adminpanel/FinancialHistory.jsx/RankIncomeHistory';
import EditBanner from '../Pages/Adminpanel/AddBanner/EditBanner';
import PublicRoute from '../utils/PublicRoute';
import EnquiryList from '../Pages/Adminpanel/Enquiry/EnquiryList';
import LiveAccountInvestment from '../Pages/Adminpanel/LiveAccountInvestment/LiveAccountInvestment';
import DailyROIIncome from '../Pages/Userpanel/IncomeDetails/DailyROIIncome';
import DailyROIIncome1 from '../Pages/Adminpanel/FinancialHistory.jsx/DailyROIIncome';
import AiTrade from '../Pages/Userpanel/AI_Trade/AiTrade';
import AiTradeReports from '../Pages/Userpanel/AI_Trade/AiTradeReports';
import TeamPerformanceBouns from '../Pages/Userpanel/IncomeDetails/TeamPerformanceBouns';
import TeamPerformanceBounsAdmin from '../Pages/Adminpanel/FinancialHistory.jsx/TeamPerformanceBouns';
import AiTradeReportsAdmin from '../Pages/Adminpanel/FinancialHistory.jsx/AiTradeReports';

const RouterPages = () => {
  const dispatch = useDispatch()
  const { token, role } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchData = async () => {
      if (role === "ADMIN") {
        const response = await adminProfile();
        if (response?.success) {
          dispatch(
            loginSuccess({
              user: response.data,
              token: response.token,
              role: response.role,
            })
          );
        }
      } else if (role === "USER") {
        const data = await userProfile();
        if (data?.success) {
          dispatch(
            loginSuccess({
              token: data.token,
              role: data.role,
              user: data.user,
            })
          );
        }
      }
    };

    if (token && role) {
      fetchData();
    }
  }, [token, role, dispatch]);
  return (
    <Routes>
      {token && role === 'ADMIN' && (
        <Route path={Routers.ADMIN_DASHBOARD} element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path={Routers.ADD_BANNER} element={<AddBanner />} />
          <Route path={Routers.ALL_USER_LIST} element={<AllUsers />} />
          <Route path={Routers.BANNER_LIST} element={<BannerList />} />
          <Route path={`${Routers.UPDATE_BANNER}/:id`} element={<EditBanner />} />
          <Route path={Routers.WITHDRAWAL_HISTORY} element={<WithdrawalHistory1 />} />
          <Route path={Routers.RAISE_TICKET_LIST} element={<RaiseTicketList1 />} />
          <Route path={Routers.DAILY_ROI_INCOME} element={<DailyROIIncome1 />} />
          <Route path={Routers.INVESTMENT_INCOME} element={<InvestmentHistory />} />
          <Route path={Routers.MATCHING_INCOME} element={<MatchingIncomeHistory />} />
          <Route path={Routers.TRADING_INCOME} element={<TradingIncomeHistory />} />
          <Route path={Routers.GLOBAL_INCOME} element={<GlobalIncomeHistory />} />
          <Route path={Routers.RANK_INCOME} element={<RankIncomeHistory />} />
          <Route path={Routers.SELF_INCOME} element={<LevelIncomeHistory />} />
          <Route path={Routers.REFERRAL_INCOME} element={<ReferralHistory />} />
          <Route path={Routers.ENQUIRY_HISTORY} element={<EnquiryList />} />
          <Route path={Routers.LIVE_ACCOUNT_INVESTMENT} element={<LiveAccountInvestment />} />
          <Route path={Routers.TEAM_PERFORMANCE_BONUS} element={<TeamPerformanceBounsAdmin />} />
          <Route path={Routers.AI_TRADE_REPORTS} element={<AiTradeReportsAdmin />} />
        </Route>
      )}
      {token && role === 'USER' && (
        <Route path={Routers.DASHBOARD} element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path={Routers.RAISE_TICKET_LIST} element={<RaiseTicketList2 />} />
          <Route path={Routers.WITHDRAWAL_HISTORY} element={<WithdrawalHistory2 />} />
          <Route path={Routers.ADD_WITHDRAWAL} element={<AddWithdrawal />} />
          <Route path={Routers.ADD_TOPUP} element={<AddTopup />} />
          <Route path={Routers.TOPUP_HISTORY} element={<TopupHistory />} />
          <Route path={Routers.RAISE_TICKET} element={<AddRaise />} />
          <Route path={Routers.AI_TRADE} element={<AiTrade />} />
          <Route path={Routers.AI_TRADE_HISTORY} element={<AiTradeReports />} />
          <Route path={Routers.RANK_LEADER_BOARD} element={<RankLeaderBoard />} />
          <Route path={Routers.PROFILE} element={<Profile />} />
          <Route path={Routers.OUR_PLANS} element={<OurPlans />} />
          <Route path={Routers.DIRECT_REFERRAL_INCOME} element={<DirectReferralIncome />} />
          <Route path={Routers.GENERATION_INCOME} element={<GenerationIncome />} />
          <Route path={Routers.DAILY_INCOME} element={<DailyROIIncome />} />
          <Route path={Routers.GLOBAL_INCOME_HISTORY} element={<GlobalAchieversBonus />} />
          <Route path={Routers.MATCHING_INCOME_HISTORY} element={<MatchingIncome />} />
          <Route path={Routers.TRADING_INCOME_HISTORY} element={<TradingProfitIncome />} />
          <Route path={Routers.INVESTMENT_REPORTS} element={<InvestmentReports />} />
          <Route path={Routers.DIRECT_REFERRALS} element={<DirectReferral />} />
          <Route path={Routers.TEAM_PERFORMANCE} element={<TeamPerformanceBouns />} />
        </Route>
      )}
      <Route path="/" element={<Home />} />
      <Route
        path={Routers.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={Routers.REGISTER}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path={Routers.ADMIN_LOGIN}
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />

    </Routes>
  );
};

export default RouterPages;
