"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, Plus, Minus } from "lucide-react";
import { mockFoods, FoodItem } from "@/lib/mockdata";
import { useCart } from "@/context/CartContext";

export default function FoodDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { items, addToCart, updateQuantity } = useCart();
  const [food, setFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    // In a real app, you would fetch this from Firestore based on ID
    const foundFood = mockFoods.find((f) => f.id === params.id);
    if (foundFood) {
      setFood(foundFood);
    }
  }, [params.id]);

  if (!food) return null; // or loading state

  const cartItem = items.find((item) => item.id === food.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
    });
  };

  const handleUpdate = (delta: number) => {
    updateQuantity(food.id, delta);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 relative">
      {/* Top Image Area */}
      <div className="relative h-72 w-full bg-card">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-background/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
        >
          <ArrowLeft size={20} />
        </button>

        <Image
          src={food.image}
          alt={food.name}
          fill
          className="object-cover"
          priority
        />

        {food.offer && (
          <div className="absolute bottom-4 left-4 bg-secondary text-background font-bold px-3 py-1.5 rounded-lg shadow-lg">
            {food.offer}
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="p-6 flex-1 bg-background -mt-6 rounded-t-3xl relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold text-foreground">{food.name}</h1>
          <div className="flex items-center gap-1 bg-card px-2 py-1 rounded-lg border border-border">
            <Star size={16} className="text-secondary fill-secondary" />
            <span className="font-bold">{food.rating}</span>
          </div>
        </div>

        <div className="text-2xl font-bold text-primary mb-6">₹{food.price}</div>

        <h3 className="font-bold text-lg mb-2">Description</h3>
        <p className="text-muted leading-relaxed">
          Delicious {food.name.toLowerCase()} prepared fresh for you.
          Perfect to enjoy while relaxing at the beach. Contains authentic ingredients
          and served with love.
        </p>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-50">
        {quantity === 0 ? (
          <button
            onClick={handleAdd}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl text-lg shadow-lg active:scale-[0.98] transition-transform"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center bg-card rounded-2xl border border-primary h-14 overflow-hidden shadow-sm">
              <button
                onClick={() => handleUpdate(-1)}
                className="w-14 h-full flex items-center justify-center text-primary active:bg-primary/10 transition-colors"
              >
                <Minus size={24} />
              </button>
              <div className="flex-1 text-center font-bold text-xl">
                {quantity}
              </div>
              <button
                onClick={() => handleUpdate(1)}
                className="w-14 h-full flex items-center justify-center text-primary active:bg-primary/10 transition-colors"
              >
                <Plus size={24} />
              </button>
            </div>

            <button
              onClick={() => router.push('/cart')}
              className="flex-1 bg-primary text-white font-bold h-14 rounded-2xl flex items-center justify-center shadow-lg active:scale-[0.98] transition-transform"
            >
              Go to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
