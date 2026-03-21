// Demo data — NYC cafés
export interface Tag {
  icon: string;
  label: string;
  proOnly?: boolean;
}

export interface Cafe {
  id: string;
  place_id: string;
  name: string;
  address: string;
  rating: number;
  distance: string;
  isOpen: boolean;
  hours: string;
  freeTags: Tag[];   // visible to all
  proTags: Tag[];    // Pro only (Foursquare data)
  lat: number;
  lng: number;
}

export const demoCafes: Cafe[] = [
  {
    id: "1",
    place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    name: "Blue Bottle Coffee",
    address: "450 W 15th St, New York, NY",
    rating: 4.5,
    distance: "0.2 mi",
    isOpen: true,
    hours: "until 6 PM",
    freeTags: [
      { icon: "", label: "Seating" },
      { icon: "", label: "Long hours" },
      { icon: "", label: "Coffee shop" },
    ],
    proTags: [
      { icon: "", label: "Free WiFi", proOnly: true },
      { icon: "", label: "Quiet", proOnly: true },
      { icon: "", label: "Outlets", proOnly: true },
    ],
    lat: 40.742,
    lng: -74.005,
  },
  {
    id: "2",
    place_id: "ChIJabc123",
    name: "Stumptown Coffee",
    address: "30 W 8th St, New York, NY",
    rating: 4.4,
    distance: "0.5 mi",
    isOpen: true,
    hours: "until 8 PM",
    freeTags: [
      { icon: "", label: "Seating" },
      { icon: "", label: "Coffee shop" },
      { icon: "", label: "Budget-friendly" },
    ],
    proTags: [
      { icon: "", label: "Free WiFi", proOnly: true },
      { icon: "", label: "Moderate noise", proOnly: true },
    ],
    lat: 40.7308,
    lng: -73.9973,
  },
  {
    id: "3",
    place_id: "ChIJdef456",
    name: "Think Coffee",
    address: "248 Mercer St, New York, NY",
    rating: 4.3,
    distance: "0.7 mi",
    isOpen: true,
    hours: "until 10 PM",
    freeTags: [
      { icon: "", label: "Long hours" },
      { icon: "", label: "Seating" },
      { icon: "", label: "Coffee shop" },
    ],
    proTags: [
      { icon: "", label: "Free WiFi", proOnly: true },
      { icon: "", label: "Quiet", proOnly: true },
      { icon: "", label: "Outlets", proOnly: true },
    ],
    lat: 40.7283,
    lng: -73.9956,
  },
  {
    id: "4",
    place_id: "ChIJghi789",
    name: "Joe Coffee",
    address: "141 Waverly Pl, New York, NY",
    rating: 4.6,
    distance: "0.9 mi",
    isOpen: false,
    hours: "Opens 7 AM",
    freeTags: [
      { icon: "", label: "Coffee shop" },
      { icon: "", label: "Seating" },
    ],
    proTags: [
      { icon: "", label: "Paid WiFi", proOnly: true },
      { icon: "", label: "Quiet", proOnly: true },
    ],
    lat: 40.7336,
    lng: -74.0007,
  },
  {
    id: "5",
    place_id: "ChIJjkl012",
    name: "La Colombe Coffee",
    address: "319 Church St, New York, NY",
    rating: 4.5,
    distance: "1.1 mi",
    isOpen: true,
    hours: "until 7 PM",
    freeTags: [
      { icon: "", label: "Seating" },
      { icon: "", label: "Long hours" },
      { icon: "", label: "Budget-friendly" },
    ],
    proTags: [
      { icon: "", label: "Free WiFi", proOnly: true },
      { icon: "", label: "Moderate noise", proOnly: true },
      { icon: "", label: "Outlets", proOnly: true },
    ],
    lat: 40.7197,
    lng: -74.0046,
  },
];
