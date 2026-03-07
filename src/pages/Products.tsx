import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  category: string;
}

const products: ProductData[] = [
  { name: "Jambo Silver Detergent Cake", image: SILVER_JUMBO, packaging: "180 gms × 30 cakes/box", weight: "180 gms", fragrance: "Lemon Fresh", foam: "High Foam", color: "White with Blue Specks", price: "10", priceUnit: "cake", appearance: "Solid rectangular cake with smooth finish", solubility: "Quick dissolving in water", storage: "Store in cool, dry place away from direct sunlight", shelfLife: "36 months", usage: "Daily laundry wash", suitableFor: "All fabric types including cotton, synthetic & blended", category: "Detergent Cakes" },
  { name: "New Silver Detergent Cake", image: SILVER_NEW, packaging: "120 gms × 30 cakes/box", weight: "120 gms", fragrance: "Rose Fresh", foam: "Medium Foam", color: "Pure White", price: "5", priceUnit: "cake", appearance: "Compact solid cake with embossed logo", solubility: "Moderate dissolving rate", storage: "Keep in dry area, avoid moisture", shelfLife: "24 months", usage: "Daily laundry wash", suitableFor: "Cotton & light colored fabrics", category: "Detergent Cakes" },
  { name: "Wonder Silver Detergent Cake", image: SILVER_WONDER, packaging: "220 gms × 28 cakes/carton", weight: "220 gms", fragrance: "Jasmine", foam: "Extra High Foam", color: "Cream White", price: "14", priceUnit: "cake", appearance: "Premium finish solid cake", solubility: "Fast dissolving formula", storage: "Store below 35°C in dry conditions", shelfLife: "30 months", usage: "Heavy duty stain removal", suitableFor: "Tough stains on work clothes & uniforms", category: "Detergent Cakes" },
  { name: "Blue Silver Detergent Cake", image: SILVER_BLUE, packaging: "180 gms × 30 cakes/carton", weight: "180 gms", fragrance: "Ocean Breeze", foam: "High Foam", color: "Light Blue", price: "10", priceUnit: "cake", appearance: "Blue tinted solid cake", solubility: "Quick dissolving", storage: "Keep away from heat sources", shelfLife: "24 months", usage: "White fabric brightening wash", suitableFor: "White clothes & bed linens", category: "Detergent Cakes" },
  { name: "Jambo Ultra White Silver Detergent Cake", image: SILVER_ULTRA, packaging: "300 gms × 20 cakes/carton", weight: "300 gms", fragrance: "Fresh Citrus", foam: "Ultra High Foam", color: "Brilliant White", price: "22", priceUnit: "cake", appearance: "Premium ultra white solid cake", solubility: "Instant dissolving technology", storage: "Store in original packaging, cool & dry place", shelfLife: "36 months", usage: "Premium fabric care & whitening", suitableFor: "Delicate fabrics, silks & premium clothing", category: "Detergent Cakes" },
  { name: "Yellow Silver Detergent Cake", image: SILVER_YELLOW, packaging: "120 gms × 30 cakes/box", weight: "120 gms", fragrance: "Sunflower", foam: "Medium Foam", color: "Bright Yellow", price: "5", priceUnit: "cake", appearance: "Yellow colored solid cake", solubility: "Gradual dissolving", storage: "Avoid humid areas", shelfLife: "24 months", usage: "Everyday household laundry", suitableFor: "Regular daily wear clothes", category: "Detergent Cakes" },
  { name: "Orange Silver Detergent Cake", image: SILVER_ORANGE, packaging: "120 gms × 30 cakes/box", weight: "120 gms", fragrance: "Orange Zest", foam: "High Foam", color: "Vibrant Orange", price: "5", priceUnit: "cake", appearance: "Orange tinted premium cake", solubility: "Fast dissolving", storage: "Keep in cool, ventilated area", shelfLife: "28 months", usage: "Grease & oil stain removal", suitableFor: "Kitchen towels & oily work clothes", category: "Detergent Cakes" },
  { name: "Herbal Silver Detergent Cake", image: SILVER_HERBAL, packaging: "200 gms × 25 cakes/carton", weight: "200 gms", fragrance: "Natural Herbs & Neem", foam: "Gentle Foam", color: "Light Green", price: "15", priceUnit: "cake", appearance: "Green tinted herbal cake with natural texture", solubility: "Moderate dissolving", storage: "Store away from strong odors", shelfLife: "30 months", usage: "Eco-friendly gentle wash", suitableFor: "Baby clothes & sensitive skin fabrics", category: "Detergent Cakes" },
  { name: "Dayawan Silver Detergent Cake", image: DAYAWAN, packaging: "120 gms × 100 cakes/box", weight: "120 gms", fragrance: "Lavender", foam: "Rich Foam", color: "Light Purple Tint", price: "5", priceUnit: "cake", appearance: "Premium lavender infused cake", solubility: "Quick dissolving", storage: "Keep sealed when not in use", shelfLife: "32 months", usage: "Fabric softening wash", suitableFor: "All fabrics with softening benefit", category: "Detergent Cakes" },
  { name: "Chetak Silver Detergent Cake", image: CHETAK, packaging: "120 gms × 60 cakes/box", weight: "120 gms", fragrance: "Pine Fresh", foam: "Power Foam", color: "White with Green Specks", price: "5", priceUnit: "cake", appearance: "Sturdy solid cake with specks", solubility: "Fast acting formula", storage: "Store in dry conditions", shelfLife: "24 months", usage: "Heavy duty industrial wash", suitableFor: "Workwear & industrial uniforms", category: "Detergent Cakes" },
  { name: "Talati Silver Detergent Cake", image: TALATI, packaging: "225 gms × 30 cakes/box", weight: "225 gms", fragrance: "Mild Fresh", foam: "Standard Foam", color: "Off White", price: "10", priceUnit: "cake", appearance: "Economy solid cake", solubility: "Normal dissolving rate", storage: "Keep dry and covered", shelfLife: "20 months", usage: "Budget-friendly daily wash", suitableFor: "Regular cotton clothes", category: "Detergent Cakes" },
  { name: "Semi Silver Detergent Cake", image: SILVER_SEMI, packaging: "160 gms × 50 cakes/box", weight: "160 gms", fragrance: "Floral Mix", foam: "Light Foam", color: "Soft White", price: "10", priceUnit: "cake", appearance: "Compact mini cake", solubility: "Quick dissolving", storage: "Store away from moisture", shelfLife: "18 months", usage: "Light wash & travel use", suitableFor: "Light fabrics & quick wash needs", category: "Detergent Cakes" },
  { name: "Naval Silver Detergent Powder – 5 kg Bag", image: SILVER_5KG, packaging: "5 kg × 5 bags/bag", weight: "5 kg", fragrance: "Fresh Clean", foam: "Low Foam (Machine Compatible)", color: "White Powder with Blue Granules", price: "175", priceUnit: "bag", appearance: "Free-flowing white powder with active blue granules", solubility: "Fully dissolves in cold & hot water", storage: "Store in dry place, keep package sealed", shelfLife: "36 months", usage: "Washing machine & bucket wash", suitableFor: "All fabric types, front & top load machines", category: "Detergent Powders" },
  { name: "Naval Silver Detergent Powder – 2 kg Bag", image: SILVER_2KG, packaging: "2 kg × 10 pouch/bag", weight: "2 kg", fragrance: "Lemon Burst", foam: "Low Foam (Machine Compatible)", color: "White Powder with Yellow Granules", price: "80", priceUnit: "bag", appearance: "Fine white powder with lemon-scented granules", solubility: "Excellent solubility in all water temperatures", storage: "Keep in airtight container after opening", shelfLife: "30 months", usage: "Family size washing machine loads", suitableFor: "Semi-automatic & automatic washing machines", category: "Detergent Powders" },
  { name: "Naval Silver Detergent Powder – 1 kg Bag", image: SILVER_1KG, packaging: "1 kg × 25 pouch/bag", weight: "1 kg", fragrance: "Rose Garden", foam: "Medium Foam", color: "White Powder with Pink Granules", price: "40", priceUnit: "bag", appearance: "Premium white powder with rose-scented particles", solubility: "Quick dissolving formula", storage: "Store away from humidity", shelfLife: "28 months", usage: "Small machine loads & hand wash", suitableFor: "All fabrics including delicates", category: "Detergent Powders" },
  { name: "Naval Silver Detergent Powder – 500 gms Bag", image: SILVER_500GM, packaging: "500 gms × 30 pouch/bag", weight: "500 gms", fragrance: "Jasmine White", foam: "High Foam (Hand Wash)", color: "Pure White Powder", price: "20", priceUnit: "bag", appearance: "Ultra-fine white powder", solubility: "Instant dissolving in bucket", storage: "Keep dry and sealed", shelfLife: "24 months", usage: "Hand wash & bucket wash", suitableFor: "Daily hand wash laundry", category: "Detergent Powders" },
  { name: "Naval Silver Detergent Powder – 150 gms Bag", image: SILVER_150GM, packaging: "150 gms × 50 pouch/bag", weight: "150 gms", fragrance: "Ocean Fresh", foam: "High Foam", color: "White Powder", price: "10", priceUnit: "pouch", appearance: "Compact powder sachet", solubility: "Fast dissolving", storage: "Store in cool, dry place", shelfLife: "18 months", usage: "Single wash use", suitableFor: "Small laundry loads & travel", category: "Detergent Powders" },
  { name: "Naval Silver Detergent Powder – 80 gms Bag", image: SILVER_80GM, packaging: "80 gms × 100 pouch/bag", weight: "80 gms", fragrance: "Mint Cool", foam: "High Foam", color: "White Powder", price: "5", priceUnit: "pouch", appearance: "Mini powder sachet", solubility: "Instant dissolving", storage: "Keep away from moisture", shelfLife: "12 months", usage: "Single garment wash", suitableFor: "Quick spot cleaning & travel use", category: "Detergent Powders" },
];

