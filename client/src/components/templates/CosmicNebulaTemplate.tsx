import { ResumeContent } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  Stars,
  Sparkles,
  Cloud,
  Palette,
  Sunrise,
  Moon,
  Plane,
  Satellite,
  Telescope,
  Zap,
} from "lucide-react";

interface CosmicNebulaTemplateProps {
  data: ResumeContent;
}

export function CosmicNebulaTemplate({ data }: CosmicNebulaTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white p-5 font-sans relative overflow-hidden">
      {/* Nebula Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-8">
          <div className="w-[70%]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 mb-4">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-xs font-medium text-purple-200">
                COSMIC PROFESSIONAL
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                {data.personalInfo.fullName}
              </span>
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {data.personalInfo.summary?.split(".")[0] ||
                "Navigating the cosmic frontier of innovation"}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Stars className="w-5 h-5 text-pink-400" />
            <span className="text-xs font-medium text-slate-300">
              COSMIC NEBULA
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Satellite className="w-4 h-4" />
              <span className="text-xs">LOCATION</span>
            </div>
            <p className="text-sm text-white">{data.personalInfo.address}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Zap className="w-4 h-4" />
              <span className="text-xs">CONTACT</span>
            </div>
            <p className="text-sm text-white">{data.personalInfo.email}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Telescope className="w-4 h-4" />
              <span className="text-xs">COMMUNICATION</span>
            </div>
            <p className="text-sm text-white">{data.personalInfo.phone}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="relative z-10 mb-4 space-y-6">
        {data.personalInfo.summary && (
          <section className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <Cloud className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="font-bold text-white">COSMIC VISION</h2>
            </div>
            <p className="text-slate-200 leading-relaxed text-xs text-justify">
              {data.personalInfo.summary}
            </p>
          </section>
        )}
      </div>

      <div className="grid grid-cols-5 gap-8 relative z-10">
        {/* Main Content */}
        <div className="col-span-3 space-y-8">
          {/* Experience */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                <Plane className="w-4 h-4 text-purple-300" />
              </div>
              <h2 className="font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                GALACTIC JOURNEY
              </h2>
            </div>

            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                      <span className="text-pink-300 font-medium text-xs">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full">
                      {exp.startDate} — {exp.endDate || "PRESENT"}
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
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600/30 to-cyan-600/30">
                  <Palette className="w-5 h-5 text-blue-300" />
                </div>
                <h2 className="font-bold text-white">CREATIVE NEBULAS</h2>
              </div>

              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <h3 className="text-sm font-bold text-white mb-1">
                    {proj.name}
                  </h3>
                  {proj.description && (
                    <p className="text-xs text-justify text-slate-300 mb-2">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-2 space-y-8">
          {/* Skills */}
          <section className="bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-600/30 to-purple-600/30">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </div>
              <h2 className="font-bold text-white">STELLAR ABILITIES</h2>
            </div>

            <div className="space-y-3">
              {data.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover:scale-150 transition-transform" />
                  <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-pink-600/30 to-rose-600/30">
                <Moon className="w-5 h-5 text-pink-300" />
              </div>
              <h2 className="font-bold text-white">ACADEMIC CONSTELLATIONS</h2>
            </div>

            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <h3 className="text-sm font-bold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-xs text-slate-400 mb-2">{edu.school}</p>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Sunrise className="w-3 h-3" />
                  <span>{edu.graduationDate}</span>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="bottom-6 mt-5">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Stars className="w-4 h-4" />
            <span>Crafted among the stars</span>
          </div>
          <div className="text-slate-400">
            NEBULA ID:{" "}
            {Math.random().toString(36).substring(2, 8).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
