import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Package, Eye, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import UserLayout from "@/components/user/UserLayout";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Order {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  order_items: any[];
  shipping_address: any;
}

const Orders = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-zinc-100 text-zinc-800 border-zinc-200";
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-zinc-400">Loading orders...</div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif text-zinc-900 mb-2">My Orders</h1>
          <p className="text-zinc-600">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <Card className="bg-white border-zinc-200">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-zinc-900 mb-2">No orders yet</h3>
              <p className="text-zinc-600 mb-6">Start shopping to see your orders here</p>
              <Button onClick={() => window.location.href = "/shop"}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className="bg-white border-zinc-200 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg font-serif text-zinc-900">
                          Order #{order.order_number}
                        </CardTitle>
                        <p className="text-sm text-zinc-500 mt-1">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-zinc-600">
                        {order.order_items?.length || 0} item(s)
                      </div>
                      <div className="text-lg font-semibold text-zinc-900">
                        ₹{order.total_amount.toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">
              Order Details - #{selectedOrder?.order_number}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Status</p>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-1 capitalize">{selectedOrder.status}</span>
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Payment Status</p>
                  <Badge variant="outline" className="capitalize">
                    {selectedOrder.payment_status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Order Date</p>
                  <p className="font-medium">
                    {new Date(selectedOrder.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Total Amount</p>
                  <p className="font-medium text-lg">₹{selectedOrder.total_amount.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.order_items?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-zinc-900">{item.product_name}</p>
                        <p className="text-sm text-zinc-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-zinc-900">₹{item.subtotal.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 mb-3">Shipping Address</h3>
                <div className="p-3 bg-zinc-50 rounded-lg">
                  <p className="text-zinc-900">{selectedOrder.shipping_address.full_name}</p>
                  <p className="text-sm text-zinc-600 mt-1">
                    {selectedOrder.shipping_address.address_line1}
                    {selectedOrder.shipping_address.address_line2 && (
                      <>, {selectedOrder.shipping_address.address_line2}</>
                    )}
                  </p>
                  <p className="text-sm text-zinc-600">
                    {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state}{" "}
                    {selectedOrder.shipping_address.postal_code}
                  </p>
                  <p className="text-sm text-zinc-600">{selectedOrder.shipping_address.phone}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </UserLayout>
  );
};

export default Orders;
