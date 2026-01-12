import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useReactToPrint } from "react-to-print";
import {
  useResume,
  useUpdateResume,
  useAtsCheck,
  defaultResumeContent,
} from "@/hooks/use-resumes";
import { ResumeContent, AtsCheckResponse } from "@shared/schema";
import { ResumeEditor } from "@/components/ResumeEditor";
import { ResumePreview } from "@/components/ResumePreview";
import { AtsScoreDialog } from "@/components/AtsScoreDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Download,
  Sparkles,
  ArrowLeft,
  Save,
  Check,
  Palette,
  Menu,
  X,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Edit,
  Rocket,
  Globe,
  Cpu,
  Zap,
  Brain,
  Layers,
  Stars,
  Orbit,
  Satellite,
  Scan,
  Atom,
  Grid3x3,
  Binary,
  CircuitBoard,
  Cloud,
  Sparkle,
  ArrowRight,
  ChevronRight,
  Shield,
  Lock,
  Target,
  ScanEye,
  BarChart3,
  Network,
  Code2,
  Minus,
  User,
} from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Viewport size options for preview
type ViewportSize = "mobile" | "tablet" | "desktop";

export default function Builder() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  // Data State
  const { data: resume, isLoading } = useResume(Number(id));
  const updateResumeMutation = useUpdateResume();
  const atsCheckMutation = useAtsCheck();

  // Local state for editing - CRITICAL: Initialize with default content
  const [content, setContent] = useState<ResumeContent>(defaultResumeContent);
  const [title, setTitle] = useState("Stellar Resume");
  const [selectedTemplate, setSelectedTemplate] = useState("quantum");
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");

  // Track last saved state
  const [lastSavedContent, setLastSavedContent] =
    useState<ResumeContent | null>(null);
  const [lastSavedTitle, setLastSavedTitle] = useState<string | null>(null);
  const [lastSavedTemplate, setLastSavedTemplate] = useState<string | null>(
    null
  );
  const [manualSaveSuccess, setManualSaveSuccess] = useState(false);

  // Responsive UI state
  const [mobileView, setMobileView] = useState<"editor" | "preview">("preview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Dialog State
  const [isAtsOpen, setIsAtsOpen] = useState(false);
  const [atsResult, setAtsResult] = useState<AtsCheckResponse | null>(null);

  // Mouse tracking for background effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Sync server data to local state on load
  useEffect(() => {
    if (resume) {
      console.log("Loading resume data:", resume);
      setContent(resume.content);
      setTitle(resume.title);
      setSelectedTemplate(resume.template || "quantum");
      setLastSavedContent(resume.content);
      setLastSavedTitle(resume.title);
      setLastSavedTemplate(resume.template || "quantum");
    } else {
      console.log("No resume found, using default content");
      setContent(defaultResumeContent);
    }
  }, [resume]);

  // Close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle content changes from editor - CRITICAL FUNCTION
  const handleContentChange = (newContent: ResumeContent) => {
    console.log("Content changed in editor:", newContent);
    setContent(newContent);
  };

  // Debounced Auto-save
  const debouncedContent = useDebounce(content, 1000);
  const debouncedTitle = useDebounce(title, 1000);
  const debouncedTemplate = useDebounce(selectedTemplate, 1000);

  useEffect(() => {
    if (!resume || !lastSavedContent || !lastSavedTitle || !lastSavedTemplate)
      return;

    // Only save if changed
    if (
      JSON.stringify(debouncedContent) !== JSON.stringify(lastSavedContent) ||
      debouncedTitle !== lastSavedTitle ||
      debouncedTemplate !== lastSavedTemplate
    ) {
      console.log("Auto-saving changes...");
      updateResumeMutation.mutate(
        {
          id: resume.id,
          content: debouncedContent,
          title: debouncedTitle,
          template: debouncedTemplate,
        },
        {
          onSuccess: () => {
            setLastSavedContent(debouncedContent);
            setLastSavedTitle(debouncedTitle);
            setLastSavedTemplate(debouncedTemplate);
            console.log("Auto-save successful");
          },
          onError: (error) => {
            toast({
              title: "Quantum Sync Failed",
              description: "Please check your connection.",
              variant: "destructive",
              className:
                "bg-gradient-to-r from-red-600/90 to-rose-600/90 text-white",
            });
          },
        }
      );
    }
  }, [debouncedContent, debouncedTitle, debouncedTemplate]);

  // Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    if (!lastSavedContent || !lastSavedTitle || !lastSavedTemplate)
      return false;

    return (
      JSON.stringify(content) !== JSON.stringify(lastSavedContent) ||
      title !== lastSavedTitle ||
      selectedTemplate !== lastSavedTemplate
    );
  };

  // Manual save handler
  const handleManualSave = () => {
    if (!resume) return;

    updateResumeMutation.mutate(
      { id: resume.id, content, title, template: selectedTemplate },
      {
        onSuccess: () => {
          setLastSavedContent(content);
          setLastSavedTitle(title);
          setLastSavedTemplate(selectedTemplate);
          setManualSaveSuccess(true);

          toast({
            title: "🚀 Quantum Sync Complete",
            description: "Your resume has been saved across all dimensions.",
            className:
              "bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white",
          });

          // Reset success indicator after 2 seconds
          setTimeout(() => {
            setManualSaveSuccess(false);
          }, 2000);
        },
        onError: (error) => {
          toast({
            title: "Temporal Anomaly Detected",
            description:
              error.message || "Failed to save resume. Please try again.",
            variant: "destructive",
            className:
              "bg-gradient-to-r from-red-600/90 to-rose-600/90 text-white",
          });
        },
      }
    );
  };

  // PDF Print Ref
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: title || "Quantum Resume",
    onBeforePrint: () => {
      toast({
        title: "🛸 Initiating Quantum Print",
        description: "Your resume is being materialized...",
        className:
          "bg-gradient-to-r from-cyan-600/90 to-blue-600/90 text-white",
      });

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "/print.css";
      link.media = "print";
      document.head.appendChild(link);

      return Promise.resolve();
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
  });

  // Template options
  const templateOptions = [
    {
      value: "modern",
      label: "Modern",
      icon: User,
      color: "from-purple-600 to-pink-500",
    },
    {
      value: "creative",
      label: "Creative",
      icon: Palette,
      color: "from-blue-600 to-cyan-500",
    },
    {
      value: "minimal",
      label: "Minimal",
      icon: Minus,
      color: "from-gray-600 to-gray-500",
    },
    {
      value: "quantum",
      label: "Quantum Matrix",
      icon: Grid3x3,
      color: "from-indigo-600 to-purple-500",
    },
    {
      value: "nebula",
      label: "Cosmic Nebula",
      icon: Stars,
      color: "from-violet-600 to-pink-500",
    },
    {
      value: "circuit",
      label: "Neural Circuit",
      icon: CircuitBoard,
      color: "from-green-600 to-emerald-500",
    },
    {
      value: "data",
      label: "Data Stream",
      icon: Binary,
      color: "from-amber-600 to-orange-500",
    },
    {
      value: "orbit",
      label: "Orbital",
      icon: Orbit,
      color: "from-sky-600 to-blue-500",
    },
  ];

  // Viewport size options
  const viewportOptions: {
    value: ViewportSize;
    icon: React.ReactNode;
    label: string;
  }[] = [
    {
      value: "mobile",
      icon: <Smartphone className="w-4 h-4" />,
      label: "Quantum Field",
    },
    {
      value: "tablet",
      icon: <Tablet className="w-4 h-4" />,
      label: "Event Horizon",
    },
    {
      value: "desktop",
      icon: <Monitor className="w-4 h-4" />,
      label: "Singularity",
    },
  ];

  // Handlers
  const handleAtsCheck = () => {
    setIsAnalyzing(true);
    setIsAtsOpen(true);
    atsCheckMutation.mutate(
      { resumeData: content },
      {
        onSuccess: (data) => {
          setAtsResult(data);
          setIsAnalyzing(false);
          toast({
            title: "🧠 Neural Analysis Complete",
            description: "Quantum insights generated",
            className:
              "bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white",
          });
        },
        onError: (error) => {
          setIsAnalyzing(false);
          toast({
            title: "Analysis Failed",
            description: error.message,
            variant: "destructive",
            className:
              "bg-gradient-to-r from-red-600/90 to-rose-600/90 text-white",
          });
          setIsAtsOpen(false);
        },
      }
    );
  };

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    toast({
      title: "🌀 Reality Shift",
      description: "Template matrix reconfigured",
      className:
        "bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-950/30 to-blue-950 gap-6 p-4">
        {/* Animated Quantum Loader */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-purple-500/30 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border-4 border-pink-500/30 animate-spin-slow [animation-direction:reverse]" />
          <div className="absolute inset-8 rounded-full border-4 border-cyan-500/30 animate-pulse" />
          <Atom className="absolute inset-0 m-auto w-12 h-12 text-purple-300 animate-pulse" />
        </div>

        <div className="text-center space-y-2">
          <p className="text-xl font-bold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
            INITIALIZING QUANTUM EDITOR
          </p>
          <p className="text-slate-400 text-sm">
            Accessing multidimensional resume data...
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
              }}
              animate={{
                x: [
                  null,
                  `calc(${Math.random() * 100}% + ${Math.sin(i) * 50}px)`,
                ],
                y: [
                  null,
                  `calc(${Math.random() * 100}% + ${Math.cos(i) * 50}px)`,
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
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gradient-to-br from-slate-900 via-gray-950/30 to-blue-950">
        <div className="relative">
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-2xl" />
          <Satellite className="absolute inset-0 m-auto w-24 h-24 text-purple-300 animate-spin-slow" />
        </div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent text-center">
          TEMPORAL ANOMALY DETECTED
        </h2>
        <p className="text-slate-300 text-center max-w-md">
          The resume you're seeking has phased into another dimension or doesn't
          exist in this timeline.
        </p>

        <Link href="/">
          <Button
            size="lg"
            className="mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 group"
          >
            <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            RETURN TO DASHBOARD
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-950/30 to-blue-950 overflow-hidden">
      {/* Interactive Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0px, transparent 50%)`,
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(120, 119, 198, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(120, 119, 198, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-400/10 rounded-full blur-3xl"
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

      {/* Top Bar - Quantum Interface */}
      <header className="h-16 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 z-50 shadow-lg shadow-black/20 shrink-0">
        {/* Left section */}
        <div className="flex items-center gap-2 md:gap-4 flex-1">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>

          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-slate-400 hover:text-white hover:bg-slate-800/50 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Separator
            orientation="vertical"
            className="h-6 hidden md:flex bg-slate-700"
          />

          {/* Title input - cosmic */}
          <div className="flex-1 md:flex-none">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full md:w-auto min-w-[120px] max-w-[280px] border-slate-700/50 hover:border-purple-500/50 focus:border-purple-500 font-semibold text-base md:text-lg bg-slate-800/50 text-white placeholder:text-slate-400 px-3 h-9 rounded-lg backdrop-blur-sm"
              placeholder="Enter artifact name..."
            />
          </div>

          {/* Mobile view toggle buttons */}
          <div className="flex md:hidden items-center gap-1 bg-slate-800/50 rounded-lg p-1 backdrop-blur-sm">
            <button
              onClick={() => setMobileView("editor")}
              className={`p-2 rounded-md transition-all flex items-center gap-1 ${
                mobileView === "editor"
                  ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={`p-2 rounded-md transition-all flex items-center gap-1 ${
                mobileView === "preview"
                  ? "bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-cyan-300 shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Template selector - cosmic */}
          <div className="hidden md:flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20">
              <Palette className="w-4 h-4 text-purple-300" />
            </div>
            <Select
              value={selectedTemplate}
              onValueChange={handleTemplateChange}
            >
              <SelectTrigger className="w-48 border-slate-700 bg-slate-800/50 text-white backdrop-blur-sm hover:border-purple-500/50">
                <SelectValue placeholder="Select reality template" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 backdrop-blur-xl">
                {templateOptions.map((template) => {
                  const Icon = template.icon;
                  return (
                    <SelectItem
                      key={template.value}
                      value={template.value}
                      className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {template.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right section - cosmic actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Save button and indicators */}
          <div className="flex items-center gap-3">
            {hasUnsavedChanges() && !manualSaveSuccess && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full"
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-medium text-amber-300">
                  UNSAVED CHANGES
                </span>
              </motion.div>
            )}

            <Button
              onClick={handleManualSave}
              disabled={!hasUnsavedChanges() || updateResumeMutation.isPending}
              size="sm"
              className={cn(
                "rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg shadow-purple-500/25",
                manualSaveSuccess &&
                  "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-emerald-500/25"
              )}
            >
              {manualSaveSuccess ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  QUANTUM SYNCED
                </>
              ) : updateResumeMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  SYNCING...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  SAVE ARTIFACT
                </>
              )}
            </Button>

            {updateResumeMutation.isPending && !manualSaveSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-400 hidden lg:flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span>AUTO-SYNCING...</span>
              </motion.div>
            )}
          </div>

          <Button
            onClick={handleAtsCheck}
            disabled={atsCheckMutation.isPending}
            className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/25"
            size="sm"
          >
            <Brain className="w-4 h-4 mr-2" />
            NEURAL ANALYSIS
          </Button>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="rounded-lg border-slate-700/50 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 backdrop-blur-sm"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            MATERIALIZE
          </Button>
        </div>

        {/* Mobile save button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            onClick={handleManualSave}
            disabled={!hasUnsavedChanges() || updateResumeMutation.isPending}
            size="sm"
            className={cn(
              "rounded-lg bg-gradient-to-r from-purple-600 to-pink-500",
              manualSaveSuccess &&
                "bg-gradient-to-r from-emerald-600 to-teal-500"
            )}
          >
            {manualSaveSuccess ? (
              <Check className="w-4 h-4" />
            ) : updateResumeMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Cosmic */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-16 left-0 bottom-0 w-72 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl border-r border-slate-800/50 shadow-2xl shadow-black/50 z-40 md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 space-y-6">
                {/* Template Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    REALITY TEMPLATE
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {templateOptions.map((template) => {
                      const Icon = template.icon;
                      return (
                        <button
                          key={template.value}
                          onClick={() => {
                            handleTemplateChange(template.value);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`p-3 rounded-lg border transition-all ${
                            selectedTemplate === template.value
                              ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-500/50 text-white"
                              : "border-slate-700/50 text-slate-400 hover:text-white hover:border-purple-500/30"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Icon className="w-5 h-5" />
                            <span className="text-xs">{template.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Separator className="bg-slate-800/50" />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      handleAtsCheck();
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={atsCheckMutation.isPending}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 text-white"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    NEURAL ANALYSIS
                  </Button>

                  <Button
                    onClick={() => {
                      handlePrint();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-slate-700/50 bg-slate-800/50 text-slate-300 hover:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    MATERIALIZE PDF
                  </Button>

                  <Link href="/">
                    <Button
                      variant="ghost"
                      className="w-full text-slate-400 hover:text-white hover:bg-slate-800/50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      RETURN TO ORBIT
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="pt-6 border-t border-slate-800/50">
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex justify-between">
                      <span>QUANTUM INTEGRITY</span>
                      <span className="text-emerald-400">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TEMPORAL STABILITY</span>
                      <span className="text-cyan-400">99.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Panel - Mobile (full screen toggle) */}
        <div
          className={`md:hidden ${
            mobileView === "editor" ? "flex" : "hidden"
          } flex-col h-full`}
        >
          <div className="h-full flex flex-col bg-slate-900/80 backdrop-blur-sm">
            {/* Editor Header */}
            <div className="h-12 border-b border-slate-800/50 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <h2 className="font-semibold text-white">QUANTUM EDITOR</h2>
                </div>
                {hasUnsavedChanges() && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs text-amber-300 font-medium px-2 py-1 bg-amber-500/10 rounded-full border border-amber-500/30"
                  >
                    UNSYNCED
                  </motion.span>
                )}
              </div>
              <button
                onClick={() => setMobileView("preview")}
                className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto p-4">
                {/* CRITICAL: Pass content and handleContentChange */}
                <ResumeEditor data={content} onChange={handleContentChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel - Mobile (full screen toggle) */}
        <div
          className={`md:hidden ${
            mobileView === "preview" ? "flex" : "hidden"
          } flex-col h-full`}
        >
          <div className="h-full flex flex-col bg-gradient-to-br from-slate-900/80 via-gray-950/30 to-blue-950/80 backdrop-blur-sm">
            {/* Preview Header */}
            <div className="h-12 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-sm px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <h2 className="font-semibold text-white">REALITY PREVIEW</h2>
                </div>
              </div>
              <button
                onClick={() => setMobileView("editor")}
                className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-4">
              <div className="p-4 flex items-start justify-center">
                <div className="relative">
                  {/* Preview glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 blur-xl rounded-2xl" />
                  {/* CRITICAL: Pass current content to preview */}
                  <ResumePreview
                    ref={printRef}
                    data={content}
                    template={selectedTemplate}
                    className="shadow-2xl shadow-purple-500/10 rounded-xl overflow-hidden bg-white relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        {/* Editor Panel */}
        <div className="hidden md:flex md:w-full md:max-w-md lg:max-w-lg xl:max-w-xl bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50 flex-col">
          {/* Editor Header */}
          <div className="h-12 border-b border-slate-800/50 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20">
                <Cpu className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h2 className="font-semibold text-white">QUANTUM EDITOR</h2>
                <p className="text-xs text-slate-400">
                  Manipulate your reality matrix
                </p>
              </div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-400">SYNCED</span>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-6">
              {/* CRITICAL: Pass content and handleContentChange */}
              <ResumeEditor data={content} onChange={handleContentChange} />
            </div>
          </div>
        </div>

        {/* Preview Panel - Desktop */}
        <div className="hidden md:flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-slate-900/50 via-gray-950/20 to-blue-950/50 backdrop-blur-sm">
          {/* Preview Header */}
          <div className="h-16 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-sm px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center justify-between gap-6 w-full mt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20">
                  <Globe className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">REALITY PREVIEW</h2>
                  <p className="text-xs text-slate-400">
                    Live preview of your resume - Updates Instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 rounded-full">
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                    templateOptions.find((t) => t.value === selectedTemplate)
                      ?.color
                  }`}
                />
                <span className="text-sm text-slate-100">
                  {
                    templateOptions.find((t) => t.value === selectedTemplate)
                      ?.label
                  }{" "}
                  Template
                </span>
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto p-6 lg:p-8">
            <div className="h-auto flex items-center justify-center">
              <motion.div
                className={`transition-all duration-500 w-full max-w-4xl scale-100`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Preview Container with Glow */}
                <div className="relative">
                  {/* Animated Orbital Rings */}
                  <motion.div
                    className="absolute -inset-6 rounded-2xl border-2 border-purple-500/20"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute -inset-8 rounded-2xl border-2 border-cyan-500/20"
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 80,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 blur-2xl rounded-2xl" />

                  {/* CRITICAL: Pass current content to preview */}
                  <ResumePreview
                    ref={printRef}
                    data={content}
                    template={selectedTemplate}
                    className="shadow-2xl shadow-purple-500/20 rounded-xl overflow-hidden bg-white relative z-10 transform-gpu"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quantum Action Buttons */}
      <div className="md:hidden fixed bottom-4 right-4 flex flex-col gap-3 z-40">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={handleAtsCheck}
            disabled={atsCheckMutation.isPending || isAnalyzing}
            className="bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 text-white shadow-2xl shadow-cyan-500/30 rounded-full w-14 h-14 p-0 relative overflow-hidden group"
            size="icon"
          >
            {/* Pulsing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 animate-ping rounded-full" />

            {isAnalyzing ? (
              <Loader2 className="w-6 h-6 animate-spin relative z-10" />
            ) : (
              <Brain className="w-6 h-6 relative z-10" />
            )}
          </Button>
        </motion.div>

        {mobileView === "preview" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={handlePrint}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-2xl shadow-purple-500/30 rounded-full w-14 h-14 p-0 relative overflow-hidden group"
              size="icon"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Download className="w-6 h-6 relative z-10" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* ATS Dialog */}
      <AtsScoreDialog
        open={isAtsOpen}
        onOpenChange={setIsAtsOpen}
        result={atsResult}
        loading={atsCheckMutation.isPending || isAnalyzing}
      />
    </div>
  );
}
