import { ResumeContent } from "@shared/schema";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  Users,
  Award,
  Languages,
  BookOpen,
  Code,
  Database,
  Cloud,
  Server,
  ExternalLink,
  Zap,
  Target,
  Star,
  Cpu,
  Wrench as Tool,
  Lock,
  Calendar,
  Clock,
  Shield,
  Building,
  FileText,
  GraduationCap,
  BarChart,
  PieChart,
  Activity,
} from "lucide-react";

interface TemplateProps {
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
            className="text-slate-600 leading-relaxed prose prose-sm"
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
                className="text-slate-600 flex items-start gap-2 text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
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
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200"
                >
                  {badge}
                </span>
              ))}
          </div>
        );

      case "date":
        return (
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{section.content as string}</span>
          </div>
        );

      case "link":
        return (
          <a
            href={section.content as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark hover:underline flex items-center gap-2 text-sm"
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
    <section className="mt-8">
      <h2 className="text-xl font-bold text-primary mb-4">{section.title}</h2>
      {renderContent()}
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
        return <Activity className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  if (Object.keys(socialLinks).length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-primary mb-4">Online Presence</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(socialLinks).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded border border-slate-200 hover:border-primary/30 hover:bg-slate-50 transition-colors"
          >
            <div className="text-primary">{getPlatformIcon(platform)}</div>
            <div className="text-xs">
              <div className="font-medium text-slate-800">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </div>
              <div className="text-slate-500 truncate">
                {url.replace(/^https?:\/\//, "")}
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

  const categoryNames: Record<string, string> = {
    programming: "Programming Languages",
    frameworks: "Frameworks & Libraries",
    databases: "Databases",
    cloud: "Cloud Platforms",
    devops: "DevOps & Tools",
    tools: "Tools & Technologies",
    softSkills: "Soft Skills",
  };

  return (
    <div className="space-y-4 mt-4">
      {Object.entries(categoryIcons).map(([category, icon]) => {
        const skills = skillCategories[category] as string[] | undefined;
        if (!skills || skills.length === 0) return null;

        return (
          <div key={category} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-primary">{icon}</div>
              <h4 className="text-sm font-semibold text-slate-800">
                {categoryNames[category] || category}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200"
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
    Fluent: "bg-blue-500",
    Professional: "bg-primary",
    Intermediate: "bg-yellow-500",
    Basic: "bg-orange-500",
  };

  return (
    <div className="mt-6 pt-6 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Languages className="w-4 h-4 text-primary" />
        <h3 className="font-bold text-slate-800">Languages</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm text-slate-800">{lang.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  proficiencyColors[lang.proficiency]
                }`}
              />
              <span className="text-xs text-slate-600">{lang.proficiency}</span>
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
    <div className="mt-6 pt-6 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4 text-primary" />
        <h3 className="font-bold text-slate-800">Certifications</h3>
      </div>
      <div className="space-y-3">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-slate-50 border border-slate-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-sm text-slate-800">
                  {cert.name}
                </h4>
                <div className="text-sm text-slate-600 mt-1">
                  Issued by <span className="font-medium">{cert.issuer}</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                {cert.date}
              </div>
            </div>
            {cert.credentialId && (
              <div className="mt-2 text-sm text-slate-600">
                ID: <span className="font-mono">{cert.credentialId}</span>
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
          className="p-3 rounded-lg bg-slate-50 border border-slate-200"
        >
          <div className="text-sm text-slate-600 mb-1">
            {metric.description}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-800">
              {metric.value}
            </span>
            <span className="text-sm text-primary">{metric.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ModernTemplate({ data }: TemplateProps) {
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
  const renderSection = (sectionId: string) => {
    // Custom section
    const customSection = customSections.find((s: any) => s.id === sectionId);
    if (customSection) {
      return <CustomSectionRenderer key={sectionId} section={customSection} />;
    }

    // Social Links
    if (sectionId === "social-links") {
      return <SocialLinksRenderer key={sectionId} data={data} />;
    }

    switch (sectionId) {
      case "personal-info":
        return (
          <section key="summary" className="mt-8">
            <h2 className="text-xl font-bold text-primary mb-3">
              Professional Summary
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {personalInfo.summary}
            </p>

            {/* Additional Personal Info */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {personalInfo.title && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-sm text-slate-600">
                    {personalInfo.title}
                  </span>
                </div>
              )}

              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary-dark hover:underline"
                  >
                    Portfolio
                  </a>
                </div>
              )}

              {personalInfo.availability && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-slate-600">
                    Available: {personalInfo.availability}
                  </span>
                </div>
              )}

              {personalInfo.nationality && (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm text-slate-600">
                    {personalInfo.nationality}
                    {personalInfo.visaStatus && ` • ${personalInfo.visaStatus}`}
                  </span>
                </div>
              )}
            </div>
          </section>
        );
      case "experience":
        return (
          experience.length > 0 && (
            <section key="experience" className="mt-8">
              <h2 className="text-xl font-bold text-primary mb-4">
                Work Experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp: any) => (
                  <div
                    key={exp.id}
                    className="pb-6 border-b border-slate-200 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800 text-lg">
                        {exp.position}
                      </h3>
                      <span className="text-sm font-medium text-slate-400">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-primary font-semibold">
                        {exp.company}
                      </p>
                      {exp.employmentType && (
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          {exp.employmentType}
                        </span>
                      )}
                    </div>

                    {/* Additional Experience Info */}
                    <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-3">
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
                          Team of {exp.teamSize}
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies Used */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold text-slate-800">
                            Technologies
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs font-medium text-primary px-2 py-1 border border-primary/20 rounded"
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
                          <Star className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold text-slate-800">
                            Key Achievements
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {exp.achievements.map(
                            (achievement: string, idx: number) => (
                              <li
                                key={idx}
                                className="text-sm text-slate-600 flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Metrics */}
                    <MetricsRenderer metrics={exp.metrics} />

                    {/* Awards */}
                    {exp.awards && exp.awards.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold text-slate-800">
                            Awards & Recognition
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {exp.awards.map((award: string, idx: number) => (
                            <li key={idx} className="text-sm text-slate-600">
                              • {award}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case "education":
        return (
          education.length > 0 && (
            <section key="education" className="mt-8">
              <h2 className="text-xl font-bold text-primary mb-4">Education</h2>
              <div className="space-y-6">
                {education.map((edu: any) => (
                  <div
                    key={edu.id}
                    className="pb-6 border-b border-slate-200 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800">{edu.school}</h3>
                      <span className="text-sm text-slate-400">
                        {edu.graduationDate}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{edu.degree}</p>

                    {/* Additional Education Info */}
                    <div className="space-y-2">
                      {edu.fieldOfStudy && (
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <BookOpen className="w-4 h-4" />
                          {edu.fieldOfStudy}
                        </div>
                      )}

                      {edu.type && (
                        <div className="inline-block text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          {edu.type}
                        </div>
                      )}

                      {edu.location && (
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                      )}

                      {edu.gpa && (
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <BarChart className="w-4 h-4" />
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>

                    {/* Honors */}
                    {edu.honors && edu.honors.length > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Award className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold text-slate-800">
                            Honors
                          </h4>
                        </div>
                        <ul className="space-y-1">
                          {edu.honors.map((honor: string, idx: number) => (
                            <li key={idx} className="text-sm text-slate-600">
                              • {honor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Coursework */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-slate-800 mb-2">
                          Relevant Coursework
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case "skills":
        return (
          <section key="skills" className="mt-8">
            <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200"
                >
                  {skill}
                </span>
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
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-slate-800">
                    Proficiency Levels
                  </h3>
                </div>
                <div className="space-y-4">
                  {proficiencyLevels.map((level, idx) => {
                    const [skill, proficiency] = level
                      .split(":")
                      .map((s) => s.trim());
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-800">{skill}</span>
                          <span className="text-primary font-medium">
                            {proficiency}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
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
        return (
          projects.length > 0 && (
            <section key="projects" className="mt-8">
              <h2 className="text-xl font-bold text-primary mb-4">Projects</h2>
              <div className="space-y-6">
                {projects.map((proj: any) => (
                  <div
                    key={proj.id}
                    className="pb-6 border-b border-slate-200 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800">{proj.name}</h3>
                      {proj.date && (
                        <span className="text-sm text-slate-400">
                          {proj.date}
                        </span>
                      )}
                    </div>

                    {proj.role && (
                      <div className="flex items-center gap-1 mb-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm text-slate-600">
                          {proj.role}
                        </span>
                      </div>
                    )}

                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Duration & Team Size */}
                    <div className="flex gap-4 text-sm text-slate-600 mb-3">
                      {proj.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Duration: {proj.duration}
                        </div>
                      )}
                      {proj.teamSize && proj.teamSize > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Team: {proj.teamSize}
                        </div>
                      )}
                    </div>

                    {/* Key Features */}
                    {proj.features && proj.features.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold text-slate-800">
                            Key Features
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {proj.features.map((feature: string, idx: number) => (
                            <li
                              key={idx}
                              className="text-sm text-slate-600 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                      {proj.technologies.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold text-primary px-1 border border-primary/20 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    {(proj.url || proj.liveUrl || proj.repoUrl) && (
                      <div className="flex gap-3">
                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:text-primary-dark hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Project
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:text-primary-dark hover:underline flex items-center gap-1"
                          >
                            <Globe className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                        {proj.repoUrl && (
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:text-primary-dark hover:underline flex items-center gap-1"
                          >
                            <Code className="w-4 h-4" />
                            Repository
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      default:
        return null;
    }
  };

  // Determine sections to render
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

  return (
    <div className="a4-paper p-10 md:p-12 text-slate-800 font-sans leading-relaxed text-sm bg-white">
      <header className="border-b-2 border-slate-800 pb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-slate-900 mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>

        {personalInfo.title && (
          <h2 className="text-lg text-primary font-semibold mb-4">
            {personalInfo.title}
          </h2>
        )}

        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.address}
            </div>
          )}

          {/* Additional Contact Info */}
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Portfolio
              </a>
            </div>
          )}

          {personalInfo.pronouns && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {personalInfo.pronouns}
            </div>
          )}
        </div>
      </header>

      {sectionsToRender.map(renderSection)}
    </div>
  );
}
