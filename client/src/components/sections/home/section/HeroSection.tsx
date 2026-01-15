import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkle, FileUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateResume, defaultResumeContent } from "@/hooks/use-resumes";
import { useLocation } from "wouter";
import { useState } from "react";

export default function HeroSection() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const createResumeMutation = useCreateResume();
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // File upload logic (moved from original)
  };

  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center text-center sm:text-left gap-12">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 relative z-10"
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
            Upload your PDF resume or start from scratch. Our AI instantly
            parses and formats your data.
            <span className="block text-slate-100 font-medium mt-2">
              Quantum parsing meets cosmic design.
            </span>
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleCreate()}
                className="rounded-xl px-8 py-6 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 group"
              >
                <Sparkle className="mr-3 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                START FROM SCRATCH
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="pdf-upload"
              />
              <Button
                onClick={() => document.getElementById("pdf-upload")?.click()}
                disabled={isUploading}
                className="rounded-xl px-8 py-6 text-base font-semibold bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 relative overflow-hidden group"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {isUploading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    ANALYZING PDF...
                  </>
                ) : (
                  <>
                    <FileUp className="mr-3 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
                    UPLOAD PDF RESUME
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Stats Orb */}
        <StatsOrb />
      </div>
    </section>
  );
}

function StatsOrb() {
  return (
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
          <div className="text-sm text-slate-200 mt-2">ATS SUCCESS RATE</div>
        </div>
      </div>
    </motion.div>
  );
}
