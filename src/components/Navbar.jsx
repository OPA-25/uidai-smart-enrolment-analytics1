import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import uidaiLogo from "../assets/uidai-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-gray-100">
      {/* <div className="text-center text-xl font-bold text-black">
  NAVBAR TEST – IF YOU SEE THIS, NAVBAR IS RENDERING
</div> */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          {/* <NavLink to="/" className="flex items-center space-x-3 group">
  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
    <img
      src="/assets/uidai-logo." // <-- path to your UIDAI logo (png or svg)
      alt="UIDAI Logo"
      className="w-10 h-10 object-contain"
    />
  </div>
  <div>
    <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
      Aadhaar Analytics
    </h1>
    <p className="text-xs text-gray-500 font-medium tracking-wide">Hackathon 2026</p>
  </div>
</NavLink> */}
<NavLink to="/" className="flex items-center space-x-3 group">
  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
    <img
      src={uidaiLogo}
      alt="UIDAI Logo"
      className="w-10 h-10 object-contain"
    />
  </div>
  <div>
    <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
      Aadhaar Analytics
    </h1>
    <p className="text-xs text-gray-500 font-medium tracking-wide">Hackathon 2026</p>
  </div>
</NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-sm mx-1 ${isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-300/50 !scale-105'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:scale-[1.02]'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/analysis"
              className={({ isActive }) =>
                `px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-sm mx-1 ${isActive
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-300/50 !scale-105'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:shadow-md hover:scale-[1.02]'
                }`
              }
            >
              District Analytics
            </NavLink>

            <NavLink
              to="/insights"
              className={({ isActive }) =>
                `px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-sm mx-1 ${isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-300/50 !scale-105'
                  : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 hover:shadow-md hover:scale-[1.02]'
                }`
              }
            >
              Enrollment Insights
            </NavLink>

            <NavLink
              to="/extrafeatures"
              className={({ isActive }) =>
                `px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-sm mx-1 ${isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-orange-300/50 !scale-105'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 hover:shadow-md hover:scale-[1.02]'
                }`
              }
            >
              Geo Map
            </NavLink>

            <NavLink
              to="/earlywarningdashboard"
              className={({ isActive }) =>
                `px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-sm mx-1 ${isActive
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-900 shadow-yellow-300/50 !scale-105 font-bold'
                  : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 hover:shadow-lg hover:scale-[1.02]'
                }`
              }
            >
              Risk Alerts
            </NavLink>


          </div>

          {/* Hackathon Badge */}
          <div className="hidden md:flex items-center px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-emerald-300/50">
            🏆 Live Demo
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-6 py-4 font-semibold text-lg transition-all duration-300 border-l-4 ${isActive
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'hover:bg-blue-50 hover:text-blue-600 border-transparent'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              📊 Overview
            </NavLink>
            <NavLink
              to="/analysis"
              className={({ isActive }) =>
                `block px-6 py-4 font-semibold text-lg transition-all duration-300 border-l-4 ${isActive
                  ? 'bg-purple-50 border-purple-500 text-purple-700'
                  : 'hover:bg-purple-50 hover:text-purple-600 border-transparent'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              🗺️ Districts
            </NavLink>
            <div className="px-6 py-4">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-emerald-300/50"
              >
                🏆 Live Demo
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
