import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaTimes } from "react-icons/fa";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const supportAPI = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { success: true, message: "Thank you for contacting us! We'll get back to you soon." };
  };

  const Swal = {
    fire: ({ icon, text }) => {
      alert(`${icon.toUpperCase()}: ${text}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (value === '' || /^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert('Please enter exactly 10 digits for the mobile number.');
      return;
    }
    setLoading(true);
    try {
      const response = await supportAPI(formData);
      if (response?.success) {
        Swal.fire({ icon: "success", text: response?.message });
      } else {
        Swal.fire({ icon: "error", text: response?.message || "Please try again" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-900 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
            <img
              src="https://img.icons8.com/3d-fluency/94/phone-disconnected.png"
              alt="Contact Us"
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Get in <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about features,
            pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-3 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
              Contact Information
            </h3>

            <div className="group hover:bg-white/5 transition rounded-2xl p-2 py-3 border border-transparent hover:border-white/10">
              <div className="flex space-x-4 items-start">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-white" size={18} />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base mb-1">Email</div>
                  <a
                    href="mailto:info@yumekoai.world"
                    className="text-gray-300 hover:text-blue-400 break-all"
                  >
                    info@yumekoai.world
                  </a>
                </div>
              </div>
            </div>

            <div className="group hover:bg-white/5 transition rounded-2xl p-2 py-3 border border-transparent hover:border-white/10">
              <div className="flex space-x-4 items-start">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white" size={18} />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base mb-1">London Office</div>
                  <p className="text-gray-400 text-sm">99 Bishopsgate, London EC2M 3XD, United Kingdom</p>
                </div>
              </div>
            </div>

            <div className="group hover:bg-white/5 transition rounded-2xl p-2 py-3 border border-transparent hover:border-white/10">
              <div className="flex space-x-4 items-start">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white" size={18} />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base mb-1">Dubai Office</div>
                  <p className="text-gray-400 text-sm">
                    One Lake Plaza, Cluster T<br />
                    Jumeirah Lake Towers, Dubai, UAE<br />
                    P.O. Box: 392273
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/20 p-3 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
              Send us a Message
            </h3>

            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="p-4 rounded-xl bg-white text-black text-sm font-medium outline-none border-2 border-transparent focus:border-blue-400 placeholder-gray-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="p-4 rounded-xl bg-white text-black text-sm font-medium outline-none border-2 border-transparent focus:border-blue-400 placeholder-gray-500"
              />
            </div>

            {/* Phone */}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
              inputMode="numeric"
              placeholder="Enter your number"
              className="w-full p-4 rounded-xl bg-white text-black text-sm font-medium outline-none border-2 border-transparent focus:border-blue-400 placeholder-gray-500"
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Your message..."
              className="w-full p-4 rounded-xl bg-white text-black text-sm font-medium outline-none border-2 border-transparent focus:border-blue-400 placeholder-gray-500 resize-none"
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Submit
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
