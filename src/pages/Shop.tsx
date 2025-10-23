import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingCart } from "lucide-react";
import productFlowers from "@/assets/product-flowers.jpg";
import productFrames from "@/assets/product-frames.jpg";
import productLights from "@/assets/product-lights.jpg";
import productVases from "@/assets/product-vases.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const products = [
  {
    id: 1,
    name: "Handmade Guldasta",
    description: "Elegant floral arrangements in beautiful vases",
    image: productFlowers,
    category: "Flowers & Vases",
    price: 2499,
    customizable: true,
  },
  {
    id: 2,
    name: "Botanical Frames",
    description: "Pressed flowers preserved in elegant frames",
    image: productFrames,
    category: "Wall Art",
    price: 1899,
    customizable: true,
  },
  {
    id: 3,
    name: "Fairy Lights",
    description: "Warm, cozy lighting for any space",
    image: productLights,
    category: "Lighting",
    price: 899,
    customizable: false,
  },
  {
    id: 4,
    name: "Ceramic Vases",
    description: "Minimalist elegance for your blooms",
    image: productVases,
    category: "Home Accents",
    price: 1599,
    customizable: true,
  },
];

const categories = ["All", "Flowers & Vases", "Wall Art", "Lighting", "Home Accents"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 px-4 bg-gradient-to-br from-muted/30 to-secondary/20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Our Collection</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every piece is handcrafted with love. Find your perfect décor or customize it to match your dreams 🌷
            </p>
          </div>
        </section>

        {/* Filters & Sort */}
        <section className="py-6 px-4 border-b border-border/50">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-border/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] transition-all duration-500 bg-card"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.customizable && (
                      <div className="absolute top-3 right-3 bg-accent/90 text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                        Customizable
                      </div>
                    )}
                    
                    {/* Quick Actions */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary">
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="hero">
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="text-xs font-medium text-accent uppercase tracking-wider">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold">₹{product.price}</span>
                      <Button size="sm" variant="soft">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
