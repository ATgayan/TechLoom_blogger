
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Eye,
  BookOpen
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface LatestPostsProps {
  onNavigate: (page: string, postId?: string) => void;
  posts: Post[];
}

export function LatestPosts({ onNavigate, posts }: LatestPostsProps) {
  // Filter out the featured post and show latest 6 posts (or all available posts)
  const latestPosts = posts.slice(1, Math.min(posts.length, 7));
  
  if (latestPosts.length === 0) {
    return (
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-foreground">Latest Posts</h2>
            <p className="text-muted-foreground">No posts available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="border-primary text-primary">
              Latest Updates
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Recent Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights and trends in technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Card 
              key={post.id}
              className="group cursor-pointer overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
              onClick={() => onNavigate('post', post.id)}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary hover:text-primary hover:bg-primary/10 p-2 h-8 w-8"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => onNavigate('all-posts')}
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}