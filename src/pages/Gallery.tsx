import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import productFlowers from "@/assets/product-flowers.jpg";
import productFrames from "@/assets/product-frames.jpg";
import productLights from "@/assets/product-lights.jpg";
import productVases from "@/assets/product-vases.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const galleryItems = [
  { id: 1, image: productFlowers, category: "flowers", caption: "Spring blooms in a vintage vase 🌸", customer: "Priya S." },
  { id: 2, image: productFrames, category: "frames", caption: "Pressed rose botanical art 🖼️", customer: "Ananya M." },
  { id: 3, image: productLights, category: "lights", caption: "Cozy fairy lights corner setup ✨", customer: "Riya K." },
  { id: 4, image: productVases, category: "vases", caption: "Minimalist ceramic collection 🏺", customer: "Neha R." },
  { id: 5, image: productFlowers, category: "custom", caption: "Custom wedding table centerpiece 💐", customer: "Shreya & Rahul" },
  { id: 6, image: productFrames, category: "custom", caption: "Personalized anniversary gift frame 💕", customer: "Aditi P." },
];

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-secondary/20">
          <div className="container mx-auto text-center max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Our Gallery 📸</h1>
            <p className="text-lg text-muted-foreground">
              A visual journey through our handcrafted creations and the beautiful spaces they've transformed
            </p>
          </div>
        </section>

        {/* Gallery Tabs */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="inline-flex bg-muted/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="flowers">Flowers</TabsTrigger>
                  <TabsTrigger value="frames">Frames</TabsTrigger>
                  <TabsTrigger value="lights">Lights</TabsTrigger>
                  <TabsTrigger value="vases">Vases</TabsTrigger>
                  <TabsTrigger value="custom">Custom Orders</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryItems.map((item) => (
                    <Card
                      key={item.id}
                      className="group overflow-hidden border-border/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] transition-all duration-500 bg-card"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.caption}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="text-white">
                            <p className="font-medium mb-1">{item.caption}</p>
                            <p className="text-sm opacity-80">by {item.customer}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {["flowers", "frames", "lights", "vases", "custom"].map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <Card
                          key={item.id}
                          className="group overflow-hidden border-border/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] transition-all duration-500 bg-card"
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.caption}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <div className="text-white">
                                <p className="font-medium mb-1">{item.caption}</p>
                                <p className="text-sm opacity-80">by {item.customer}</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Customer Stories CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Want to See Your Space Here? 🌟</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your HoneyNest setup with us! Tag @honeynestdecor on Instagram or send us your photos.
              We love featuring our customers' beautiful homes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="hero">
                Share Your Setup
              </Button>
              <Button size="lg" variant="soft">
                Start Your Order
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
