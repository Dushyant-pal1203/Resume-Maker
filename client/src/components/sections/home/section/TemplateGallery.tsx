import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Rocket } from "lucide-react";
import { FloatingParticles } from "@/components/sections/home/utils/FloatingParticles";
import { templates } from "@/components/sections/home/data/templates";
import { useCreateResume } from "@/hooks/use-resumes";
import { SectionHeader } from "@/components/sections/home/utils/SectionHeader";
import { TemplateHeader } from "./TemplateHeader";
import { TemplatePreviewLines } from "./TemplatePreviewLines";

export default function TemplateGallery() {
  const createResumeMutation = useCreateResume();

  const handleCreate = (templateId: string) => {
    // Create resume logic
  };

  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="TEMPLATE"
          subtitle="GALAXY"
          description="Choose a template or upload your PDF - we'll handle the formatting."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">
          {templates.map((tpl, index) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              index={index}
              isLoading={createResumeMutation.isPending}
              onCreate={handleCreate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TemplateCardProps {
  template: (typeof templates)[0];
  index: number;
  isLoading: boolean;
  onCreate: (templateId: string) => void;
}

function TemplateCard({
  template,
  index,
  isLoading,
  onCreate,
}: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="relative transform-style-3d transition-transform duration-500"
    >
      <Card className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/50 overflow-hidden group">
        <CardHeader className="pt-8 pb-0 px-8">
          <TemplateHeader template={template} />
          <CardTitle className="text-3xl font-bold text-white mb-4">
            {template.name}
          </CardTitle>
          <p className="text-slate-200 leading-relaxed">
            {template.description}
          </p>
        </CardHeader>

        <CardContent className="relative h-30 px-8 py-6 overflow-hidden">
          <FloatingParticles
            count={template.particles}
            color={template.gradient}
          />
          <TemplatePreviewLines template={template} />
        </CardContent>

        <CardFooter className="px-8 pb-8">
          <Button
            onClick={() => onCreate(template.id)}
            disabled={isLoading}
            className={`w-full rounded-xl py-4 text-base font-semibold bg-gradient-to-r ${template.gradient} hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                INITIALIZING...
              </>
            ) : (
              <>
                LAUNCH THIS TEMPLATE
                <Rocket className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
