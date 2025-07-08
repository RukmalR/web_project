import React, { useState } from 'react';
import { X, User, Building, Phone, Mail, MapPin, FileText, Shield, CreditCard, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Partner } from '../types';

interface PartnerRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (partner: Omit<Partner, 'id' | 'status' | 'registrationDate' | 'rating' | 'totalJobs'>) => void;
}

export const PartnerRegistration: React.FC<PartnerRegistrationProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [partnerType, setPartnerType] = useState<'vehicle_owner' | 'material_supplier' | ''>('');
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    businessLicense: '',
    taxId: '',
    yearsInBusiness: 0,
    description: '',
    services: [] as string[],
    certifications: [] as string[],
    insuranceDetails: {
      provider: '',
      policyNumber: '',
      expiryDate: ''
    },
    bankDetails: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      routingNumber: ''
    },
    documents: {
      businessLicense: null as File | null,
      insurance: null as File | null,
      taxCertificate: null as File | null,
      bankStatement: null as File | null
    }
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleCertificationToggle = (certification: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(certification)
        ? prev.certifications.filter(c => c !== certification)
        : [...prev.certifications, certification]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const partner: Omit<Partner, 'id' | 'status' | 'registrationDate' | 'rating' | 'totalJobs'> = {
      type: partnerType as 'vehicle_owner' | 'material_supplier',
      ...formData
    };
    
    onSubmit(partner);
    onClose();
    
    // Reset form
    setCurrentStep(1);
    setPartnerType('');
    setFormData({
      businessName: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      businessLicense: '',
      taxId: '',
      yearsInBusiness: 0,
      description: '',
      services: [],
      certifications: [],
      insuranceDetails: {
        provider: '',
        policyNumber: '',
        expiryDate: ''
      },
      bankDetails: {
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        routingNumber: ''
      },
      documents: {
        businessLicense: null,
        insurance: null,
        taxCertificate: null,
        bankStatement: null
      }
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const vehicleServices = [
    'Excavation Services', 'Transportation', 'Crane Operations', 'Demolition',
    'Material Handling', 'Site Preparation', 'Road Construction', 'Landscaping'
  ];

  const materialServices = [
    'Sand Supply', 'Gravel Supply', 'Concrete Supply', 'Steel Supply',
    'Brick Supply', 'Timber Supply', 'Roofing Materials', 'Plumbing Supplies'
  ];

  const certificationOptions = [
    'ISO 9001', 'OSHA Certified', 'DOT Certified', 'EPA Compliant',
    'Quality Assurance Certified', 'Safety Management Certified'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Partner Registration</h2>
              <p className="text-gray-600 mt-1">Join Auto X as a service partner</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                    step <= currentStep
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? <CheckCircle size={16} /> : step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Partner Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Partner Type</h3>
                <p className="text-gray-600">Select the type of services you want to provide</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div
                  onClick={() => setPartnerType('vehicle_owner')}
                  className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                    partnerType === 'vehicle_owner'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Building className="text-yellow-600 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Vehicle Owner</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Rent out your construction vehicles, heavy machinery, and equipment to contractors and builders.
                    </p>
                    <ul className="mt-4 text-sm text-gray-500 space-y-1">
                      <li>• Excavators, JCBs, Cranes</li>
                      <li>• Trucks, Lorries, Trailers</li>
                      <li>• Specialized Equipment</li>
                    </ul>
                  </div>
                </div>

                <div
                  onClick={() => setPartnerType('material_supplier')}
                  className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                    partnerType === 'material_supplier'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-blue-600 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Material Supplier</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Supply construction materials like sand, gravel, steel, bricks, and other building supplies.
                    </p>
                    <ul className="mt-4 text-sm text-gray-500 space-y-1">
                      <li>• Sand, Gravel, Soil</li>
                      <li>• Steel, Concrete, Bricks</li>
                      <li>• Specialized Materials</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h3>
                <p className="text-gray-600">Tell us about your business</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Building size={16} className="mr-2" />
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your business name"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <User size={16} className="mr-2" />
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Business owner name"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Mail size={16} className="mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="business@example.com"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Phone size={16} className="mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 123-4567"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FileText size={16} className="mr-2" />
                    Business License Number *
                  </label>
                  <input
                    type="text"
                    name="businessLicense"
                    value={formData.businessLicense}
                    onChange={handleInputChange}
                    required
                    placeholder="License number"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FileText size={16} className="mr-2" />
                    Tax ID / EIN *
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    required
                    placeholder="Tax identification number"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Building size={16} className="mr-2" />
                    Years in Business *
                  </label>
                  <input
                    type="number"
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="0"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FileText size={16} className="mr-2" />
                  Business Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your business, experience, and what makes you unique..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Address & Location */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Address</h3>
                <p className="text-gray-600">Where is your business located?</p>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <MapPin size={16} className="mr-2" />
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="123 Business Street"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <MapPin size={16} className="mr-2" />
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <MapPin size={16} className="mr-2" />
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    placeholder="State"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <MapPin size={16} className="mr-2" />
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    placeholder="12345"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              {/* Services Selection */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Building size={16} className="mr-2" />
                  Services Offered *
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {(partnerType === 'vehicle_owner' ? vehicleServices : materialServices).map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="mr-3 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Shield size={16} className="mr-2" />
                  Certifications (Optional)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {certificationOptions.map((cert) => (
                    <label key={cert} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.certifications.includes(cert)}
                        onChange={() => handleCertificationToggle(cert)}
                        className="mr-3 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Insurance & Banking */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Insurance & Banking</h3>
                <p className="text-gray-600">Financial and insurance information</p>
              </div>

              {/* Insurance Details */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="mr-2" />
                  Insurance Information
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Insurance Provider *
                    </label>
                    <input
                      type="text"
                      name="insuranceDetails.provider"
                      value={formData.insuranceDetails.provider}
                      onChange={handleInputChange}
                      required
                      placeholder="Insurance company name"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Policy Number *
                    </label>
                    <input
                      type="text"
                      name="insuranceDetails.policyNumber"
                      value={formData.insuranceDetails.policyNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Policy number"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Policy Expiry Date *
                    </label>
                    <input
                      type="date"
                      name="insuranceDetails.expiryDate"
                      value={formData.insuranceDetails.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Banking Details */}
              <div className="bg-green-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="mr-2" />
                  Banking Information
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      name="bankDetails.accountHolderName"
                      value={formData.bankDetails.accountHolderName}
                      onChange={handleInputChange}
                      required
                      placeholder="Account holder name"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      name="bankDetails.bankName"
                      value={formData.bankDetails.bankName}
                      onChange={handleInputChange}
                      required
                      placeholder="Bank name"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      name="bankDetails.accountNumber"
                      value={formData.bankDetails.accountNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Account number"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Routing Number *
                    </label>
                    <input
                      type="text"
                      name="bankDetails.routingNumber"
                      value={formData.bankDetails.routingNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Routing number"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Document Upload */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h3>
                <p className="text-gray-600">Upload required documents for verification</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Business License</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload your business license document</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'businessLicense')}
                    className="hidden"
                    id="businessLicense"
                  />
                  <label
                    htmlFor="businessLicense"
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                  >
                    Choose File
                  </label>
                  {formData.documents.businessLicense && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.documents.businessLicense.name}
                    </p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Insurance Certificate</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload your insurance certificate</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'insurance')}
                    className="hidden"
                    id="insurance"
                  />
                  <label
                    htmlFor="insurance"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    Choose File
                  </label>
                  {formData.documents.insurance && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.documents.insurance.name}
                    </p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Tax Certificate</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload your tax registration certificate</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'taxCertificate')}
                    className="hidden"
                    id="taxCertificate"
                  />
                  <label
                    htmlFor="taxCertificate"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition-colors"
                  >
                    Choose File
                  </label>
                  {formData.documents.taxCertificate && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.documents.taxCertificate.name}
                    </p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Bank Statement</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload recent bank statement</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'bankStatement')}
                    className="hidden"
                    id="bankStatement"
                  />
                  <label
                    htmlFor="bankStatement"
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-600 transition-colors"
                  >
                    Choose File
                  </label>
                  {formData.documents.bankStatement && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.documents.bankStatement.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="text-yellow-600 w-6 h-6 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• All documents must be clear and legible</li>
                      <li>• Accepted formats: PDF, JPG, JPEG, PNG</li>
                      <li>• Maximum file size: 10MB per document</li>
                      <li>• Documents will be verified within 2-3 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={currentStep === 1 && !partnerType}
                className="px-6 py-3 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};