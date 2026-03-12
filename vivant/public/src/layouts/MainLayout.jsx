import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-emerald-600 font-bold" : "text-gray-600 hover:text-emerald-500 font-medium";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-emerald-700 tracking-tight flex items-center gap-2">
              <span className="w-10 h-10 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-lg">V</span>
              Vivant
            </Link>
          </div>
          <div className="hidden sm:ml-8 sm:flex sm:space-x-8 items-center">
            <Link to="/" className={`px-3 py-2 text-sm transition-colors ${isActive('/')}`}>
              Accueil
            </Link>
            <Link to="/test" className={`px-3 py-2 text-sm transition-colors ${isActive('/test')}`}>
              Test (Données)
            </Link>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-500 transition-colors">
              À propos
            </a>
            <div className="ml-4">
              <button className="bg-emerald-600 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Projet Vivant. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
