import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Cookie, ShoppingBag, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const { cartCount } = useCart();

  const handleProductsMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    setProductsOpen(true);
  };


  const handleProductsMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setProductsOpen(false);
    }, 150);
  };

  const detergentPowders = [
    "Naval Silver Detergent Powder – 5 kg Bag",
    "Naval Silver Detergent Powder – 2 kg Bag",
    "Naval Silver Detergent Powder – 1 kg Bag",
    "Naval Silver Detergent Powder – 500 gms Bag",
    "Naval Silver Detergent Powder – 150 gms Bag",
    "Naval Silver Detergent Powder – 80 gms Bag",
  ];

  const detergentCakes = [
    "Jambo Silver Detergent Cake",
    "New Silver Detergent Cake",
    "Wonder Silver Detergent Cake",
    "Blue Silver Detergent Cake",
    "Jambo Ultra White Silver Detergent Cake",
    "Yellow Silver Detergent Cake",
    "Orange Silver Detergent Cake",
    "Herbal Silver Detergent Cake",
    "Dayawan Silver Detergent Cake",
    "Chetak Silver Detergent Cake",
    "Talati Silver Detergent Cake",
    "Semi Silver Detergent Cake",
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-primary">
              Naval Soap Factory
            </span>
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-navbar-text font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-navbar-text font-medium hover:text-primary transition-colors"
            >
              About Us
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <Link
                to="/products"
                onClick={() => setProductsOpen(false)}
                className="text-navbar-text font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : "rotate-0"}`}
                />
              </Link>

              {productsOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-background border border-border rounded-lg shadow-xl z-50 w-[650px]"
                  style={{
                    position: 'absolute',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="flex">
                    {/* Detergent Powder Column */}
                    <div className="w-1/2 border-r border-border">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                          Detergent Powder
                        </span>
                      </div>
                      <div className="py-2 max-h-[280px] overflow-y-auto scrollbar-teal ">
                        {detergentPowders.map((product, idx) => (
                          <Link
                            key={idx}
                            to={`/products?product=${encodeURIComponent(product)}`}
                            className="block px-4 py-2.5 text-sm text-body-text hover:bg-muted hover:text-primary transition-colors"
                            onClick={() => setProductsOpen(false)}
                          >
                            {product}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Detergent Cake Column */}
                    <div className="w-1/2">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                        <Cookie className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                          Detergent Cake
                        </span>
                      </div>
                      <div className="py-2 max-h-[280px] overflow-y-auto scrollbar-teal">
                        {detergentCakes.map((product, idx) => (
                          <Link
                            key={idx}
                            to={`/products?product=${encodeURIComponent(product)}`}
                            className="block px-4 py-2.5 text-sm text-body-text hover:bg-muted hover:text-primary transition-colors"
                            onClick={() => setProductsOpen(false)}
                          >
                            {product}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="text-navbar-text font-medium hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button
                variant="outline"
                className="px-6 h-10 border-border text-foreground hover:bg-muted hover:text-primary transition-all rounded-full flex items-center gap-2 font-bold uppercase tracking-wider"
                aria-label="Admin Panel"
              >
                <Shield className="w-5 h-5" />
                Admin
              </Button>
            </Link>
            <Link to="/cart">
              <Button
                variant="outline"
                className="relative px-6 h-10 border-border text-foreground hover:bg-muted hover:text-primary transition-all rounded-full flex items-center gap-2 font-bold uppercase tracking-wider"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};