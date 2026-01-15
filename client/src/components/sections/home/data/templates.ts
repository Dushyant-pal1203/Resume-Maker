import { Sparkle, Layers, Palette } from "lucide-react";

export const templates = [
  {
    id: "nebula",
    name: "Cosmic Nebula",
    description: "Dynamic gradients & cosmic animations for tech innovators",
    icon: Sparkle,
    gradient: "from-purple-600 via-pink-500 to-orange-400",
    accent: "bg-gradient-to-r from-purple-500 to-pink-500",
    particles: 8,
    category: "Tech & Innovation",
  },
  {
    id: "quantum",
    name: "Quantum Matrix",
    description: "Geometric patterns & data-inspired design for analysts",
    icon: Layers,
    gradient: "from-blue-600 via-cyan-400 to-emerald-500",
    accent: "bg-gradient-to-r from-cyan-400 to-blue-500",
    particles: 12,
    category: "Data & Analytics",
  },
  {
    id: "aurora",
    name: "Northern Aurora",
    description: "Fluid animations & ethereal colors for creative leaders",
    icon: Palette,
    gradient: "from-teal-500 via-green-400 to-emerald-600",
    accent: "bg-gradient-to-r from-teal-400 to-emerald-500",
    particles: 6,
    category: "Creative & Design",
  },
];
