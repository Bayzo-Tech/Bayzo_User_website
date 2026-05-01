"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ArrowLeft, Check, Copy, CheckCircle2 } from "lucide-react";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface OrderData {
  items: OrderItem[];
  itemTotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentId: string;
  orderStatus: string;
}

const STEPS = [
  { id: "placed", label: "Order Placed 🛒" },
  { id: "preparing", label: "Preparing 👨‍🍳" },
  { id: "out for delivery", label: "Out for Delivery 🏃" },
  { id: "delivered", label: "Delivered ✅" },
];

export default function OrderTrackingPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const unsubscribe = onSnapshot(doc(db, "orders", orderId), (docSnap) => {
      if (docSnap.exists()) {
        setOrder(docSnap.data() as OrderData);
      } else {
        console.error("Order not found");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
        <button onClick={() => router.push("/orders")} className="text-primary mt-4">
          Return to Orders
        </button>
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex((s) => s.id === order.orderStatus?.toLowerCase());

  return (
    <div className="min-h-screen bg-background flex flex-col pb-10">
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md p-4 flex items-center gap-4 border-b border-border">
        <button
          onClick={() => router.push("/orders")}
          className="p-2 bg-card rounded-full border border-border"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Track Order</h1>
      </div>

      <div className="p-4 flex-1 max-w-md mx-auto w-full">
        {/* Stepper */}
        <div className="bg-card border border-border rounded-3xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6">Order Status</h2>
          
          <div className="relative pl-6 space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-9 top-2 bottom-2 w-0.5 bg-border -z-0"></div>
            {/* Active Vertical Line */}
            <div 
              className="absolute left-9 top-2 w-0.5 bg-primary -z-0 transition-all duration-500"
              style={{ height: `${Math.max(0, (currentStepIndex / (STEPS.length - 1)) * 100)}%` }}
            ></div>

            {STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex || (index === STEPS.length - 1 && currentStepIndex === index);
              const isCurrent = index === currentStepIndex && index !== STEPS.length - 1;
              const isPending = index > currentStepIndex;

              return (
                <div key={step.id} className="relative z-10 flex items-center gap-4">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted ? 'bg-primary border-primary text-white' : ''}
                    ${isCurrent ? 'bg-primary border-primary text-white animate-pulse' : ''}
                    ${isPending ? 'bg-background border-border text-transparent' : ''}
                  `}>
                    {(isCompleted || isCurrent) && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className={`font-medium text-sm md:text-base ${isPending ? 'text-muted' : 'text-foreground'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 border-b border-border pb-2">Order Details</h2>
          
          <div className="space-y-3 mb-6">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-md">
                    {item.quantity}x
                  </span>
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-border pt-4 text-sm text-muted">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span className="text-foreground">₹{order.itemTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-foreground">₹{order.deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-foreground text-lg pt-2 mt-2 border-t border-dashed border-border">
              <span>Total Amount</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex flex-col gap-1">
            <span className="text-xs text-muted uppercase tracking-wider">Payment ID</span>
            <div className="flex items-center justify-between bg-background p-3 rounded-xl border border-border">
              <span className="text-xs font-mono text-muted-foreground truncate mr-2">
                {order.paymentId}
              </span>
              <button 
                onClick={() => copyToClipboard(order.paymentId)}
                className="text-primary hover:bg-primary/10 p-1.5 rounded-md transition-colors flex-shrink-0"
              >
                {copiedId ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
