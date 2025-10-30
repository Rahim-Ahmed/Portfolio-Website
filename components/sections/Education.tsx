"use client";

import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/config/site-config";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

export default function Education() {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      id="education" 
      className="py-20 bg-muted/50"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <h2 
          className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Education
        </h2>
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50 hidden md:block" />
          
          <div className="space-y-8">
            {config.education.map((edu, index) => (
              <div 
                key={index}
                className={`relative transition-all duration-700 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline dot */}
                <div className="absolute left-[26px] top-6 w-5 h-5 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block z-10" />
                
                <Card className="ml-0 md:ml-20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-primary relative overflow-hidden group">
                  {/* Background image overlay on hover */}
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-50" : "opacity-0"
                    }`}
                    style={{
                      backgroundImage: edu.image ? `url(${edu.image})` : 'none',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />
                  
                  {/* Content with higher z-index to stay above background */}
                  <div className="relative z-10">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex gap-4 flex-1">
                          <div className="mt-1 md:hidden">
                            <GraduationCap className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                              {edu.degree}
                            </CardTitle>
                            <p className="text-muted-foreground font-semibold text-lg">
                              {edu.institution}
                            </p>
                          </div>
                        </div>
                        {edu.gpa && (
                          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="text-sm font-bold text-primary">
                              CGPA: {edu.gpa}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-medium">{edu.period}</span>
                          </div>
                        </div>
                        {edu.description && (
                          <p className="text-muted-foreground leading-relaxed mt-4 pl-2 border-l-2 border-primary/30">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
