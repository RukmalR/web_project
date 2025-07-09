import { MaterialItem, Vehicle } from '../types';

export const materialItems: MaterialItem[] = [
  {
    id: 'sand-1',
    name: 'River Sand',
    description: 'High-quality river sand perfect for construction work',
    pricePerUnit: 25,
    unit: 'cubic meter',
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true
  },
  {
    id: 'metal-1',
    name: 'Steel Rods',
    description: 'Premium steel reinforcement bars for construction',
    pricePerUnit: 850,
    unit: 'ton',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true
  },
  {
    id: 'soil-1',
    name: 'Garden Soil',
    description: 'Rich, fertile soil ideal for landscaping and gardening',
    pricePerUnit: 30,
    unit: 'cubic meter',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true
  },
  {
    id: 'bricks-1',
    name: 'Red Clay Bricks',
    description: 'Durable clay bricks for construction and masonry work',
    pricePerUnit: 12,
    unit: 'per 100 pieces',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true
  }
];

export const vehicles: Vehicle[] = [
  {
    id: 'jcb-1',
    name: 'JCB Excavator',
    description: 'Heavy-duty excavator for digging and construction work',
    pricePerHour: 120,
    pricePerDay: 800,
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    specifications: ['Operating Weight: 8.5 tons', 'Max Digging Depth: 5.2m', 'Bucket Capacity: 0.28m³']
  },
  {
    id: 'lorry-1',
    name: 'Transport Lorry',
    description: 'Large capacity truck for material transportation',
    pricePerHour: 80,
    pricePerDay: 500,
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    specifications: ['Payload: 10 tons', 'Bed Length: 6.2m', 'Width: 2.4m']
  },
  {
    id: 'bowser-1',
    name: 'Water Bowser',
    description: 'Water tanker for construction site water supply',
    pricePerHour: 60,
    pricePerDay: 400,
    image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    specifications: ['Capacity: 5000L', 'Pump Pressure: 4 bar', 'Hose Length: 50m']
  },
  {
    id: 'boom-1',
    name: 'Boom Lift',
    description: 'Aerial work platform for high-access construction work',
    pricePerHour: 150,
    pricePerDay: 1000,
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    specifications: ['Max Height: 15m', 'Platform Capacity: 230kg', 'Outreach: 7.6m']
  }
];