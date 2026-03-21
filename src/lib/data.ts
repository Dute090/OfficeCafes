export interface Tag {
  icon?: string;
  label: string;
  proOnly?: boolean;
}

export interface Cafe {
  id: string;
  name: string;
  address: string;
  rating: number | null;
  reviewCount?: number;
  distance: string;
  isOpen: boolean;
  hours: string;
  freeTags: Tag[];
  proTags: Tag[];
  tags?: Tag[];        // new API: positive office tags only
  previewTags?: Tag[]; // new API: empty for unlogged
  photos?: string[];   // Google Places photo URLs
  lat: number;
  lng: number;
}

export const API_BASE = "https://perch-api.ygtc090.workers.dev";

export async function fetchCafes(lat: number, lng: number, radiusM = 2000): Promise<Cafe[]> {
  const res = await fetch(`${API_BASE}/cafes?lat=${lat}&lng=${lng}&radius=${radiusM}`);
  if (!res.ok) throw new Error("API error");
  const data: { cafes: Cafe[] } = await res.json();
  return data.cafes;
}

export const demoCafes: Cafe[] = [
  {
    id: "demo-1",
    name: "Blue Bottle Coffee",
    address: "450 W 15th St, New York, NY",
    rating: 4.5,
    distance: "0.2 mi",
    isOpen: true,
    hours: "until 6 PM",
    freeTags: [{ label: "💻 Good for work" }, { label: "📶 Fast WiFi" }, { label: "🔌 Outlets" }],
    proTags: [{ label: "🤫 Quiet" }, { label: "⏰ Long stay OK" }, { label: "☕ Great coffee" }],
    lat: 40.742, lng: -74.005,
  },
  {
    id: "demo-2",
    name: "Stumptown Coffee",
    address: "30 W 8th St, New York, NY",
    rating: 4.4,
    distance: "0.5 mi",
    isOpen: true,
    hours: "until 8 PM",
    freeTags: [{ label: "📶 Fast WiFi" }, { label: "🏠 Spacious" }, { label: "💰 Affordable" }],
    proTags: [{ label: "🤫 Quiet" }, { label: "💻 Good for work" }],
    lat: 40.7308, lng: -73.9973,
  },
];