const ProductGridCard = ({ product, onClick }: { product: ProductData; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
  >
    <div className="aspect-square overflow-hidden bg-muted">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        draggable={false}
      />
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-sm font-heading font-semibold text-heading line-clamp-2 mb-1 min-h-[2.5rem]">
        {product.name}
      </h3>
      <p className="text-xs text-muted-foreground mb-2">{product.weight}</p>
      <div className="mt-auto">
        <p className="text-xl font-bold text-primary mb-3">
          ₹{product.price}<span className="text-xs font-normal text-muted-foreground ml-1">/{product.priceUnit}</span>
        </p>
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium text-xs"
          onClick={(e) => { e.stopPropagation(); }}
        >
          Buy Product
        </Button>
      </div>
    </div>
  </div>
);

const ProductDetail = ({ product, onBack, relatedProducts, onSelectProduct }: {
  product: ProductData;
  onBack: () => void;
  relatedProducts: ProductData[];
  onSelectProduct: (p: ProductData) => void;
}) => {
  const [quantity, setQuantity] = useState<string>("500");
  const [customQty, setCustomQty] = useState<string>("");
  const [error, setError] = useState<string>("");
  const recommendedQtys = [500, 1000, 1500];

  const getActiveQty = (): number => {
    if (quantity === "custom") return parseInt(customQty) || 0;
    return parseInt(quantity);
  };

  const handleAddToCart = () => {
    const qty = getActiveQty();
    if (qty < 50) {
      setError("Minimum order quantity is 50 items");
      return;
    }
    setError("");
    toast({
      title: "Added to Cart ✓",
      description: `${qty} × ${product.name} added to your cart.`,
    });
  };

  return (
  <div>
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-6 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to All Products
    </button>

    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="rounded-lg overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="inline-block text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full mb-3">
            {product.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading mb-4">{product.name}</h2>
          <div className="mb-6">
            <span className="text-3xl font-bold text-primary">₹{product.price}</span>
            <span className="text-muted-foreground ml-2">/{product.priceUnit}</span>
          </div>
          <div className="space-y-3 mb-6">
            {[
              ["Packaging", product.packaging],
              ["Weight", product.weight],
              ["Fragrance", product.fragrance],
              ["Foam Level", product.foam],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-border pb-2">
                <span className="font-medium text-heading text-sm">{label}</span>
                <span className="text-muted-foreground text-sm">{value}</span>
              </div>
            ))}
          </div>

          {/* Quantity Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium text-heading mb-2 block">Select Quantity (per box)</label>
            <div className="flex gap-2 mb-3">
              {recommendedQtys.map((q) => (
                <button
                  key={q}
                  onClick={() => { setQuantity(String(q)); setError(""); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                    quantity === String(q)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:border-primary"
                  }`}
                >
                  {q}
                </button>
              ))}
              <button
                onClick={() => { setQuantity("custom"); setError(""); }}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                  quantity === "custom"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary"
                }`}
              >
                Custom
              </button>
            </div>
            {quantity === "custom" && (
              <Input
                type="number"
                placeholder="Enter quantity (min 50)"
                value={customQty}
                onChange={(e) => { setCustomQty(e.target.value); setError(""); }}
                min={50}
                className="mb-2"
              />
            )}
            {error && (
              <p className="text-destructive text-xs font-medium">{error}</p>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium uppercase tracking-wide gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-heading font-bold text-heading mb-4">Product Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {[
            ["Appearance", product.appearance],
            ["Color", product.color],
            ["Solubility", product.solubility],
            ["Usage", product.usage],
            ["Suitable For", product.suitableFor],
            ["Storage", product.storage],
            ["Shelf Life", product.shelfLife],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-3 border-b border-border">
              <span className="font-medium text-heading text-sm">{label}</span>
              <span className="text-muted-foreground text-sm text-right max-w-[60%]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {relatedProducts.length > 0 && (
      <div className="mt-8">
        <h3 className="text-xl font-heading font-bold text-heading mb-6">Related Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedProducts.map((p, idx) => (
            <ProductGridCard key={idx} product={p} onClick={() => onSelectProduct(p)} />
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

const Products = ({ onBuyClick }: ProductsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Detergent Cakes", "Detergent Powders"];

  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      const found = products.find(p => p.name === productParam);
      if (found) setSelectedProduct(found);
    }
  }, [searchParams]);

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  const relatedProducts = selectedProduct
    ? products.filter(p => p.category === selectedProduct.category && p.name !== selectedProduct.name).slice(0, 4)
    : [];

  const handleSelectProduct = (product: ProductData) => {
    setSelectedProduct(product);
    setSearchParams({ product: product.name });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedProduct(null);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-2">Our Products</h1>
        <p className="text-muted-foreground mb-8">Premium quality detergent cakes & powders for every need</p>

        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBack}
            relatedProducts={relatedProducts}
            onSelectProduct={handleSelectProduct}
          />
        ) : (
          <>
            {/* Category Filter */}
            <div className="flex gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product, idx) => (
                <ProductGridCard
                  key={idx}
                  product={product}
                  onClick={() => handleSelectProduct(product)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
