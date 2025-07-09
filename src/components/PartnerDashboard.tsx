import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Star, TrendingUp, DollarSign, Calendar, Settings } from 'lucide-react';
import { Partner, PartnerVehicle, PartnerMaterial } from '../types';

interface PartnerDashboardProps {
  partner: Partner;
  vehicles?: PartnerVehicle[];
  materials?: PartnerMaterial[];
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({ partner, vehicles = [], materials = [] }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'bookings' | 'earnings' | 'profile'>('overview');

  const stats = {
    totalListings: partner.type === 'vehicle_owner' ? vehicles.length : materials.length,
    activeListings: partner.type === 'vehicle_owner' 
      ? vehicles.filter(v => v.status === 'active').length 
      : materials.filter(m => m.status === 'active').length,
    totalEarnings: 15420, // Mock data
    monthlyBookings: 23 // Mock data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {partner.businessName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                partner.status === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : partner.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{partner.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'listings', label: partner.type === 'vehicle_owner' ? 'Vehicles' : 'Materials' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'earnings', label: 'Earnings' },
              { id: 'profile', label: 'Profile' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Listings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalListings}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Listings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeListings}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Monthly Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.monthlyBookings}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Earnings</p>
                    <p className="text-3xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((booking) => (
                    <div key={booking} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">JCB Excavator Rental</p>
                        <p className="text-sm text-gray-600">John Construction Co.</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">$480</p>
                        <p className="text-sm text-gray-500">2 days</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold text-gray-900">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Customer Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-gray-900">{partner.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-gray-900">96%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Jobs</span>
                    <span className="font-semibold text-gray-900">{partner.totalJobs}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                My {partner.type === 'vehicle_owner' ? 'Vehicles' : 'Materials'}
              </h2>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partner.type === 'vehicle_owner' ? (
                vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <img 
                      src={vehicle.images[0] || 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                      alt={vehicle.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          vehicle.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : vehicle.status === 'maintenance'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {vehicle.status}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{vehicle.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-lg font-bold text-orange-600">${vehicle.pricePerHour}/hr</span>
                          <span className="text-gray-500 ml-2">${vehicle.pricePerDay}/day</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                materials.map((material) => (
                  <div key={material.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <img 
                      src={material.images[0] || 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                      alt={material.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{material.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          material.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : material.status === 'out_of_stock'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {material.status.replace('_', ' ')}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{material.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-lg font-bold text-yellow-600">${material.pricePerUnit}</span>
                          <span className="text-gray-500 ml-1">per {material.unit}</span>
                        </div>
                        <span className="text-sm text-gray-500">{material.availableQuantity} {material.unit} available</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bookings Management</h3>
            <p className="text-gray-600">View and manage your bookings and reservations</p>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Earnings Analytics</h3>
            <p className="text-gray-600">Track your earnings and financial performance</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Settings</h3>
            <p className="text-gray-600">Manage your business profile and account settings</p>
          </div>
        )}
      </div>
    </div>
  );
};