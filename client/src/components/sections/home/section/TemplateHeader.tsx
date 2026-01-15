import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TemplateHeaderProps {
  template: {
    icon: any;
    gradient: string;
    category: string;
  };
}

export function TemplateHeader({ template }: TemplateHeaderProps) {
  const Icon = template.icon;

  return (
    <div className="flex items-center justify-between mb-2">
      <motion.div
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.5 }}
        className={`p-4 rounded-2xl bg-gradient-to-br ${template.gradient} shadow-2xl`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      <Badge className="bg-white backdrop-blur-sm border border-slate-700 text-slate-900">
        {template.category}
      </Badge>
    </div>
  );
}
