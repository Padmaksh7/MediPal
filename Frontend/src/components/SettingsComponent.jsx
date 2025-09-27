import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeft, FaUser, FaEnvelope, FaCalendar, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContextComponent";
import axios from "../utils/Axios.Config";

function SettingsComponent() {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    fullName: {
      firstName: user?.fullName?.firstName || "",
      lastName: user?.fullName?.lastName || "",
    },
    email: user?.email || "",
    age: user?.age || "",
  });

  useEffect(() => {
    if (user) {
      setEditData({
        fullName: {
          firstName: user?.fullName?.firstName || "",
          lastName: user?.fullName?.lastName || "",
        },
        email: user?.email || "",
        age: user?.age || "",
      });
    }
  }, [user]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updatedData = await axios.put(
        "/profile/updateProfile",
        {
          fullName: {
            firstName: editData.fullName.firstName,
            lastName: editData.fullName.lastName,
          },
          email: editData.email,
          age: editData.age,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "User-Data-Information",
        JSON.stringify(updatedData?.data?.user)
      );
      setIsSaving(false);
      navigate("/profile"); // Go back to profile after saving
    } catch (err) {
      console.log(err);
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-6">
      {/* Back Button */}
      <button
        className="cursor-pointer absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition"
        onClick={() => navigate(-1)}
        aria-label="Go Back"
      >
        <FaArrowLeft className="h-6 w-6" />
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
        <form onSubmit={handleSaveChanges} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">First Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full outline-none"
                value={editData.fullName.firstName}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    fullName: { ...editData.fullName, firstName: e.target.value },
                  })
                }
                required
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full outline-none"
                value={editData.fullName.lastName}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    fullName: { ...editData.fullName, lastName: e.target.value },
                  })
                }
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                className="w-full outline-none"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FaCalendar className="text-gray-400 mr-2" />
              <input
                type="number"
                className="w-full outline-none"
                value={editData.age}
                onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-3 rounded-lg font-semibold shadow-md flex items-center gap-2 transition 
                ${
                  isSaving
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              <FaSave />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsComponent;
