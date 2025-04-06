import React from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
          onClick={toggleSidebar} 
        ></div>
      )}

      <div
        id="sidebar-menu"
        className={`fixed top-0 right-0 w-64 h-full bg-gray-900 text-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={toggleSidebar}
        >
          ✖ Close
        </button>
        <ul className="mt-16 space-y-4 p-4">
          <li className="hover:bg-gray-700 p-2 rounded">Home</li>
          <li className="hover:bg-gray-700 p-2 rounded">Trending</li>
          <li className="hover:bg-gray-700 p-2 rounded">Categories</li>
          <li className="hover:bg-gray-700 p-2 rounded">Logout</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
