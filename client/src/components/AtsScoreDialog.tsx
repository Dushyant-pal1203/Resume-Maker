import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Brain,
  Target,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Orbit,
  Atom,
  Scan,
  Network,
  CircuitBoard,
  Rocket,
  Stars,
} from "lucide-react";
import { AtsCheckResponse } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AtsScoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: AtsCheckResponse | null;
  loading: boolean;
}

export function AtsScoreDialog({
  open,
  onOpenChange,
  result,
  loading,
}: AtsScoreDialogProps) {
  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800/50 shadow-2xl shadow-black/40 ">
          <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
            {/* Quantum Scanner Animation */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 border-4 border-purple-500/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute inset-4 border-4 border-cyan-500/30 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: -360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-8 flex items-center justify-center">
                <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>

              {/* Scanning particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                  }}
                  animate={{
                    x: `calc(${Math.cos(i * 45) * 40}px + 50%)`,
                    y: `calc(${Math.sin(i * 45) * 40}px + 50%)`,
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                NEURAL ANALYSIS IN PROGRESS
              </h3>
              <p className="text-slate-400">
                Scanning resume across quantum dimensions...
              </p>
            </div>

            {/* Progress indicator */}
            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!result) return null;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-emerald-400 to-teal-400";
    if (score >= 60) return "from-amber-400 to-orange-400";
    return "from-rose-400 to-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500/20 border-emerald-500/30";
    if (score >= 60) return "bg-amber-500/20 border-amber-500/30";
    return "bg-rose-500/20 border-rose-500/30";
  };

  const getScoreGlow = (score: number) => {
    if (score >= 80) return "shadow-emerald-500/20";
    if (score >= 60) return "shadow-amber-500/20";
    return "shadow-rose-500/20";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800/50 shadow-2xl shadow-black/40 ">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/30 to-transparent rounded-full blur-3xl" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-2 rounded-xl bg-gradient-to-r from-purple-600/30 to-cyan-600/30"
            >
              <Brain className="w-6 h-6 text-cyan-300" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              QUANTUM ANALYSIS COMPLETE
            </span>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Neural network assessment of your resume's dimensional integrity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4 relative z-10">
          {/* Score Card - Cosmic */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "rounded-2xl p-8 text-center border backdrop-blur-xl",
              getScoreBgColor(result.score),
              getScoreGlow(result.score)
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 mb-4">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
              <span className="text-sm font-medium text-slate-300">
                MULTIDIMENSIONAL SCORE
              </span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                {/* Orbital rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-4 border-2 border-cyan-500/30 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Score display */}
                <div
                  className={cn(
                    "text-7xl md:text-8xl font-black bg-gradient-to-r bg-clip-text text-transparent",
                    getScoreColor(result.score)
                  )}
                >
                  {result.score}
                </div>
              </div>

              {/* Score label */}
              <div className="text-left">
                <div className="text-2xl font-bold text-white mb-2">
                  {result.score >= 80
                    ? "QUANTUM OPTIMAL"
                    : result.score >= 60
                    ? "DIMENSIONALLY STABLE"
                    : "TEMPORAL ANOMALY"}
                </div>
                <div className="text-slate-300 text-sm">
                  {result.score >= 80
                    ? "Ready for singularity deployment"
                    : result.score >= 60
                    ? "Requires minor reality adjustments"
                    : "Critical dimensional realignment needed"}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="h-3 w-full bg-slate-800/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  className={cn("h-full rounded-full", {
                    "bg-gradient-to-r from-emerald-500 to-teal-400":
                      result.score >= 80,
                    "bg-gradient-to-r from-amber-500 to-orange-400":
                      result.score >= 60 && result.score < 80,
                    "bg-gradient-to-r from-rose-500 to-red-400":
                      result.score < 60,
                  })}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>DIMENSIONAL INSTABILITY</span>
                <span>QUANTUM PERFECTION</span>
              </div>
            </div>
          </motion.div>

          {/* Feedback Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                <Scan className="w-5 h-5 text-purple-300" />
              </div>
              <span>NEURAL INSIGHTS</span>
            </h4>
            <div className="bg-slate-800/30 border border-slate-700/50 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-slate-300 leading-relaxed">
                {result.feedback}
              </p>
            </div>
          </motion.div>

          {/* Suggestions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <Zap className="w-5 h-5 text-cyan-300" />
              </div>
              <span>QUANTUM OPTIMIZATIONS</span>
            </h4>
            <div className="space-y-2">
              <AnimatePresence>
                {result.suggestions.map((suggestion, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm group hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30 flex items-center justify-center text-sm font-bold text-purple-300">
                        {idx + 1}
                      </div>
                    </div>
                    <p className="text-slate-300 group-hover:text-white transition-colors">
                      {suggestion}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/50"
          >
            CLOSE PORTAL
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/25"
          >
            <Rocket className="w-4 h-4 mr-2" />
            IMPLEMENT OPTIMIZATIONS
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
