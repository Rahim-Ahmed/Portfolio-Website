"use client";

import { Code2, Layers, Wrench, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { config } from "@/config/site-config";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      skills: config.skills.languages,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Frameworks & Libraries",
      icon: Layers,
      skills: config.skills.frameworks,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      skills: config.skills.tools,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            About Me
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <p className={`text-muted-foreground transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              Get to know more about my background and expertise
            </p>
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Bio Card */}
          <Card 
            className={`mb-12 bg-card/80 backdrop-blur border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {config.personal.bio}
              </p>
            </CardContent>
          </Card>
          
          {/* Skills Section */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Skills & Technologies
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {skillCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.title}
                    className={`group relative overflow-hidden bg-card/80 backdrop-blur border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${(categoryIndex + 3) * 100}ms` }}
                  >
                    {/* Gradient accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`} />
                    
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardContent className="p-6 relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {category.title}
                        </h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-full text-sm font-medium transition-all duration-300 cursor-default border border-primary/20 hover:border-primary hover:shadow-md transform hover:-translate-y-0.5"
                            style={{
                              animationDelay: `${skillIndex * 50}ms`
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
