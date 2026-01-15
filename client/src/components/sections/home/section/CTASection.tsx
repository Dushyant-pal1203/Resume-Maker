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
import PDFDropZone from "./PDFDropZone";
import { WormholeAnimation } from "./WormholeAnimation";
import { CTAContent } from "./CTAContent";

export default function CTASection() {
  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <WormholeAnimation />
        <CTAContent />
      </div>
      <PDFDropZone />
    </section>
  );
}
