import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-heading font-bold text-heading">
            Your Cart
          </h1>
          <Link
            to="/products"
            className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              Your cart is empty
            </h2>
            <p className="text-body-text mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary-hover text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-border">
              {cartItems.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-heading font-semibold text-heading mb-2">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      ₹{item.price} / {item.priceUnit}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="bg-muted px-4 py-2 rounded-md font-medium text-sm">
                        Qty: {item.quantity}
                      </div>
                      <p className="font-bold text-primary">
                        ₹{Number(item.price) * item.quantity}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 p-2 h-auto mt-4 sm:mt-0"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </li>
              ))}
            </ul>
            <div className="bg-muted/30 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between border-t border-border mt-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">
                  Total Amount
                </p>
                <p className="text-3xl font-bold text-heading">
                  ₹{calculateTotal()}
                </p>
              </div>
              <Link to="/checkout" className="w-full sm:w-auto mt-6 sm:mt-0">
                <Button className="w-full bg-primary hover:bg-primary-hover text-white text-lg px-8 py-6 h-auto tracking-wide uppercase">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
