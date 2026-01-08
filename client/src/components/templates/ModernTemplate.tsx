import { ResumeContent } from "@shared/schema";
import { Mail, Phone, MapPin } from "lucide-react";

interface TemplateProps {
  data: ResumeContent;
}

export function ModernTemplate({ data }: TemplateProps) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    sectionOrder = [
      "personal-info",
      "experience",
      "education",
      "skills",
      "projects",
    ],
  } = data;

  const renderSection = (sectionId: string) => {
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
          </section>
        );
      case "experience":
        return (
          experience.length > 0 && (
            <section key="experience" className="mt-8">
              <h2 className="text-xl font-bold text-primary mb-4">
                Work Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800 text-lg">
                        {exp.position}
                      </h3>
                      <span className="text-sm font-medium text-slate-400">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-primary font-semibold mb-2">
                      {exp.company}
                    </p>
                    <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed">
                      {exp.description}
                    </p>
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
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-800">{edu.school}</h3>
                    <p className="text-slate-600 text-sm">{edu.degree}</p>
                    <p className="text-slate-400 text-xs">
                      {edu.graduationDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case "skills":
        return (
          skills.length > 0 && (
            <section key="skills" className="mt-8">
              <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )
        );
      case "projects":
        return (
          projects.length > 0 && (
            <section key="projects" className="mt-8">
              <h2 className="text-xl font-bold text-primary mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-slate-800">{proj.name}</h3>
                    <p className="text-slate-600 text-sm mb-2">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold text-primary px-1 border border-primary/20 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

  return (
    <div className="a4-paper p-10 md:p-12 text-slate-800 font-sans leading-relaxed text-sm bg-white">
      <header className="border-b-2 border-slate-800 pb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-slate-900 mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
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
        </div>
      </header>
      {sectionOrder.map(renderSection)}
    </div>
  );
}
