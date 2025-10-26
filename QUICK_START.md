# 🚀 Quick Start Guide - Bloom & Nest Decor

## ⚡ Get Started in 3 Steps

### Step 1: Apply Database Migration ⚠️ IMPORTANT

**Using Supabase Dashboard (Easiest):**
1. Go to: https://supabase.com/dashboard/project/gzezhmmllojwafuwdqex/editor
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of: `supabase/migrations/20251024180000_ecommerce_tables.sql`
5. Paste into the editor
6. Click **Run** (bottom right)
7. Wait for "Success" message

### Step 2: Start Your Dev Server

```bash
npm run dev
```

Open: http://localhost:5173

### Step 3: Create Admin User

**First, sign up as a regular user:**
1. Go to http://localhost:5173/auth
2. Click "Sign Up" tab
3. Enter your details
4. Click "Sign Up"

**Then, make yourself admin:**
1. Go to Supabase Dashboard → SQL Editor
2. Run this query (replace with your email):

```sql
-- Get your user ID
SELECT id, email FROM auth.users WHERE email = 'your@email.com';

-- Make yourself admin (use the ID from above)
INSERT INTO user_roles (user_id, role)
VALUES ('your-user-id-here', 'admin');
```

3. Refresh your browser
4. Go to http://localhost:5173/admin

---

## 🎯 What You Can Do Now

### As a User:
- ✅ Browse products at `/shop`
- ✅ Add items to cart
- ✅ Add items to wishlist
- ✅ Checkout and place orders at `/checkout`
- ✅ View your dashboard at `/dashboard`
- ✅ Track orders at `/dashboard/orders`
- ✅ Manage addresses at `/dashboard/settings`

### As an Admin:
- ✅ View analytics at `/admin`
- ✅ Manage orders at `/admin/orders`
- ✅ Add/edit products at `/admin/products`
- ✅ Manage users at `/admin/users`
- ✅ Create news posts at `/admin/news`

---

## 📱 Key Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Homepage | Public |
| `/shop` | Product catalog | Public |
| `/cart` | Shopping cart | Public |
| `/auth` | Login/Signup | Public |
| `/checkout` | Checkout flow | User only |
| `/dashboard` | User profile | User only |
| `/dashboard/orders` | Order history | User only |
| `/admin` | Admin dashboard | Admin only |
| `/admin/orders` | Order management | Admin only |
| `/admin/users` | User management | Admin only |

---

## 🎨 Design Theme

Your site uses the **Zinc Gray** theme with:
- **Primary:** Rose Gold (`#E8B4A0`)
- **Secondary:** Honey (`#F4C430`)
- **Background:** Zinc shades (50-950)
- **Accent:** Cream & Blush

All components are from **ShadCN UI** with **TailwindCSS**.

---

## 🐛 Troubleshooting

### "Table does not exist" errors?
→ Apply the database migration (Step 1)

### Can't access `/admin`?
→ Make sure you granted yourself admin role (Step 3)

### TypeScript errors in IDE?
→ Normal! They'll disappear after migration + server restart

### Cart not saving?
→ Make sure you're logged in

---

## 📚 Full Documentation

- **Setup Guide:** See `SETUP.md`
- **Features List:** See `FEATURES.md`
- **Database Schema:** In migration file

---

## 🎉 You're All Set!

Your e-commerce platform is ready with:
- ✅ Full authentication
- ✅ Shopping cart & checkout
- ✅ Order management
- ✅ User dashboard
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Smooth animations

**Happy selling! 🛍️**
