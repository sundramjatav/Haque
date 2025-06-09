import { Axios } from "../Content/MainContent";

const userApi = "/user";
const walletApi = "/wallet";

export async function loginWithWallet(payload) {
  try {
    const response = await Axios.post(`${userApi}/login`, payload);
    return response?.data;
  } catch (error) {
    console.error("Login error:", error);
    return error?.response.data;
  }
}

export async function registerUserWithWallet(payload) {
  try {
    const response = await Axios.post(`${userApi}/register`, payload);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function verifyOtp(payload) {
  try {
    const response = await Axios.post(`${userApi}/user-otp-verify`, payload);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function userProfile() {
  try {
    const response = await Axios.get(`${userApi}/profile`);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}


export async function checkWithdrawEligibility(payload) {
  try {
    const response = await Axios.post(`${userApi}/withdrawal-amount`, payload);
    return response?.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error?.response?.data || error;
  }
}


export async function withdrawalHistory() {
  try {
    const response = await Axios.get(`${userApi}/get-withdrawal-history`);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function raiseTicket(payload) {
  try {
    const response = await Axios.post(`${userApi}/support/ticket-raise`, payload);
    return response?.data;
  } catch (error) {
    return error?.response?.data || error;
  }
}


export async function raiseTiketList() {
  try {
    const response = await Axios.get(`${userApi}/support/get-history`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}


export async function fetchTopUpList() {
  try {
    const response = await Axios.get(`${userApi}/investment-history`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}



export async function setWithdrawalTransaction(payload) {
  try {
    const response = await Axios.post(`${userApi}/tx/request-withdrawal`, payload);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}

export async function buyPlanPackage(payload) {
  try {
    const response = await Axios.post(`${userApi}/add-package`, payload);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}

export async function buyCloudMiningPackage(payload) {
  try {
    const response = await Axios.post(`${userApi}/purchase-cloud-mining`, payload);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}

export async function cloudMiningHistory() {
  try {
    const response = await Axios.get(`${userApi}/cloud-mining-history`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function getRankRewardList() {
  const response = await Axios.get(`${userApi}/get-rank-reward-leaderboard`);
  return response?.data;
}

export async function buyPlan(payload) {
  try {
    const response = await Axios.post(`${userApi}/tx/request-investment`, payload);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
}


export async function getDashboardDetail() {
  try {
    const response = await Axios.get(`${userApi}/get-user-incomes`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function getTradingProfitHistory() {
  try {
    const response = await Axios.get(`${userApi}/get-tradingprofit-history`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}




export async function getDailyROIHistory() {
  try {
    const response = await Axios.get(`${userApi}/daily-roi-history`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
export async function getGlobalAchieverHistory() {
  try {
    const response = await Axios.get(`${userApi}/get-global-achiever-leaderboard`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
export async function getMatchingHistory() {
  try {
    const response = await Axios.get(`${userApi}/get-matching-history`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
export async function getReferralIncomeHistory() {
  try {
    const response = await Axios.get(`${userApi}/get-referralincome-history`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
export async function getInvestmentReports() {
  try {
    const response = await Axios.get(`${userApi}/get-investment-history`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function getDirectUsers() {
  try {
    const response = await Axios.get(`${userApi}/get-direct-users`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
// export async function getRankRewardHistory() {
//   try {
//     const response = await Axios.get(`${userApi}/get-rankreward-history`);
//     return response?.data;
//   } catch (error) {
//     return error?.response.data;
//   }
// }
// export async function getGlobalAchieverLeaderboard() {
//   try {
//     const response = await Axios.get(`${userApi}/get-global-achiever-leaderboard`);
//     return response?.data;
//   } catch (error) {
//     return error?.response.data;
//   }
// }


export async function getPackages() {
  try {
    const response = await Axios.get(`${userApi}/package/get-packages`);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function getAllPlans() {
  try {
    const response = await Axios.get(`${userApi}/package/get-all-packages`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function supportAPI(payload) {
  try {
    const response = await Axios.post(`${userApi}/enquiry/ticket-raise`, payload);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}