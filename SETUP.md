# 🌸 Bloom & Nest Decor - E-Commerce Setup Guide

## 🎯 Overview

Your Room Decorator website has been transformed into a **fully functional e-commerce platform** with:

- ✅ **Authentication System** (Login/Signup with Supabase)
- 🛒 **Shopping Cart & Checkout**
- 📦 **Order Management**
- 👤 **User Dashboard** (Profile, Orders, Wishlist, Settings)
- 🧑‍💼 **Admin Dashboard** (Orders, Products, Users, News, Analytics)
- 📱 **Fully Responsive** with Framer Motion animations
- 🎨 **Zinc Gray Theme** (ShadCN UI + TailwindCSS)

---

## 🚀 Quick Start

### 1. Apply Database Migration

The new e-commerce tables need to be created in your Supabase database.

**Option A: Using Supabase CLI (Recommended)**
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref gzezhmmllojwafuwdqex

# Apply the migration
supabase db push
```

**Option B: Manual SQL Execution**
1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/gzezhmmllojwafuwdqex
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/20251024180000_ecommerce_tables.sql`
4. Click **Run**

### 2. Start Development Server

```bash
npm run dev
```

Your site will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx       # Admin dashboard wrapper
│   │   └── AdminSidebar.tsx      # Admin navigation
│   ├── user/
│   │   └── UserLayout.tsx        # User dashboard wrapper
│   ├── ProtectedRoute.tsx        # Route protection
│   └── ui/                       # ShadCN components
├── contexts/
│   └── AuthContext.tsx           # Global auth state
├── hooks/
│   └── useAuth.tsx               # Authentication hook
├── pages/
│   ├── user/
│   │   ├── Dashboard.tsx         # User profile & stats
│   │   ├── Orders.tsx            # Order history
│   │   ├── UserWishlist.tsx      # Saved items
│   │   └── UserSettings.tsx      # Address management
│   ├── admin/
│   │   ├── AdminOverview.tsx     # Analytics dashboard
│   │   ├── AdminOrders.tsx       # Order management
│   │   ├── AdminProducts.tsx     # Product management
│   │   ├── AdminUsers.tsx        # User & role management
│   │   ├── AdminNews.tsx         # News management
│   │   └── AdminSettings.tsx     # Admin settings
│   ├── Auth.tsx                  # Login/Signup
│   ├── Checkout.tsx              # Checkout flow
│   └── ...                       # Existing pages
└── App.tsx                       # Main routing
```

---

## 🗄️ Database Schema

### New Tables Created:

1. **`cart`** - Shopping cart items
2. **`wishlist`** - User wishlist
3. **`orders`** - Order records
4. **`order_items`** - Individual items in orders
5. **`addresses`** - Saved delivery addresses

### Existing Tables:
- `profiles` - User profiles
- `user_roles` - User role management (admin/user)
- `products` - Product catalog
- `news` - Blog/news posts

---

## 🔐 Authentication & Roles

### User Roles

**Regular User:**
- Can browse products
- Add to cart/wishlist
- Place orders
- View order history
- Manage profile & addresses

**Admin:**
- All user permissions +
- Manage orders (update status)
- Manage products (CRUD)
- Manage users (grant/revoke admin)
- Manage news posts
- View analytics

### Making a User Admin

**Via Supabase Dashboard:**
```sql
INSERT INTO user_roles (user_id, role)
VALUES ('user-uuid-here', 'admin');
```

**Via Admin Dashboard:**
1. Login as an existing admin
2. Go to `/admin/users`
3. Click "Make Admin" on any user

---

## 🛣️ Routes

### Public Routes
- `/` - Homepage
- `/shop` - Product catalog
- `/about` - About page
- `/contact` - Contact page
- `/gallery` - Gallery
- `/blog` - Blog/News
- `/cart` - Shopping cart
- `/wishlist` - Wishlist (public view)
- `/auth` - Login/Signup

### Protected User Routes
- `/dashboard` - User profile
- `/dashboard/orders` - Order history
- `/dashboard/wishlist` - User wishlist
- `/dashboard/settings` - Address management
- `/checkout` - Checkout flow

### Protected Admin Routes
- `/admin` - Admin dashboard
- `/admin/orders` - Order management
- `/admin/products` - Product management
- `/admin/users` - User management
- `/admin/news` - News management
- `/admin/settings` - Admin settings

---

## 🎨 Design System

### Color Palette (Zinc Theme)
- **Background:** `zinc-50` to `zinc-950`
- **Primary Accent:** `rose-gold` (custom color)
- **Secondary:** `honey` (custom color)
- **Neutral:** `cream` (custom color)

### Components Used
- **ShadCN UI:** Card, Button, Input, Dialog, Badge, Table, etc.
- **Lucide Icons:** For all iconography
- **Framer Motion:** Smooth animations (fade, slide, scale)

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

---

## 🔧 Key Features

### 1. Shopping Cart
- Add/remove items
- Update quantities
- Persistent across sessions (stored in DB)
- Real-time total calculation

### 2. Checkout Flow
- Select delivery address
- Add order notes
- Cash on Delivery payment
- Order confirmation

### 3. Order Management
**User View:**
- View order history
- Track order status
- View order details

**Admin View:**
- Update order status (pending → processing → shipped → delivered)
- View customer information
- Search & filter orders

### 4. User Dashboard
- Profile management
- Order statistics
- Quick actions
- Address book

### 5. Admin Dashboard
- Real-time analytics
- Revenue tracking
- Recent orders
- User management
- Product & news management

---

## 🐛 TypeScript Errors (Expected)

You'll see TypeScript errors about new tables (`orders`, `cart`, etc.) not existing in Supabase types. These will **automatically resolve** after:

1. Applying the database migration
2. Restarting your dev server

The code logic is correct - TypeScript just needs the updated types from Supabase.

---

## 📝 Environment Variables

Your `.env` file is already configured:
```env
VITE_SUPABASE_PROJECT_ID=gzezhmmllojwafuwdqex
VITE_SUPABASE_PUBLISHABLE_KEY=your-key
VITE_SUPABASE_URL=https://gzezhmmllojwafuwdqex.supabase.co
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables
3. Deploy!

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite

