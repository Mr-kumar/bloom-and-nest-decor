import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Palette, Sparkles } from "lucide-react";

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

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Crafted with Heart</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At HoneyNest Decor, every piece is more than just decoration—it's a labor of love. I
            pour my heart into creating beautiful, handcrafted items that transform houses into
            homes. From elegant guldasta and floral arrangements to cozy fairy lights and wall art,
            each creation is designed to bring warmth, charm, and personality to your space.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            What makes us special? You can work directly with me to customize any piece. Whether
            it's a gift for someone special or a treat for yourself, let's create something
            beautiful together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" variant="hero">
            Start Your Custom Design
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
