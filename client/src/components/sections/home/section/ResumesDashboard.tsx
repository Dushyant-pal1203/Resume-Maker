import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileUp,
  Loader2,
  FileText,
  Clock,
  Briefcase,
  BarChart3,
  Trash2,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useResumes, useDeleteResume } from "@/hooks/use-resumes";
import { useToast } from "@/hooks/use-toast";
import EmptyState from "./EmptyState";
import { useState } from "react";
import { CreateResumeButton } from "./CreateResumeButton";
import { UploadPDFButton } from "./UploadPDFButton";
import { ResumesGrid } from "./ResumesGrid";
import { LoadingSkeleton } from "./LoadingSkeleton";
import e from "express";

export default function ResumesDashboard() {
  const { data: resumes, isLoading, refetch } = useResumes();
  const deleteResumeMutation = useDeleteResume();
  const { toast } = useToast();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "⚠️ Hold On!",
      description: "Are you sure you want to delete this masterpiece?",
      action: (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteResumeMutation.mutate(id, {
              onSuccess: () => {
                toast({
                  title: "🗑️ Artifact Deconstructed",
                  description: "Your resume has been quantum-erased",
                  className:
                    "bg-gradient-to-r from-slate-800 to-slate-900 text-white",
                });
              },
            });
          }}
        >
          Confirm Delete
        </Button>
      ),
    });
  };

  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        {isLoading ? (
          <LoadingSkeleton />
        ) : resumes && resumes.length > 0 ? (
          <ResumesGrid
            resumes={resumes}
            onDelete={handleDelete}
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCard}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
      <div>
        <h2 className="text-5xl font-bold text-slate-200 mb-3">
          YOUR{" "}
          <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            ARTIFACTS
          </span>
        </h2>
        <p className="text-slate-200">
          Each resume is a digital artifact in your career constellation
        </p>
      </div>
      <DashboardActions />
    </div>
  );
}

function DashboardActions() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex flex-wrap gap-4">
      <CreateResumeButton />
      <UploadPDFButton isUploading={isUploading} />
    </div>
  );
}
