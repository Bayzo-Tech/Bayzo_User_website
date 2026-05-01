"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  area: string;
  setArea: (area: string) => void;
  zone: number | null;
  setZone: (zone: number | null) => void;
  role: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [area, setArea] = useState<string>("");
  const [zone, setZone] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    const savedArea = localStorage.getItem("bayzo_area");
    const savedZone = localStorage.getItem("bayzo_zone");
    
    if (savedArea) setArea(savedArea);
    if (savedZone) setZone(Number(savedZone));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role || "user");
          } else {
            setRole("user");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole("user");
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSetArea = (newArea: string) => {
    setArea(newArea);
    localStorage.setItem("bayzo_area", newArea);
  };

  const handleSetZone = (newZone: number | null) => {
    setZone(newZone);
    if (newZone !== null) {
      localStorage.setItem("bayzo_zone", newZone.toString());
    } else {
      localStorage.removeItem("bayzo_zone");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, area, setArea: handleSetArea, zone, setZone: handleSetZone, role }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
