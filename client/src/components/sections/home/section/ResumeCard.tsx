import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  Briefcase,
  BarChart3,
  Trash2,
  ArrowRight,
  File,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ResumeCardProps {
  resume: any;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
}

export function ResumeCard({
  resume,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onDelete,
}: ResumeCardProps) {
  return (
    <motion.div layout>
      <Link href={`/builder/${resume.id}`}>
        <div
          className="cursor-pointer h-full"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Card className="h-100 flex flex-col bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-sm border border-slate-800/50 overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
            {/* Source Badge */}
            {resume.content?.parsedFromPDF && (
              <div className="absolute top-4 right-4 z-20">
                <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs px-2 py-1 backdrop-blur-sm">
                  <File className="w-3 h-3 mr-1" />
                  PDF IMPORT
                </Badge>
              </div>
            )}

            {/* Holographic Effect */}
            {isHovered && (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 animate-shimmer" />
              </div>
            )}

            <CardHeader className="relative z-10 pt-8 pb-6 px-8">
              <div className="flex items-center gap-2 text-sm text-slate-200 mb-2">
                <Clock className="w-4 h-4" />
                <motion.span
                  key={resume.createdAt?.toString() || "unknown"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {resume.createdAt
                    ? formatDistanceToNow(new Date(resume.createdAt), {
                        addSuffix: true,
                      })
                    : "Just now"}
                </motion.span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-500/30 flex items-center justify-center backdrop-blur-sm border border-purple-500/30"
                >
                  <FileText className="w-6 h-6 text-purple-300" />
                </motion.div>
                <Badge
                  variant="secondary"
                  className="bg-slate-100/50 text-white backdrop-blur-sm"
                >
                  {resume.template || "NEBULA"}
                </Badge>
              </div>

              <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300 truncate">
                {resume.title}
              </CardTitle>

              {/* Stats Row */}
              <div className="flex items-center gap-4 mt-3 text-xs">
                {resume.atsScore && (
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">
                      ATS: {resume.atsScore}%
                    </span>
                  </div>
                )}
                {resume.content?.experience?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400">
                      {resume.content.experience.length} exp
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="relative z-10 flex-1 px-8 py-0">
              <ResumePreviewContent resume={resume} />
            </CardContent>

            <CardFooter className="relative z-10 pt-6 pb-8 px-8 mt-auto">
              <div className="flex items-center justify-between w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-white hover:text-black hover:bg-slate-300 transition-colors"
                  onClick={(e) => onDelete(e, resume.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  className="rounded-xl px-4 py-2 text-white hover:text-black hover:bg-slate-300 font-medium group/edit"
                >
                  ACCESS ARTIFACT
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/edit:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Link>
    </motion.div>
  );
}

function ResumePreviewContent({ resume }: { resume: any }) {
  return (
    <div className="relative h-32 rounded-xl border border-slate-800/50 bg-slate-950/50 p-4 overflow-hidden">
      {/* Data extraction preview */}
      <div className="absolute inset-4 space-y-1">
        {resume.content?.personalInfo?.fullName && (
          <div
            className="h-2 rounded-full bg-gradient-to-r from-purple-500/50 to-pink-500/50 animate-pulse"
            style={{ width: "85%" }}
          />
        )}
        {resume.content?.experience?.[0]?.company && (
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500/50 to-cyan-500/50 animate-pulse mt-2"
            style={{ width: "70%" }}
          />
        )}
        {resume.content?.skills?.length > 0 && (
          <div
            className="h-2 rounded-full bg-gradient-to-r from-emerald-500/50 to-teal-500/50 animate-pulse mt-2"
            style={{ width: "60%" }}
          />
        )}
      </div>

      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          style={{ top: `${i * 25}%` }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
