import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    news: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [productsResult, newsResult] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("news").select("id", { count: "exact", head: true }),
    ]);

    setStats({
      users: 0, // Will need additional query for user count
      products: productsResult.count || 0,
      news: newsResult.count || 0,
    });
  };

  const statCards = [
    { title: "Total Users", value: stats.users, icon: Users, color: "text-blue-500" },
    { title: "Products", value: stats.products, icon: Package, color: "text-rose-gold" },
    { title: "News Posts", value: stats.news, icon: Newspaper, color: "text-honey" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif text-zinc-100 mb-2">Dashboard Overview</h1>
          <p className="text-zinc-400">Welcome to your admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-100">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
