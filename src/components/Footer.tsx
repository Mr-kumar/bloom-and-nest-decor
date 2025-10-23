import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-muted/20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Brand */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">HoneyNest Decor</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Handcrafted home décor made with love. Transform your space into a warm, beautiful
              haven.
            </p>
          </div>

          {/* Divider */}
          <div className="w-32 h-px bg-border/50" />

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025 HoneyNest Decor. Made with</span>
            <Heart className="w-4 h-4 fill-primary text-primary animate-pulse" />
            <span>for your home</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
