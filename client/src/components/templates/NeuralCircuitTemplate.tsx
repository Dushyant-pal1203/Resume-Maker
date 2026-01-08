import { ResumeContent } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  CircuitBoard,
  Brain,
  Network,
  Cpu,
  Binary,
  Code2,
  Cog,
  Zap,
  GitBranch,
  Pause,
} from "lucide-react";

interface NeuralCircuitTemplateProps {
  data: ResumeContent;
}

export function NeuralCircuitTemplate({ data }: NeuralCircuitTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-gray-950 via-slate-950 to-gray-900 text-white p-5 font-mono relative overflow-hidden">
      {/* Circuit Background */}
      <div className="absolute inset-0 opacity-10">
        {/* Vertical lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-transparent to-cyan-500/30"
            style={{
              left: `${i * 5 + 10}%`,
            }}
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-emerald-500/30 via-transparent to-cyan-500/30"
            style={{
              top: `${i * 5 + 10}%`,
            }}
          />
        ))}
        {/* Nodes */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/20 animate-Pause"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-[70%]">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-Pause" />
              <span className="text-xs text-emerald-400 font-medium tracking-widest">
                NEURAL PROTOCOL v2.1
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-gray-300">@ </span>
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                {data.personalInfo.fullName.toUpperCase()}
              </span>
            </h1>
            <div className="text-xs text-gray-400 font-light">
              {data.personalInfo.summary?.split(".")[0] || "SYSTEM ARCHITECT"}
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded border border-emerald-500/30 bg-gray-900/50">
            <CircuitBoard className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-medium text-gray-300">
              NEURAL CIRCUIT
            </span>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="flex justify-between text-xs">
          <div className="space-y-1 text-center">
            <div className="flex items-center gap-2 text-gray-500">
              <Zap className="w-3 h-3" />
              <span>EMAIL</span>
            </div>
            <div className="text-emerald-300 font-medium">
              {data.personalInfo.email}
            </div>
          </div>
          <div className="space-y-1 text-center">
            <div className="flex items-center gap-2 text-gray-500">
              <Pause className="w-3 h-3" />
              <span>SIGNAL</span>
            </div>
            <div className="text-emerald-300 font-medium">
              {data.personalInfo.phone}
            </div>
          </div>
          <div className="space-y-1 text-center">
            <div className="flex items-center gap-2 text-gray-500">
              <Network className="w-3 h-3" />
              <span>NODE</span>
            </div>
            <div className="text-emerald-300 font-medium">
              {data.personalInfo.address}
            </div>
          </div>
          <div className="space-y-1 text-center">
            <div className="flex items-center gap-2 text-gray-500">
              <GitBranch className="w-3 h-3" />
              <span>ACTIVE SKILLS</span>
            </div>
            <div className="text-emerald-300 font-medium">
              {data.skills.length}
            </div>
          </div>
        </div>
      </div>
      {/* Summary */}
      <div className="relative z-10 mb-4 space-y-6">
        {data.personalInfo.summary && (
          <section className="border border-cyan-500/30 rounded-lg p-4 bg-gray-900/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded border border-cyan-500/30 bg-gray-900/50">
                <Brain className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="font-bold text-gray-300">SYSTEM OVERVIEW</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs text-justify">
              {data.personalInfo.summary}
            </p>
          </section>
        )}
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8 relative z-10">
        {/* Left Column - Experience */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded border border-emerald-500/30 bg-gray-900/50">
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-bold text-gray-300">EXECUTION THREADS</h2>
            </div>

            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="border border-gray-800 rounded-lg p-6 bg-gray-900/30 relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
              >
                {/* Connection line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/20 via-cyan-500/20 to-transparent group-hover:from-emerald-400 group-hover:to-cyan-400 transition-colors" />

                <div className="flex items-start justify-between mb-4">
                  <div className="ml-2">
                    <h3 className="font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-Pause" />
                      <span className="text-emerald-400 font-medium text-xs">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded border border-gray-700">
                      {exp.startDate} {"-"} {exp.endDate || "ACTIVE"}
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-gray-400 text-xs text-justify leading-relaxed ml-2">
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
                <div className="p-2 rounded border border-emerald-500/30 bg-gray-900/50">
                  <Cog className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="font-bold text-gray-300">ACTIVE PROCESSES</h2>
              </div>

              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="border border-gray-800 rounded p-4 bg-gray-900/30"
                >
                  <h3 className="text-sm font-bold text-white mb-1">
                    {proj.name}
                  </h3>
                  {proj.description && (
                    <p className="text-xs text-justify text-gray-400 mb-2">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          <section className="border border-gray-800 rounded-lg p-6 bg-gray-900/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded border border-emerald-500/30 bg-gray-900/50">
                <Code2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="font-bold text-gray-300">CORE MODULES</h2>
            </div>

            <div className="space-y-3">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:bg-cyan-400 transition-colors" />
                  <code className="text-xs text-gray-400 group-hover:text-emerald-300 transition-colors">
                    {skill}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded border border-cyan-500/30 bg-gray-900/50">
                <Binary className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="font-bold text-gray-300">TRAINING DATA</h2>
            </div>

            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="border border-gray-800 rounded p-4 bg-gray-900/30"
              >
                <h3 className="text-sm font-bold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-xs text-gray-400 mb-2">{edu.school}</p>
                <div className="text-xs text-gray-500">
                  GRADUATED: {edu.graduationDate}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 bottom-6">
        <div className="flex items-center justify-between text-xs text-gray-600 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-Pause" />
            <span>NEURAL_CIRCUIT v2.1</span>
          </div>
          <div className="flex items-center gap-4">
            <span>UUID: {Math.random().toString(36).substring(2, 10)}</span>
            <span>UPTIME: 99.97%</span>
            <span>CONNECTIONS: {data.skills.length * 3}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
