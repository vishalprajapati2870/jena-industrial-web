import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CheckCircle, Award, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-chemical-powder.jpg";
import qualityImage from "@/assets/quality-assurance.jpg";
import productPowder from "@/assets/product-powder.jpg";
import productGranules from "@/assets/product-granules.jpg";

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
            Welcome to Jena Marketing
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Your trusted partner in premium industrial chemical solutions
          </p>
          <Link to="/products">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 py-6 text-lg">
              View Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Our Products Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-heading text-center mb-12">
            Our Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard image={productPowder} title="Sodium Chloride" />
            <ProductCard image={productGranules} title="Calcium Carbonate" />
            <ProductCard image={productPowder} title="Potassium Hydroxide" />
            <ProductCard image={productGranules} title="Magnesium Sulfate" />
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
                At Jena Marketing, quality is our top priority. Every product
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
