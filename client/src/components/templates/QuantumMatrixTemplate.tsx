import { ResumeContent } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  Grid3x3,
  Cpu,
  Network,
  Binary,
  Mail,
  CircuitBoard,
  Atom,
  Globe,
  Cog,
} from "lucide-react";

interface QuantumMatrixTemplateProps {
  data: ResumeContent;
}

export function QuantumMatrixTemplate({ data }: QuantumMatrixTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 text-white p-5 font-sans relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-cyan-400/20 animate-pulse"
            style={{
              top: `${(i * 4) % 100}%`,
              left: 0,
              right: 0,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-purple-400/20 animate-pulse"
            style={{
              left: `${(i * 4) % 100}%`,
              top: 0,
              bottom: 0,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-[70%]">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">
              {data.personalInfo.fullName}
            </h1>
            <div className="flex gap-2">
              <div className="mt-1 w-3 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <p className="text-xs text-slate-300">
                {data.personalInfo.summary?.split(".")[0] ||
                  "Quantum Professional"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
            <Grid3x3 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-medium text-slate-300">
              QUANTUM MATRIX
            </span>
          </div>
        </div>

        <div className="flex justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">{data.personalInfo.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300">{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <CircuitBoard className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300">
              {data.skills.length} Core Skills
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        {/* Left Column - Experience */}
        <div className="space-y-8 w-[70%]">
          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-purple-600/30">
                  <Binary className="w-5 h-5 text-cyan-300" />
                </div>
                <h2 className="font-bold text-white">QUANTUM PROFILE</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-justify text-xs">
                {data.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                <Cpu className="w-5 h-5 text-purple-300" />
              </div>
              <h2 className=" font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                EXPERIENCE MATRIX
              </h2>
            </div>

            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border border-slate-800/50 relative overflow-hidden group hover:border-cyan-500/30 transition-colors"
              >
                {/* Matrix lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-shimmer" />

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white mb-1">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-cyan-300 font-medium text-sm">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300 bg-slate-800/50 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.endDate || "PRESENT"}
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-slate-400 text-xs text-justify leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </section>

          {/* Projects */}
          {data.projects.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                  <Network className="w-5 h-5 text-purple-300" />
                </div>
                <h2 className="font-bold text-white">PROJECT MATRICES</h2>
              </div>

              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800/50"
                >
                  <h3 className="font-bold text-sm text-white mb-1">
                    {proj.name}
                  </h3>
                  {proj.description && (
                    <p className="text-xs text-justify text-slate-400 mb-2">
                      {proj.description}
                    </p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8 w-[30%]">
          {/* Skills */}
          <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-800/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <Atom className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="font-bold text-white">CORE COMPETENCIES</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/30 text-xs text-cyan-200 font-medium"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600/30 to-indigo-600/30">
                <Cog className="w-5 h-5 text-blue-300" />
              </div>
              <h2 className="font-bold text-white">EDUCATION NODES</h2>
            </div>

            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-white">{edu.degree}</h3>
                  <div className="text-xs text-slate-300 bg-slate-800/50 px-2 py-1 rounded">
                    {edu.graduationDate}
                  </div>
                </div>
                <p className="text-xs text-slate-400">{edu.school}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 bottom-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            <span>GENERATED WITH QUANTUM TECHNOLOGY</span>
          </div>
          <div className="flex items-center gap-4">
            <span>
              MATRIX ID:{" "}
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </span>
            <span>TEMPORAL STABILITY: 99.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
