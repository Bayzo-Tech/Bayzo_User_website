"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const placeholders = [
  "Search for Burgers...",
  "Try Waffles 🧇",
  "Ice Cream nearby 🍦",
  "Craving Pizza? 🍕",
];

export function AnimatedSearchBar() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setFade(true);
      }, 300); // 300ms for fade out
    }, 2000); // cycle every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={18} className="text-muted" />
      </div>
      <div className="w-full bg-card border border-border rounded-xl h-12 flex items-center pl-10 pr-4 shadow-sm overflow-hidden">
        <span 
          className={`text-sm text-muted transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
        >
          {placeholders[index]}
        </span>
      </div>
    </div>
  );
}
