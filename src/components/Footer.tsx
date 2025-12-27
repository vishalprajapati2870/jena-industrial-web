import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Naval Soap Factory</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Leading provider of high-quality industrial detergent cake with a commitment
              to excellence, innovation, and sustainable manufacturing practices.
              Trusted by industries worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Map */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <p className="text-sm">6/D/1, Anand Industrial Estate, Borsad Road, ANAND - 388 001. (Guj.)</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@navalsoap@yahoo.com" className="text-sm hover:text-primary">
                navalsoap@yahoo.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+91 9825805478" className="text-sm hover:text-primary">
                  +91 98258 05478
                </a>
              </div>
            </div>
            
            {/* Map Embed */}
            <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841124732443!2d-73.98784668459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Naval Soap Factory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
