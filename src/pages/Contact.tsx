import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-95">Get in touch with our team</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div>
            <h2 className="text-3xl font-heading font-bold text-heading mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-heading mb-1">Address</h3>
                  <p className="text-body-text">
                    123 Industrial Avenue<br />
                    Chemical District, State 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-heading mb-1">Email</h3>
                  <a href="mailto:info@jenamarketing.com" className="text-body-text hover:text-primary">
                    info@jenamarketing.com
                  </a>
                  <br />
                  <a href="mailto:sales@jenamarketing.com" className="text-body-text hover:text-primary">
                    sales@jenamarketing.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-heading mb-1">Phone</h3>
                  <a href="tel:+1234567890" className="text-body-text hover:text-primary">
                    +1 (234) 567-890
                  </a>
                  <br />
                  <a href="tel:+1234567891" className="text-body-text hover:text-primary">
                    +1 (234) 567-891
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-6">
                <h3 className="font-heading font-semibold text-heading mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-heading font-bold text-heading mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[150px] focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <h2 className="text-3xl font-heading font-bold text-heading mb-6 text-center">
            Our Location
          </h2>
          <div className="w-full h-[400px] bg-muted rounded-lg overflow-hidden">
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
    </div>
  );
};

export default Contact;
