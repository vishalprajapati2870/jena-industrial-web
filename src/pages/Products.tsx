import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Import all product images
import SILVER_JUMBO from "@/assets/SILVER JUMBO CAKE.jpeg";
import SILVER_NEW from "@/assets/SILVER NEW CAKE.jpeg";
import SILVER_WONDER from "@/assets/SILVER WONDER CAKE.jpeg";
import SILVER_BLUE from "@/assets/SILVER BLUE CAKE.jpeg";
import SILVER_ULTRA from "@/assets/SILVER ULTRA WHITE.jpeg";
import SILVER_YELLOW from "@/assets/SILVER YELLOW CAKE.jpeg";
import SILVER_ORANGE from "@/assets/SILVER ORANGE CAKE.jpeg";
import SILVER_HERBAL from "@/assets/SILVER HERBAL CAKE.jpeg";
import DAYAWAN from "@/assets/DAYAWAN CAKE.jpeg";
import CHETAK from "@/assets/CHETAK CAKE.jpeg";
import TALATI from "@/assets/TALATI CAKE.jpeg";
import SILVER_SEMI from "@/assets/SILVER SEMI CAKE.jpeg";
import SILVER_5KG from "@/assets/SILVER 5KG.jpeg";
import SILVER_2KG from "@/assets/SILVER 2KG.jpeg";
import SILVER_1KG from "@/assets/SIVER 1KG.jpeg";
import SILVER_500GM from "@/assets/SILVER 500GM.jpeg";
import SILVER_150GM from "@/assets/SILVER 150GM.jpeg";
import SILVER_80GM from "@/assets/SILVER 80GM.jpeg";

 



interface ProductsProps {
  onBuyClick: () => void;
}

interface ProductData {
  name: string;
  image: string;
  packaging: string;
  weight: string;
  fragrance: string;
  foam: string;
  color: string;
  price: string;
  priceUnit: string;
  appearance: string;
  solubility: string;
  storage: string;
  shelfLife: string;
  usage: string;
  suitableFor: string;
}

