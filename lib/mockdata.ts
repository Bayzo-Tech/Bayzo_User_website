export interface FoodItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  offer?: string;
  area: "thiruvanmiyur" | "palavakkam";
}

export const mockFoods: FoodItem[] = [
  // Thiruvanmiyur
  {
    id: "t1",
    name: "Beach Corn",
    price: 40,
    rating: 4.5,
    image: "https://picsum.photos/seed/corn/400/300",
    category: "Snacks",
    area: "thiruvanmiyur",
  },
  {
    id: "t2",
    name: "Sundal",
    price: 30,
    rating: 4.8,
    image: "https://picsum.photos/seed/sundal/400/300",
    category: "Snacks",
    area: "thiruvanmiyur",
  },
  {
    id: "t3",
    name: "Lemon Soda",
    price: 25,
    rating: 4.2,
    image: "https://picsum.photos/seed/soda/400/300",
    category: "Drinks",
    area: "thiruvanmiyur",
  },
  {
    id: "t4",
    name: "Fish Fry",
    price: 150,
    rating: 4.9,
    image: "https://picsum.photos/seed/fish/400/300",
    category: "Meals",
    offer: "10% OFF",
    area: "thiruvanmiyur",
  },
  {
    id: "t5",
    name: "Bajji",
    price: 20,
    rating: 4.4,
    image: "https://picsum.photos/seed/bajji/400/300",
    category: "Snacks",
    area: "thiruvanmiyur",
  },
  {
    id: "t6",
    name: "Ice Gola",
    price: 50,
    rating: 4.6,
    image: "https://picsum.photos/seed/gola/400/300",
    category: "Desserts",
    area: "thiruvanmiyur",
  },
  
  // Palavakkam
  {
    id: "p1",
    name: "Grilled Corn",
    price: 45,
    rating: 4.7,
    image: "https://picsum.photos/seed/grilled/400/300",
    category: "Snacks",
    area: "palavakkam",
  },
  {
    id: "p2",
    name: "Coconut Water",
    price: 50,
    rating: 4.9,
    image: "https://picsum.photos/seed/coconut/400/300",
    category: "Drinks",
    area: "palavakkam",
  },
  {
    id: "p3",
    name: "Prawn Fry",
    price: 200,
    rating: 4.8,
    image: "https://picsum.photos/seed/prawn/400/300",
    category: "Meals",
    offer: "Free Delivery",
    area: "palavakkam",
  },
  {
    id: "p4",
    name: "Murukku",
    price: 35,
    rating: 4.3,
    image: "https://picsum.photos/seed/murukku/400/300",
    category: "Snacks",
    area: "palavakkam",
  },
  {
    id: "p5",
    name: "Sugarcane Juice",
    price: 30,
    rating: 4.6,
    image: "https://picsum.photos/seed/sugarcane/400/300",
    category: "Drinks",
    area: "palavakkam",
  },
  {
    id: "p6",
    name: "Kulfi",
    price: 60,
    rating: 4.7,
    image: "https://picsum.photos/seed/kulfi/400/300",
    category: "Desserts",
    area: "palavakkam",
  },
];

export function getFoodByArea(area: string): FoodItem[] {
  return mockFoods.filter((food) => food.area === area);
}
