import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MaterialsSection } from './components/MaterialsSection';
import { VehiclesSection } from './components/VehiclesSection';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { GuestMaterialPage } from './components/GuestMaterialPage';
import { GuestVehiclePage } from './components/GuestVehiclePage';
import { GuestPartnerPage } from './components/GuestPartnerPage';
import { AuthModal } from './components/AuthModal';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { PartnerRegistration } from './components/PartnerRegistration';
import { PartnerDashboard } from './components/PartnerDashboard';
import { Footer } from './components/Footer';
import { User, MaterialItem, Vehicle, ServiceRequest, Partner } from './types';
import { materialItems, vehicles } from './data/services';
import { CheckCircle, Users, Truck } from 'lucide-react';

type ViewType = 'home' | 'services' | 'materials' | 'vehicles' | 'about' | 'contact' | 'partner-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [user, setUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPartnerRegistrationOpen, setIsPartnerRegistrationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serviceRequestModal, setServiceRequestModal] = useState<{
    isOpen: boolean;
    item: MaterialItem | Vehicle | null;
    quantity?: number;
    duration?: number;
    durationType?: 'hours' | 'days';
  }>({
    isOpen: false,
    item: null
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setPartner(null);
    setCurrentView('home');
  };

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };
  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleServiceSelect = (service: 'materials' | 'vehicles') => {
    setCurrentView(service);
  };

  const handleMaterialRequest = (item: MaterialItem, quantity: number) => {
    setServiceRequestModal({
      isOpen: true,
      item,
      quantity
    });
  };

  const handleVehicleRequest = (vehicle: Vehicle, duration: number, durationType: 'hours' | 'days') => {
    setServiceRequestModal({
      isOpen: true,
      item: vehicle,
      duration,
      durationType
    });
  };

  const handleServiceRequestSubmit = (request: Omit<ServiceRequest, 'id' | 'userId' | 'status' | 'requestDate'>) => {
    // This would create a notification for the supplier/owner
    console.log('Contact request sent to supplier/owner:', request);
    
    setServiceRequestModal({
      isOpen: false,
      item: null
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handlePartnerRegistration = (partnerData: Omit<Partner, 'id' | 'status' | 'registrationDate' | 'rating' | 'totalJobs'>) => {
    // Simulate partner registration
    const newPartner: Partner = {
      ...partnerData,
      id: Date.now().toString(),
      status: 'pending',
      registrationDate: new Date().toISOString(),
      rating: 0,
      totalJobs: 0
    };
    
    setPartner(newPartner);
    setIsPartnerRegistrationOpen(false);
    setCurrentView('partner-dashboard');
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'services':
        return <ServicesPage onServiceSelect={handleServiceSelect} />;
      case 'materials':
        return (
          <MaterialsSection
            onBack={() => setCurrentView('home')}
            onRequestService={handleMaterialRequest}
          />
        );
      case 'vehicles':
        return (
          <VehiclesSection
            onBack={() => setCurrentView('home')}
            onRequestService={handleVehicleRequest}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'materials':
        return user ? (
          <MaterialsSection
            onBack={() => setCurrentView('home')}
            onRequestService={handleMaterialRequest}
          />
        ) : (
          <GuestMaterialPage onSignUp={() => setIsAuthModalOpen(true)} />
        );
      case 'vehicles':
        return user ? (
          <VehiclesSection
            onBack={() => setCurrentView('home')}
            onRequestService={handleVehicleRequest}
          />
        ) : (
          <GuestVehiclePage onSignUp={() => setIsAuthModalOpen(true)} />
        );
      case 'partner-dashboard':
        return partner ? (
          <PartnerDashboard partner={partner} />
        ) : (
          <GuestPartnerPage onSignUp={() => setIsPartnerRegistrationOpen(true)} />
        );
      default:
        return <Hero onServiceSelect={handleServiceSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        currentView={currentView}
        onNavigate={handleNavigation}
      />

      {renderCurrentView()}

      {/* Partner Registration CTA */}
      {currentView === 'home' && user && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Become an Auto X Partner
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
                Join our network of trusted vehicle owners and material suppliers. 
                Grow your business and reach more customers through our platform.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <div className="bg-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Truck className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Vehicle Owners</h3>
                  <p className="text-blue-100 mb-6">
                    Rent out your construction vehicles and heavy machinery to verified contractors.
                  </p>
                  <ul className="text-blue-100 text-left space-y-2">
                    <li>• Earn passive income from your equipment</li>
                    <li>• Access to verified customers</li>
                    <li>• Insurance coverage included</li>
                    <li>• Flexible rental terms</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <div className="bg-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Material Suppliers</h3>
                  <p className="text-blue-100 mb-6">
                    Supply construction materials to projects across the region through our platform.
                  </p>
                  <ul className="text-blue-100 text-left space-y-2">
                    <li>• Expand your customer base</li>
                    <li>• Streamlined order management</li>
                    <li>• Guaranteed payments</li>
                    <li>• Quality certification support</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setIsPartnerRegistrationOpen(true)}
                  className="bg-white text-yellow-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-colors shadow-lg"
                >
                  Register as Partner
                </button>
                <button 
                  onClick={() => partner && setCurrentView('partner-dashboard')}
                  className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Partner Login
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer onNavigate={handleNavigation} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <PartnerRegistration
        isOpen={isPartnerRegistrationOpen}
        onClose={() => setIsPartnerRegistrationOpen(false)}
        onSubmit={handlePartnerRegistration}
      />

      <ServiceRequestModal
        isOpen={serviceRequestModal.isOpen}
        onClose={() => setServiceRequestModal({ isOpen: false, item: null })}
        item={serviceRequestModal.item}
        quantity={serviceRequestModal.quantity}
        duration={serviceRequestModal.duration}
        durationType={serviceRequestModal.durationType}
        onSubmit={handleServiceRequestSubmit}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center z-50">
          <CheckCircle size={20} className="mr-2" />
          <span>
            {partner && currentView === 'partner-dashboard' 
              ? 'Partner registration submitted successfully! We\'ll review your application within 2-3 business days.'
              : 'Service request submitted successfully! We\'ll contact you soon.'
            }
          </span>
        </div>
      )}
    </div>
  );
}

export default App;