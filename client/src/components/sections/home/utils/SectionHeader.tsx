import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          {title}
        </span>
        <span className="text-slate-200 ml-4">{subtitle}</span>
      </h2>
      {description && (
        <p className="text-lg text-slate-200 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
