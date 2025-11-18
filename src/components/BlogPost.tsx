import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  Calendar, 
  Clock, 
  Eye,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  ArrowLeft,
  Tag
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

interface BlogPostProps {
  post: Post;
  onNavigate: (page: string) => void;
}

export function BlogPost({ post, onNavigate }: BlogPostProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState([
    {
      id: '1',
      author: 'Alex Thompson',
      avatar: '/api/placeholder/40/40',
      content: 'Fascinating insights! The section on neural networks was particularly enlightening. Thank you for breaking down such complex concepts.',
      date: '2025-01-15',
      likes: 12
    },
    {
      id: '2',
      author: 'Sophia Martinez',
      avatar: '/api/placeholder/40/40',
      content: 'Great article! I\'ve been following AI developments closely, and your perspective on the future implications is spot on.',
      date: '2025-01-15',
      likes: 8
    }
  ]);

  const authorInfo = {
    name: post.author || 'Anonymous',
    bio: 'Technology writer and researcher with expertise in emerging technologies and digital innovation.',
    avatar: '/api/placeholder/60/60',
    twitter: `@${(post.author || 'anonymous').toLowerCase().replace(' ', '')}`
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: 'You',
        avatar: '/api/placeholder/40/40',
        content: comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>

      <article className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-6">
              <Badge className="bg-primary text-primary-foreground mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                {post.title}
              </h1>
            </div>

            {/* Author Info & Meta */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={authorInfo.avatar} alt={authorInfo.name} />
                  <AvatarFallback>{authorInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{authorInfo.name}</div>
                  <div className="text-sm text-muted-foreground">{authorInfo.twitter}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative overflow-hidden rounded-xl mb-8">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </div>

            {/* Social Actions */}
            <div className="flex items-center justify-between border-b border-border pb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`hover:bg-red-50 hover:text-red-600 ${isLiked ? 'text-red-600' : 'text-muted-foreground'}`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  {Math.floor(Math.random() * 500) + 100 + (isLiked ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-accent">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {comments.length}
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-accent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`hover:bg-accent ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-12">
            <div className="text-foreground leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Author Bio */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={authorInfo.avatar} alt={authorInfo.name} />
                  <AvatarFallback>{authorInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">About {authorInfo.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {authorInfo.bio}
                  </p>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">
              Comments ({comments.length})
            </h3>

            {/* Add Comment */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAddComment}
                      disabled={!comment.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="font-semibold text-foreground">{comment.author}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-600">
                            <Heart className="mr-1 h-3 w-3" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}