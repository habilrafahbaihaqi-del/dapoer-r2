"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2, CalendarDays } from "lucide-react"; // Tambah icon kalender

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { items, updateQuantity, removeFromCart } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const handleCheckoutWA = () => {
    if (items.length === 0) return;

    const nomorWA = "6281256207363";
    let pesan =
      "Halo Dapoer R2, saya ingin memesan menu Pre-Order berikut:%0A%0A";

    items.forEach((item, index) => {
      // Format tanggal untuk WA
      const formatDate = new Date(item.poDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      pesan += `${index + 1}. *${item.name}* (${item.variant})%0A`;
      pesan += `   📅 Dikirim: ${formatDate}%0A`;
      pesan += `   Jumlah: ${item.qty} porsi%0A`;
      pesan += `   Subtotal: Rp ${(item.price * item.qty).toLocaleString("id-ID")}%0A%0A`;
    });

    pesan += `*Total Pesanan: Rp ${totalPrice.toLocaleString("id-ID")}*%0A%0A`;
    pesan += `Mohon info untuk ongkos kirim dan total pembayarannya ya. Terima kasih!`;

    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, "_blank");
  };

  if (!isMounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-[#FAF7F2] flex flex-col p-0 overflow-hidden">
        <SheetHeader className="p-6 border-b border-gray-200 text-left space-y-1">
          <SheetTitle className="text-[#651114] font-bold text-xl uppercase tracking-wider">
            Keranjang Belanja
          </SheetTitle>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Pesanan Anda
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <p>Keranjang masih kosong</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-gray-200 pb-4 last:border-0"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative border border-gray-200">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400 text-center p-1">
                      Img {item.name}
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm leading-tight text-gray-900 pr-2">
                        {item.name}
                      </h4>
                      <p className="font-bold text-sm text-[#651114]">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                      {item.variant}
                    </p>
                    {/* Tampilkan Tanggal PO di bawah varian */}
                    <div className="flex items-center gap-1 mt-1 text-xs font-medium text-[#c05b31]">
                      <CalendarDays size={12} />
                      {new Date(item.poDate).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center bg-gray-100 rounded-md border border-gray-200">
                      <button
                        onClick={() => {
                          if (item.qty > 1)
                            updateQuantity(item.id, item.qty - 1);
                          else removeFromCart(item.id);
                        }}
                        className="p-1.5 text-gray-600 hover:text-black transition-colors"
                      >
                        {item.qty === 1 ? (
                          <Trash2 size={14} />
                        ) : (
                          <Minus size={14} />
                        )}
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="p-1.5 text-gray-600 hover:text-black transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 p-6 bg-white space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Ongkos Kirim</span>
              <span className="text-xs italic text-gray-500">
                DIHITUNG SAAT CHECKOUT
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="font-bold text-gray-900">Total Pesanan</span>
            <span className="font-bold text-xl text-[#651114]">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>

          <Button
            onClick={handleCheckoutWA}
            disabled={items.length === 0}
            className="w-full bg-[#651114] hover:bg-[#4a0d0f] text-white py-6 rounded-md font-semibold tracking-wide flex items-center justify-center gap-2"
          >
            PESAN VIA WHATSAPP
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
