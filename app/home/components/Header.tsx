import React, { useState, useEffect } from "react";

interface HeaderProps {
  toggleSidebar: () => void;
  user: { name: string; email: string; image?: string };
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileDropdown = document.getElementById("profile-dropdown");
      if (profileDropdown && !profileDropdown.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 p-4 flex justify-end items-center z-50 shadow-md">
      {/* Right Side - Menu & Profile */}
      <div className="flex items-center space-x-4">
        {/* Menu Button (Right-Aligned) */}
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md transition-transform hover:scale-105"
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          ☰ Menu
        </button>

        {/* Profile Section */}
        <div className="relative">
          <img
            src={user.image || "https://i1.sndcdn.com/artworks-Uhee91UCPp7ic4Sw-oAlLlg-t1080x1080.jpg"}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsProfileOpen(!isProfileOpen);
            }}
          />

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div
              id="profile-dropdown"
              className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg"
            >
              <div className="p-3 border-b border-gray-600">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-300">{user.email}</p>
              </div>
              <button className="w-full text-left p-2 hover:bg-gray-600" onClick={() => alert("Logged Out")}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
