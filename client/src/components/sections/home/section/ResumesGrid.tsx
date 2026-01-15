import { AnimatePresence } from "framer-motion";
import { ResumeCard } from "./ResumeCard";

interface ResumesGridProps {
  resumes: any[];
  onDelete: (e: React.MouseEvent, id: number) => void;
  hoveredCard: number | null;
  setHoveredCard: (id: number | null) => void;
}

export function ResumesGrid({
  resumes,
  onDelete,
  hoveredCard,
  setHoveredCard,
}: ResumesGridProps) {
  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resumes.map((resume, index) => (
          <ResumeCard
            key={resume.id}
            resume={resume}
            isHovered={hoveredCard === resume.id}
            onMouseEnter={() => setHoveredCard(resume.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onDelete={onDelete}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
