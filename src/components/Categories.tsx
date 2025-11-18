import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Shield, 
  Smartphone, 
  Code, 
  Rocket,
  TrendingUp
} from 'lucide-react';


interface CategoriesProps {
  onNavigate: (page: string, category?: string) => void;
}

export function Categories({ onNavigate }: CategoriesProps) {
  const categories = [
    {
      id: 'ai',
      name: 'AI',
      description: 'Artificial Intelligence, Machine Learning, and Neural Networks',
      icon: Brain,
      image: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTk1MTExNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      articleCount: 127,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      description: 'Digital Security, Privacy, and Data Protection',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1758983308742-f4ba1f8c8cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGlnaXRhbCUyMGxvY2t8ZW58MXx8fHwxNzU5NTczODQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      articleCount: 89,
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 'gadgets',
      name: 'Gadgets',
      description: 'Latest Devices, Reviews, and Tech Hardware',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1758784211688-ab9177d65bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnYWRnZXRzJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTk1NzM4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      articleCount: 156,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'programming',
      name: 'Programming',
      description: 'Software Development, Coding, and Tech Tutorials',
      icon: Code,
      image: 'https://images.unsplash.com/photo-1650600538903-ec09f670c391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBzY3JlZW58ZW58MXx8fHwxNzU5NTA2NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      articleCount: 203,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'startups',
      name: 'Startups',
      description: 'Entrepreneurship, Innovation, and Business Insights',
      icon: Rocket,
      image: 'https://images.unsplash.com/photo-1661286178389-e067299f907e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZW50cmVwcmVuZXVyJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU5NTczODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      articleCount: 94,
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="border-primary text-primary">
              Explore Topics
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Popular Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover cutting-edge insights across technology's most exciting domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
                onClick={() => onNavigate('category', category.id)}
              >
                <div className="relative h-32 overflow-hidden">
                  
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4">
                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {category.articleCount} articles
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}