import { Link, useLocation } from "wouter";
import {
  useResumes,
  useCreateResume,
  useDeleteResume,
  defaultResumeContent,
} from "@/hooks/use-resumes";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  Loader2,
  Sparkles,
  ChevronRight,
  Trash2,
  Zap,
  Award,
  TrendingUp,
  Eye,
  Clock,
  Star,
  Target,
  Rocket,
  Palette,
  Layers,
  Sparkle,
  ArrowRight,
  Gem,
  Crown,
  Briefcase,
  Users,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: resumes, isLoading } = useResumes();
  const createResumeMutation = useCreateResume();
  const deleteResumeMutation = useDeleteResume();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const templates = [
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

  const features = [
    {
      title: "AI-Powered Insights",
      description: "Real-time suggestions based on industry trends",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      delay: 0.1,
    },
    {
      title: "Smart Formatting",
      description: "Automatically adapts to different job applications",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-400",
      delay: 0.2,
    },
    {
      title: "ATS Optimization",
      description: "98% success rate with applicant tracking systems",
      icon: Target,
      color: "from-emerald-500 to-teal-400",
      delay: 0.3,
    },
    {
      title: "Live Preview",
      description: "See changes in real-time across all devices",
      icon: Eye,
      color: "from-orange-500 to-amber-400",
      delay: 0.4,
    },
  ];

  const handleCreate = (templateId: string = "nebula") => {
    createResumeMutation.mutate(
      {
        title: "Stellar Resume",
        content: defaultResumeContent,
        template: templateId,
      },
      {
        onSuccess: (newResume) => {
          toast({
            title: "🚀 Launch Sequence Initiated!",
            description: "Your stellar resume is ready for liftoff",
            className:
              "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
          });
          setTimeout(() => setLocation(`/builder/${newResume.id}`), 800);
        },
      }
    );
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "⚠️ Hold On!",
      description: "Are you sure you want to delete this masterpiece?",
      action: (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteResumeMutation.mutate(id, {
              onSuccess: () => {
                toast({
                  title: "🗑️ Artifact Deconstructed",
                  description: "Your resume has been quantum-erased",
                  className:
                    "bg-gradient-to-r from-slate-800 to-slate-900 text-white",
                });
              },
            });
          }}
        >
          Confirm Delete
        </Button>
      ),
    });
  };

  // Floating particles component
  const FloatingParticles = ({
    count,
    color,
  }: {
    count: number;
    color: string;
  }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${color} rounded-full`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: [
                null,
                `calc(${Math.random() * 100}% + ${Math.sin(i) * 20}px)`,
              ],
              y: [
                null,
                `calc(${Math.random() * 100}% + ${Math.cos(i) * 20}px)`,
              ],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-950/30 to-blue-950 overflow-hidden">
      {/* Interactive Background Canvas */}
      <div className="fixed inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0px, transparent 50%)`,
          }}
        />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #64748b 1px, transparent 1px),
              linear-gradient(to bottom, #64748b 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Hero Section - Cosmic */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center text-center sm:text-left gap-12">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" space-y-6 relative z-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                NEXT-GEN RESUME PLATFORM
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                RESUME
              </span>
              <span className="block text-5xl md:text-7xl text-slate-200 mt-2">
                REDEFINED
              </span>
            </h1>

            <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-light">
              Where data meets design. Craft resumes that don't just get
              seen—they get remembered.
              <span className="block text-slate-100 font-medium mt-2">
                Powered by quantum aesthetics & AI intelligence.
              </span>
            </p>
          </motion.div>

          {/* Interactive Stats Orb */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="relative mx-auto mt-16 w-64 h-64"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-500/30 backdrop-blur-sm border border-purple-500/50 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-400/20 backdrop-blur-sm border border-blue-500/30 animate-spin-slow [animation-direction:reverse]" />

            <div className="absolute inset-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  99.5%
                </div>
                <div className="text-sm text-slate-200 mt-2">
                  ATS SUCCESS RATE
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Template Gallery - Interactive 3D Effect */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                TEMPLATE
              </span>
              <span className="text-slate-200 ml-4">GALAXY</span>
            </h2>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto">
              Each template is a universe of possibilities. Hover to explore
              dimensions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">
            {templates.map((tpl, index) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                onMouseEnter={() => setActiveTemplate(tpl.id)}
                onMouseLeave={() => setActiveTemplate(null)}
                className="relative transform-style-3d transition-transform duration-500"
              >
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 bg-gradient-to-r ${tpl.gradient}`}
                />

                <Card className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/50 overflow-hidden group">
                  {/* Animated Header */}
                  <div
                    className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${tpl.gradient} animate-shimmer`}
                  />

                  <CardHeader className="pt-8 pb-0 px-8">
                    <div className="flex items-center justify-between mb-2">
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${tpl.gradient} shadow-2xl`}
                      >
                        <tpl.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <Badge className="bg-white backdrop-blur-sm border border-slate-700 text-slate-900">
                        {tpl.category}
                      </Badge>
                    </div>

                    <CardTitle className="text-3xl font-bold text-white mb-4">
                      {tpl.name}
                    </CardTitle>

                    <p className="text-slate-200 leading-relaxed">
                      {tpl.description}
                    </p>
                  </CardHeader>

                  {/* Interactive Particle Field */}
                  <CardContent className="relative h-30 px-8 py-6 overflow-hidden">
                    <FloatingParticles
                      count={tpl.particles}
                      color={`bg-gradient-to-r ${
                        tpl.gradient
                          .replace("from-", "")
                          .replace("via-", "")
                          .replace("to-", "")
                          .split(" ")[0]
                      }`}
                    />

                    {/* Animated Preview Elements */}
                    <div className="relative z-10 space-y-3">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className={`h-2 rounded-full bg-gradient-to-r ${
                            tpl.gradient
                          } opacity-${20 + i * 20}`}
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${60 + i * 10}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        />
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="px-8 pb-8">
                    <Button
                      onClick={() => handleCreate(tpl.id)}
                      disabled={createResumeMutation.isPending}
                      className={`w-full rounded-xl py-4 text-base font-semibold bg-gradient-to-r ${tpl.gradient} hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group`}
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {createResumeMutation.isPending ? (
                        <>
                          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                          INITIALIZING...
                        </>
                      ) : (
                        <>
                          LAUNCH THIS TEMPLATE
                          <Rocket className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Matrix - Grid Animation */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                QUANTUM
              </span>
              <span className="text-slate-100 ml-4">FEATURES</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm border border-slate-800/30 h-full group">
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-slate-200">{feature.description}</p>

                    {/* Animated Connector Line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-0 group-hover:h-8 transition-all duration-500">
                      <div
                        className={`w-full h-full bg-gradient-to-b ${feature.color} opacity-60`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resumes Dashboard - Holographic Display */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-5xl font-bold text-slate-200 mb-3">
                YOUR{" "}
                <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                  ARTIFACTS
                </span>
              </h2>
              <p className="text-slate-200">
                Each resume is a digital artifact in your career constellation
              </p>
            </div>

            <Button
              onClick={() => handleCreate()}
              className="rounded-xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 group"
            >
              <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform" />
              FORGE NEW ARTIFACT
            </Button>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 animate-pulse"
                />
              ))}
            </div>
          ) : resumes && resumes.length > 0 ? (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resumes.map((resume, index) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <Link href={`/builder/${resume.id}`}>
                      <div
                        className="cursor-pointer h-full"
                        onMouseEnter={() => setHoveredCard(resume.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <Card className="h-100 flex flex-col bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-sm border border-slate-800/50 overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
                          {/* Holographic Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 animate-shimmer" />
                          </div>

                          <CardHeader className="relative z-10 pt-8 pb-6 px-8">
                            <div className="flex items-center gap-2 text-sm text-slate-200 mb-2">
                              <Clock className="w-4 h-4" />
                              <motion.span
                                key={resume.createdAt?.toString() || "unknown"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                {resume.createdAt
                                  ? formatDistanceToNow(
                                      new Date(resume.createdAt),
                                      {
                                        addSuffix: true,
                                      }
                                    )
                                  : "Just now"}
                              </motion.span>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-500/30 flex items-center justify-center backdrop-blur-sm border border-purple-500/30"
                              >
                                <FileText className="w-6 h-6 text-purple-300" />
                              </motion.div>
                              <Badge
                                variant="secondary"
                                className="bg-slate-100/50 text-white backdrop-blur-sm"
                              >
                                {resume.template || "NEBULA"}
                              </Badge>
                            </div>

                            <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300 truncate">
                              {resume.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="relative z-10 flex-1 px-8 py-0">
                            {/* Animated Data Stream */}
                            <div className="relative h-32 rounded-xl border border-slate-800/50 bg-slate-950/50 p-4 overflow-hidden">
                              {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                  key={i}
                                  className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                                  style={{ top: `${i * 25}%` }}
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "100%" }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          </CardContent>

                          <CardFooter className="relative z-10 pt-6 pb-8 px-8 mt-auto">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center justify-between w-full gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 rounded-xl text-white hover:text-black hover:bg-slate-300 transition-colors"
                                  onClick={(e) => handleDelete(e, resume.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  className="rounded-xl px-4 py-2 text-white hover:text-black hover:bg-slate-300 font-medium group/edit"
                                >
                                  ACCESS ARTIFACT
                                  <ArrowRight className="ml-2 w-4 h-4 group-hover/edit:translate-x-1 transition-transform" />
                                </Button>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="relative mx-auto w-32 h-32 mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-500/30 animate-pulse" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-400/20" />
                <div className="absolute inset-8 flex items-center justify-center">
                  <Gem className="w-12 h-12 text-purple-300" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                VOID DETECTED
              </h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                Your constellation awaits its first star. Forge a resume
                artifact to begin.
              </p>
              <Button
                onClick={() => handleCreate()}
                className="rounded-xl px-8 py-6 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              >
                <Sparkle className="mr-3 h-5 w-5" />
                IGNITE FIRST STAR
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Final CTA - Wormhole Effect */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Wormhole Animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `
                conic-gradient(
                  from 0deg,
                  transparent,
                  rgba(147, 51, 234, 0.3),
                  rgba(236, 72, 153, 0.3),
                  rgba(59, 130, 246, 0.3),
                  transparent
                )
              `,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="block text-slate-100">READY TO</span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                TRANSCEND ORDINARY?
              </span>
            </h2>

            <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto">
              Join pioneers who've redefined career storytelling. Your next
              opportunity is a quantum leap away.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleCreate()}
                size="lg"
                className="rounded-2xl px-12 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group"
              >
                {/* Particle Burst on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{
                        x: "50%",
                        y: "50%",
                        scale: 0,
                      }}
                      animate={{
                        x: `calc(${Math.cos(i * 30) * 100}px + 50%)`,
                        y: `calc(${Math.sin(i * 30) * 100}px + 50%)`,
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
                <Rocket className="mr-4 h-6 w-6 group-hover:translate-y-[-2px] transition-transform" />
                INITIATE QUANTUM BUILD
                <ChevronRight className="ml-4 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>NO CREDIT CARD REQUIRED</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>FULLY ENCRYPTED</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span>QUANTUM-SECURE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
