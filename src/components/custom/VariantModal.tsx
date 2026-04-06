"use client";

import { useState, useEffect } from "react";
import { Product, ProductVariant } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface VariantModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VariantModal({ product, isOpen, onClose }: VariantModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  // State baru untuk menyimpan tanggal PO
  const [poDate, setPoDate] = useState<string>("");
  // State untuk tanggal minimal (H+3)
  const [minDateStr, setMinDateStr] = useState<string>("");

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }

    // Logika menghitung H+3 saat modal dibuka
    const today = new Date();
    today.setDate(today.getDate() + 3);
    // Format tanggal menjadi YYYY-MM-DD untuk input type="date"
    const formattedMinDate = today.toISOString().split("T")[0];
    setMinDateStr(formattedMinDate);
    // Set default value ke H+3
    setPoDate(formattedMinDate);
  }, [product, isOpen]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    if (!poDate) {
      toast.error("Mohon pilih tanggal pengiriman!");
      return;
    }

    addToCart({
      id: `${product.id}-${selectedVariant.name}-${poDate}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      variant: selectedVariant.name,
      price: selectedVariant.price,
      qty: 1,
      poDate: poDate,
    });
    toast.success(`${product.name} berhasil ditambahkan!`);
    onClose();
  };

  // Format tampilan tanggal untuk UI
  const displayDate = new Date(poDate).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Section Pilih Varian */}
          <div>
            <h4 className="mb-3 text-sm font-medium leading-none">
              1. Pilih Varian:
            </h4>
            <RadioGroup
              value={selectedVariant?.name}
              onValueChange={(value) => {
                const variant = product.variants.find((v) => v.name === value);
                if (variant) setSelectedVariant(variant);
              }}
              className="flex flex-col space-y-2"
            >
              {product.variants.map((variant) => (
                <div
                  key={variant.name}
                  className="flex items-center justify-between space-x-2 border p-3 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={variant.name} id={variant.name} />
                    <Label
                      htmlFor={variant.name}
                      className="cursor-pointer font-normal"
                    >
                      {variant.name}
                    </Label>
                  </div>
                  <span className="font-semibold text-sm">
                    Rp {variant.price.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Section Pilih Tanggal PO */}
          <div>
            <h4 className="mb-3 text-sm font-medium leading-none">
              2. Tanggal Pengiriman (Min. H+3):
            </h4>
            <input
              type="date"
              min={minDateStr}
              value={poDate}
              onChange={(e) => setPoDate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#651114]"
            />
            {poDate && (
              <p className="text-xs text-green-700 mt-2">
                Dikirim pada: <strong>{displayDate}</strong>
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 pt-4 border-t">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-bold text-lg">
              Rp {selectedVariant?.price.toLocaleString("id-ID") || 0}
            </span>
          </div>
          <Button
            onClick={handleAddToCart}
            className="bg-[#651114] hover:bg-[#4a0d0f] text-white"
          >
            Tambahkan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
