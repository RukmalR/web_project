import React, { useState } from 'react';
import { vehicles } from '../data/services';
import { Vehicle } from '../types';
import { Calendar, ArrowLeft, Clock, Star, Shield, Wrench, Users } from 'lucide-react';

interface VehiclesSectionProps {
  onBack: () => void;
  onRequestService: (vehicle: Vehicle, duration: number, durationType: 'hours' | 'days') => void;
}

export const VehiclesSection: React.FC<VehiclesSectionProps> = ({ onBack, onRequestService }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [duration, setDuration] = useState(1);
  const [durationType, setDurationType] = useState<'hours' | 'days'>('hours');

  const handleRequest = () => {
    if (selectedVehicle) {
      onRequestService(selectedVehicle, duration, durationType);
      setSelectedVehicle(null);
      setDuration(1);
      setDurationType('hours');
    }
  };

  const getPrice = (vehicle: Vehicle) => {
    return durationType === 'hours' ? vehicle.pricePerHour : vehicle.pricePerDay;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-blue-200 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Services
          </button>

          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Professional Vehicle Rental
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Well-maintained construction vehicles and heavy machinery with experienced operators. 
              Flexible rental terms and comprehensive insurance coverage included.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Fully Insured</h3>
                <p className="text-blue-100 text-sm">Comprehensive coverage</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Wrench className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Well Maintained</h3>
                <p className="text-blue-100 text-sm">Regular service checks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Expert Operators</h3>
                <p className="text-blue-100 text-sm">Skilled professionals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Flexible Terms</h3>
                <p className="text-blue-100 text-sm">Hourly or daily rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Vehicle</h2>
            <p className="text-gray-600 text-lg">Professional construction vehicles for every project need</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">4.9</span>
                    </div>
                  </div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                    vehicle.available 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {vehicle.available ? 'Available' : 'Booked'}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Wrench className="w-4 h-4 mr-2" />
                      Specifications:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {vehicle.specifications.map((spec, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          Rs. {vehicle.pricePerHour.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">per hour</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          Rs. {vehicle.pricePerDay.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">per day</div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    disabled={!vehicle.available}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed group"
                  >
                    <Calendar size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                    {vehicle.available ? 'Book Vehicle' : 'Currently Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <div className="text-center mb-6">
              <img 
                src={selectedVehicle.image} 
                alt={selectedVehicle.name}
                className="w-20 h-20 rounded-xl object-cover mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedVehicle.name}</h3>
              <p className="text-gray-600">{selectedVehicle.description}</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Rental Duration Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDurationType('hours')}
                    className={`flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                      durationType === 'hours'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Clock size={16} className="mr-2" />
                    Hourly
                  </button>
                  <button
                    onClick={() => setDurationType('days')}
                    className={`flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                      durationType === 'days'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Calendar size={16} className="mr-2" />
                    Daily
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Duration ({durationType})
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setDuration(Math.max(1, duration - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 text-center border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 font-semibold text-lg"
                  />
                  <button
                    onClick={() => setDuration(duration + 1)}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Rate per {durationType.slice(0, -1)}:</span>
                  <span className="font-semibold text-gray-900">Rs. {getPrice(selectedVehicle).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span className="font-semibold text-gray-900">{duration} {durationType}</span>
                </div>
                <div className="border-t border-blue-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">Total Estimated Cost:</span>
                    <span className="text-3xl font-bold text-blue-600">
                      Rs. {(getPrice(selectedVehicle) * duration).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequest}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
                >
                  Book Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};