const Products = ({ onBuyClick }: ProductsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const products: ProductData[] = [
    // Detergent Cakes
    { 
      name: "Jambo Silver Detergent Cake", 
      image: SILVER_JUMBO,
      packaging: "280 gms × 24 cakes/carton",
      weight: "280 gms",
      fragrance: "Lemon Fresh",
      foam: "High Foam",
      color: "White with Blue Specks",
      price: "18",
      priceUnit: "cake",
      appearance: "Solid rectangular cake with smooth finish",
      solubility: "Quick dissolving in water",
      storage: "Store in cool, dry place away from direct sunlight",
      shelfLife: "36 months",
      usage: "Hand wash & bucket wash",
      suitableFor: "All fabric types including cotton, synthetic & blended"
    },
    { 
      name: "New Silver Detergent Cake", 
      image: SILVER_NEW,
      packaging: "200 gms × 30 cakes/carton",
      weight: "200 gms",
      fragrance: "Rose Fresh",
      foam: "Medium Foam",
      color: "Pure White",
      price: "12",
      priceUnit: "cake",
      appearance: "Compact solid cake with embossed logo",
      solubility: "Moderate dissolving rate",
      storage: "Keep in dry area, avoid moisture",
      shelfLife: "24 months",
      usage: "Daily laundry wash",
      suitableFor: "Cotton & light colored fabrics"
    },
    { 
      name: "Wonder Silver Detergent Cake", 
      image: SILVER_WONDER,
      packaging: "220 gms × 28 cakes/carton",
      weight: "220 gms",
      fragrance: "Jasmine",
      foam: "Extra High Foam",
      color: "Cream White",
      price: "14",
      priceUnit: "cake",
      appearance: "Premium finish solid cake",
      solubility: "Fast dissolving formula",
      storage: "Store below 35°C in dry conditions",
      shelfLife: "30 months",
      usage: "Heavy duty stain removal",
      suitableFor: "Tough stains on work clothes & uniforms"
    },
    { 
      name: "Blue Silver Detergent Cake", 
      image: SILVER_BLUE,
      packaging: "180 gms × 30 cakes/carton",
      weight: "180 gms",
      fragrance: "Ocean Breeze",
      foam: "High Foam",
      color: "Light Blue",
      price: "10",
      priceUnit: "cake",
      appearance: "Blue tinted solid cake",
      solubility: "Quick dissolving",
      storage: "Keep away from heat sources",
      shelfLife: "24 months",
      usage: "White fabric brightening wash",
      suitableFor: "White clothes & bed linens"
    },
    { 
      name: "Jambo Ultra White Silver Detergent Cake", 
      image: SILVER_ULTRA,
      packaging: "300 gms × 20 cakes/carton",
      weight: "300 gms",
      fragrance: "Fresh Citrus",
      foam: "Ultra High Foam",
      color: "Brilliant White",
      price: "22",
      priceUnit: "cake",
      appearance: "Premium ultra white solid cake",
      solubility: "Instant dissolving technology",
      storage: "Store in original packaging, cool & dry place",
      shelfLife: "36 months",
      usage: "Premium fabric care & whitening",
      suitableFor: "Delicate fabrics, silks & premium clothing"
    },
    { 
      name: "Yellow Silver Detergent Cake", 
      image: SILVER_YELLOW,
      packaging: "175 gms × 32 cakes/carton",
      weight: "175 gms",
      fragrance: "Sunflower",
      foam: "Medium Foam",
      color: "Bright Yellow",
      price: "9",
      priceUnit: "cake",
      appearance: "Yellow colored solid cake",
      solubility: "Gradual dissolving",
      storage: "Avoid humid areas",
      shelfLife: "24 months",
      usage: "Everyday household laundry",
      suitableFor: "Regular daily wear clothes"
    },
    { 
      name: "Orange Silver Detergent Cake", 
      image: SILVER_ORANGE,
      packaging: "190 gms × 28 cakes/carton",
      weight: "190 gms",
      fragrance: "Orange Zest",
      foam: "High Foam",
      color: "Vibrant Orange",
      price: "11",
      priceUnit: "cake",
      appearance: "Orange tinted premium cake",
      solubility: "Fast dissolving",
      storage: "Keep in cool, ventilated area",
      shelfLife: "28 months",
      usage: "Grease & oil stain removal",
      suitableFor: "Kitchen towels & oily work clothes"
    },
    { 
      name: "Herbal Silver Detergent Cake", 
      image: SILVER_HERBAL,
      packaging: "200 gms × 25 cakes/carton",
      weight: "200 gms",
      fragrance: "Natural Herbs & Neem",
      foam: "Gentle Foam",
      color: "Light Green",
      price: "15",
      priceUnit: "cake",
      appearance: "Green tinted herbal cake with natural texture",
      solubility: "Moderate dissolving",
      storage: "Store away from strong odors",
      shelfLife: "30 months",
      usage: "Eco-friendly gentle wash",
      suitableFor: "Baby clothes & sensitive skin fabrics"
    },
    { 
      name: "Dayawan Silver Detergent Cake", 
      image: DAYAWAN,
      packaging: "250 gms × 24 cakes/carton",
      weight: "250 gms",
      fragrance: "Lavender",
      foam: "Rich Foam",
      color: "Light Purple Tint",
      price: "16",
      priceUnit: "cake",
      appearance: "Premium lavender infused cake",
      solubility: "Quick dissolving",
      storage: "Keep sealed when not in use",
      shelfLife: "32 months",
      usage: "Fabric softening wash",
      suitableFor: "All fabrics with softening benefit"
    },
    { 
      name: "Chetak Silver Detergent Cake", 
      image: CHETAK,
      packaging: "200 gms × 30 cakes/carton",
      weight: "200 gms",
      fragrance: "Pine Fresh",
      foam: "Power Foam",
      color: "White with Green Specks",
      price: "12",
      priceUnit: "cake",
      appearance: "Sturdy solid cake with specks",
      solubility: "Fast acting formula",
      storage: "Store in dry conditions",
      shelfLife: "24 months",
      usage: "Heavy duty industrial wash",
      suitableFor: "Workwear & industrial uniforms"
    },
    { 
      name: "Talati Silver Detergent Cake", 
      image: TALATI,
      packaging: "180 gms × 32 cakes/carton",
      weight: "180 gms",
      fragrance: "Mild Fresh",
      foam: "Standard Foam",
      color: "Off White",
      price: "8",
      priceUnit: "cake",
      appearance: "Economy solid cake",
      solubility: "Normal dissolving rate",
      storage: "Keep dry and covered",
      shelfLife: "20 months",
      usage: "Budget-friendly daily wash",
      suitableFor: "Regular cotton clothes"
    },
    { 
      name: "Semi Silver Detergent Cake", 
      image: SILVER_SEMI,
      packaging: "150 gms × 36 cakes/carton",
      weight: "150 gms",
      fragrance: "Floral Mix",
      foam: "Light Foam",
      color: "Soft White",
      price: "7",
      priceUnit: "cake",
      appearance: "Compact mini cake",
      solubility: "Quick dissolving",
      storage: "Store away from moisture",
      shelfLife: "18 months",
      usage: "Light wash & travel use",
      suitableFor: "Light fabrics & quick wash needs"
    },
    // Detergent Powders
    { 
      name: "Naval Silver Detergent Powder – 5 kg Bag", 
      image: SILVER_5KG,
      packaging: "5 kg × 4 bags/carton",
      weight: "5 kg",
      fragrance: "Fresh Clean",
      foam: "Low Foam (Machine Compatible)",
      color: "White Powder with Blue Granules",
      price: "320",
      priceUnit: "bag",
      appearance: "Free-flowing white powder with active blue granules",
      solubility: "Fully dissolves in cold & hot water",
      storage: "Store in dry place, keep package sealed",
      shelfLife: "36 months",
      usage: "Washing machine & bucket wash",
      suitableFor: "All fabric types, front & top load machines"
    },
    { 
      name: "Naval Silver Detergent Powder – 2 kg Bag", 
      image: SILVER_2KG,
      packaging: "2 kg × 8 bags/carton",
      weight: "2 kg",
      fragrance: "Lemon Burst",
      foam: "Low Foam (Machine Compatible)",
      color: "White Powder with Yellow Granules",
      price: "140",
      priceUnit: "bag",
      appearance: "Fine white powder with lemon-scented granules",
      solubility: "Excellent solubility in all water temperatures",
      storage: "Keep in airtight container after opening",
      shelfLife: "30 months",
      usage: "Family size washing machine loads",
      suitableFor: "Semi-automatic & automatic washing machines"
    },
    { 
      name: "Naval Silver Detergent Powder – 1 kg Bag", 
      image: SILVER_1KG,
      packaging: "1 kg × 12 bags/carton",
      weight: "1 kg",
      fragrance: "Rose Garden",
      foam: "Medium Foam",
      color: "White Powder with Pink Granules",
      price: "75",
      priceUnit: "bag",
      appearance: "Premium white powder with rose-scented particles",
      solubility: "Quick dissolving formula",
      storage: "Store away from humidity",
      shelfLife: "28 months",
      usage: "Small machine loads & hand wash",
      suitableFor: "All fabrics including delicates"
    },
    { 
      name: "Naval Silver Detergent Powder – 500 gms Bag", 
      image: SILVER_500GM,
      packaging: "500 gms × 24 bags/carton",
      weight: "500 gms",
      fragrance: "Jasmine White",
      foam: "High Foam (Hand Wash)",
      color: "Pure White Powder",
      price: "40",
      priceUnit: "bag",
      appearance: "Ultra-fine white powder",
      solubility: "Instant dissolving in bucket",
      storage: "Keep dry and sealed",
      shelfLife: "24 months",
      usage: "Hand wash & bucket wash",
      suitableFor: "Daily hand wash laundry"
    },
    { 
      name: "Naval Silver Detergent Powder – 150 gms Bag", 
      image: SILVER_150GM,
      packaging: "150 gms × 48 sachets/carton",
      weight: "150 gms",
      fragrance: "Ocean Fresh",
      foam: "High Foam",
      color: "White Powder",
      price: "15",
      priceUnit: "sachet",
      appearance: "Compact powder sachet",
      solubility: "Fast dissolving",
      storage: "Store in cool, dry place",
      shelfLife: "18 months",
      usage: "Single wash use",
      suitableFor: "Small laundry loads & travel"
    },
    { 
      name: "Naval Silver Detergent Powder – 80 gms Bag", 
      image: SILVER_80GM,
      packaging: "80 gms × 72 sachets/carton",
      weight: "80 gms",
      fragrance: "Mint Cool",
      foam: "High Foam",
      color: "White Powder",
      price: "10",
      priceUnit: "sachet",
      appearance: "Mini powder sachet",
      solubility: "Instant dissolving",
      storage: "Keep away from moisture",
      shelfLife: "12 months",
      usage: "Single garment wash",
      suitableFor: "Quick spot cleaning & travel use"
    },
  ];

  const productFromUrl = searchParams.get("product");
  const initialProduct = products.find(p => p.name === productFromUrl) || products[0];
  
  const [selectedProduct, setSelectedProduct] = useState<ProductData>(initialProduct);

  useEffect(() => {
    const productParam = searchParams.get("product");
    const found = products.find(p => p.name === productParam);
    if (found) {
      setSelectedProduct(found);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-heading font-bold text-heading mb-8">Our Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Product List */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg overflow-hidden max-h-[600px] overflow-y-auto">
              {products.map((product, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedProduct(product);
                    setSearchParams({ product: product.name });
                  }}
                  className={`w-full text-left px-4 py-4 border-b border-border last:border-b-0 transition-colors ${
                    selectedProduct.name === product.name
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted text-body-text"
                  }`}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Product Details */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Product Image */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h2 className="text-3xl font-heading font-bold text-heading mb-4">
                    {selectedProduct.name}
                  </h2>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary">{selectedProduct.price} ₹</span>
                    <span className="text-body-text ml-2">/{selectedProduct.priceUnit}</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-heading">Packaging:</span>
                      <span className="text-body-text">{selectedProduct.packaging}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-heading">Weight:</span>
                      <span className="text-body-text">{selectedProduct.weight}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-heading">Fragrance:</span>
                      <span className="text-body-text">{selectedProduct.fragrance}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-heading">Foam Level:</span>
                      <span className="text-body-text">{selectedProduct.foam}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={onBuyClick}
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium uppercase tracking-wide"
                  >
                    Buy Product
                  </Button>
                </div>
              </div>

              {/* Properties Table */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-heading mb-4">
                  Product Properties
                </h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium text-heading">Appearance</td>
                      <td className="py-3 text-body-text">{selectedProduct.appearance}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium text-heading">Color</td>
                      <td className="py-3 text-body-text">{selectedProduct.color}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium text-heading">Solubility</td>
                      <td className="py-3 text-body-text">{selectedProduct.solubility}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium text-heading">Usage</td>
                      <td className="py-3 text-body-text">{selectedProduct.usage}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium text-heading">Suitable For</td>
                      <td className="py-3 text-body-text">{selectedProduct.suitableFor}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium text-heading">Storage</td>
                      <td className="py-3 text-body-text">{selectedProduct.storage}</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-heading">Shelf Life</td>
                      <td className="py-3 text-body-text">{selectedProduct.shelfLife}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-8">
              <h3 className="text-2xl font-heading font-bold text-heading mb-6">
                Related Products
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setSearchParams({ product: product.name });
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm font-medium text-heading text-center">{product.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
