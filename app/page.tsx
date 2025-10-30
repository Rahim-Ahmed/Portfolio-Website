import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import LiveProjects from "@/components/sections/LiveProjects";
import Research from "@/components/sections/Research";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <LiveProjects />
      <Research />
      <Contact />
    </>
  );
}
