import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Wishlist = () => {
  // Empty wishlist state
  const wishlistItems: any[] = [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
              {wishlistItems.length > 0 && (
                <span className="text-muted-foreground">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>

            {wishlistItems.length === 0 ? (
              // Empty Wishlist
              <Card className="p-12 text-center border-border/50 bg-card">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blush/20 to-honey/20 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
                  <p className="text-muted-foreground">
                    Save your favorite handmade treasures here and come back anytime. Start adding pieces that speak to your heart! 💕
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link to="/shop">
                      <Button variant="hero" size="lg" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Explore Collection
                      </Button>
                    </Link>
                    <Link to="/custom-order">
                      <Button variant="soft" size="lg">
                        Design Custom Piece
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              // Wishlist with items
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="group overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden bg-muted/30">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {item.customizable && (
                        <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Customizable
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {item.category}
                        </p>
                        <h3 className="font-semibold text-lg mt-1">{item.name}</h3>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="hero" className="flex-1 gap-2" size="sm">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </Button>
                        <Link to={`/product/${item.id}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Recommendations */}
            {wishlistItems.length > 0 && (
              <div className="mt-12 pt-12 border-t border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">You might also love</h2>
                  <Link to="/shop">
                    <Button variant="ghost">View All</Button>
                  </Link>
                </div>
                <p className="text-muted-foreground text-center">
                  Based on your wishlist, we think you'll love these pieces too
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
