import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gem, Sparkle, FileUp } from "lucide-react";
import { useState } from "react";
import { CreateResumeButton } from "./CreateResumeButton";
import { UploadPDFButton } from "./UploadPDFButton";

export default function EmptyState() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="relative mx-auto w-32 h-32 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
        />
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-500/30 animate-pulse" />
        <div className="absolute inset-8 flex items-center justify-center">
          <Gem className="w-12 h-12 text-purple-300" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">VOID DETECTED</h3>
      <p className="text-slate-400 max-w-md mx-auto mb-8">
        Your constellation awaits its first star. Upload a PDF or create a new
        resume artifact.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <CreateResumeButton />
        <UploadPDFButton isUploading={isUploading} variant="empty" />
      </div>
    </motion.div>
  );
}
