import { ResumeContent } from "@shared/schema";
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
  FileText,
  Calendar,
  Link as LinkIcon,
  BrainCircuit,
  Linkedin,
  Github,
  Twitter,
  Award,
  Languages,
  BookOpen,
  Users,
  Code,
  Database,
  Cloud,
  Server,
  Lock,
  ExternalLink,
  Zap,
  Target,
  Palette,
  Sparkles,
  Briefcase,
  GraduationCap,
  Wrench as Tool,
  Star,
  PieChart,
  Activity,
  Info,
  Shield,
  Key,
  Clock,
  CalendarDays,
  Tag,
  Percent,
  DollarSign,
  Building,
  Home,
  Wifi,
  Battery,
  Smartphone,
  Monitor,
  Camera,
  Headphones,
  Music,
  Video,
  Film,
  Image,
  File,
  Folder,
  HardDrive,
  Save,
  Edit,
  Archive,
  Inbox,
  Send,
  MessageSquare,
  Voicemail,
  Volume2,
  VolumeX,
  Play,
  Pause,
  StopCircle,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Speaker,
  Headphones as HeadphoneIcon,
  Disc,
  Aperture,
  Command,
} from "lucide-react";

interface QuantumMatrixTemplateProps {
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
   🔹 RANDOM ICON POOL FOR CUSTOM SECTIONS
========================================================= */
const ICON_POOL = [
  Grid3x3,
  Cpu,
  Network,
  Binary,
  CircuitBoard,
  Atom,
  Globe,
  Cog,
  BrainCircuit,
  FileText,
  Award,
  Languages,
  BookOpen,
  Users,
  Code,
  Database,
  Cloud,
  Server,
  Lock,
  Zap,
  Target,
  Briefcase,
  GraduationCap,
  Tool,
  Star,
  PieChart,
  Activity,
  Info,
  Shield,
  Key,
  Clock,
  CalendarDays,
  Tag,
  Building,
  Smartphone,
  Monitor,
  Camera,
  Headphones,
];

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
  /* ---------- Stable Random Icon Generator ---------- */
  const getRandomIcon = () => {
    let hash = 0;
    for (let i = 0; i < section.id.length; i++) {
      hash = section.id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % ICON_POOL.length;
    const Icon = ICON_POOL[index];
    return <Icon className="w-4 h-4" />;
  };

  /* ---------- Content Renderer ---------- */
  const renderContent = () => {
    switch (section.type) {
      case "text":
      case "rich-text":
        return (
          <div
            className="text-xs text-slate-400 text-justify leading-relaxed prose prose-sm"
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
          <ul className="space-y-1">
            {(section.content as string[]).map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-400 flex items-start gap-2"
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
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-xs text-purple-300 font-medium"
                >
                  {badge}
                </span>
              ))}
          </div>
        );

      case "date":
        return (
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Calendar className="w-4 h-4" />
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
    <>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30">
          {getRandomIcon()}
        </div>
        <h3 className="font-bold text-white">{section.title}</h3>
      </div>

      <div className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800/50 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-shimmer" />
        <div className="p-1">{renderContent()}</div>
      </div>
    </>
  );
}

/* =========================================================
   🔹 SOCIAL LINKS COMPONENT - ENHANCED
========================================================= */
function SocialLinksRenderer({ data }: { data: ResumeContent }) {
  const socialLinks = data.personalInfo.socialLinks || {};

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "github":
        return <Github className="w-4 h-4" />;
      case "gitlab":
        return <Code className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "portfolio":
        return <Globe className="w-4 h-4" />;
      case "medium":
        return <BookOpen className="w-4 h-4" />;
      case "stackoverflow":
        return <Database className="w-4 h-4" />;
      case "dribbble":
      case "behance":
        return <Palette className="w-4 h-4" />;
      case "leetcode":
      case "hackerrank":
      case "codepen":
        return <Code className="w-4 h-4" />;
      case "kaggle":
        return <PieChart className="w-4 h-4" />;
      case "devto":
        return <FileText className="w-4 h-4" />;
      case "youtube":
        return <Video className="w-4 h-4" />;
      case "upwork":
      case "angel":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return "LinkedIn";
      case "github":
        return "GitHub";
      case "gitlab":
        return "GitLab";
      case "twitter":
        return "Twitter/X";
      case "portfolio":
        return "Portfolio";
      case "dribbble":
        return "Dribbble";
      case "behance":
        return "Behance";
      case "medium":
        return "Medium";
      case "stackoverflow":
        return "Stack Overflow";
      case "leetcode":
        return "LeetCode";
      case "hackerrank":
        return "HackerRank";
      case "codepen":
        return "CodePen";
      case "codewars":
        return "Codewars";
      case "kaggle":
        return "Kaggle";
      case "devto":
        return "Dev.to";
      case "youtube":
        return "YouTube";
      case "upwork":
        return "Upwork";
      case "angel":
        return "AngelList";
      default:
        return platform;
    }
  };

  if (Object.keys(socialLinks).length === 0) return null;

  return (
    <section key="social-links" className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
          <Network className="w-5 h-5 text-cyan-300" />
        </div>
        <h2 className="font-bold text-white">DIGITAL FOOTPRINT</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(socialLinks).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-3 border border-slate-800/50 hover:border-cyan-500/30 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="text-cyan-400">{getPlatformIcon(platform)}</div>
              <div className="text-xs">
                <div className="font-medium text-white">
                  {getPlatformName(platform)}
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
   🔹 SKILL CATEGORIES COMPONENT - ENHANCED
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
    methodologies: <Cog className="w-4 h-4" />,
    softSkills: <Users className="w-4 h-4" />,
  };

  const categoryNames: Record<string, string> = {
    programming: "Programming Languages",
    frameworks: "Frameworks & Libraries",
    databases: "Databases",
    cloud: "Cloud Platforms",
    devops: "DevOps & Tools",
    tools: "Tools & Technologies",
    methodologies: "Methodologies",
    softSkills: "Soft Skills",
  };

  const categoryColors: Record<string, string> = {
    programming: "from-cyan-600/20 to-blue-600/20",
    frameworks: "from-purple-600/20 to-pink-600/20",
    databases: "from-green-600/20 to-emerald-600/20",
    cloud: "from-blue-600/20 to-indigo-600/20",
    devops: "from-orange-600/20 to-red-600/20",
    tools: "from-yellow-600/20 to-amber-600/20",
    methodologies: "from-gray-600/20 to-slate-600/20",
    softSkills: "from-pink-600/20 to-rose-600/20",
  };

  return (
    <div className="space-y-4">
      {Object.entries(categoryIcons).map(([category, icon]) => {
        const skills = skillCategories[category] as string[] | undefined;
        if (!skills || skills.length === 0) return null;

        return (
          <div key={category} className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg ${categoryColors[category]} bg-gradient-to-r`}
              >
                {icon}
              </div>
              <h4 className="text-sm font-bold text-white">
                {categoryNames[category] || category}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-lg border text-xs font-medium
                    ${
                      category === "programming"
                        ? "border-cyan-500/30 text-cyan-300"
                        : ""
                    }
                    ${
                      category === "frameworks"
                        ? "border-purple-500/30 text-purple-300"
                        : ""
                    }
                    ${
                      category === "databases"
                        ? "border-green-500/30 text-green-300"
                        : ""
                    }
                    ${
                      category === "cloud"
                        ? "border-blue-500/30 text-blue-300"
                        : ""
                    }
                    ${
                      category === "devops"
                        ? "border-orange-500/30 text-orange-300"
                        : ""
                    }
                    ${
                      category === "tools"
                        ? "border-yellow-500/30 text-yellow-300"
                        : ""
                    }
                    ${
                      category === "methodologies"
                        ? "border-gray-500/30 text-gray-300"
                        : ""
                    }
                    ${
                      category === "softSkills"
                        ? "border-pink-500/30 text-pink-300"
                        : ""
                    }
                  `}
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

  const proficiencyTextColors: Record<string, string> = {
    Native: "text-green-400",
    Fluent: "text-cyan-400",
    Professional: "text-blue-400",
    Intermediate: "text-yellow-400",
    Basic: "text-orange-400",
  };

  return (
    <div className="mt-6 pt-6 border-t border-slate-800/50">
      <div className="flex items-center gap-2 mb-4">
        <Languages className="w-4 h-4 text-purple-400" />
        <h3 className="font-bold text-white">Languages</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30"
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
              <span
                className={`text-xs font-medium ${
                  proficiencyTextColors[lang.proficiency]
                }`}
              >
                {lang.proficiency}
              </span>
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
    <div className="mt-6 pt-6 border-t border-slate-800/50">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4 text-yellow-400" />
        <h3 className="font-bold text-white">Certifications</h3>
      </div>
      <div className="space-y-3">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-white">{cert.name}</h4>
                <div className="text-xs text-slate-400 mt-1">
                  Issued by <span className="text-cyan-300">{cert.issuer}</span>
                </div>
              </div>
              <div className="text-xs text-slate-300 bg-slate-800/50 px-2 py-1 rounded">
                {cert.date}
              </div>
            </div>
            {(cert.credentialId || cert.url) && (
              <div className="flex items-center gap-2 mt-2">
                {cert.credentialId && (
                  <span className="text-xs text-slate-400">
                    ID:{" "}
                    <span className="text-yellow-300">{cert.credentialId}</span>
                  </span>
                )}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-300 hover:text-cyan-200 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Verify
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   🔹 METRICS COMPONENT FOR EXPERIENCE
========================================================= */
function MetricsRenderer({ metrics }: { metrics: Metric[] | undefined }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="p-2 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50"
        >
          <div className="text-xs text-slate-400 mb-1">
            {metric.description}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-white">{metric.value}</span>
            <span className="text-sm text-cyan-400">{metric.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   🔹 MAIN TEMPLATE
========================================================= */
export function QuantumMatrixTemplate({ data }: QuantumMatrixTemplateProps) {
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

  // Helper function to render section by ID
  const renderSectionById = (sectionId: string) => {
    // Custom section
    const customSection = customSections.find((s: any) => s.id === sectionId);
    if (customSection) {
      return (
        <div key={sectionId} className="section-container">
          <CustomSectionRenderer section={customSection} />
        </div>
      );
    }

    switch (sectionId) {
      case "personal-info":
        return (
          <section
            key="personal-info"
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-800/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-purple-600/30">
                <Binary className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="font-bold text-white">QUANTUM PROFILE</h2>
            </div>

            {/* Additional Personal Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-300 hover:text-cyan-200 hover:underline truncate"
                  >
                    {personalInfo.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}

              {personalInfo.availability && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-slate-300">
                    Available: {personalInfo.availability}
                  </span>
                </div>
              )}

              {personalInfo.nationality && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-300">
                    {personalInfo.nationality}
                  </span>
                </div>
              )}

              {personalInfo.visaStatus && (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-slate-300">
                    Visa: {personalInfo.visaStatus}
                  </span>
                </div>
              )}
            </div>

            {personalInfo.summary && (
              <p className="text-slate-300 leading-relaxed text-justify text-sm">
                {personalInfo.summary}
              </p>
            )}
          </section>
        );

      case "experience":
        return (
          <section key="experience" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                <Cpu className="w-5 h-5 text-purple-300" />
              </div>
              <h2 className="font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                EXPERIENCE MATRIX
              </h2>
            </div>

            {experience.map((exp: any) => (
              <div
                key={exp.id}
                className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border border-slate-800/50 relative overflow-hidden group hover:border-cyan-500/30 transition-colors"
              >
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
                    {exp.employmentType && (
                      <div className="inline-block text-xs text-slate-300 bg-slate-800/50 px-2 py-1 rounded-full mt-1">
                        {exp.employmentType}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300 bg-slate-800/50 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.endDate || "PRESENT"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {exp.location && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">
                        {exp.location}
                      </span>
                    </div>
                  )}

                  {exp.industry && (
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">
                        {exp.industry}
                      </span>
                    </div>
                  )}

                  {exp.teamSize && exp.teamSize > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">
                        Team: {exp.teamSize}
                      </span>
                    </div>
                  )}
                </div>

                {exp.description && (
                  <p className="text-slate-400 text-sm text-justify leading-relaxed mb-3">
                    {exp.description}
                  </p>
                )}

                {/* Technologies Used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold text-purple-300">
                        Technologies
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-bold text-yellow-300">
                        Key Achievements
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {exp.achievements.map(
                        (achievement: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-400 flex items-start gap-2"
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
                      <span className="text-sm font-bold text-yellow-300">
                        Awards & Recognition
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {exp.awards.map((award: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-400 flex items-start gap-2"
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
        );

      case "education":
        return (
          <section key="education" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600/30 to-indigo-600/30">
                <Cog className="w-5 h-5 text-blue-300" />
              </div>
              <h2 className="font-bold text-white">EDUCATION NODES</h2>
            </div>

            {education.map((edu: any) => (
              <div
                key={edu.id}
                className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-slate-400">{edu.school}</p>
                    {edu.type && (
                      <div className="inline-block text-xs text-cyan-400 bg-slate-800/50 px-2 py-1 rounded-full mt-1">
                        {edu.type}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300 bg-slate-800/50 px-2 py-1 rounded">
                      {edu.graduationDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  {edu.location && (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Globe className="w-3 h-3" />
                      {edu.location}
                    </div>
                  )}

                  {edu.gpa && (
                    <div className="flex items-center justify-end gap-1 text-xs text-slate-400">
                      <Target className="w-3 h-3" />
                      GPA: {edu.gpa}
                    </div>
                  )}

                  {edu.fieldOfStudy && (
                    <div className="col-span-2 flex items-center gap-1 text-xs text-slate-400">
                      <BookOpen className="w-3 h-3" />
                      {edu.fieldOfStudy}
                    </div>
                  )}
                </div>

                {/* Duration */}
                {edu.duration && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />
                    Duration: {edu.duration}
                  </div>
                )}

                {/* Thesis */}
                {edu.thesis && (
                  <div className="mt-2">
                    <div className="flex items-center gap-1 mb-1">
                      <FileText className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs font-bold text-cyan-300">
                        Thesis
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{edu.thesis}</p>
                  </div>
                )}

                {/* Honors */}
                {edu.honors && edu.honors.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Award className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-300">
                        Honors
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {edu.honors.map((honor: string, idx: number) => (
                        <li key={idx} className="text-xs text-slate-400">
                          {honor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Coursework */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center gap-1 mb-1">
                      <BookOpen className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-bold text-green-300">
                        Relevant Coursework
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {edu.coursework.map((course: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-300 border border-green-500/20"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
        );

      case "skills":
        return (
          <section
            key="skills"
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-800/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30">
                <Atom className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="font-bold text-white">CORE COMPETENCIES</h2>
            </div>

            {/* Main Skills */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/30 text-xs text-cyan-200 font-medium"
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
            </div>

            {/* Proficiency Levels */}
            {proficiencyLevels.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800/50">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-green-400" />
                  <h3 className="font-bold text-white">Proficiency Levels</h3>
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
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
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
        );

      case "projects":
        return projects.length > 0 ? (
          <section key="projects" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30">
                <Network className="w-5 h-5 text-purple-300" />
              </div>
              <h2 className="font-bold text-white">PROJECT MATRICES</h2>
            </div>

            {projects.map((proj: any) => (
              <div
                key={proj.id}
                className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-white">{proj.name}</h3>
                  {proj.date && (
                    <div className="text-xs text-slate-300 bg-slate-800/50 px-2 py-1 rounded">
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
                  <p className="text-xs text-justify text-slate-400 mb-3">
                    {proj.description}
                  </p>
                )}

                {/* Duration & Team Size */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {proj.duration && (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      Duration: {proj.duration}
                    </div>
                  )}

                  {proj.teamSize && proj.teamSize > 0 && (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Users className="w-3 h-3" />
                      Team: {proj.teamSize}
                    </div>
                  )}
                </div>

                {proj.features && proj.features.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-300">
                        Key Features
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {proj.features.map((feature: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-400 flex items-start gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-yellow-400/50 mt-1.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impact */}
                {proj.impact && proj.impact.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Target className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-bold text-green-300">
                        Impact
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {proj.impact.map((impact: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-400 flex items-start gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-green-400/50 mt-1.5 flex-shrink-0" />
                          <span>{impact}</span>
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
                        Technologies
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map(
                        (tech: string, techIdx: number) => (
                          <span
                            key={techIdx}
                            className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-300 hover:text-cyan-200 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}

                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-300 hover:text-purple-200 hover:underline flex items-center gap-1"
                    >
                      <Github className="w-3 h-3" />
                      Repository
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>
        ) : null;

      case "social-links":
        return <SocialLinksRenderer data={data} />;

      default:
        return null;
    }
  };

  // Determine which sections to render
  const getSectionsToRender = () => {
    if (sectionOrder.length > 0) return sectionOrder;

    return [
      "personal-info",
      "experience",
      "education",
      "skills",
      "projects",
      "social-links",
      ...customSections.map((s: any) => s.id),
    ];
  };

  const sectionsToRender = getSectionsToRender();

  // Enhanced contact info with new fields
  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4 text-purple-400" />,
      text: personalInfo.email || "email@example.com",
    },
    {
      icon: <CircuitBoard className="w-4 h-4 text-cyan-400" />,
      text: personalInfo.phone || "Phone not specified",
    },
    {
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      text: personalInfo.address || "Location not specified",
    },
    {
      icon: <Network className="w-4 h-4 text-purple-400" />,
      text: `${skills.length} Core Skill${skills.length !== 1 ? "s" : ""}`,
    },
  ];

  // Additional personal info
  const additionalInfo = [
    personalInfo.pronouns && {
      icon: <Users className="w-4 h-4 text-pink-400" />,
      text: personalInfo.pronouns,
    },
    personalInfo.availability && {
      icon: <Clock className="w-4 h-4 text-green-400" />,
      text: `Available ${personalInfo.availability}`,
    },
    personalInfo.noticePeriod && {
      icon: <Calendar className="w-4 h-4 text-yellow-400" />,
      text: `Notice: ${personalInfo.noticePeriod}`,
    },
  ].filter(Boolean);

  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 text-white p-5 font-sans relative overflow-hidden">
      {/* HEADER */}
      <div className="relative z-10 mb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="w-[70%]">
            <h1 className="text-4xl flex gap-1 items-center font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              {personalInfo.fullName || "Quantum Professional"}
            </h1>
            <div className="flex gap-2">
              <div className="mt-1 w-3 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <p className="text-xs text-slate-300">
                {personalInfo.title && (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h3 className="text-xs font-bold text-slate-300">
                      {personalInfo.title}
                    </h3>
                  </div>
                )}
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

        {/* Contact Info */}
        <div className="flex justify-between gap-6 text-xs mt-4">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {info.icon}
              <span className="text-slate-300">{info.text}</span>
            </div>
          ))}
        </div>

        {/* Additional Personal Info */}
        {additionalInfo.length > 0 && (
          <div className="flex gap-4 text-xs mt-3">
            {additionalInfo.map((info: any, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {info.icon}
                <span className="text-slate-400">{info.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAIN */}
      <div className="flex gap-4 relative z-10">
        <div className="flex-1 space-y-4">
          {sectionsToRender
            .filter((sectionId) => {
              const isCustom = customSections.some(
                (s: any) => s.id === sectionId
              );
              const isStandard = [
                "personal-info",
                "experience",
                "education",
                "skills",
                "projects",
                "social-links",
              ].includes(sectionId);
              return isCustom || isStandard;
            })
            .map((sectionId) => renderSectionById(sectionId))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
        <p className="text-xs text-slate-500">
          Generated with Nexus Resume Builder • Quantum Matrix Template
        </p>
      </div>
    </div>
  );
}
