import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Showcase } from "@/components/sections/Showcase";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { BackgroundPattern } from "@/components/layout/BackgroundPattern";
import { BackToTop } from "@/components/ui/BackToTop";
import { AmbientMusic } from "@/components/ui/AmbientMusic";

export default function Home() {
  return (
    <>
      <BackgroundPattern />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Showcase />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <AmbientMusic />
    </>
  );
}
