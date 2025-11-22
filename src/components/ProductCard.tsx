import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  image: string;
  title: string;
}

export const ProductCard = ({ image, title }: ProductCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-lg font-heading font-semibold text-heading mb-4">
          {title}
        </h3>
        <Link to="/products">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
          >
            SEE MORE
          </Button>
        </Link>
      </div>
    </div>
  );
};