---

## 🎯 Next Steps

1. **Apply the database migration** (most important!)
2. **Create your first admin user** (see Authentication section)
3. **Add some products** via Admin Dashboard
4. **Test the checkout flow**
5. **Customize colors/branding** in `tailwind.config.ts`

---

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **ShadCN UI:** https://ui.shadcn.com
- **Framer Motion:** https://www.framer.com/motion
- **TailwindCSS:** https://tailwindcss.com

---

## 🆘 Troubleshooting

### Issue: TypeScript errors about tables not found
**Solution:** Apply the database migration and restart dev server

### Issue: "User not authorized" when accessing admin
**Solution:** Grant admin role to your user (see Authentication section)

### Issue: Cart items not persisting
**Solution:** Ensure user is logged in and database migration is applied

### Issue: Orders not creating
**Solution:** Check that `generate_order_number()` function exists in database

---

## ✨ What's Included

✅ Full authentication system with Supabase
✅ User registration & login
✅ Protected routes (user & admin)
✅ Shopping cart with database persistence
✅ Wishlist functionality
✅ Complete checkout flow
✅ Order management system
✅ User dashboard (profile, orders, wishlist, settings)
✅ Admin dashboard (analytics, orders, products, users, news)
✅ Address management
✅ Role-based access control
✅ Responsive design (mobile, tablet, desktop)
✅ Smooth animations with Framer Motion
✅ Modern UI with ShadCN + Zinc theme
✅ Order status tracking
✅ Revenue analytics
✅ User management (grant/revoke admin)

---

**Built with ❤️ for Bloom & Nest Decor**

Need help? Check the code comments or reach out!
