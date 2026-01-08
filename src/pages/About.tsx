import { Building2, Target, Eye, Award } from "lucide-react";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">About Naval Soap Factory</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-95">
            Leading the detergent industry with innovation, quality, and sustainability
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-heading mb-8 text-center">
              Our Story
            </h2>
            <p className="text-lg text-body-text leading-relaxed mb-6">
            Founded with a vision to strengthen and modernize detergent production,
            Naval Soap Factory has grown into a trusted name in the manufacturing of detergent 
            soaps and detergent powders. Our journey began with a simple goal—to produce high-quality, 
            effective cleaning products that meet the everyday needs of households and businesses.
            </p>
            <p className="text-lg text-body-text leading-relaxed mb-6">
            Over the years, we have built strong relationships with customers by consistently delivering 
            reliable quality, performance, and value. Our well-equipped manufacturing facilities and strict 
            quality control processes ensure that every detergent product meets high safety and performance 
            standards.
            </p>
            <p className="text-lg text-body-text leading-relaxed">
            Today, Naval Soap Factory continues to move forward by blending traditional manufacturing values 
            with modern techniques, providing dependable detergent solutions that support cleaner homes and 
            healthier living.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-lg border border-border">
              <Target className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold text-heading mb-4">Our Mission</h3>
              <p className="text-body-text leading-relaxed">
              To manufacture high-quality detergent soaps and powders that deliver effective cleaning, 
              promote safety, and support sustainable and innovative production practices.
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border">
              <Eye className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold text-heading mb-4">Our Vision</h3>
              <p className="text-body-text leading-relaxed">
              To become a trusted leader in detergent cake and powder manufacturing, recognized for quality, 
              integrity, and sustainable practices.
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border">
              <Award className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold text-heading mb-4">Our Values</h3>
              <p className="text-body-text leading-relaxed">
              Quality, integrity, innovation, and customer satisfaction are the core values that 
              guide our detergent manufacturing processes and define our commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-heading text-center mb-12">
            Certifications & Standards
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="font-heading font-semibold text-heading">ISO 9001</p>
              <p className="text-sm text-body-text mt-1">Quality Management</p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="font-heading font-semibold text-heading">ISO 14001</p>
              <p className="text-sm text-body-text mt-1">Environmental</p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="font-heading font-semibold text-heading">ISO 45001</p>
              <p className="text-sm text-body-text mt-1">Safety Standards</p>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="font-heading font-semibold text-heading">GMP</p>
              <p className="text-sm text-body-text mt-1">Manufacturing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
