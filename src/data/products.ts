export type Product = {
  id: string;
  img: string; 
  title: string;
  price: number;
  rate: number;
  oldPrice?: number;
  section: "wired" | "wireless";
};

export const products: Product[] = [
  {
    id: "s852i-1",
    img: "/src/assets/S852I.png",
    title: "Apple BYZ S852I",
    price: 2927,
    oldPrice: 3527,
    rate: 4.7,
    section: "wired",
  },
  {
    id: "earpods-1",
    img: "/src/assets/earpods1.png",
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
    section: "wired",
  },
  {
    id: "earpods-2",
    img: "/src/assets/earpods2.png",
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
    section: "wired",
  },
  {
    id: "s852i-2",
    img: "/src/assets/S852I.png",
    title: "Apple BYZ S852I",
    price: 2927,
    rate: 4.7,
    section: "wired",
  },
  {
    id: "earpods-3",
    img: "/src/assets/earpods1.png",
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
    section: "wired",
  },
  {
    id: "earpods-4",
    img: "/src/assets/earpods2.png",
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
    section: "wired",
  },
  {
    id: "airpods-1",
    img: "/src/assets/airpods.png",
    title: "Apple AirPods",
    price: 9527,
    rate: 4.7,
    section: "wireless",
  },
  {
    id: "gerlax-gh04",
    img: "/src/assets/gerlax.png",
    title: "GERLAX GH-04",
    price: 6527,
    rate: 4.7,
    section: "wireless",
  },
  {
    id: "borofone-bo4",
    img: "/src/assets/borofone.png",
    title: "BOROFONE BO4",
    price: 7527,
    rate: 4.7,
    section: "wireless",
  },
];
