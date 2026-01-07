import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CheckCircle, Award, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useCallback, useEffect } from "react";
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

import SILVER_5KG from "@/assets/SILVER 5KG.jpeg";
import SILVER_2KG from "@/assets/SILVER 2KG.jpeg";
import SILVER_1KG from "@/assets/SIVER 1KG.jpeg";
import SILVER_500GM from "@/assets/SILVER 500GM.jpeg";
import SILVER_150GM from "@/assets/SILVER 150GM.jpeg";
import SILVER_80GM from "@/assets/SILVER 80GM.jpeg";

const Home = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef<number>();
  const directionRef = useRef<number>(1); // 1 for left (default), -1 for right
  const progressRef = useRef<number>(0);
  const speed = 0.5; // Slower speed

  useEffect(() => {
    const scroll = () => {
      if (marqueeRef.current && !isPaused && !isDragging) {
        // Accumulate fractional movement
        progressRef.current += speed * directionRef.current;
        
        // Only apply if we have at least 1px of movement to apply? 
        // Actually, let's just apply it and let the browser handle sub-pixels if it can, 
        // or just rely on the integer part updates.
        // Better: Keep 'virtual' position in progressRef synced with scrollLeft initially.
        // Actually, simplest is:
        
        const currentScroll = marqueeRef.current.scrollLeft;
        const newScroll = currentScroll + (speed * directionRef.current);
        
        marqueeRef.current.scrollLeft = newScroll;

        // Loop Logic
        if (marqueeRef.current.scrollLeft >= marqueeRef.current.scrollWidth / 2) {
             marqueeRef.current.scrollLeft = 0;
        } else if (marqueeRef.current.scrollLeft <= 0) {
             marqueeRef.current.scrollLeft = marqueeRef.current.scrollWidth / 2;
        }
      }
      requestRef.current = requestAnimationFrame(scroll);
    };
    
    requestRef.current = requestAnimationFrame(scroll);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused, isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!marqueeRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    let newScrollLeft = scrollLeft - walk;

    // Determine direction based on drag
    // If dragging LEFT (walk < 0 so newScrollLeft > old), we are pulling content left, so valid direction is 1.
    // If dragging RIGHT (walk > 0 so newScrollLeft < old), we are pulling content right, so valid direction is -1.
    if (walk > 0) {
        directionRef.current = -1;
    } else if (walk < 0) {
        directionRef.current = 1;
    }

    // Manual Drag Loop Logic
    const maxScroll = marqueeRef.current.scrollWidth / 2;
    if (newScrollLeft < 0) {
      newScrollLeft = maxScroll + newScrollLeft;
    } else if (newScrollLeft >= maxScroll) {
      newScrollLeft = newScrollLeft - maxScroll;
    }

    marqueeRef.current.scrollLeft = newScrollLeft;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Determine continue direction? 
    // It's already set in MouseMove.
    
    // Optional: Add some momentum or strictly just resume? User said "continues move".
    setIsPaused(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!marqueeRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    const x = e.touches[0].pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    let newScrollLeft = scrollLeft - walk;

    if (walk > 0) {
        directionRef.current = -1;
    } else if (walk < 0) {
        directionRef.current = 1;
    }

     // Manual Drag Loop Logic
     const maxScroll = marqueeRef.current.scrollWidth / 2;
     if (newScrollLeft < 0) {
       newScrollLeft = maxScroll + newScrollLeft;
     } else if (newScrollLeft >= maxScroll) {
       newScrollLeft = newScrollLeft - maxScroll;
     }

    marqueeRef.current.scrollLeft = newScrollLeft;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setIsPaused(false);
  }, []);

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
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 drop-shadow-lg">
            Welcome to Naval Soap Factory
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light drop-shadow-md">
            Your trusted partner in premium industrial detergent cake
          </p>
          <Link to="/products">
            <Button className="bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wider px-10 py-7 text-lg rounded-md shadow-lg transition-all">
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
        <div 
          ref={marqueeRef}
          className={`relative overflow-x-hidden whitespace-nowrap scrollbar-hide select-none ${isDragging ? 'cursor-grabbing [&_a]:pointer-events-none' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          // Removing onMouseEnter since we want it to keep moving unless actively dragged?
          // User said "one time stop after finish all product i want to here infinite loop"
          // User also said "double click and move" - usually means Drag.
          // Let's keep hover-pause for usability, or remove it if they want continuous flow.
          // User said "stop after finish" was the OLD behavior they didn't want.
          // "slight slow marqee and after the seoble click than move" -> maybe they want it to pause on click, then move on double click?
          // "When user move double click and move that direction in continues move" -> Dragging dictates direction.
          // I will keep hover pause OFF for now to emphasize the "continuous move" unless they explicitly asked for pause.
          // Actually, standard marquee behavior usually pauses on hover. I'll COMMENT IT OUT for now to be "continuous".
          // onMouseEnter={() => setIsPaused(true)} 
        >
          <div className="flex gap-8">
            {[
              { image: SILVER_JUMBO, title: "Jambo Silver Detergent Cake", name: "Jambo Silver Detergent Cake" },
              { image: SILVER_NEW, title: "New Silver Detergent Cake", name: "New Silver Detergent Cake" },
              { image: SILVER_SEMI, title: "Semi Silver Detergent Cake", name: "Semi Silver Detergent Cake" },
              { image: SILVER_BLUE, title: "Blue Silver Detergent Cake", name: "Blue Silver Detergent Cake" },
              { image: SILVER_ORANGE, title: "Orange Silver Detergent Cake", name: "Orange Silver Detergent Cake" },
              { image: SILVER_YELLOW, title: "Yellow Silver Detergent Cake", name: "Yellow Silver Detergent Cake" },
              { image: SILVER_HERBAL, title: "Herbal Silver Detergent Cake", name: "Herbal Silver Detergent Cake" },
              { image: SILVER_WONDER, title: "Wonder Silver Detergent Cake", name: "Wonder Silver Detergent Cake" },
              { image: SILVER_ULTRA, title: "Jambo Ultra White Silver Detergent Cake", name: "Jambo Ultra White Silver Detergent Cake" },
              { image: CHETAK, title: "Chetak Silver Detergent Cake", name: "Chetak Silver Detergent Cake" },
              { image: DAYAWAN, title: "Dayawan Silver Detergent Cake", name: "Dayawan Silver Detergent Cake" },
              { image: TALATI, title: "Talati Silver Detergent Cake", name: "Talati Silver Detergent Cake" },
              // Duplicate for seamless loop - Full list duplicated
              { image: SILVER_JUMBO, title: "Jambo Silver Detergent Cake", name: "Jambo Silver Detergent Cake" },
              { image: SILVER_NEW, title: "New Silver Detergent Cake", name: "New Silver Detergent Cake" },
              { image: SILVER_SEMI, title: "Semi Silver Detergent Cake", name: "Semi Silver Detergent Cake" },
              { image: SILVER_BLUE, title: "Blue Silver Detergent Cake", name: "Blue Silver Detergent Cake" },
              { image: SILVER_ORANGE, title: "Orange Silver Detergent Cake", name: "Orange Silver Detergent Cake" },
              { image: SILVER_YELLOW, title: "Yellow Silver Detergent Cake", name: "Yellow Silver Detergent Cake" },
              { image: SILVER_HERBAL, title: "Herbal Silver Detergent Cake", name: "Herbal Silver Detergent Cake" },
              { image: SILVER_WONDER, title: "Wonder Silver Detergent Cake", name: "Wonder Silver Detergent Cake" },
              { image: SILVER_ULTRA, title: "Jambo Ultra White Silver Detergent Cake", name: "Jambo Ultra White Silver Detergent Cake" },
              { image: CHETAK, title: "Chetak Silver Detergent Cake", name: "Chetak Silver Detergent Cake" },
              { image: DAYAWAN, title: "Dayawan Silver Detergent Cake", name: "Dayawan Silver Detergent Cake" },
              { image: TALATI, title: "Talati Silver Detergent Cake", name: "Talati Silver Detergent Cake" },
            ].map((product, idx) => (
              <div key={idx} className="flex-shrink-0 w-64 select-none">
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
                international detergent safety regulations, providing our clients
                with reliable, safe, and effective industrial detergent cake and powder.
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
            environmental stewardship. naval soap factory believes in responsible
            detergent production that minimizes environmental impact while
            delivering exceptional quality. Our commitment extends beyond products
            to include ethical sourcing, waste reduction, and community engagement.
            Together, we're building a cleaner, safer future for the detergent
            industry.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
