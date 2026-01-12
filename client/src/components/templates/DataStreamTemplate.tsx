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
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Award,
  Languages,
  BookOpen,
  Globe,
  Cloud,
  Lock,
  ExternalLink,
  Zap,
  Target,
  Star,
  Cpu,
  Wrench as Tool,
  Network,
  Calendar,
  Clock,
  Shield,
  Building,
  FileText,
  Tag,
  Percent,
  PieChart,
  Wifi,
  Smartphone,
  Monitor,
  HardDrive,
} from "lucide-react";

interface DataStreamTemplateProps {
  data: ResumeContent;
}

/* =========================================================
   🔹 TYPE DEFINITIONS
========================================================= */
interface Metric {
  description: string;
  value: string;
  unit: string;
}

interface Language {
  language: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic";
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  expiryDate?: string;
}

/* =========================================================
   🔹 CUSTOM SECTION RENDERER
========================================================= */
function CustomSectionRenderer({
  section,
}: {
  section: {
    id: string;
    title: string;
    type: "text" | "list" | "date" | "link" | "rich-text" | "badges";
    content: string | string[];
  };
}) {
  const renderContent = () => {
    switch (section.type) {
      case "text":
      case "rich-text":
        return (
          <div
            className="text-xs text-slate-300 text-justify leading-relaxed prose prose-sm"
            dangerouslySetInnerHTML={{
              __html:
                section.type === "rich-text"
                  ? (section.content as string)
                  : `<p>${(section.content as string).replace(
                      /\n/g,
                      "<br/>"
                    )}</p>`,
            }}
          />
        );

      case "list":
        return (
          <ul className="space-y-2">
            {(section.content as string[]).map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-300 flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );

      case "badges":
        return (
          <div className="flex flex-wrap gap-2">
            {Array.isArray(section.content) &&
              section.content.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-xs text-blue-300 font-medium"
                >
                  {badge}
                </span>
              ))}
          </div>
        );

      case "date":
        return (
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{section.content as string}</span>
          </div>
        );

      case "link":
        return (
          <a
            href={section.content as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-300 hover:text-cyan-200 hover:underline flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            {section.content as string}
          </a>
        );

      default:
        return null;
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600/30 to-cyan-600/30">
          <Database className="w-4 h-4 text-cyan-300" />
        </div>
        <h2 className="font-bold text-white">{section.title.toUpperCase()}</h2>
      </div>

      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
        {renderContent()}
      </div>
    </section>
  );
}

/* =========================================================
   🔹 SOCIAL LINKS COMPONENT
========================================================= */
function SocialLinksRenderer({ data }: { data: ResumeContent }) {
  const socialLinks = data.personalInfo.socialLinks || {};

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Briefcase className="w-4 h-4" />;
      case "github":
        return <Code className="w-4 h-4" />;
      case "gitlab":
        return <Server className="w-4 h-4" />;
      case "portfolio":
        return <Globe className="w-4 h-4" />;
      case "medium":
        return <BookOpen className="w-4 h-4" />;
      case "stackoverflow":
        return <Database className="w-4 h-4" />;
      case "twitter":
        return <Network className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  if (Object.keys(socialLinks).length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600/30 to-indigo-600/30">
          <Network className="w-4 h-4 text-blue-300" />
        </div>
        <h2 className="font-bold text-white">NETWORK NODES</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(socialLinks).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-lg p-3 border border-blue-500/20 hover:border-cyan-500/30 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="text-cyan-400">{getPlatformIcon(platform)}</div>
              <div className="text-xs">
                <div className="font-medium text-white">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </div>
                <div className="text-slate-400 truncate">
                  {url.replace(/^https?:\/\//, "")}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   🔹 SKILL CATEGORIES COMPONENT
========================================================= */
function SkillCategoriesRenderer({ data }: { data: ResumeContent }) {
  const skillCategories = data.skillCategories as any;

  if (!skillCategories) return null;

  const categoryIcons: Record<string, React.ReactNode> = {
    programming: <Code className="w-4 h-4" />,
    frameworks: <Cpu className="w-4 h-4" />,
    databases: <Database className="w-4 h-4" />,
    cloud: <Cloud className="w-4 h-4" />,
    devops: <Server className="w-4 h-4" />,
    tools: <Tool className="w-4 h-4" />,
    softSkills: <Users className="w-4 h-4" />,
  };

  return (
    <div className="space-y-4 mt-4">
      {Object.entries(categoryIcons).map(([category, icon]) => {
        const skills = skillCategories[category] as string[] | undefined;
        if (!skills || skills.length === 0) return null;

        return (
          <div key={category} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-cyan-400">{icon}</div>
              <h4 className="text-xs font-bold text-white">
                {category
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .toUpperCase()}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-lg bg-blue-900/20 border border-blue-500/20 text-xs text-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   🔹 LANGUAGES COMPONENT
========================================================= */
function LanguagesRenderer({ data }: { data: ResumeContent }) {
  const languages = (data.skillCategories as any)?.languages as
    | Language[]
    | undefined;

  if (!languages || languages.length === 0) return null;

  const proficiencyColors: Record<string, string> = {
    Native: "bg-green-500",
    Fluent: "bg-cyan-500",
    Professional: "bg-blue-500",
    Intermediate: "bg-yellow-500",
    Basic: "bg-orange-500",
  };

  return (
    <div className="mt-4 pt-6 border-t border-blue-500/30">
      <div className="flex items-center gap-2 mb-4">
        <Languages className="w-4 h-4 text-cyan-400" />
        <h3 className="font-bold text-white">LANGUAGE PROTOCOLS</h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-blue-900/20"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300">{lang.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  proficiencyColors[lang.proficiency]
                }`}
              />
              <span className="text-xs text-slate-400">{lang.proficiency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   🔹 CERTIFICATIONS COMPONENT
========================================================= */
function CertificationsRenderer({ data }: { data: ResumeContent }) {
  const certifications = (data.skillCategories as any)?.certifications as
    | Certification[]
    | undefined;

  if (!certifications || certifications.length === 0) return null;

  return (
    <div className="mt-4 pt-6 border-t border-blue-500/30">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-yellow-400" />
        <h3 className="font-bold text-white">CERTIFICATION STREAMS</h3>
      </div>
      <div className="space-y-3">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-white">{cert.name}</h4>
                <div className="text-xs text-slate-400 mt-1">
                  Issued by <span className="text-cyan-300">{cert.issuer}</span>
                </div>
              </div>
              <div className="text-xs text-slate-300 bg-blue-900/30 px-2 py-1 rounded">
                {cert.date}
              </div>
            </div>
            {cert.credentialId && (
              <div className="mt-2 text-xs text-slate-400">
                ID: <span className="text-yellow-300">{cert.credentialId}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   🔹 METRICS COMPONENT
========================================================= */
function MetricsRenderer({ metrics }: { metrics: Metric[] | undefined }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="p-3 rounded-lg bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30"
        >
          <div className="text-xs text-slate-400 mb-1">
            {metric.description}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-white">{metric.value}</span>
            <span className="text-sm text-cyan-400">{metric.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DataStreamTemplate({ data }: DataStreamTemplateProps) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    customSections = [],
    sectionOrder = [],
    proficiencyLevels = [],
  } = data;

  // Helper function to render section by ID (for custom sections only)
  const renderCustomSection = (sectionId: string) => {
    const customSection = customSections.find((s: any) => s.id === sectionId);
    if (customSection) {
      return <CustomSectionRenderer key={sectionId} section={customSection} />;
    }
    return null;
  };

  // Determine which custom sections to render
  const getCustomSectionsToRender = () => {
    if (sectionOrder.length > 0) {
      return sectionOrder.filter((sectionId) =>
        customSections.some((s: any) => s.id === sectionId)
      );
    }
    return customSections.map((s: any) => s.id);
  };

  const customSectionsToRender = getCustomSectionsToRender();

  // Enhanced stats grid with new fields
  const statsInfo = [
    {
      icon: <Terminal className="w-4 h-4" />,
      title: "EMAIL",
      text: personalInfo.email || "email@example.com",
    },
    {
      icon: <Server className="w-3 h-3" />,
      title: "LOCATION",
      text: personalInfo.address || "Location not specified",
    },
    {
      icon: <Hash className="w-4 h-4" />,
      title: "PHONE",
      text: personalInfo.phone || "Phone not specified",
    },
    {
      icon: <BarChart className="w-4 h-4" />,
      title: "METRICS",
      text: `${skills.length} skills analyzed`,
    },
  ];

  // Additional personal info
  const additionalInfo = [
    personalInfo.website && {
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      text: personalInfo.website.replace(/^https?:\/\//, ""),
      url: personalInfo.website,
    },
    personalInfo.availability && {
      icon: <Clock className="w-4 h-4 text-green-400" />,
      text: `Available: ${personalInfo.availability}`,
    },
    personalInfo.nationality && {
      icon: <MapPin className="w-4 h-4 text-blue-400" />,
      text: personalInfo.nationality,
    },
  ].filter(Boolean);

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
                {personalInfo.fullName}
              </span>
            </h1>
            {personalInfo.title && (
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">
                  {personalInfo.title}
                </span>
              </div>
            )}
            <p className="text-xs text-slate-300">
              {personalInfo.summary?.split(".")[0] ||
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
        <div className="grid grid-cols-4 gap-4 text-xs">
          {statsInfo.map((info, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                {info.icon}
                <span>{info.title}</span>
              </div>
              <div className="text-blue-300 font-medium">{info.text}</div>
            </div>
          ))}
        </div>

        {/* Additional Personal Info */}
        {additionalInfo.length > 0 && (
          <div className="flex gap-4 text-xs mt-4">
            {additionalInfo.map((info: any, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {info.icon}
                {info.url ? (
                  <a
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-200 hover:underline"
                  >
                    {info.text}
                  </a>
                ) : (
                  <span className="text-slate-400">{info.text}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="relative z-10 mb-4 space-y-6">
        {personalInfo.summary && (
          <section className="bg-gradient-to-r from-slate-900/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <Database className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="font-bold text-white">ANALYTICAL PROFILE</h2>
            </div>
            <p className="text-slate-200 leading-relaxed text-xs text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8 relative z-10">
        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Experience - ENHANCED */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30">
                <TrendingUp className="w-4 h-4 text-blue-300" />
              </div>
              <h2 className="font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                DATA TRAJECTORY
              </h2>
            </div>

            {experience.map((exp: any, idx) => (
              <div
                key={exp.id}
                className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white mb-1">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-cyan-300 font-medium text-xs">
                        {exp.company}
                      </span>
                      {exp.employmentType && (
                        <>
                          <span className="text-slate-500 text-xs">•</span>
                          <span className="text-xs text-slate-400">
                            {exp.employmentType}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Additional Experience Info */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </div>
                      )}
                      {exp.industry && (
                        <div className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {exp.industry}
                        </div>
                      )}
                      {exp.teamSize && exp.teamSize > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Team: {exp.teamSize}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/30">
                      {exp.startDate} → {exp.endDate || "NOW"}
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-slate-300 leading-relaxed text-xs text-justify mb-4">
                    {exp.description}
                  </p>
                )}

                {/* Technologies Used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-cyan-300">
                        TECHNOLOGY STREAM
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech: string, techIdx: number) => (
                        <span
                          key={techIdx}
                          className="px-2 py-1 rounded-lg bg-blue-900/20 border border-blue-500/20 text-xs text-blue-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-300">
                        ACHIEVEMENT METRICS
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map(
                        (achievement: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-300 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50 mt-1 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Metrics & Impact */}
                <MetricsRenderer metrics={exp.metrics} />

                {/* Awards */}
                {exp.awards && exp.awards.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-300">
                        RECOGNITION STREAM
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.awards.map((award: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-300 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50 mt-1 flex-shrink-0" />
                          <span>{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Projects - ENHANCED */}
          {projects.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                  <Server className="w-4 h-4 text-purple-300" />
                </div>
                <h2 className="font-bold text-white">PROJECT PIPELINES</h2>
              </div>

              {projects.map((proj: any, idx) => (
                <div
                  key={proj.id}
                  className="bg-gradient-to-r from-slate-900/30 to-purple-900/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white mb-1 text-sm">
                      {proj.name}
                    </h3>
                    {proj.date && (
                      <div className="text-xs text-slate-300 bg-blue-900/30 px-2 py-1 rounded">
                        {proj.date}
                      </div>
                    )}
                  </div>

                  {proj.role && (
                    <div className="flex items-center gap-1 mb-2">
                      <Users className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs text-cyan-300">{proj.role}</span>
                    </div>
                  )}

                  {proj.description && (
                    <p className="text-xs text-justify text-slate-300 mb-3">
                      {proj.description}
                    </p>
                  )}

                  {/* Duration & Team Size */}
                  {(proj.duration || proj.teamSize) && (
                    <div className="flex gap-4 text-xs text-slate-400 mb-3">
                      {proj.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Duration: {proj.duration}
                        </div>
                      )}
                      {proj.teamSize && proj.teamSize > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Team: {proj.teamSize}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Key Features */}
                  {proj.features && proj.features.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-bold text-yellow-300">
                          FEATURE STREAM
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {proj.features.map((feature: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-300 flex items-start gap-1"
                          >
                            <span className="w-1 h-1 rounded-full bg-yellow-400/50 mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <Code className="w-3 h-3 text-purple-400" />
                        <span className="text-xs font-bold text-purple-300">
                          TECH STACK
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map(
                          (tech: string, techIdx: number) => (
                            <span
                              key={techIdx}
                              className="text-xs px-2 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Project Links */}
                  {(proj.url || proj.liveUrl || proj.repoUrl) && (
                    <div className="flex gap-3">
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-300 hover:text-cyan-200 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Project
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-300 hover:text-green-200 hover:underline flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" />
                          Live
                        </a>
                      )}
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-300 hover:text-purple-200 hover:underline flex items-center gap-1"
                        >
                          <Code className="w-3 h-3" />
                          Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills - ENHANCED */}
          <section className="bg-gradient-to-b from-blue-900/30 to-transparent backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-600/30 to-purple-600/30">
                <Code className="w-4 h-4 text-indigo-300" />
              </div>
              <h2 className="text-sm font-bold text-white">TECHNOLOGY STACK</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="text-xs px-2 py-1 rounded-lg bg-blue-900/20 border border-blue-500/20 text-left text-blue-200 hover:bg-blue-800/30 hover:border-blue-400/30 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* Skill Categories */}
            <SkillCategoriesRenderer data={data} />

            {/* Languages */}
            <LanguagesRenderer data={data} />

            {/* Certifications */}
            <CertificationsRenderer data={data} />

            {/* Proficiency Levels */}
            {proficiencyLevels.length > 0 && (
              <div className="mt-4 pt-6 border-t border-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-green-400" />
                  <h3 className="font-bold text-white">
                    PROFICIENCY ANALYTICS
                  </h3>
                </div>
                <div className="space-y-3">
                  {proficiencyLevels.map((level, idx) => {
                    const [skill, proficiency] = level
                      .split(":")
                      .map((s) => s.trim());
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">{skill}</span>
                          <span className="text-green-400 font-medium">
                            {proficiency}
                          </span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                            style={{
                              width:
                                proficiency === "Expert"
                                  ? "100%"
                                  : proficiency === "Advanced"
                                  ? "80%"
                                  : proficiency === "Intermediate"
                                  ? "60%"
                                  : proficiency === "Beginner"
                                  ? "40%"
                                  : "50%",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* Education - ENHANCED */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <BarChart3 className="w-4 h-4 text-cyan-300" />
              </div>
              <h2 className="text-sm font-bold text-white">
                EDUCATION METRICS
              </h2>
            </div>

            {education.map((edu: any, idx) => (
              <div
                key={edu.id}
                className="bg-gradient-to-r from-slate-900/30 to-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50"
              >
                <h3 className="font-bold text-white mb-1 text-sm">
                  {edu.degree}
                </h3>
                <p className="text-xs text-slate-400 mb-2">{edu.school}</p>

                {/* Additional Education Info */}
                <div className="space-y-2 mb-3">
                  {edu.fieldOfStudy && (
                    <div className="flex items-center gap-1 text-xs text-cyan-400">
                      <BookOpen className="w-3 h-3" />
                      {edu.fieldOfStudy}
                    </div>
                  )}

                  {edu.type && (
                    <div className="inline-block text-xs text-slate-300 bg-blue-900/30 px-2 py-1 rounded">
                      {edu.type}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-cyan-400">
                    DATA POINT: {edu.graduationDate}
                  </div>

                  {edu.gpa && (
                    <div className="text-xs text-slate-300">GPA: {edu.gpa}</div>
                  )}
                </div>

                {/* Location */}
                {edu.location && (
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </div>
                )}

                {/* Honors */}
                {edu.honors && edu.honors.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Award className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-300">
                        HONORS
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {edu.honors.map((honor: string, idx: number) => (
                        <li key={idx} className="text-xs text-slate-400">
                          • {honor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Social Links */}
          <SocialLinksRenderer data={data} />
        </div>
      </div>

      {/* Custom Sections (Placed AFTER Main Content Grid) */}
      {customSectionsToRender.length > 0 && (
        <div className="mt-8 relative z-10 space-y-8">
          {customSectionsToRender.map((sectionId) =>
            renderCustomSection(sectionId)
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 bottom-6 relative z-10">
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
