import React from 'react';
import { Menu, X, Phone, Truck } from 'lucide-react';
import { User as UserType } from '../types';
import { ProfileDropdown } from './ProfileDropdown';

type ViewType = 'home' | 'services' | 'materials' | 'vehicles' | 'about' | 'contact';

interface HeaderProps {
  user: UserType | null;
  onAuthClick?: () => void;
  onLogout?: () => void;
  onUpdateProfile?: (userData: Partial<UserType>) => void;
  onMenuClick: () => void;
  isMenuOpen: boolean;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onAuthClick, 
  onLogout,
  onUpdateProfile,
  onMenuClick, 
  isMenuOpen, 
  currentView, 
  onNavigate 
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'materials', label: 'Materials' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>24/7 Support: +94 76 1098385</span>
              </div>
              <span className="hidden md:block">Free delivery on orders over $500</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow us:</span>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors">
                  <span className="text-xs font-bold">t</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-xl shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Auto X</h1>
                  <p className="text-xs text-gray-500">Construction Solutions</p>
                </div>
              </button>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as ViewType)}
                  className={`text-gray-700 hover:text-yellow-600 transition-colors font-medium py-2 border-b-2 border-transparent hover:border-yellow-500 ${
                    currentView === item.id ? 'text-yellow-600 border-yellow-500' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {!user && (
                <button
                  onClick={() => onNavigate('partner-dashboard')}
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium py-2 border-b-2 border-transparent hover:border-green-500 bg-green-50 px-4 rounded-lg"
                >
                  Become Partner
                </button>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <ProfileDropdown 
                  user={user} 
                  onLogout={onLogout || (() => {})} 
                  onUpdateProfile={onUpdateProfile || (() => {})} 
                />
              ) : (
                <button
                  onClick={onAuthClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <span>Sign In</span>
                </button>
              )}
              
              <button
                onClick={onMenuClick}
                className="lg:hidden text-gray-700 hover:text-orange-500 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as ViewType)}
                  className={`block w-full text-left px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg font-medium transition-colors ${
                    currentView === item.id ? 'text-yellow-600 bg-yellow-50' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};