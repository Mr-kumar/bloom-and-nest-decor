import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Package, Heart, ShoppingBag, Edit2 } from "lucide-react";
import UserLayout from "@/components/user/UserLayout";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0,
    cart: 0,
  });

  useEffect(() => {
    loadProfile();
    loadStats();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    if (data) {
      setProfile(data);
      setFullName(data.full_name || "");
    }
  };

  const loadStats = async () => {
    if (!user) return;
    
    const [ordersResult, wishlistResult, cartResult] = await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      supabase.from("wishlist").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      supabase.from("cart").select("id", { count: "exact", head: true }).eq("user_id", user.id),
    ]);

    setStats({
      orders: ordersResult.count || 0,
      wishlist: wishlistResult.count || 0,
      cart: cartResult.count || 0,
    });
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      setEditing(false);
      loadProfile();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Orders", value: stats.orders, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Wishlist Items", value: stats.wishlist, icon: Heart, color: "text-rose-gold", bg: "bg-rose-50" },
    { title: "Cart Items", value: stats.cart, icon: ShoppingBag, color: "text-honey", bg: "bg-amber-50" },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white border-zinc-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-serif text-zinc-900">My Profile</CardTitle>
              {!editing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(true)}
                  className="gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-rose-gold/20 text-rose-gold text-2xl font-serif">
                    {profile?.full_name ? getInitials(profile.full_name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {editing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateProfile} disabled={loading}>
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditing(false);
                            setFullName(profile?.full_name || "");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif text-zinc-900">
                        {profile?.full_name || "User"}
                      </h3>
                      <p className="text-zinc-600">{user?.email}</p>
                      <p className="text-sm text-zinc-500">
                        Member since {new Date(profile?.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Card className="bg-white border-zinc-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-zinc-900">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border-zinc-200">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-zinc-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 justify-start gap-4"
                onClick={() => window.location.href = "/shop"}
              >
                <ShoppingBag className="h-6 w-6 text-rose-gold" />
                <div className="text-left">
                  <div className="font-medium">Continue Shopping</div>
                  <div className="text-sm text-zinc-500">Browse our collection</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 justify-start gap-4"
                onClick={() => window.location.href = "/dashboard/orders"}
              >
                <Package className="h-6 w-6 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">View Orders</div>
                  <div className="text-sm text-zinc-500">Track your purchases</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
