import { motion } from "framer-motion";
import { FileUp, Scan, Check } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";

export default function PDFDropZone() {
  const { handleFileUpload } = useFileUpload();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-cyan-500/70", "bg-cyan-900/20");
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-cyan-500/70", "bg-cyan-900/20");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-cyan-500/70", "bg-cyan-900/20");
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="my-4"
    >
      <div
        className="max-w-7xl mx-auto border-2 border-dashed border-cyan-500/30 rounded-2xl p-8 text-center bg-gradient-to-r from-cyan-900/10 to-blue-900/10 cursor-pointer hover:border-cyan-500/50 transition-colors group"
        onClick={() => document.getElementById("quick-pdf-upload")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="max-w-md mx-auto">
          <div className="relative inline-block mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
            />
            <div className="p-4 rounded-full bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm">
              <FileUp className="w-12 h-12 text-cyan-300" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Drop Your PDF Here
          </h3>
          <p className="text-slate-300 mb-4">
            Or click to upload your existing resume. We'll extract and format
            everything automatically.
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30">
            <Scan className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-300">
              AI-Powered Parsing • 99% Accuracy
            </span>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-400" />
              <span>Text Extraction</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-400" />
              <span>Section Detection</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-400" />
              <span>Skill Categorization</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
