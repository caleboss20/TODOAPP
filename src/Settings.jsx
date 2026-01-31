import {
  BellAlertIcon,
  ChevronRightIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import BottomNavbar from "./Components/BottomNavbar";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import ToggleButton from "./Components/ToggleButton";
import { useState, useEffect } from "react";
function Settings() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [logoutOverlay, setlogoutOverlay] = useState(false);
  const [logout, setLogOut] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({ newPassword: "", confirmPassword: "" });
  const [touchedFields, setTouchedFields] = useState({ newPassword: false, confirmPassword: false });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  // Password validation function
  const validatePassword = (passwordValue) => {
    if (!passwordValue.trim()) return "Password is required";
    if (passwordValue.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(passwordValue)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(passwordValue)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(passwordValue)) return "Password must contain at least one number";
    return "";
  };
  const validateConfirmPassword = (confirmValue, passwordValue) => {
    if (!confirmValue.trim()) return "Please confirm your password";
    if (confirmValue !== passwordValue) return "Passwords do not match";
    return "";
  };
  // Update password errors as user types
  useEffect(() => {
    setPasswordErrors({
      newPassword: validatePassword(newPassword),
      confirmPassword: validateConfirmPassword(confirmPassword, newPassword),
    });
  }, [newPassword, confirmPassword]);
  // Load user data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    if (storedData) {
      try {
        const { fullName, profileImage: image } = JSON.parse(storedData);
        setUserName(fullName || "");
        setProfileImage(image || null);
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    }
  }, []);
  // Check if save password button should be disabled
  const isSavePasswordDisabled =
    !newPassword.trim() ||
    !confirmPassword.trim() ||
    passwordErrors.newPassword !== "" ||
    passwordErrors.confirmPassword !== "";
  const handleSavePassword = () => {
    const newPasswordError = validatePassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, newPassword);
    if (newPasswordError || confirmPasswordError) {
      return;
    }
    setIsSavingPassword(true);
    setTimeout(() => {
      try {
        // Get current account data
        const storedAccount = localStorage.getItem("userAccount");
        if (storedAccount) {
          const accountData = JSON.parse(storedAccount);
          // Update password
          accountData.password = newPassword;
          // Save updated account to localStorage
          localStorage.setItem("userAccount", JSON.stringify(accountData));
        
          setIsSavingPassword(false);
          setPasswordSuccess(true);
        
          // Clear password fields
          setNewPassword("");
          setConfirmPassword("");
        
          // Close popup and show success message for 2 seconds
          setTimeout(() => {
            setPopup(false);
            setPasswordSuccess(false);
            setTouchedFields({ newPassword: false, confirmPassword: false });
          }, 2000);
        }
      } catch (e) {
        console.error("Failed to update password", e);
        setIsSavingPassword(false);
      }
    }, 2000);
  };
  const loggingOut = () => {
    setlogoutOverlay(true);
    setTimeout(() => {
      // Clear login session
      localStorage.removeItem("loginSession");
      localStorage.removeItem("keepSignedIn");
      navigate("/login");
    }, 4000);
  };
  return (
    <div className="w-full ">
      <div className="p-4 mt-0 ">
        <h2 className="text-2xl font-medium">Settings</h2>
        <div className="flex w-full mt-10 justify-between items-center">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-violet-400 rounded-full overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs"></div>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-600 text-sm">Welcome back</span>
              <h2 className="text-gray-900 text-md font-medium">
                Mr {userName || "User"}
              </h2>
            </div>
          </div>
          <div onClick={() => setLogOut(true)}>
            <ArrowRightEndOnRectangleIcon className="w-17 h-6 text-red-600" />
          </div>
        </div>
      </div>
      {/** middle section*/}
      <div className="p-6 mt-5 flex flex-col">
        <Link to="/userprofile">
          <div className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100">
            <div className="flex gap-3 items-center">
              <UserCircleIcon className="w-6 h-6 text-gray-700" />
              <p className="text-black font-small text-md">User Profile</p>
            </div>
            <div>
              <ChevronRightIcon className="w-12 h-4" />
            </div>
          </div>
        </Link>
        <div
          onClick={() => setPopup(true)}
          className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100"
        >
          <div className="flex gap-3 items-center">
            <LockClosedIcon className="w-6 h-6 text-gray-700" />
            <p className="text-black font-small text-md">Change Password</p>
          </div>
          <div>
            <ChevronRightIcon className="w-12 h-4" />
          </div>
        </div>
        <div className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100">
          <div className="flex gap-3 items-center">
            <QuestionMarkCircleIcon className="w-6 h-6 text-gray-700" />
            <p className="text-black font-small text-md">FAQs</p>
          </div>
          <div>
            <ChevronRightIcon className="w-12 h-4" />
          </div>
        </div>
        <div className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100">
          <div className="flex gap-3 items-center">
            <BellAlertIcon className="w-6 h-6 text-gray-700" />
            <p className="text-black font-small text-md">Push Notification</p>
          </div>
          <div>
            <ToggleButton />
          </div>
        </div>

        <Link to="/deleteaccount">
          <div className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100">
            <div className="flex gap-3 items-center">
              <TrashIcon className="w-6 h-6 text-gray-700" />
              <p className="text-black font-small text-md">Delete account</p>
            </div>
            <div>
              <ChevronRightIcon className="w-12 h-4" />
            </div>
          </div>
        </Link>
      </div>
      <div className="p-6 mb-20">
        <div className=" py-5 px-11 flex gap-3 flex-col justify-center items-center w-full rounded-2xl bg-gray-100">
          <span className="text-black text-sm text-center">
            If you have any other query you can reach out to us.
          </span>
          <span className="underline text-violet-900 text-center text-sm">
            Whatsapp Us
          </span>
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <span className="text-gray-600 text-[11px]">
            Campus Shuttle v1.0.0
          </span>
          <span className="text-gray-600 text-[11px]">
            @ 2026 University Transport
          </span>
        </div>
      </div>
      <BottomNavbar />
      {/**the password popup */}
      {popup && (
        <>
          <div
            onClick={() => {
              setPopup(false);
              setTouchedFields({ newPassword: false, confirmPassword: false });
            }}
            className="z-20 absolute w-full h-screen bg-black/40 inset-0"
          ></div>
          <div className="right-0 left-0 bottom-0 fixed z-50 w-full bg-white h-auto rounded-tl-2xl rounded-tr-2xl">
            <div className="flex justify-center mt-4">
              <div className="w-15 h-[3px] bg-gray-500 rounded-full "></div>
            </div>
            <h2 className="text-center mt-4 font-medium text-lg">
              Change Password
            </h2>
            <div className="flex flex-col gap-4 mt-4 p-4">
              {/* New Password */}
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border-1 border-gray-300 rounded-full py-3 px-5"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setTouchedFields((prev) => ({ ...prev, newPassword: true }));
                  }}
                  onFocus={() => setTouchedFields((prev) => ({ ...prev, newPassword: true }))}
                />
                {!passwordSuccess && touchedFields.newPassword && passwordErrors.newPassword && (
                  <span className="text-red-500 text-sm">{passwordErrors.newPassword}</span>
                )}
              </div>
              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border-1 border-gray-300 rounded-full py-3 px-5"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setTouchedFields((prev) => ({ ...prev, confirmPassword: true }));
                  }}
                  onFocus={() => setTouchedFields((prev) => ({ ...prev, confirmPassword: true }))}
                />
                {!passwordSuccess && touchedFields.confirmPassword && passwordErrors.confirmPassword && (
                  <span className="text-red-500 text-sm">{passwordErrors.confirmPassword}</span>
                )}
              </div>
              {/* Success Message */}
              {passwordSuccess && (
                <div className="bg-green-50 border-1 border-green-200 rounded-lg p-3">
                  <span className="text-green-600 text-sm">Password updated successfully!</span>
                </div>
              )}
              {/* Save Button */}
              <button
                onClick={handleSavePassword}
                className={`mt-2 py-3 rounded-full text-white font-medium text-lg flex items-center justify-center gap-2 transition-colors ${
                  isSavePasswordDisabled
                    ? "bg-gray-200 cursor-not-allowed"
                    : isSavingPassword
                    ? "bg-violet-700 opacity-30"
                    : "bg-violet-700 "
                }`}
                disabled={isSavePasswordDisabled || isSavingPassword}
              >
                {isSavingPassword && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {isSavingPassword ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </>
      )}
      {/**for the logout section */}
      {logout && (
        <>
          <div
            onClick={() => setLogOut(false)}
            className="z-20 absolute w-full h-screen bg-black/40 inset-0"
          ></div>
          <div className="w-full px-5 z-30 flex justify-center items-center fixed bottom-1/3">
            <div className="px-8 py-5 rounded-2xl bg-white h-40">
              <h2 className="text-center text-red-600 font-medium">Logout!</h2>
              <p className="text-md text-gray-800 mt-2">
                Are you sure you want to logout?
              </p>
              <div className="border-t-1 border-gray-200  py-3 flex gap-5 w-full justify-between mt-8">
                <button
                  onClick={() => setLogOut(false)}
                  className="border-r-1 border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={loggingOut}
                  className="font-medium text-violet-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {logoutOverlay && (
        <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white border-t-violet-500 rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">Logging out...</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Settings;