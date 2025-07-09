import React, { useState } from 'react';
import { materialItems } from '../data/services';
import { MaterialItem } from '../types';
import { ShoppingCart, ArrowLeft, Star, Truck, Shield, Clock, MapPin, Phone, MessageCircle, User, Award } from 'lucide-react';

interface MaterialsSectionProps {
  onBack: () => void;
  onRequestService: (item: MaterialItem, quantity: number) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({ onBack, onRequestService }) => {
  const [selectedItem, setSelectedItem] = useState<MaterialItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleRequest = () => {
    if (selectedItem) {
      onRequestService(selectedItem, quantity);
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessage = (phone: string, supplierName: string, materialName: string) => {
    const message = `Hi ${supplierName}, I'm interested in your ${materialName}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (selectedItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedItem(null)}
              className="flex items-center text-black hover:text-gray-700 transition-colors mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Materials
            </button>
            <h1 className="text-4xl font-bold text-black">{selectedItem.name}</h1>
          </div>
        </section>

        {/* Material Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Material Image and Info */}
              <div>
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
                />
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Details</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedItem.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Price per {selectedItem.unit}</div>
                      <div className="text-2xl font-bold text-yellow-600">Rs. {selectedItem.pricePerUnit.toLocaleString()}</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Availability</div>
                      <div className="text-lg font-semibold text-green-600">
                        {selectedItem.available ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supplier Info and Contact */}
              <div className="space-y-6">
                {/* Supplier Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Supplier Information</h2>
                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-semibold text-yellow-700">{selectedItem.supplier.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{selectedItem.supplier.name}</div>
                        <div className="text-sm text-gray-600">Material Supplier</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Location</div>
                        <div className="text-gray-600">{selectedItem.supplier.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-4">
                        <Phone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Contact Number</div>
                        <div className="text-gray-600">{selectedItem.supplier.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-lg mr-4">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Total Orders</div>
                        <div className="text-gray-600">{selectedItem.supplier.totalOrders} completed</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Supplier</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleCall(selectedItem.supplier.phone)}
                      className="flex items-center justify-center bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </button>
                    <button
                      onClick={() => handleMessage(selectedItem.supplier.phone, selectedItem.supplier.name, selectedItem.name)}
                      className="flex items-center justify-center bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Message
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Connect directly with the supplier to discuss your requirements
                  </p>
                </div>

                {/* Quick Order */}
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-black">
                  <h3 className="text-xl font-bold mb-4">Quick Order</h3>
                  <p className="mb-6">Need this material? Contact the supplier directly for immediate assistance.</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleCall(selectedItem.supplier.phone)}
                      className="flex-1 bg-black text-yellow-400 py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                    >
                      Call to Order
                    </button>
                    <button
                      onClick={() => handleMessage(selectedItem.supplier.phone, selectedItem.supplier.name, selectedItem.name)}
                      className="flex-1 bg-white text-black py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                    >
                      Message to Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-black hover:text-gray-700 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Services
          </button>

          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Premium Construction Materials
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto mb-8">
              Connect directly with trusted material suppliers. Browse quality materials, 
              view supplier details, and contact them instantly for your construction needs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Verified Suppliers</h3>
                <p className="text-black text-sm">All suppliers are verified and rated</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Phone className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Direct Contact</h3>
                <p className="text-black text-sm">Call or message suppliers directly</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                <p className="text-black text-sm">Get instant quotes and availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Materials</h2>
            <p className="text-gray-600 text-lg">Browse materials from verified suppliers across Sri Lanka</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materialItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{item.supplier.rating}</span>
                    </div>
                  </div>
                  {item.available && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  
                  {/* Supplier Info */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 text-sm">{item.supplier.name}</span>
                      <span className="text-xs text-gray-500">{item.supplier.totalOrders} orders</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.supplier.location}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-2xl font-bold text-yellow-600">
                        Rs. {item.pricePerUnit.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">per {item.unit}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCall(item.supplier.phone);
                      }}
                      className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMessage(item.supplier.phone, item.supplier.name, item.name);
                      }}
                      className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};