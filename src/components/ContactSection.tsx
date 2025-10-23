import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Mail, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Let's Create Together</h2>
          <p className="text-lg text-muted-foreground">
            Have a custom design in mind? Let's chat about bringing your vision to life
          </p>
        </div>

        <Card className="p-8 md:p-12 border-border/50 bg-card/95 backdrop-blur-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Tell Me About Your Dream Piece
              </label>
              <Textarea
                id="message"
                placeholder="Describe what you're looking for... colors, style, size, or any special requirements"
                rows={6}
                className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
              />
            </div>

            <Button type="submit" size="lg" variant="hero" className="w-full">
              Send Your Request
            </Button>
          </form>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Or reach out through your preferred channel
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="soft" size="lg" className="gap-2">
                <Instagram className="w-5 h-5" />
                Instagram
              </Button>
              <Button variant="soft" size="lg" className="gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
              <Button variant="soft" size="lg" className="gap-2">
                <Mail className="w-5 h-5" />
                Email
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
