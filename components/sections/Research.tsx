"use client";

import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, Quote, Loader2, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { config } from "@/config/site-config";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  citations: string;
  link: string;
}

interface ScholarStats {
  totalCitations: string;
  hIndex: string;
  i10Index: string;
}

export default function Research() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [stats, setStats] = useState<ScholarStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const scholarId = config.personal.social.googleScholar;
        if (!scholarId) {
          setError("Google Scholar ID not configured");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/scholar?scholarId=${scholarId}`);
        if (!response.ok) {
          // Use manual fallback data if API fails
          if (config.publications && config.publications.length > 0) {
            setPublications(config.publications);
            if (config.citationStats && Object.keys(config.citationStats).length > 0) {
              setStats(config.citationStats as ScholarStats);
            }
            setLoading(false);
            return;
          }
          
          const errorData = await response.json();
          throw new Error(errorData.note || "Failed to fetch publications");
        }

        const data = await response.json();
        setPublications(data.publications.slice(0, 5)); // Show top 5 publications
        setStats(data.stats);
      } catch (err) {
        // Try manual fallback data on error
        if (config.publications && config.publications.length > 0) {
          setPublications(config.publications);
          if (config.citationStats && Object.keys(config.citationStats).length > 0) {
            setStats(config.citationStats as ScholarStats);
          }
        } else {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  return (
    <section 
      id="research" 
      className="py-20 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/80 via-background to-muted/50" />
      
      {/* Animated orbs */}
      <div className="absolute top-32 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      
      <div className="container relative z-10">
        <h2 
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Research & Publications
        </h2>
        <p className={`text-center text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          Exploring innovations in medical imaging and computer vision
        </p>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur border-2 border-yellow-500/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 bg-yellow-500/10 rounded-full">
                    <FileText className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Unable to Load Publications</h3>
                  <p className="text-muted-foreground mb-3">{error}</p>
                  <div className="text-sm text-muted-foreground space-y-2 bg-muted/50 p-4 rounded-lg text-left">
                    <p className="font-semibold">Quick Fix Options:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Add publications manually in <code className="bg-background px-1.5 py-0.5 rounded">config/site-config.ts</code></li>
                      <li>Use a proxy service for Google Scholar</li>
                      <li>Wait and try again (rate limiting may be temporary)</li>
                    </ol>
                  </div>
                </div>
                {config.personal.social.googleScholar && (
                  <a
                    href={`https://scholar.google.com/citations?user=${config.personal.social.googleScholar}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      className="mt-4"
                    >
                      View on Google Scholar Directly
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && !error && (
          <>
            {stats && (
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card/80 backdrop-blur border-2 hover:border-primary/50">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600" />
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Total Citations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">{stats.totalCitations}</p>
                  </CardContent>
                </Card>
                <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card/80 backdrop-blur border-2 hover:border-primary/50">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/70" />
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      h-index
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-primary">{stats.hIndex}</p>
                  </CardContent>
                </Card>
                <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card/80 backdrop-blur border-2 hover:border-primary/50">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600" />
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      i10-index
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">{stats.i10Index}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {publications.length > 0 && (
              <div className="max-w-4xl mx-auto space-y-6">
                {publications.map((pub, index) => (
                  <Card 
                    key={index}
                    className={`group relative overflow-hidden bg-card/80 backdrop-blur border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
                    
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardHeader className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                            </div>
                            <CardTitle className="text-xl flex-1 group-hover:text-primary transition-colors leading-tight">
                              {pub.title}
                            </CardTitle>
                          </div>
                          <p className="text-sm text-muted-foreground ml-14 leading-relaxed">
                            {pub.authors}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 text-sm bg-muted/80 px-3 py-1.5 rounded-md">
                            <Quote className="h-4 w-4 text-primary" />
                            <span className="font-medium">{pub.citations} citations</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm bg-muted/80 px-3 py-1.5 rounded-md">
                            <span className="font-medium">{pub.year}</span>
                          </div>
                          {pub.venue && (
                            <div className="text-sm italic text-muted-foreground bg-muted/80 px-3 py-1.5 rounded-md">
                              {pub.venue}
                            </div>
                          )}
                        </div>
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm:ml-auto"
                        >
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap w-full sm:w-auto"
                          >
                            View Publication
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {publications.length > 0 && config.personal.social.googleScholar && (
              <div className="text-center mt-12">
                <a
                  href={`https://scholar.google.com/citations?user=${config.personal.social.googleScholar}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    View All Publications on Google Scholar
                  </Button>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
