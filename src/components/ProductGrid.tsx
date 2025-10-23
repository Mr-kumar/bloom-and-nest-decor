import { Card } from "@/components/ui/card";
import productFlowers from "@/assets/product-flowers.jpg";
import productFrames from "@/assets/product-frames.jpg";
import productLights from "@/assets/product-lights.jpg";
import productVases from "@/assets/product-vases.jpg";

const products = [
  {
    id: 1,
    name: "Handmade Guldasta",
    description: "Elegant floral arrangements in beautiful vases",
    image: productFlowers,
    category: "Flowers & Vases",
  },
  {
    id: 2,
    name: "Botanical Frames",
    description: "Pressed flowers preserved in elegant frames",
    image: productFrames,
    category: "Wall Art",
  },
  {
    id: 3,
    name: "Fairy Lights",
    description: "Warm, cozy lighting for any space",
    image: productLights,
    category: "Lighting",
  },
  {
    id: 4,
    name: "Ceramic Vases",
    description: "Minimalist elegance for your blooms",
    image: productVases,
    category: "Home Accents",
  },
];

const ProductGrid = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Our Collection</h2>
          <p className="text-lg text-muted-foreground">
            Each piece is carefully crafted to bring warmth and beauty to your home
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-border/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] transition-all duration-500 hover:scale-[1.02] bg-card"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-2">
                <div className="text-xs font-medium text-accent uppercase tracking-wider">
                  {product.category}
                </div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
