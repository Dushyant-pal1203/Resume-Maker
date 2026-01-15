import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/components/sections/home/data/features";
import { SectionHeader } from "@/components/sections/home/utils/SectionHeader";

export default function FeatureMatrix() {
  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="QUANTUM" subtitle="FEATURES" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: (typeof features)[0];
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="relative"
    >
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm border border-slate-800/30 h-full group">
        <CardContent className="p-8">
          <div
            className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
          <p className="text-slate-200">{feature.description}</p>

          {/* Animated Connector Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-0 group-hover:h-8 transition-all duration-500">
            <div
              className={`w-full h-full bg-gradient-to-b ${feature.color} opacity-60`}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
