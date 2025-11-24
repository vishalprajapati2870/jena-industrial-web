import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  onBuyClick: () => void;
}

export const Navbar = ({ onBuyClick }: NavbarProps) => {
  const [productsOpen, setProductsOpen] = useState(false);

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

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-primary">
              Jena Marketing
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
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className="text-navbar-text font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {productsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {products.map((product, idx) => (
                    <Link
                      key={idx}
                      to={`/products?product=${encodeURIComponent(product)}`}
                      className="block px-4 py-3 text-sm text-body-text hover:bg-muted hover:text-primary transition-colors border-b border-border last:border-b-0"
                      onClick={() => setProductsOpen(false)}
                    >
                      {product}
                    </Link>
                  ))}
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

          {/* CTA Button */}
          <Button
            onClick={onBuyClick}
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-heading font-medium uppercase tracking-wide px-6"
          >
            Buy Product
          </Button>
        </div>
      </div>
    </nav>
  );
};
