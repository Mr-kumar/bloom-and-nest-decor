import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  // Empty cart state
  const cartItems: any[] = [];

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
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="text-lg font-bold">₹{item.price * item.quantity}</span>
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
                        <span className="font-medium">₹0</span>
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
                        <span>₹0</span>
                      </div>

                      <Button variant="hero" size="lg" className="w-full mt-4">
                        Proceed to Checkout
                      </Button>

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
