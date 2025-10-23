import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-secondary/20">
          <div className="container mx-auto text-center max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Let's Create Together 💬</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? Need a custom design? Want to share your décor story? I'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8 border-border/50 bg-card">
                <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Your Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me what's on your mind..."
                      rows={6}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" variant="hero" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Contact Info & Social */}
              <div className="space-y-8">
                {/* Quick Contact */}
                <Card className="p-6 border-border/50 bg-card">
                  <h3 className="text-xl font-bold mb-6">Quick Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">hello@honeynestdecor.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">+91 XXXXX XXXXX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Social Media */}
                <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Follow our journey and get daily décor inspiration 🌸
                  </p>
                  <div className="space-y-3">
                    <Button variant="soft" size="lg" className="w-full gap-2 justify-start">
                      <Instagram className="w-5 h-5" />
                      @honeynestdecor
                    </Button>
                    <Button variant="soft" size="lg" className="w-full gap-2 justify-start">
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </Button>
                    <Button variant="soft" size="lg" className="w-full gap-2 justify-start">
                      <Mail className="w-5 h-5" />
                      Send Email
                    </Button>
                  </div>
                </Card>

                {/* Studio Location */}
                <Card className="p-6 border-border/50 bg-card">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Studio Location</h3>
                      <p className="text-sm text-muted-foreground">
                        Currently operating from home studio
                        <br />
                        Custom orders available for delivery across India 🇮🇳
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Have Questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out our FAQ page for answers to common questions about shipping, customization, timelines, and more.
            </p>
            <Button variant="soft" size="lg">
              View FAQs
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
