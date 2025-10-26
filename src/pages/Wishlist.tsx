import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    customizable: boolean;
    in_stock: boolean;
  };
}

const Wishlist = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadWishlist();
  }, [user, navigate]);

  const loadWishlist = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select(`
          id,
          product:products (
            id,
            name,
            description,
            price,
            image_url,
            category,
            customizable,
            in_stock
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (error) {
      console.error("Error loading wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", wishlistId);

      if (error) throw error;
      toast.success("Removed from wishlist");
      loadWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const addToCart = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("cart")
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        }, {
          onConflict: "user_id,product_id",
        });

      if (error) throw error;
      toast.success("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading wishlist...</div>
        </main>
        <Footer />
      </div>
    );
  }

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
                        src={item.product.image_url || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {item.product.customizable && (
                        <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Customizable
                        </div>
                      )}
                      {!item.product.in_stock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {item.product.category}
                        </p>
                        <h3 className="font-semibold text-lg mt-1">{item.product.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.product.description}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">₹{item.product.price}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="hero" 
                          className="flex-1 gap-2" 
                          size="sm"
                          onClick={() => addToCart(item.product.id)}
                          disabled={!item.product.in_stock}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </Button>
                        <Link to={`/shop`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            Continue Shopping
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
