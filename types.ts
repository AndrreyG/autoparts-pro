export interface CarPart {
  id: string;
  name: string;
  brand: string;
  modelCompatibility: string[];
  yearCompatibility: number[];
  category: string;
  price: number;
  partNumber: string;
  inStock: boolean;
  imageUrl: string;
  description: string;
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  model: string;
  year: string; // stored as string for select input, parsed to number logic
  category: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

// Gemini specific types
export interface GeminiPartResponse {
  parts: CarPart[];
}