import { Axios } from "../Content/MainContent";

const landingApi = "/landing";

export async function supportAPI(payload) {
  try {
    const response = await Axios.post(`${landingApi}/enquiry`, payload);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function getAllPlans() {
  try {
    const response = await Axios.get(`${landingApi}/package/get-all-packages`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}