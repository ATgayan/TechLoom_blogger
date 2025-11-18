import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail,
  Send,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Categories', page: 'categories' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms of Service', page: 'terms' }
  ];

  const categories = [
    { label: 'Artificial Intelligence', page: 'category', id: 'ai' },
    { label: 'Cybersecurity', page: 'category', id: 'cybersecurity' },
    { label: 'Gadgets & Reviews', page: 'category', id: 'gadgets' },
    { label: 'Programming', page: 'category', id: 'programming' },
    { label: 'Startups & Innovation', page: 'category', id: 'startups' }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Stay Updated</h3>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest tech insights, trends, and exclusive content delivered directly to your inbox. 
              Join our community of tech enthusiasts and innovators.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background border-border"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <span className="text-primary-foreground font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-foreground">TechNova</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Exploring the future of innovation through cutting-edge technology insights, 
              expert analysis, and forward-thinking perspectives.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <IconComponent className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.label}>
                  <button
                    onClick={() => onNavigate(category.page)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Email:</strong><br />
                hello@technova.com
              </p>
              <p>
                <strong className="text-foreground">Editorial:</strong><br />
                editorial@technova.com
              </p>
              <p>
                <strong className="text-foreground">Partnerships:</strong><br />
                partnerships@technova.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TechNova. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button 
                onClick={() => onNavigate('privacy')}
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onNavigate('terms')}
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => onNavigate('cookies')}
                className="hover:text-primary transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}