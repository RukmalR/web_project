import React from 'react';
import { Truck, Package, Clock, Shield, Star, Users, CheckCircle, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onServiceSelect: (service: 'materials' | 'vehicles') => void;
}

export const Hero: React.FC<HeroProps> = ({ onServiceSelect }) => {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Trusted by 500+ Construction Companies
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Build Your
                <span className="text-yellow-500 block">Dreams</span>
                <span className="text-gray-600 text-3xl lg:text-4xl font-normal block mt-2">
                  with Premium Materials
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                From foundation to finish, we supply premium construction materials and professional vehicles. 
                Quality guaranteed, delivered on time, every time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onServiceSelect('materials')}
                  className="group bg-yellow-400 text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Get Materials
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => onServiceSelect('vehicles')}
                  className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-yellow-500 hover:text-yellow-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Rent Vehicles
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                  alt="Modern Construction Site with Heavy Machinery" 
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                />
                
                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-xl">
                      <CheckCircle className="text-green-600 w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Quality Assured</div>
                      <div className="text-gray-600 text-sm">Premium materials</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-xl">
                      <Clock className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Fast Delivery</div>
                      <div className="text-gray-600 text-sm">Same day service</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-orange-100 rounded-full opacity-20 -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-100 rounded-full opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="text-orange-500"> Construction Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From premium materials to heavy machinery, we're your one-stop solution 
              for all construction needs with guaranteed quality and reliability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Materials Card */}
            <div 
              onClick={() => onServiceSelect('materials')}
              className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-yellow-200 hover:border-yellow-300"
            >
              <div className="absolute top-6 right-6">
                <div className="bg-yellow-400 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Package className="text-white w-8 h-8" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Premium Materials</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    High-grade construction materials sourced from trusted suppliers. 
                    Sand, steel, soil, bricks, and more delivered to your site.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">River Sand</div>
                    <div className="text-sm text-gray-600">Premium quality</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Garden Soil</div>
                    <div className="text-sm text-gray-600">Fertile & rich</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Clay Bricks</div>
                    <div className="text-sm text-gray-600">Durable build</div>
                  </div>
                </div>
                
                <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700">
                  Explore Materials
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Vehicles Card */}
            <div 
              onClick={() => onServiceSelect('vehicles')}
              className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-blue-200 hover:border-blue-300"
            >
              <div className="absolute top-6 right-6">
                <div className="bg-blue-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Truck className="text-white w-8 h-8" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Professional Vehicles</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Well-maintained construction vehicles and heavy machinery 
                    with experienced operators for maximum efficiency.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">JCB Excavator</div>
                    <div className="text-sm text-gray-600">Heavy duty</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Transport Lorry</div>
                    <div className="text-sm text-gray-600">Large capacity</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Water Bowser</div>
                    <div className="text-sm text-gray-600">Site supply</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Boom Lift</div>
                    <div className="text-sm text-gray-600">High access</div>
                  </div>
                </div>
                
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Explore Vehicles
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Construction Professionals Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by contractors and builders for reliable service and quality materials
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600 leading-relaxed">
                All materials undergo rigorous quality checks and come with certification. 
                Our vehicles are regularly maintained for optimal performance.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Availability</h3>
              <p className="text-gray-600 leading-relaxed">
                Round-the-clock service for urgent requirements. Emergency deliveries 
                and vehicle rentals available whenever you need them.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-orange-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Experienced team to help you choose the right materials and vehicles. 
                Professional operators available for complex machinery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-orange-100 mb-10 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust SupplyWorks for their 
              construction material and vehicle rental needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => onServiceSelect('materials')}
                className="group bg-white text-yellow-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              >
                ORDER MATERIALS NOW
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onServiceSelect('vehicles')}
                className="group border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-yellow-600 transition-all duration-300 flex items-center"
              >
                RENT VEHICLES TODAY
                <Truck className="ml-3 w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="text-white">
                <div className="text-3xl font-bold mb-2">Same Day</div>
                <div className="text-yellow-200">Delivery Available</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold mb-2">Competitive</div>
                <div className="text-yellow-200">Pricing Guaranteed</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold mb-2">Professional</div>
                <div className="text-yellow-200">Service Standards</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};