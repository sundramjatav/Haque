import { Axios } from "../Content/MainContent";

const adminApi = "/admin";

export async function loginAdmin(payload) {
  try {
    const response = await Axios.post(`${adminApi}/login`, payload);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function adminProfile() {
  try {
    const response = await Axios.get(`${adminApi}/profile`);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function allUser() {
  try {
    const response = await Axios.get(`${adminApi}/all-users`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function BlockUser(id) {
    try {
    const response = await Axios.get(`${adminApi}/user-block/${id}`);
    return response?.data;
    } catch (error) {
        return error?.response?.data;
    }
}

export async function withdrawalHistory() {
  try {
    const response = await Axios.get(`${adminApi}/get-withdrawal-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function levelIncomeHistory() {
  try {
    const response = await Axios.get(`${adminApi}/get-levelincome-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function matchingIncomeHistory() {
  try {
    const response = await Axios.get(`${adminApi}/get-matching-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function tradingIncomeHistory() {
  try {
    const response = await Axios.get(`${adminApi}/get-tradingprofit-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function globalIncomeHistory() {
  try {
    const response = await Axios.get(`${adminApi}/get-globalachiever-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function rankIncomeHistory() {
  try {
    const response = await Axios.get(`${adminApi}/get-rankreward-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function investmentHistory() {
  try {
    const response = await Axios.get(`${adminApi}/get-investment-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function referralHistory() {
  try {
    const response = await Axios.get(`${adminApi}/get-referralincome-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function totalIncomeCount() {
  try {
    const response = await Axios.get(`${adminApi}/get-income-summary`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function allSupportReports() {
  try {
    const response = await Axios.get(`${adminApi}/support/get-all-reports`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function allEnquiryReports() {
  try {
    const response = await Axios.get(`${adminApi}/enquiry/get-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function updateSupportTicket(id,payload) {
  try {
    const response = await Axios.put(`${adminApi}/support/ticket-response/${id}`,payload
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function addBanner(payload) {
  try {
    const response = await Axios.post(`${adminApi}/banner/create`, payload);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function deleteBanner(id) {
  try {
    const response = await Axios.delete(`${adminApi}/banner/delete/${id}`);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function getBannerList() {
  try {
    const response = await Axios.get(`${adminApi}/banner/get-banners`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function getSingleBanner(id) {
  try {
    const response = await Axios.get(`${adminApi}/banner/get-banner/${id}`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function updateBanner(id, payload) {
  try {
    const response = await Axios.put(`${adminApi}/banner/update/${id}`, payload );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}


export async function cloudMiningHistory() {
  try {
    const response = await Axios.get(`${adminApi}/cloud-mining-history`,
    );
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}

export async function getUserByUsername(payload) {
    try {
        const response = await Axios.post(`${adminApi}/get-user`, payload);
        return response?.data;
        
    } catch (error) {
        return error?.response?.data
    }
}

export async function liveTradeProfit(id,payload) {
    try {
        const response = await Axios.post(`${adminApi}/lt/live-trade-profit/${id}`, payload);
        return response?.data;
        
    } catch (error) {
        return error?.response?.data
    }
}