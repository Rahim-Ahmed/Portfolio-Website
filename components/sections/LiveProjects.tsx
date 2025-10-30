"use client";

import { ExternalLink, Sparkles, Zap, Dumbbell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const liveProjects = [
  {
    title: "Medical SOAP Summarizer",
    description: "AI-powered medical documentation tool that generates structured SOAP notes from patient conversations using advanced NLP.",
    url: "https://huggingface.co/spaces/RahimAhmed/Medical_SOAP_Summarizer",
    icon: Sparkles,
    tags: ["AI/ML", "Healthcare", "NLP"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Tic-Tac-Toe Game",
    description: "Interactive Tic-Tac-Toe game with real-time gameplay, built with alpha-beta pruning algorithm and modern web technologies.",
    url: "https://tic-tac-toe-95d1b.web.app/",
    icon: Zap,
    tags: ["Game", "Real-time", "Web"],
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "AI-Powered Workout App",
    description: "Smart fitness companion that creates personalized workout plans using artificial intelligence and tracks your progress.",
    url: "https://ai-powered-workout-app.onrender.com/",
    icon: Dumbbell,
    tags: ["AI", "Fitness", "Web App"],
    color: "from-green-500 to-emerald-500"
  }
];

export default function LiveProjects() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      id="live-projects" 
      className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Live Project Demos
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            Explore my deployed applications and interactive demonstrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {liveProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card 
                key={index}
                className={`group relative overflow-hidden bg-card/80 backdrop-blur border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`} />
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative pb-4">
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 relative">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-muted border border-border rounded-full text-xs font-medium hover:border-primary transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block mt-2"
                  >
                    <Button className="w-full">
                      Try Live Demo
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
