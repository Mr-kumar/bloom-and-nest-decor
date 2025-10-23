import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import productFlowers from "@/assets/product-flowers.jpg";
import productFrames from "@/assets/product-frames.jpg";
import productLights from "@/assets/product-lights.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "5 Cozy Décor Ideas for Small Rooms",
    excerpt: "Transform your compact space into a warm haven with these simple handmade décor tips...",
    image: productLights,
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Décor Tips",
  },
  {
    id: 2,
    title: "How to Care for Your Handmade Floral Arrangements",
    excerpt: "Keep your guldasta looking fresh and beautiful with these expert care tips...",
    image: productFlowers,
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Care Guide",
  },
  {
    id: 3,
    title: "Behind the Craft: Making Our Best-Selling Botanical Frames",
    excerpt: "Take a peek into the artistic process of creating pressed flower art that lasts forever...",
    image: productFrames,
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Behind the Scenes",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-secondary/20">
          <div className="container mx-auto text-center max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Décor Stories & Inspiration ✨</h1>
            <p className="text-lg text-muted-foreground">
              Tips, stories, and creative ideas to help you craft a home you'll love
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-6">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Featured Post</span>
            </div>
            <Card className="overflow-hidden border-border/50 bg-card hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={productLights}
                    alt="Featured post"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      March 15, 2024
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      5 min read
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold">5 Cozy Décor Ideas for Small Rooms</h2>
                  <p className="text-muted-foreground">
                    Living in a small space doesn't mean you have to compromise on style and coziness. 
                    Discover how handmade décor pieces can transform your compact room into a warm, 
                    inviting haven that feels twice its size...
                  </p>
                  <div className="pt-2">
                    <Button variant="hero">Read Full Article</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* All Posts */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden border-border/50 bg-card hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)] transition-all duration-500"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-accent/90 text-accent-foreground text-xs px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    <Button variant="soft" size="sm" className="mt-2">
                      Read More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-border/50">
              <h2 className="text-3xl font-bold mb-4">Get Décor Tips in Your Inbox 💌</h2>
              <p className="text-muted-foreground mb-6">
                Join our cozy community and receive weekly inspiration, exclusive tips, and special offers
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button variant="hero" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
