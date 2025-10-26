import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import UserLayout from "@/components/user/UserLayout";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    in_stock: boolean;
  };
}

const UserWishlist = () => {
  const { user } = useAuthContext();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;
    setLoading(true);

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
            in_stock
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setWishlist(data || []);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      const { error } = await supabase.from("wishlist").delete().eq("id", wishlistId);

      if (error) throw error;

      toast.success("Removed from wishlist");
      loadWishlist();
    } catch (error: any) {
      toast.error(error.message || "Failed to remove from wishlist");
    }
  };

  const addToCart = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("cart").upsert(
        {
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        },
        {
          onConflict: "user_id,product_id",
        }
      );

      if (error) throw error;

      toast.success("Added to cart");
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-zinc-400">Loading wishlist...</div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif text-zinc-900 mb-2">My Wishlist</h1>
          <p className="text-zinc-600">Items you love</p>
        </div>

        {wishlist.length === 0 ? (
          <Card className="bg-white border-zinc-200">
            <CardContent className="py-12 text-center">
              <Heart className="h-16 w-16 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-zinc-900 mb-2">Your wishlist is empty</h3>
              <p className="text-zinc-600 mb-6">Add items you love to your wishlist</p>
              <Button onClick={() => (window.location.href = "/shop")}>Browse Products</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className="bg-white border-zinc-200 hover:shadow-lg transition-all overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.product.image_url || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!item.product.in_stock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-serif text-lg text-zinc-900 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-zinc-600 line-clamp-2 mt-1">
                        {item.product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-zinc-900">
                        ₹{item.product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 gap-2"
                        onClick={() => addToCart(item.product.id)}
                        disabled={!item.product.in_stock}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserWishlist;
