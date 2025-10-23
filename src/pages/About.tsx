import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Palette, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every piece is handcrafted with attention to detail and genuine care",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Share your vision and let us create something uniquely yours",
  },
  {
    icon: MessageCircle,
    title: "Personal Touch",
    description: "Talk directly with the artist to bring your dream décor to life",
  },
  {
    icon: Sparkles,
    title: "Quality Crafted",
    description: "Using premium materials to ensure lasting beauty in your home",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-secondary/20">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Crafted with Heart</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At HoneyNest Decor, every piece is more than just decoration—it's a labor of love. I
              pour my heart into creating beautiful, handcrafted items that transform houses into
              homes. 🌸
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What started as a simple hobby of arranging flowers and crafting décor pieces has
                blossomed into a passionate journey of spreading love through art. Every guldasta,
                wall frame, fairy light setup, and decorative piece I create carries a piece of my
                heart and a story waiting to be told.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From elegant floral arrangements to cozy fairy lights and personalized wall art,
                each creation is designed to bring warmth, charm, and personality to your space.
                I believe that every corner of your home deserves to feel special, and that's what
                drives me to handcraft each item with dedication and care.
              </p>
            </div>

            {/* Promise Section */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-border/50">
              <h3 className="text-2xl font-bold mb-4 text-center">Our Promise</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span>100% handmade with love and attention to every detail</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span>Premium, eco-friendly materials for lasting beauty</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span>Fully customizable designs to match your vision</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span>Direct communication with the artist for your custom orders</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Makes Us Special
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 text-center space-y-4 border-border/50 bg-card hover:shadow-[0_0_30px_hsl(var(--accent)/0.15)] transition-all duration-500"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/60 border border-border/50">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Let's Create Something Beautiful Together</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you have a specific vision or need inspiration, I'm here to help bring your
              dream décor to life. Let's chat! 💕
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/custom-order">
                <Button size="lg" variant="hero">
                  Start Your Custom Design
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="soft">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
