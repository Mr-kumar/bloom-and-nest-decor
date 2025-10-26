import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, Newspaper, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    news: 0,
    orders: 0,
    revenue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadRecentOrders();
  }, []);

  const loadStats = async () => {
    const [productsResult, newsResult, profilesResult, ordersResult] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("news").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("total_amount, status"),
    ]);

    const orders = ordersResult.data || [];
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    const pendingOrders = orders.filter((order) => order.status === "pending").length;

    setStats({
      users: profilesResult.count || 0,
      products: productsResult.count || 0,
      news: newsResult.count || 0,
      orders: orders.length,
      revenue: totalRevenue,
      pendingOrders,
    });
  };

  const loadRecentOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setRecentOrders(data || []);
  };

  const statCards = [
    { title: "Total Users", value: stats.users, icon: Users, color: "text-blue-500", bg: "bg-blue-500/20" },
    { title: "Products", value: stats.products, icon: Package, color: "text-rose-gold", bg: "bg-rose-gold/20" },
    { title: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-500/20" },
    { title: "Revenue", value: `₹${stats.revenue.toFixed(2)}`, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/20" },
    { title: "Pending Orders", value: stats.pendingOrders, icon: TrendingUp, color: "text-yellow-500", bg: "bg-yellow-500/20" },
    { title: "News Posts", value: stats.news, icon: Newspaper, color: "text-honey", bg: "bg-honey/20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "shipped":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "delivered":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif text-zinc-100 mb-2">Dashboard Overview</h1>
          <p className="text-zinc-400">Welcome to your admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-zinc-100">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="text-zinc-400 text-center py-8">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-800/80 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-zinc-100">{order.order_number}</p>
                        <p className="text-sm text-zinc-400">{order.customer_name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="font-semibold text-zinc-100">
                          ₹{Number(order.total_amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
