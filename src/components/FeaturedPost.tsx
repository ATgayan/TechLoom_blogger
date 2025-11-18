
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ArrowRight, Calendar, User, Eye } from 'lucide-react';
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

interface FeaturedPostProps {
  onNavigate: (page: string, postId?: string) => void;
  posts: Post[];
}

export function FeaturedPost({ onNavigate, posts }: FeaturedPostProps) {
  const featuredPost = posts.find(post => post.status === 'published') || posts[0];
  
  if (!featuredPost) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-primary text-primary mb-4">
            Featured Article
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Editor's Pick
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most engaging story this week, handpicked by our editorial team
          </p>
        </div>

        <Card className="max-w-6xl mx-auto overflow-hidden bg-card border-border shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02]">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative overflow-hidden lg:h-96">
              <ImageWithFallback
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 lg:h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">
                  {featuredPost.category}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight hover:text-primary transition-colors cursor-pointer">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{featuredPost.views} views</span>
                  </div>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button 
                    onClick={() => onNavigate('post', featuredPost.id)}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-105"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}