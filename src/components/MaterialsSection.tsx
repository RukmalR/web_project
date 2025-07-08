import React, { useState } from 'react';
import { materialItems } from '../data/services';
import { MaterialItem } from '../types';
import { ShoppingCart, ArrowLeft, Star, Truck, Shield, Clock } from 'lucide-react';

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
              High-quality materials sourced from trusted suppliers, delivered directly to your construction site 
              with quality certification and competitive pricing.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Quality Certified</h3>
                <p className="text-black text-sm">All materials tested and certified</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Truck className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                <p className="text-black text-sm">Same day delivery available</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                <p className="text-black text-sm">Round the clock customer service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Materials</h2>
            <p className="text-gray-600 text-lg">Select from our wide range of premium construction materials</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {materialItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200"
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
                      <span className="text-sm font-medium ml-1">4.8</span>
                    </div>
                  </div>
                  {item.available && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      In Stock
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">
                        ${item.pricePerUnit}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">per {item.unit}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Starting from</div>
                      <div className="text-lg font-semibold text-gray-900">${(item.pricePerUnit * 5).toFixed(0)}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedItem(item)}
                    disabled={!item.available}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed group"
                  >
                    <ShoppingCart size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                    {item.available ? 'Request Quote' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <div className="text-center mb-6">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.name}
                className="w-20 h-20 rounded-xl object-cover mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h3>
              <p className="text-gray-600">{selectedItem.description}</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quantity ({selectedItem.unit})
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 text-center border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 font-semibold text-lg"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Unit Price:</span>
                  <span className="font-semibold text-gray-900">${selectedItem.pricePerUnit}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <span className="font-semibold text-gray-900">{quantity} {selectedItem.unit}</span>
                </div>
                <div className="border-t border-orange-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">Total Estimated Cost:</span>
                    <span className="text-3xl font-bold text-yellow-600">
                      ${(selectedItem.pricePerUnit * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequest}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
                >
                  Request Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};