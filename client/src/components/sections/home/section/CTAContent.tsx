import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  FileUp,
  Loader2,
  Scan,
  ChevronRight,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useFileUpload } from "@/hooks/useFileUpload";

export function CTAContent() {
  const [isUploading, setIsUploading] = useState(false);
  const { handleFileUpload } = useFileUpload();

  return (
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
        Upload your PDF or start fresh. Your next opportunity is a quantum leap
        away.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <ScratchButton />
        <UploadButton isUploading={isUploading} />
      </div>

      <FeatureBadges />
    </motion.div>
  );
}

function ScratchButton() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        size="lg"
        className="rounded-2xl px-12 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group"
      >
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
        START FROM SCRATCH
        <ChevronRight className="ml-4 h-6 w-6 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
}

function UploadButton({ isUploading }: { isUploading: boolean }) {
  function handleFileUpload(file: File) {
    throw new Error("Function not implemented.");
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <div className="relative">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className="hidden"
          id="cta-pdf-upload"
        />
        <Button
          onClick={() => document.getElementById("cta-pdf-upload")?.click()}
          disabled={isUploading}
          size="lg"
          variant="outline"
          className="rounded-2xl px-12 py-4 text-lg font-semibold border-2 border-cyan-500 text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

          {isUploading ? (
            <>
              <Loader2 className="mr-4 h-6 w-6 animate-spin" />
              ANALYZING PDF...
            </>
          ) : (
            <>
              <FileUp className="mr-4 h-6 w-6 group-hover:scale-110 transition-transform" />
              UPLOAD RESUME
              <Scan className="ml-4 h-6 w-6 group-hover:animate-pulse" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

function FeatureBadges() {
  return (
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
  );
}
