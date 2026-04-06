// src/data/products.ts

export interface ProductVariant {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  isBestSeller: boolean;
  variants: ProductVariant[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Rendang Daging",
    description:
      "Daging sapi bagian paha yang empuk, dimasak berjam-jam dengan santan kental dan rempah pilihan hingga bumbu meresap ke serat terdalam.",
    image: "/images/rendang-daging.png",
    isBestSeller: true,
    variants: [
      { name: "500 Gr", price: 185000 },
      { name: "1 KG", price: 350000 },
    ],
  },
  {
    id: "p2",
    name: "Rendang Paru Kriuk",
    description:
      "Paru sapi pilihan yang diiris tipis, digoreng garing, lalu dibalut bumbu rendang rempah yang gurih. Tekstur renyah yang bikin nagih!",
    image: "/images/rendang-paru-kriuk.png",
    isBestSeller: true,
    variants: [
      { name: "500 Gr", price: 85000 },
      { name: "1 KG", price: 160000 },
    ],
  },
  {
    id: "p3",
    name: "Keripik Kentang Balado",
    description:
      "Irisan kentang kuning yang super renyah dengan balutan sambal balado asli (bukan bubuk). Pedas manisnya pas untuk teman nasi.",
    image: "/images/keripik-kentang-balado.png",
    isBestSeller: true,
    variants: [
      { name: "250 Gr", price: 95000 },
      { name: "500 Gr", price: 180000 },
    ],
  },
  {
    id: "p4",
    name: "Dendeng Kentang",
    description:
      "Kombinasi sempurna dendeng sapi renyah dan irisan kentang goreng. Perpaduan tekstur yang mewah dalam satu gigitan.",
    image: "/images/dendeng-kentang.png",
    isBestSeller: true,
    variants: [
      { name: "250 Gr", price: 95000 },
      { name: "500 Gr", price: 180000 },
    ],
  },
  {
    id: "p5",
    name: "Dendeng Kering",
    description:
      "Daging sapi yang diiris tipis, dijemur, dan digoreng garing. Disajikan terpisah dengan sambal ijo atau merah sesuai selera Anda.",
    image: "/images/dendeng-kering.png",
    isBestSeller: true,
    variants: [
      { name: "250 Gr", price: 95000 },
      { name: "500 Gr", price: 180000 },
    ],
  },
  {
    id: "p6",
    name: "Rendang Telur",
    description:
      "Telur yang diolah menjadi kerupuk renyah berbentuk kotak, diselimuti bumbu rendang kering yang kaya rempah.",
    image: "/images/rendang-telur.png",
    isBestSeller: true,
    variants: [
      { name: "250 Gr", price: 95000 },
      { name: "500 Gr", price: 180000 },
    ],
  },
  {
    id: "p7",
    name: "Rendang Suwir",
    description:
      "Solusi praktis makan enak. Daging sapi yang disuwir halus dan dimasak kering dengan bumbu rendang pekat. Tahan lama dan sangat gurih.",
    image: "/images/rendang-suwir.png",
    isBestSeller: true,
    variants: [
      { name: "250 Gr", price: 95000 },
      { name: "500 Gr", price: 180000 },
    ],
  },
];
