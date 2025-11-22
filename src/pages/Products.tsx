import { useState } from "react";
import { Button } from "@/components/ui/button";
import productPowder from "@/assets/product-powder.jpg";

const Products = () => {
  const products = [
    "Sodium Chloride",
    "Calcium Carbonate",
    "Potassium Hydroxide",
    "Magnesium Sulfate",
    "Ammonium Nitrate",
    "Zinc Oxide",
    "Copper Sulfate",
    "Iron Oxide",
  ];

  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const productDetails = {
    packaging: "25 kg bags, 50 kg drums",
    purity: "99.5% min",
    cas: "7647-14-5",
    formula: "NaCl",
    appearance: "White crystalline powder",
    solubility: "Soluble in water",
    price: "$150",
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
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full text-left px-4 py-4 border-b border-border last:border-b-0 transition-colors ${
                    selectedProduct === product
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted text-body-text"
                  }`}
                >
                  {product}
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
                    src={productPowder}
                    alt={selectedProduct}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h2 className="text-3xl font-heading font-bold text-heading mb-4">
                    {selectedProduct}
                  </h2>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary">{productDetails.price}</span>
                    <span className="text-body-text ml-2">/ unit</span>
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

                  <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium">
                    Request Quote
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
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={productPowder}
                      alt={product}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm font-medium text-heading text-center">{product}</p>
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
