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

const Products = ({ onBuyClick }: ProductsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = [
    { name: "Jambo Silver Detergent Cake", image: SILVER_JUMBO },
    { name: "New Silver Detergent Cake", image: SILVER_NEW },
    { name: "Wonder Silver Detergent Cake", image: SILVER_WONDER },
    { name: "Blue Silver Detergent Cake", image: SILVER_BLUE },
    { name: "Jambo Ultra White Silver Detergent Cake", image: SILVER_ULTRA },
    { name: "Yellow Silver Detergent Cake", image: SILVER_YELLOW },
    { name: "Orange Silver Detergent Cake", image: SILVER_ORANGE },
    { name: "Herbal Silver Detergent Cake", image: SILVER_HERBAL },
    { name: "Dayawan Silver Detergent Cake", image: DAYAWAN },
    { name: "Chetak Silver Detergent Cake", image: CHETAK },
    { name: "Talati Silver Detergent Cake", image: TALATI },
    { name: "Semi Silver Detergent Cake", image: SILVER_SEMI },
    { name: "Naval Silver Detergent Powder – 5 kg Bag", image: SILVER_5KG},
    { name: "Naval Silver Detergent Powder – 2 kg Bag", image: SILVER_2KG},
    { name: "Naval Silver Detergent Powder – 1 kg Bag", image: SILVER_1KG},
    { name: "Naval Silver Detergent Powder – 500 gms Bag", image: SILVER_500GM},
    { name: "Naval Silver Detergent Powder – 150 gms Bag", image: SILVER_150GM},
    { name: "Naval Silver Detergent Powder – 80 gms Bag", image: SILVER_80GM},
  ];

  const productFromUrl = searchParams.get("product");
  const initialProduct = products.find(p => p.name === productFromUrl) || products[0];
  
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);

  useEffect(() => {
    const productParam = searchParams.get("product");
    const found = products.find(p => p.name === productParam);
    if (found) {
      setSelectedProduct(found);
    }
  }, [searchParams]);

  const productDetails = {
    packaging: "180 gms*30 cake",
    purity: "99.5% min",
    cas: "7647-14-5",
    formula: "NaCl",
    appearance: "White crystalline powder",
    solubility: "Soluble in water",
    price: "10 ₹",
  };

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
                    <span className="text-3xl font-bold text-primary">{productDetails.price}</span>
                    <span className="text-body-text ml-2">/cake </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-heading">Packaging:</span>
                      <span className="text-body-text">{productDetails.packaging}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-heading">Purity:</span>
                      <span className="text-body-text">{productDetails.purity}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-heading">CAS No:</span>
                      <span className="text-body-text">{productDetails.cas}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-heading">Formula:</span>
                      <span className="text-body-text">{productDetails.formula}</span>
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
                      <td className="py-3 text-body-text">{productDetails.appearance}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium text-heading">Solubility</td>
                      <td className="py-3 text-body-text">{productDetails.solubility}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium text-heading">Storage</td>
                      <td className="py-3 text-body-text">Store in cool, dry place</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-heading">Shelf Life</td>
                      <td className="py-3 text-body-text">24 months</td>
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
