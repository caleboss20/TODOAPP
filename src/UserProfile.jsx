import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CameraIcon } from "@heroicons/react/24/outline";
function UserProfile() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [tempImage, setTempImage] = useState(null); // live preview
  const [errors, setErrors] = useState({ fullName: "", role: "", mobile: "" });
  const [isSaving, setIsSaving] = useState(false);
  // Validation functions
  const validateFullName = (nameValue) => {
    if (!nameValue.trim()) return "Full Name is required";
    if (nameValue.trim().length < 2) return "Full Name must be at least 2 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(nameValue)) return "Full Name can only contain letters, spaces, hyphens, and apostrophes";
    return "";
  };
  const validateRole = (roleValue) => {
    const validRoles = ["student", "lecturer", "admin", "staff"];
    if (!roleValue.trim()) return "Role is required";
    if (!validRoles.includes(roleValue.toLowerCase()))
      return "Role must be: Student, Lecturer, Admin, or Staff";
    return "";
  };
  const validatePhone = (phoneValue) => {
    const phoneRegex = /^[0-9\-+\s()]{10,}$/;
    if (!phoneValue.trim()) return ""; // Phone is optional
    if (!phoneRegex.test(phoneValue)) return "Phone number must be at least 10 digits";
    return "";
  };
  // Load from localStorage
  useEffect(() => {
    const profileData = localStorage.getItem("userProfile");
    const accountData = localStorage.getItem("userAccount");
   
    if (profileData) {
      try {
        const { fullName: storedName, role: storedRole, mobile: storedMobile, profileImage: storedImage } = JSON.parse(profileData);
        setFullName(storedName || "");
        setRole(storedRole || "");
        setMobile(storedMobile || "");
        setProfileImage(storedImage || null);
      } catch (e) {
        console.error("Failed to load profile data", e);
      }
    }
    // Load email from account (login credentials)
    if (accountData) {
      try {
        const { email: storedEmail } = JSON.parse(accountData);
        setEmail(storedEmail || "");
      } catch (e) {
        console.error("Failed to load account data", e);
      }
    }
  }, []);
  // Update live errors as user types
  useEffect(() => {
    setErrors({
      fullName: validateFullName(fullName),
      role: validateRole(role),
      mobile: validatePhone(mobile),
    });
  }, [fullName, role, mobile]);
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setTempImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    // Validate all fields (email is not editable, so no validation needed)
    const fullNameError = validateFullName(fullName);
    const roleError = validateRole(role);
    const mobileError = validatePhone(mobile);
    if (fullNameError || roleError || mobileError) {
      return;
    }
    // Start saving state
    setIsSaving(true);
    const userData = {
      fullName,
      role,
      email,
      mobile,
      profileImage: tempImage || profileImage,
    };
    // Simulate save delay, then navigate
    setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(userData));
      setProfileImage(tempImage || profileImage);
      setTempImage(null);
      setIsSaving(false);
      navigate("/settings");
    }, 4000);
  };
  // Check if Save button should be disabled
  const isSaveDisabled =
    !fullName.trim() ||
    !role.trim() ||
    errors.fullName !== "" ||
    errors.role !== "" ||
    errors.mobile !== "";
  return (
    <div className="w-full">
      {/* Saving Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white border-t-violet-500 rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">Saving profile...</p>
          </div>
        </div>
      )}
      <div className="w-full">
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <div onClick={() => navigate("/settings")} className="p-1 bg-white cursor-pointer">
            <ArrowLeftIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="mr-8 text-md">User Profile</h2>
          </div>
          <div></div>
        </div>
        {/* Profile Image - Entire circle is clickable */}
        <div className="flex justify-center mt-5 relative">
          <label className="relative border-gray-200 border-3 object-fit w-22 h-22 rounded-full bg-re-500 cursor-pointer hover:opacity-80 transition-opacity">
            {tempImage || profileImage ? (
              <img src={tempImage || profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="z-10 absolute py-1 px-1 bg-white border-1 border-gray-300 -bottom-1 right-1 rounded-full pointer-events-none">
              <CameraIcon className="w-5 h-5" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        {/* Form */}
        <form onSubmit={handleSave} className="p-4 mt-6">
          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-3">
              <label className="text-gray-700 text-md">Full Name</label>
              <input
                type="text"
                className="w-full border-1 border-gray-300 rounded-full py-3 px-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
            </div>
            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-md">Role</label>
              <input
                type="text"
                className="w-full border-1 border-gray-300 rounded-full py-3 px-2"
                placeholder="Student, Lecturer, Admin, or Staff"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
            </div>
            {/* Email - Non-editable */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-md">E-mail</label>
              <input
                type="email"
                className="w-full border-1 border-gray-300 rounded-full py-3 px-2 bg-gray-100 cursor-not-allowed text-gray-600"
                value={email}
                disabled
                placeholder="example@email.com"
              />
              <span className="text-gray-500 text-xs ml-2">Email cannot be changed</span>
            </div>
            {/* Mobile */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-md">Mobile <span className="text-gray-400 text-sm">(Optional)</span></label>
              <input
                type="text"
                placeholder="050-545-9921"
                className="w-full border-1 border-gray-300 rounded-full py-3 px-2"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
            </div>
            {/* Save Button */}
            <button
              type="submit"
              className={`mt-5 py-3 rounded-full text-white font-medium text-lg ${
                isSaveDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-violet-700"
              }`}
              disabled={isSaveDisabled}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UserProfile;