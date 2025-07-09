import { MaterialItem, Vehicle } from '../types';

export const materialItems: MaterialItem[] = [
  {
    id: 'sand-1',
    name: 'River Sand',
    description: 'High-quality river sand perfect for construction work. Clean, well-graded sand suitable for concrete mixing and masonry work.',
    pricePerUnit: 6500,
    unit: 'cubic meter',
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true
  },
  {
    id: 'soil-1',
    name: 'Garden Soil',
    description: 'Rich, fertile soil ideal for landscaping and gardening projects. Nutrient-rich composition perfect for plant growth.',
    pricePerUnit: 7500,
    unit: 'cubic meter',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true
  },
  {
    id: 'bricks-1',
    name: 'Red Clay Bricks',
    description: 'Durable clay bricks for construction and masonry work. High compressive strength and weather resistance.',
    pricePerUnit: 32000,
    unit: 'per 1000 pieces',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true
  }
];

export const vehicles: Vehicle[] = [
  {
    id: 'jcb-1',
    name: 'JCB Excavator',
    description: 'Heavy-duty excavator for digging and construction work. Professional grade equipment with experienced operator included.',
    pricePerHour: 32000,
    pricePerDay: 210000,
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    specifications: ['Operating Weight: 8.5 tons', 'Max Digging Depth: 5.2m', 'Bucket Capacity: 0.28m³', 'Engine Power: 74kW']
  },
  {
    id: 'lorry-1',
    name: 'Transport Lorry',
    description: 'Large capacity truck for material transportation. Reliable vehicle for moving construction materials to your site.',
    pricePerHour: 21000,
    pricePerDay: 135000,
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    specifications: ['Payload: 10 tons', 'Bed Length: 6.2m', 'Width: 2.4m', 'Hydraulic Tipping']
  },
  {
    id: 'bowser-1',
    name: 'Water Bowser',
    description: 'Water tanker for construction site water supply. Essential for dust control and construction activities.',
    pricePerHour: 16000,
    pricePerDay: 105000,
    image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    specifications: ['Capacity: 5000L', 'Pump Pressure: 4 bar', 'Hose Length: 50m', 'Spray System']
  },
  {
    id: 'boom-1',
    name: 'Boom Lift',
    description: 'Aerial work platform for high-access construction work. Safe and efficient solution for elevated tasks.',
    pricePerHour: 40000,
    pricePerDay: 265000,
    image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    specifications: ['Max Height: 15m', 'Platform Capacity: 230kg', 'Outreach: 7.6m', 'Electric Drive']
  }
];