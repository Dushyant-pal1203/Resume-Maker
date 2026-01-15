import { Button } from "@/components/ui/button";
import { FileUp, Loader2 } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";

interface UploadPDFButtonProps {
  isUploading: boolean;
  variant?: "default" | "empty";
}

export function UploadPDFButton({
  isUploading,
  variant = "default",
}: UploadPDFButtonProps) {
  const { handleFileUpload } = useFileUpload();

  const handleClick = () => {
    document.getElementById("quick-pdf-upload")?.click();
  };

  const baseClass =
    variant === "empty"
      ? "rounded-xl px-8 py-6 text-base font-semibold border-cyan-500/50 text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10"
      : "rounded-xl px-8 py-4 text-base font-semibold border-cyan-500/50 text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 group relative overflow-hidden";

  return (
    <div className="relative">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        className="hidden"
        id="quick-pdf-upload"
      />
      <Button
        onClick={handleClick}
        disabled={isUploading}
        variant="outline"
        className={baseClass}
      >
        {variant === "default" && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500" />
        )}
        {isUploading ? (
          <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            PROCESSING...
          </>
        ) : (
          <>
            <FileUp className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            UPLOAD PDF
          </>
        )}
      </Button>
    </div>
  );
}
