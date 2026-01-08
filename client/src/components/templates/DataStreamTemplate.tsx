import { ResumeContent } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  Binary,
  Database,
  BarChart3,
  TrendingUp,
  Code,
  Server,
  Terminal,
  Hash,
  BarChart,
  Activity,
} from "lucide-react";

interface DataStreamTemplateProps {
  data: ResumeContent;
}

export function DataStreamTemplate({ data }: DataStreamTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-5 font-sans relative overflow-hidden">
      {/* Data Stream Background */}
      <div className="absolute inset-0 opacity-10">
        {/* Streaming data lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-transparent animate-shimmer"
            style={{
              top: `${i * 5 + 10}%`,
              left: 0,
              right: 0,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
        {/* Binary code rain */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-400/10 text-sm font-mono animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-[70%]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Activity className="w-3 h-3 text-blue-400 animate-pulse" />
              <span className="text-xs font-medium text-blue-300 tracking-widest">
                DATA STREAM ACTIVE
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                {data.personalInfo.fullName}
              </span>
            </h1>
            <p className="text-xs text-slate-300">
              {data.personalInfo.summary?.split(".")[0] ||
                "Data Architect & Analytics Specialist"}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/30 border border-blue-500/30">
            <Binary className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-medium text-blue-200">
              DATA STREAM
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal className="w-4 h-4" />
              <span>EMAIL</span>
            </div>
            <div className=" text-blue-300 font-medium">
              {data.personalInfo.email}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Server className="w-3 h-3" />
              <span>LOCATION</span>
            </div>
            <div className="text-blue-300 font-medium">
              {data.personalInfo.address}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Hash className="w-4 h-4" />
              <span>PHONE</span>
            </div>
            <div className="text-blue-300 font-medium">
              {data.personalInfo.phone}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <BarChart className="w-4 h-4" />
              <span>METRICS</span>
            </div>
            <div className="text-blue-300 font-medium">
              {data.skills.length} skills analyzed
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="relative z-10 mb-4 space-y-6">
        {data.personalInfo.summary && (
          <section className="bg-gradient-to-r from-slate-900/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <Database className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="font-bold text-white">ANALYTICAL PROFILE</h2>
            </div>
            <p className="text-slate-200 leading-relaxed text-xs text-justify">
              {data.personalInfo.summary}
            </p>
          </section>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8 relative z-10">
        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30">
                <TrendingUp className="w-4 h-4 text-blue-300" />
              </div>
              <h2 className="font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                DATA TRAJECTORY
              </h2>
            </div>

            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white mb-1">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-cyan-300 font-medium text-xs">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/30">
                      {exp.startDate} → {exp.endDate || "NOW"}
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-slate-300 leading-relaxed text-xs text-justify">
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
                  <Server className="w-4 h-4 text-purple-300" />
                </div>
                <h2 className="font-bold text-white">PROJECT PIPELINES</h2>
              </div>

              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-gradient-to-r from-slate-900/30 to-purple-900/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50"
                >
                  <h3 className="font-bold text-white mb-1 text-sm">
                    {proj.name}
                  </h3>
                  {proj.description && (
                    <p className="text-xs text-justify text-slate-300">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          <section className="bg-gradient-to-b from-blue-900/30 to-transparent backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-600/30 to-purple-600/30">
                <Code className="w-4 h-4 text-indigo-300" />
              </div>
              <h2 className="text-sm font-bold text-white">TECHNOLOGY STACK</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {data.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="text-xs px-2 py-1 rounded-lg bg-blue-900/20 border border-blue-500/20 text-left text-blue-200 hover:bg-blue-800/30 hover:border-blue-400/30 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <BarChart3 className="w-4 h-4 text-cyan-300" />
              </div>
              <h2 className="text-sm font-bold text-white">
                EDUCATION METRICS
              </h2>
            </div>

            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="bg-gradient-to-r from-slate-900/30 to-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50"
              >
                <h3 className="font-bold text-white mb-1 text-sm">
                  {edu.degree}
                </h3>
                <p className="text-xs text-slate-400 mb-2">{edu.school}</p>
                <div className="text-[10px] text-cyan-400">
                  DATA POINT: {edu.graduationDate}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 bottom-6">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>DATA STREAM GENERATED</span>
          </div>
          <div className="flex items-center gap-4">
            <span>BANDWIDTH: 1.2TB/s</span>
            <span>LATENCY: 2ms</span>
            <span>REQUESTS: 10.4K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
