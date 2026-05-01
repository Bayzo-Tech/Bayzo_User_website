"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Automatically redirect to login after 2 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 via-background to-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div
        className={`flex flex-col items-center transition-all duration-1000 transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h1 className="text-6xl font-black text-white tracking-tighter">
          BAY<span className="text-primary">ZO</span>
        </h1>
      </div>
    </div>
  );
}
