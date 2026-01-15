import { Button } from "@/components/ui/button";
import { Plus, Sparkle } from "lucide-react";
import { useCreateResume, defaultResumeContent } from "@/hooks/use-resumes";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function CreateResumeButton() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const createResumeMutation = useCreateResume();

  const handleCreate = (templateId: string = "nebula") => {
    createResumeMutation.mutate(
      {
        title: "Stellar Resume",
        content: defaultResumeContent,
        template: templateId,
      },
      {
        onSuccess: (newResume) => {
          toast({
            title: "🚀 Launch Sequence Initiated!",
            description: "Your stellar resume is ready for liftoff",
            className:
              "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
          });
          setTimeout(() => setLocation(`/builder/${newResume.id}`), 800);
        },
      }
    );
  };

  return (
    <Button
      onClick={() => handleCreate()}
      className="rounded-xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 group"
    >
      <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform" />
      FORGE NEW ARTIFACT
    </Button>
  );
}
