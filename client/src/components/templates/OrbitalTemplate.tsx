import { ResumeContent } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  Orbit,
  Satellite,
  Globe,
  Plane,
  Rocket,
  SatelliteDish,
  Navigation,
  Compass,
  Radar,
  Space,
} from "lucide-react";

interface OrbitalTemplateProps {
  data: ResumeContent;
}

export function OrbitalTemplate({ data }: OrbitalTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-gray-950 via-slate-950 to-black text-white p-5 font-sans relative overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0">
        {/* Stars */}
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + "px",
              height: Math.random() * 2 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}

        {/* Planes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-xl" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-xl" />
      </div>

      {/* Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-4xl h-96">
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute inset-0 border border-slate-700/30 rounded-full"
              style={{
                transform: `scale(${1 + ring * 0.2})`,
                animation: `orbit ${20 + ring * 10}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-[70%]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 mb-4">
              <Rocket className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-medium text-slate-300 tracking-widest">
                ORBITAL PROFILE
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                {data.personalInfo.fullName}
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-light">
              {data.personalInfo.summary?.split(".")[0] ||
                "Navigating the orbital landscape of technology"}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
            <Orbit className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-medium text-slate-300">ORBITAL</span>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-4 gap-8 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500">
              <SatelliteDish className="w-4 h-4" />
              <span className="uppercase">Transmission</span>
            </div>
            <div className="text-slate-300">{data.personalInfo.email}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Navigation className="w-4 h-4" />
              <span className="uppercase">Coordinates</span>
            </div>
            <div className="text-slate-300">{data.personalInfo.address}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Radar className="w-4 h-4" />
              <span className="uppercase">Frequency</span>
            </div>
            <div className="text-slate-300">{data.personalInfo.phone}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Space className="w-4 h-4" />
              <span className="uppercase">Systems</span>
            </div>
            <div className="text-slate-300">
              {data.skills.length} operational
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="relative z-10 mb-4 space-y-6">
        {data.personalInfo.summary && (
          <section className="bg-gradient-to-r from-slate-900/50 to-cyan-900/20 backdrop-blur-sm rounded-2xl p-4 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <Compass className="w-4 h-4 text-cyan-300" />
              </div>
              <h2 className="font-bold text-white">NAVIGATION LOG</h2>
            </div>
            <p className="text-slate-200 leading-relaxed text-justify text-xs">
              {data.personalInfo.summary}
            </p>
          </section>
        )}
      </div>
      {/* Main Grid */}
      <div className="grid grid-cols-5 gap-8 relative z-10">
        {/* Main Content */}
        <div className="col-span-3 space-y-8">
          {/* Experience */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
                <Satellite className="w-4 h-4 text-cyan-400" />
              </div>
              <h2 className="font-bold text-white">FLIGHT PATH</h2>
            </div>

            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="bg-gradient-to-r from-slate-900/30 to-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500"
              >
                <div className="mb-4">
                  <div className="flex justify-between w-full">
                    <h3 className="font-bold text-white mb-1 flex-1">
                      {exp.position}
                    </h3>
                    <div className="text-right flex-1">
                      <div className="text-xs text-slate-300 bg-slate-800/50 px-2 py-1 rounded-full border border-slate-700/50">
                        {exp.startDate} — {exp.endDate || "In Orbit"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse text-xs" />
                    <span className="text-cyan-300 font-medium text-xs">
                      {exp.company}
                    </span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-xs text-slate-400">
                      Orbit {idx + 1}
                    </span>
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
                <div className="p-2 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                  <Rocket className="w-4 h-4 text-purple-300" />
                </div>
                <h2 className="font-bold text-white">MISSIONS</h2>
              </div>

              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-gradient-to-r from-slate-900/30 to-purple-900/20 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50"
                >
                  <h3 className="font-bold text-white mb-1">
                    Mission {idx + 1} : {proj.name}
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
        <div className="col-span-2 space-y-8">
          {/* Skills */}
          <section className="bg-gradient-to-b from-slate-900/50 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <Globe className="w-4 h-4 text-cyan-300" />
              </div>
              <h2 className="font-bold text-white">ONBOARD SYSTEMS</h2>
            </div>

            <div className="space-y-3">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors text-xs">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30">
                <Plane className="w-4 h-4 text-blue-300" />
              </div>
              <h2 className="font-bold text-white">ACADEMIA SPHERE</h2>
            </div>

            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="bg-gradient-to-r from-slate-900/30 to-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50"
              >
                <h3 className="text-sm font-bold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-xs text-slate-400 mb-2">{edu.school}</p>
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Launch: {edu.graduationDate}</span>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 bottom-6">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>ORBIT STABLE • ALTITUDE 35786KM</span>
          </div>
          <div className="text-slate-600">
            VELOCITY: 3.07KM/S • INCLINATION: 0°
          </div>
        </div>
      </div>
    </div>
  );
}
