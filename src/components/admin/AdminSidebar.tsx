import { NavLink } from "react-router-dom";
import { LayoutDashboard, Newspaper, Package, Settings, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminSidebar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Overview" },
    { to: "/admin/news", icon: Newspaper, label: "News Management" },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-zinc-900 text-zinc-100 min-h-screen flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-rose-gold fill-rose-gold/20" />
          <div>
            <h2 className="font-serif text-xl">HoneyNest</h2>
            <p className="text-xs text-zinc-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-rose-gold/20 text-rose-gold"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
