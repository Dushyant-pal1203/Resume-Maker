import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/home/section/HeroSection";
import TemplateGallery from "@/components/sections/home/section/TemplateGallery";
import FeatureMatrix from "@/components/sections/home/section/FeatureMatrix";
import ResumesDashboard from "@/components/sections/home/section/ResumesDashboard";
import CTASection from "@/components/sections/home/section/CTASection";
import InteractiveBackground from "@/components/sections/home/section/InteractiveBackground";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-950/30 to-blue-950 overflow-hidden">
      <InteractiveBackground mousePosition={mousePosition} />

      <main className="relative">
        <HeroSection />
        <TemplateGallery />
        <FeatureMatrix />
        <ResumesDashboard />
        <CTASection />
      </main>
    </div>
  );
}
