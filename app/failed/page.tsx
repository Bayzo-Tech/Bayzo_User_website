"use client";

import { useRouter } from "next/navigation";
import { X, RefreshCcw, Home } from "lucide-react";
import { useEffect, useState } from "react";

export default function FailedPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div 
        className={`w-32 h-32 bg-destructive/20 rounded-full flex items-center justify-center mb-8 transition-all duration-700 transform ${
          mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <div className="w-24 h-24 bg-destructive rounded-full flex items-center justify-center shadow-lg shadow-destructive/50">
          <X size={48} className="text-white" />
        </div>
      </div>

      <div 
        className={`space-y-4 transition-all duration-700 delay-300 transform ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-4xl font-black text-foreground">Payment Failed 😞</h1>
        
        <p className="text-muted text-lg max-w-xs mx-auto mb-8">
          Something went wrong with your payment. Please don&apos;t worry, no money was deducted.
        </p>
      </div>

      <div 
        className={`absolute bottom-10 left-6 right-6 flex flex-col gap-3 transition-all duration-700 delay-500 transform ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <button
          onClick={() => router.push("/payment")}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/30 active:scale-95 transition-all"
        >
          <RefreshCcw size={20} />
          Try Again
        </button>
        
        <button
          onClick={() => router.push("/home")}
          className="w-full bg-transparent text-foreground border border-border font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg active:scale-95 transition-all hover:bg-card"
        >
          <Home size={20} />
          Go to Home
        </button>
      </div>
    </div>
  );
}
