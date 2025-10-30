"use client";

import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { config } from "@/config/site-config";
import { useEffect, useState } from "react";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = config.personal.name;
  const [showContent, setShowContent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setShowContent(true);
    }
  }, [currentIndex, fullText, isMounted]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="container min-h-screen flex items-center justify-center py-20 relative">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-6xl mx-auto w-full">
        {/* Text Content - Left Side */}
        <div className="text-center md:text-left space-y-8 flex-1">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="text-primary inline-block">
                {isMounted ? displayedText : config.personal.name}
                {isMounted && <span className="animate-pulse">|</span>}
              </span>
            </h1>
            
            <div
              className={`transition-all duration-700 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                {config.personal.title}
              </p>
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {config.personal.bio}
              </p>
            </div>
          </div>

          <div
            className={`flex flex-wrap items-center justify-center md:justify-start gap-4 transition-all duration-700 delay-500 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a href="#contact">
              <Button size="lg">Get in Touch</Button>
            </a>
            <a 
              href={config.personal.resume} 
              download="Ab_Rahim_Ahmed_Sowrov_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                Download CV
              </Button>
            </a>
            {config.personal.social.github && (
              <a
                href={`https://github.com/${config.personal.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Button variant="outline" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
            )}
            {config.personal.social.linkedin && (
              <a
                href={`https://linkedin.com/in/${config.personal.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Button variant="outline" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Profile Image - Right Side - Bigger Circle */}
        <div className="flex-shrink-0 animate-fade-in-up">
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden ring-4 ring-primary/20 shadow-2xl hover:ring-primary/40 transition-all duration-300 hover:scale-105">
            <Image
              src={config.personal.avatar}
              alt={config.personal.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        aria-label="Scroll to about section"
      >
        <span className="text-sm">Scroll to explore</span>
        <ArrowDown className="h-5 w-5" />
      </button>
    </section>
  );
}
