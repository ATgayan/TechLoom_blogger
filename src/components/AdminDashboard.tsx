import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { PostForm } from './PostForm';
import { 
  User, 
  Lock, 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Users,
  FileText,
  TrendingUp
} from 'lucide-react';


interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  views: string;
  category: string;
  status: 'published' | 'draft';
  tags: string[];
}

interface AdminDashboardProps {
  onNavigate: (page: string, data?: string) => void;
  posts: Post[];
  onCreatePost: (postData: Omit<Post, 'id' | 'views'>) => void;
  onUpdatePost: (postId: string, postData: Partial<Post>) => void;
  onDeletePost: (postId: string) => void;
}

export function AdminDashboard({ 
  onNavigate, 
  posts, 
  onCreatePost, 
  onUpdatePost, 
  onDeletePost 
}: AdminDashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({
    email: '',
    password: ''
  });
  const [showPostForm, setShowPostForm] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState<Post | null>(null);
  const [deletePostId, setDeletePostId] = React.useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in a real app, this would authenticate with a backend
    if (loginForm.email === 'admin@technova.com' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use admin@technova.com / admin123');
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowPostForm(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handlePostSave = (postData: Omit<Post, 'id' | 'views'>) => {
    if (editingPost) {
      onUpdatePost(editingPost.id, postData);
    } else {
      onCreatePost(postData);
    }
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handlePostCancel = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleDeleteConfirm = () => {
    if (deletePostId) {
      onDeletePost(deletePostId);
      setDeletePostId(null);
    }
  };

  const handleViewPost = (postId: string) => {
    onNavigate('post', postId);
  };

  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');
  const totalViews = posts.reduce((sum, post) => {
    const views = parseFloat(post.views.replace('K', '')) * 1000;
    return sum + views;
  }, 0);

  const stats = [
    {
      label: 'Total Posts',
      value: posts.length.toString(),
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      label: 'Published',
      value: publishedPosts.length.toString(),
      change: '+18%',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      label: 'Drafts',
      value: draftPosts.length.toString(),
      change: '+8%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      label: 'Total Views',
      value: `${(totalViews / 1000).toFixed(1)}K`,
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          {/* Back Button */}
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <Card className="bg-card border-border shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Admin Login</CardTitle>
                <p className="text-muted-foreground">Access the TechNova dashboard</p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="pl-10 bg-input border-border"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="pl-10 bg-input border-border"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign In
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  Demo credentials:<br />
                  Email: admin@technova.com<br />
                  Password: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show post form if creating or editing
  if (showPostForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={handlePostCancel}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
                <div className="h-6 w-px bg-border" />
                <h1 className="text-xl font-bold text-foreground">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h1>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        <PostForm
          post={editingPost || undefined}
          onSave={handlePostSave}
          onCancel={handlePostCancel}
          isEditing={!!editingPost}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('home')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Posts Management */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Posts Management</h2>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleCreatePost}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="bg-muted/50">
                        <th className="text-left p-4 font-medium text-foreground">Title</th>
                        <th className="text-left p-4 font-medium text-foreground">Author</th>
                        <th className="text-left p-4 font-medium text-foreground">Status</th>
                        <th className="text-left p-4 font-medium text-foreground">Views</th>
                        <th className="text-left p-4 font-medium text-foreground">Date</th>
                        <th className="text-left p-4 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id} className="border-b border-border hover:bg-muted/30">
                          <td className="p-4">
                            <div className="font-medium text-foreground line-clamp-2">
                              {post.title}
                            </div>
                            <div className="text-sm text-muted-foreground">{post.category}</div>
                          </td>
                          <td className="p-4 text-muted-foreground">{post.author}</td>
                          <td className="p-4">
                            <Badge 
                              variant={post.status === 'published' ? 'default' : 'secondary'}
                              className={post.status === 'published' ? 'bg-green-600' : ''}
                            >
                              {post.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-muted-foreground">{post.views}</td>
                          <td className="p-4 text-muted-foreground">{post.date}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewPost(post.id)}
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditPost(post)}
                                className="hover:bg-blue-50 hover:text-blue-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setDeletePostId(post.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Analytics Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Traffic Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Traffic data visualization would go here
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Popular Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post, index) => (
                      <div key={post.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="font-bold text-primary">{index + 1}</div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground text-sm">{post.title}</div>
                          <div className="text-xs text-muted-foreground">{post.views} views</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">User Management</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">User Management</h3>
                  <p className="text-muted-foreground">User management features would be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Site Settings</h3>
                  <p className="text-muted-foreground">Configuration options would be available here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Post</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this post? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteConfirm}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}