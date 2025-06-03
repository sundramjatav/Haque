import { Axios } from "../constants/mainContent";

export async function appointmentBooking(payload) {
  try {
    const response = await Axios.post(`/enquiry/create`, payload);
    return response?.data;
  } catch (error) {
    console.error("Appointment Booking error:", error);
    throw error?.response?.data || error;
  }
}
export async function getAppointment() {
  try {
    const response = await Axios.get(`/enquiry/get-all-reports`);
    return response?.data;
  } catch (error) {
    console.error("Appointment Booking error:", error);
    throw error?.response?.data || error;
  }
}
// export async function deleteAppointment() {
//   try {
//     const response = await Axios.delete(`/enquiry/create`);
//     return response?.data;
//   } catch (error) {
//     console.error("Appointment Booking error:", error);
//     throw error?.response?.data || error;
//   }
// }