"use client";

import { useRouter } from "next/navigation";
import { Check, Home } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConfirmedPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div 
        className={`w-32 h-32 bg-success/20 rounded-full flex items-center justify-center mb-8 transition-all duration-700 transform ${
          mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center shadow-lg shadow-success/50">
          <Check size={48} className="text-white" />
        </div>
      </div>

      <div 
        className={`space-y-4 transition-all duration-700 delay-300 transform ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-4xl font-black text-foreground">Order Confirmed! 🎉</h1>
        
        <p className="text-muted text-lg max-w-xs mx-auto">
          Your delicious beach bites are being prepared.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mt-8 inline-block w-full max-w-sm">
          <div className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
            Estimated Delivery
          </div>
          <div className="text-3xl font-black text-primary">
            20–30 mins
          </div>
        </div>
      </div>

      <div 
        className={`absolute bottom-10 left-6 right-6 transition-all duration-700 delay-500 transform ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <button
          onClick={() => router.push("/home")}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/30 active:scale-95 transition-all"
        >
          <Home size={20} />
          Back to Home
        </button>
      </div>
    </div>
  );
}
