import { motion } from "framer-motion";

interface TemplatePreviewLinesProps {
  template: {
    gradient: string;
  };
}

export function TemplatePreviewLines({ template }: TemplatePreviewLinesProps) {
  return (
    <div className="relative z-10 space-y-3">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`h-2 rounded-full bg-gradient-to-r ${
            template.gradient
          } opacity-${20 + i * 20}`}
          initial={{ width: "0%" }}
          whileInView={{ width: `${60 + i * 10}%` }}
          transition={{ duration: 1, delay: i * 0.1 }}
          viewport={{ once: true }}
        />
      ))}
    </div>
  );
}
