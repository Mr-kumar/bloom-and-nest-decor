import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageCircle, Upload } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const itemTypes = [
  { id: "flowers", label: "Floral Arrangement / Guldasta", icon: "🌸" },
  { id: "frames", label: "Wall Frame / Art", icon: "🖼️" },
  { id: "lights", label: "Fairy Lights / Lighting", icon: "✨" },
  { id: "vases", label: "Vases / Ceramic Pieces", icon: "🏺" },
  { id: "other", label: "Other / Custom Idea", icon: "💡" },
];

const CustomOrder = () => {
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    colors: "",
    size: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ selectedType, ...formData });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-secondary/20">
          <div className="container mx-auto text-center max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Dream It, We'll Make It Real 🌷</h1>
            <p className="text-lg text-muted-foreground">
              Have a unique vision? I'd love to bring your custom décor idea to life. Share your
              thoughts, and let's create something beautiful together!
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="p-8 md:p-12 border-border/50 bg-card">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Item Type */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">What would you like to create?</h3>
                    <p className="text-sm text-muted-foreground">Select the type of item you're interested in</p>
                  </div>
                  <RadioGroup value={selectedType} onValueChange={setSelectedType}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {itemTypes.map((type) => (
                        <Label
                          key={type.id}
                          htmlFor={type.id}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedType === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-border"
                          }`}
                        >
                          <RadioGroupItem value={type.id} id={type.id} />
                          <span className="text-2xl">{type.icon}</span>
                          <span className="text-sm font-medium flex-1">{type.label}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Step 2: Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Your Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (WhatsApp preferred)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                </div>

                {/* Step 3: Preferences */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Design Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="colors">Preferred Colors</Label>
                      <Input
                        id="colors"
                        placeholder="e.g., Blush pink, cream, gold"
                        value={formData.colors}
                        onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Size / Dimensions</Label>
                      <Input
                        id="size"
                        placeholder="e.g., Small, Medium, 12x16 inches"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell Me About Your Vision *</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your dream piece... What's the occasion? What style do you love? Any specific requirements or inspiration?"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-background/50 border-border/50 resize-none"
                    />
                  </div>
                </div>

                {/* Step 4: Upload Reference */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Reference Images (Optional)</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload any inspiration images or sketches
                    </p>
                  </div>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-3 pt-4">
                  <Button type="submit" size="lg" variant="hero" className="w-full">
                    Send Custom Order Request
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="soft"
                    className="w-full gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Or Chat on WhatsApp Instantly
                  </Button>
                </div>
              </form>
            </Card>

            {/* Previous Work Examples */}
            <div className="mt-16 text-center space-y-6">
              <h3 className="text-2xl font-bold">Need Inspiration?</h3>
              <p className="text-muted-foreground">
                Check out our <a href="/gallery" className="text-primary hover:underline">gallery</a> to see examples of custom orders we've created for other customers 💕
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomOrder;
