"use client";

import { useCart } from "@/context/CartContext";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export function CartButton({ label, onClick, href, disabled }: CartButtonProps) {
  const router = useRouter();
  const { items, total } = useCart();
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-50">
      <button
        onClick={handleClick}
        disabled={disabled || (cartItemCount === 0 && !disabled)}
        className="w-full bg-success disabled:bg-muted disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-between shadow-lg active:scale-[0.98] transition-transform"
      >
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium opacity-90">{cartItemCount} ITEMS</span>
          <span className="text-lg">₹{total}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{label}</span>
          <ArrowRight size={20} />
        </div>
      </button>
    </div>
  );
}
