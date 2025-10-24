import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/hooks/useAuth";

interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published: boolean;
  created_at: string;
}

const AdminNews = () => {
  const { user } = useAuth();
  const [news, setNews] = useState<NewsPost[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    published: false,
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNews(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPost) {
      const { error } = await supabase
        .from("news")
        .update(formData)
        .eq("id", editingPost.id);

      if (error) {
        toast.error("Failed to update post");
        return;
      }
      toast.success("Post updated successfully");
    } else {
      const { error } = await supabase
        .from("news")
        .insert({ ...formData, author_id: user?.id });

      if (error) {
        toast.error("Failed to create post");
        return;
      }
      toast.success("Post created successfully");
    }

    setDialogOpen(false);
    resetForm();
    loadNews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete post");
      return;
    }

    toast.success("Post deleted successfully");
    loadNews();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      published: false,
    });
    setEditingPost(null);
  };

  const openEditDialog = (post: NewsPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: "",
      excerpt: post.excerpt,
      category: post.category,
      published: post.published,
    });
    setDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-zinc-100">News Management</h1>
            <p className="text-zinc-400 mt-1">Manage your blog posts and announcements</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-zinc-100">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-zinc-300">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-zinc-300">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-zinc-300">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows={6}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-zinc-300">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked as boolean })
                    }
                  />
                  <Label htmlFor="published" className="text-zinc-300">Publish immediately</Label>
                </div>
                <Button type="submit" className="w-full">
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">All Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableHead className="text-zinc-400">Title</TableHead>
                  <TableHead className="text-zinc-400">Category</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map((post) => (
                  <TableRow key={post.id} className="border-zinc-800 hover:bg-zinc-800/50">
                    <TableCell className="text-zinc-100 font-medium">{post.title}</TableCell>
                    <TableCell className="text-zinc-400">{post.category}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          post.published
                            ? "bg-green-500/20 text-green-400"
                            : "bg-zinc-700 text-zinc-400"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(post)}
                        className="text-zinc-400 hover:text-zinc-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminNews;
