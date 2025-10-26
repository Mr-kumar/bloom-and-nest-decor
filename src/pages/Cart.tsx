import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    category: string;
    in_stock: boolean;
  };
}

const Cart = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadCart();
  }, [user, navigate]);

  const loadCart = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("cart")
        .select(`
          id,
          quantity,
          product:products (
            id,
            name,
            price,
            image_url,
            category,
            in_stock
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error("Error loading cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: newQuantity })
        .eq("id", cartId);

      if (error) throw error;
      loadCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (cartId: string) => {
    try {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("id", cartId);

      if (error) throw error;
      toast.success("Removed from cart");
      loadCart();
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading cart...</div>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              // Empty Cart
              <Card className="p-12 text-center border-border/50 bg-card">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold">Your cart is empty</h2>
                  <p className="text-muted-foreground">
                    Looks like you haven't added any handmade treasures yet. Let's find something beautiful for your space! 🌸
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link to="/shop">
                      <Button variant="hero" size="lg">
                        Browse Collection
                      </Button>
                    </Link>
                    <Link to="/custom-order">
                      <Button variant="soft" size="lg">
                        Custom Order
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              // Cart with items
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                 <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="p-6 border-border/50 bg-card">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image_url || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{item.product.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.product.category}</p>
                              {!item.product.in_stock && (
                                <p className="text-xs text-destructive">Out of stock</p>
                              )}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="text-lg font-bold">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="p-6 border-border/50 bg-card sticky top-20">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">Calculated at checkout</span>
                      </div>
                      
                      <Separator />
                      
                      {/* Coupon */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Discount Code</label>
                        <div className="flex gap-2">
                          <Input placeholder="Enter code" className="flex-1" />
                          <Button variant="outline">Apply</Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>

                      <Link to="/checkout">
                        <Button variant="hero" size="lg" className="w-full mt-4">
                          Proceed to Checkout
                        </Button>
                      </Link>

                      <Link to="/shop">
                        <Button variant="soft" size="lg" className="w-full">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
