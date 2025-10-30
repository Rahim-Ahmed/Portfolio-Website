"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Github, Star, GitFork, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { config } from "@/config/site-config";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const username = config.personal.social.github;
        if (!username) {
          setError("GitHub username not configured");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/github?username=${username}`);
        const data = await response.json();
        
        // Handle API errors gracefully
        if (data.error) {
          console.warn("GitHub API warning:", data.details);
          // If there's an error but repos array exists (from timeout handling), use it
          if (data.repos) {
            setRepos(data.repos);
          } else {
            setError(data.details || data.error);
          }
          setLoading(false);
          return;
        }
        
        setRepos(data.slice(0, 6)); // Show top 6 projects
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error - please check your connection");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <section 
      id="projects" 
      className="py-20 relative overflow-hidden bg-muted/30"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container relative z-10">
        <h2 
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Featured Projects
        </h2>
        <p className={`text-center text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          Explore my latest work and open-source contributions
        </p>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                Unable to load GitHub projects
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                {error}
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-3">
                This is usually a temporary network issue. Visit my{" "}
                <a 
                  href={`https://github.com/${config.personal.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-yellow-800 dark:hover:text-yellow-200"
                >
                  GitHub profile
                </a>
                {" "}to view my projects directly.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <p>No projects found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {repos.map((repo, index) => (
            <Card 
              key={repo.id} 
              className={`group flex flex-col relative overflow-hidden bg-card/80 backdrop-blur border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
              
              <CardHeader className="relative">
                <CardTitle className="flex items-start justify-between gap-2 group-hover:text-primary transition-colors">
                  <span className="line-clamp-1 text-xl">{repo.name}</span>
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Github className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm leading-relaxed mt-2">
                  {repo.description || "No description available"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow relative">
                {/* Language & Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics.slice(0, 2).map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-muted border border-border rounded-full text-xs font-medium hover:border-primary transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">{repo.forks_count}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2 pt-4 border-t relative">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="default" size="sm" className="w-full">
                    View Code
                  </Button>
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {!loading && !error && repos.length > 0 && config.personal.social.github && (
          <div className="text-center mt-12">
            <a
              href={`https://github.com/${config.personal.social.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="lg"
                className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                View All Projects on GitHub
              </Button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
