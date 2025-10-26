import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", icon: User, label: "Profile", end: true },
    { to: "/dashboard/orders", icon: Package, label: "My Orders" },
    { to: "/dashboard/wishlist", icon: Heart, label: "Wishlist" },
    { to: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-cream to-blush/10">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-zinc-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-gold fill-rose-gold/20" />
            <h1 className="font-serif text-xl text-zinc-900">HoneyNest Decor</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Store
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sticky top-24">
              <h2 className="font-serif text-lg text-zinc-900 mb-4">My Account</h2>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-rose-gold/10 text-rose-gold font-medium"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-zinc-600 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
