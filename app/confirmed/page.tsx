"use client";

import { useRouter } from "next/navigation";
import { Check, Home, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConfirmedPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">

      {/* Success Icon */}
      <div
        className={`w-28 h-28 bg-green-500 rounded-full flex items-center justify-center mb-6 transition-all duration-700 transform shadow-2xl shadow-green-500/40 ${mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
      >
        <Check size={52} className="text-white" strokeWidth={3} />
      </div>

      {/* Title */}
      <div
        className={`transition-all duration-700 delay-200 transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
        <h1 className="text-3xl font-black text-foreground mb-1">Order Confirmed! 🎉</h1>
        <p className="text-muted text-base">Your beach bites are on the way!</p>
      </div>

      {/* Info Cards */}
      <div
        className={`w-full max-w-sm mt-8 space-y-3 transition-all duration-700 delay-300 transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
        {/* Delivery Time Card */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock size={22} className="text-primary" />
          </div>
          <div className="text-left">
            <p className="text-xs text-muted font-medium uppercase tracking-wide">Estimated Delivery</p>
            <p className="text-xl font-black text-foreground">20–30 mins</p>
          </div>
        </div>

        {/* Beach Delivery Info */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin size={22} className="text-orange-500" />
          </div>
          <div className="text-left">
            <p className="text-xs text-muted font-medium uppercase tracking-wide">Delivery To</p>
            <p className="text-base font-bold text-foreground">Your Beach Location 🏖️</p>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
          <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
            📱 Our delivery partner will call you when they arrive nearby!
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div
        className={`w-full max-w-sm mt-8 transition-all duration-700 delay-500 transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
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