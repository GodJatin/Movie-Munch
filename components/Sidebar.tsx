"use client";
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Movie Munch</h2>
      <nav className="flex-grow p-4">
        <ul className="space-y-4">
          <li><Link href="/home" className="block p-2 hover:bg-gray-700 rounded">Home</Link></li>
          <li><Link href="/genres" className="block p-2 hover:bg-gray-700 rounded">Genres</Link></li>
          <li><Link href="/trending" className="block p-2 hover:bg-gray-700 rounded">Trending</Link></li>
          <li><Link href="/favorites" className="block p-2 hover:bg-gray-700 rounded">Favorites</Link></li>
        </ul>
      </nav>
      <button 
        className="m-4 p-2 bg-red-600 hover:bg-red-700 rounded" 
        onClick={() => {
          localStorage.removeItem("currentUser");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
