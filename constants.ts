import { CarPart, SelectOption } from './types';

export const APP_NAME = "AutoParts Pro";

export const BRANDS: SelectOption[] = [
  { label: 'All Brands', value: '' },
  { label: 'Toyota', value: 'Toyota' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Ford', value: 'Ford' },
  { label: 'Honda', value: 'Honda' },
  { label: 'Volkswagen', value: 'Volkswagen' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
];

export const CATEGORIES: SelectOption[] = [
  { label: 'All Categories', value: '' },
  { label: 'Brakes', value: 'Brakes' },
  { label: 'Suspension', value: 'Suspension' },
  { label: 'Engine', value: 'Engine' },
  { label: 'Exhaust', value: 'Exhaust' },
  { label: 'Electrical', value: 'Electrical' },
  { label: 'Filters', value: 'Filters' },
  { label: 'Cooling', value: 'Cooling' },
];

export const YEARS: SelectOption[] = [
  { label: 'All Years', value: '' },
  ...Array.from({ length: 30 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
  }),
];

// Reliable images for specific car part categories
export const PART_IMAGES: Record<string, string> = {
  'Brakes': 'https://images.unsplash.com/photo-1605218427306-022ba8c32f19?q=80&w=500&auto=format&fit=crop',
  'Suspension': 'https://images.unsplash.com/photo-1619556834076-24f4675f9229?q=80&w=500&auto=format&fit=crop',
  'Engine': 'https://images.unsplash.com/photo-1583209814737-8ec3e9e37b26?q=80&w=500&auto=format&fit=crop',
  'Exhaust': 'https://images.unsplash.com/photo-1567863786068-405c2299f93d?q=80&w=500&auto=format&fit=crop',
  'Electrical': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=500&auto=format&fit=crop',
  'Filters': 'https://images.unsplash.com/photo-1623880840062-8566270081d4?q=80&w=500&auto=format&fit=crop',
  'Cooling': 'https://images.unsplash.com/photo-1562916175-3b957597f0e9?q=80&w=500&auto=format&fit=crop',
  'Default': 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=500&auto=format&fit=crop'
};

export const getPartImage = (category: string): string => {
  return PART_IMAGES[category] || PART_IMAGES['Default'];
};

// Fallback data if Gemini is not active or for initial load
export const MOCK_PARTS: CarPart[] = [
  {
    id: '1',
    name: 'Ceramic Brake Pads (Front)',
    brand: 'Toyota',
    modelCompatibility: ['Camry', 'Corolla', 'RAV4'],
    yearCompatibility: [2018, 2019, 2020, 2021, 2022],
    category: 'Brakes',
    price: 45.99,
    partNumber: 'BP-TY-001',
    inStock: true,
    imageUrl: getPartImage('Brakes'),
    description: 'High-performance ceramic brake pads for reduced dust and noise.',
  },
  {
    id: '2',
    name: 'Oil Filter Premium',
    brand: 'Honda',
    modelCompatibility: ['Civic', 'Accord', 'CR-V'],
    yearCompatibility: [2015, 2016, 2017, 2018, 2019, 2020],
    category: 'Filters',
    price: 12.50,
    partNumber: 'OF-HN-992',
    inStock: true,
    imageUrl: getPartImage('Filters'),
    description: 'Synthetic blend media filter for extended engine life.',
  },
  {
    id: '3',
    name: 'Sport Suspension Kit',
    brand: 'BMW',
    modelCompatibility: ['3 Series', '4 Series'],
    yearCompatibility: [2012, 2013, 2014, 2015, 2016],
    category: 'Suspension',
    price: 899.00,
    partNumber: 'SUS-BM-330',
    inStock: false,
    imageUrl: getPartImage('Suspension'),
    description: 'Adjustable coilovers for improved handling and stance.',
  },
  {
    id: '4',
    name: 'Alternator 120A',
    brand: 'Ford',
    modelCompatibility: ['F-150', 'Mustang'],
    yearCompatibility: [2010, 2011, 2012, 2013, 2014],
    category: 'Electrical',
    price: 185.00,
    partNumber: 'ALT-FD-120',
    inStock: true,
    imageUrl: getPartImage('Electrical'),
    description: 'Heavy-duty alternator for high electrical load applications.',
  },
  {
    id: '5',
    name: 'Performance Exhaust Manifold',
    brand: 'Volkswagen',
    modelCompatibility: ['Golf', 'Jetta', 'GTI'],
    yearCompatibility: [2015, 2016, 2017],
    category: 'Exhaust',
    price: 350.00,
    partNumber: 'EXH-VW-GTI',
    inStock: true,
    imageUrl: getPartImage('Exhaust'),
    description: 'Stainless steel headers for increased airflow and horsepower.',
  },
  {
    id: '6',
    name: 'Water Pump Kit',
    brand: 'Toyota',
    modelCompatibility: ['Tacoma', '4Runner'],
    yearCompatibility: [2005, 2006, 2007, 2008, 2009],
    category: 'Cooling',
    price: 68.99,
    partNumber: 'WP-TY-V6',
    inStock: true,
    imageUrl: getPartImage('Cooling'),
    description: 'Complete water pump kit including gasket and seals.',
  },
  {
    id: '7',
    name: 'Spark Plug Iridium (Set of 4)',
    brand: 'Honda',
    modelCompatibility: ['Civic', 'Fit'],
    yearCompatibility: [2018, 2019, 2020],
    category: 'Engine',
    price: 32.00,
    partNumber: 'SP-NGK-IR',
    inStock: true,
    imageUrl: getPartImage('Engine'),
    description: 'Long-life iridium spark plugs for optimal combustion.',
  },
  {
    id: '8',
    name: 'Brake Rotors Drilled & Slotted',
    brand: 'BMW',
    modelCompatibility: ['M3', 'M4'],
    yearCompatibility: [2015, 2016, 2017, 2018],
    category: 'Brakes',
    price: 220.00,
    partNumber: 'BR-BM-Mperf',
    inStock: true,
    imageUrl: getPartImage('Brakes'),
    description: 'High-performance rotors for track and street use.',
  },
  {
    id: '9',
    name: 'Radiator Assembly',
    brand: 'Ford',
    modelCompatibility: ['Explorer', 'Edge'],
    yearCompatibility: [2016, 2017, 2018],
    category: 'Cooling',
    price: 145.50,
    partNumber: 'RAD-FD-SUV',
    inStock: true,
    imageUrl: getPartImage('Cooling'),
    description: 'OEM replacement radiator with enhanced cooling capacity.',
  },
  {
    id: '10',
    name: 'Mass Air Flow Sensor',
    brand: 'Volkswagen',
    modelCompatibility: ['Passat', 'Tiguan'],
    yearCompatibility: [2012, 2013, 2014],
    category: 'Electrical',
    price: 85.00,
    partNumber: 'MAF-VW-20T',
    inStock: false,
    imageUrl: getPartImage('Electrical'),
    description: 'Accurate air flow measurement for fuel efficiency.',
  }
];