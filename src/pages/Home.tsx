import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CheckCircle, Award, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-chemical-powder.jpg";
import qualityImage from "@/assets/quality-assurance.jpg";

// Import all product images
import SILVER_JUMBO from "@/assets/SILVER JUMBO CAKE.jpeg";
import SILVER_NEW from "@/assets/SILVER NEW CAKE.jpeg";
import SILVER_SEMI from "@/assets/SILVER SEMI CAKE.jpeg";
import SILVER_BLUE from "@/assets/SILVER BLUE CAKE.jpeg";
import SILVER_ORANGE from "@/assets/SILVER ORANGE CAKE.jpeg";
import SILVER_YELLOW from "@/assets/SILVER YELLOW CAKE.jpeg";
import SILVER_HERBAL from "@/assets/SILVER HERBAL CAKE.jpeg";
import SILVER_WONDER from "@/assets/SILVER WONDER CAKE.jpeg";
import SILVER_ULTRA from "@/assets/SILVER ULTRA WHITE.jpeg";
import CHETAK from "@/assets/CHETAK CAKE.jpeg";
import DAYAWAN from "@/assets/DAYAWAN CAKE.jpeg";
import TALATI from "@/assets/TALATI CAKE.jpeg";

const Home = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Industry-leading chemical products with rigorous testing",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Compliant with international safety standards",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced professionals ensuring excellence",
    },
    {
      icon: CheckCircle,
      title: "Reliable Supply",
      description: "Consistent delivery and inventory management",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Welcome to Naval Soap Factory
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Your trusted partner in premium industrial detergent cake
          </p>
          <Link to="/products">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 py-6 text-lg">
              View Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Our Products - Marquee Scroll */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-heading text-center mb-12">
            Our Products
          </h2>
        </div>
        <div className="relative">
          <div className="flex animate-marquee gap-8 hover:[animation-play-state:paused]">
            {[
              { image: SILVER_JUMBO, title: "Silver Jumbo Cake", name: "Silver Jumbo Cake" },
              { image: SILVER_NEW, title: "Silver New Cake", name: "Silver New Cake" },
              { image: SILVER_SEMI, title: "Silver Semi Cake", name: "Silver Semi Cake" },
              { image: SILVER_BLUE, title: "Silver Blue Cake", name: "Silver Blue Cake" },
              { image: SILVER_ORANGE, title: "Silver Orange Cake", name: "Silver Orange Cake" },
              { image: SILVER_YELLOW, title: "Silver Yellow Cake", name: "Silver Yellow Cake" },
              { image: SILVER_HERBAL, title: "Silver Herbal Cake", name: "Silver Herbal Cake" },
              { image: SILVER_WONDER, title: "Silver Wonder Cake", name: "Silver Wonder Cake" },
              { image: SILVER_ULTRA, title: "Silver Ultra White", name: "Silver Ultra White" },
              { image: CHETAK, title: "Chetak Cake", name: "Chetak Cake" },
              { image: DAYAWAN, title: "Dayawan Cake", name: "Dayawan Cake" },
              { image: TALATI, title: "Talati Cake", name: "Talati Cake" },
              // Duplicate for seamless loop
              { image: SILVER_JUMBO, title: "Silver Jumbo Cake", name: "Silver Jumbo Cake" },
              { image: SILVER_NEW, title: "Silver New Cake", name: "Silver New Cake" },
              { image: SILVER_SEMI, title: "Silver Semi Cake", name: "Silver Semi Cake" },
              { image: SILVER_BLUE, title: "Silver Blue Cake", name: "Silver Blue Cake" },
              { image: SILVER_ORANGE, title: "Silver Orange Cake", name: "Silver Orange Cake" },
              { image: SILVER_YELLOW, title: "Silver Yellow Cake", name: "Silver Yellow Cake" },
            ].map((product, idx) => (
              <div key={idx} className="flex-shrink-0 w-64">
                <ProductCard image={product.image} title={product.title} productName={product.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-heading mb-6">
                Quality Assurance
              </h2>
              <p className="text-body-text text-lg leading-relaxed mb-6">
                At Naval Soap Factory, quality is our top priority. Every product
                undergoes rigorous testing and quality control procedures to ensure
                it meets the highest industry standards. Our state-of-the-art
                laboratory facilities and experienced team guarantee consistent
                excellence in every batch.
              </p>
              <p className="text-body-text text-lg leading-relaxed">
                We are committed to maintaining ISO certifications and adhering to
                international chemical safety regulations, providing our clients
                with reliable, safe, and effective industrial chemical solutions.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={qualityImage}
                alt="Quality Assurance Laboratory"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-heading text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-heading mb-3">
                  {feature.title}
                </h3>
                <p className="text-body-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibility */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Our Responsibility
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto opacity-90">
            We are dedicated to sustainable manufacturing practices and
            environmental stewardship. Jena Marketing believes in responsible
            chemical production that minimizes environmental impact while
            delivering exceptional quality. Our commitment extends beyond products
            to include ethical sourcing, waste reduction, and community engagement.
            Together, we're building a cleaner, safer future for the chemical
            industry.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
