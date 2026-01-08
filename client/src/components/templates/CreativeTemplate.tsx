import { ResumeContent } from "@shared/schema";
import { Mail, Phone, MapPin } from "lucide-react";

interface TemplateProps {
  data: ResumeContent;
}

export function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, sectionOrder = ['personal-info', 'experience', 'education', 'skills', 'projects'] } = data;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'experience':
        return experience.length > 0 && (
          <section key="experience" className="mb-12">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6 border-b-2 border-slate-100 pb-2">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l border-slate-100">
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-400">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case 'projects':
        return projects.length > 0 && (
          <section key="projects">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6 border-b-2 border-slate-100 pb-2">Featured Projects</h2>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-2">{proj.name}</h3>
                  <p className="text-slate-600 text-sm mb-3">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-bold text-primary uppercase">#{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-0 flex font-sans">
      <div className="w-1/3 bg-slate-900 text-slate-200 p-8 flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider leading-tight">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Contact</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /><span>{personalInfo.email}</span></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /><span>{personalInfo.phone}</span></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /><span>{personalInfo.address}</span></div>
            </div>
          </section>
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs">{skill}</span>
              ))}
            </div>
          </section>
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <h3 className="font-bold text-white text-sm">{edu.degree}</h3>
                <p className="text-xs text-slate-400">{edu.school}</p>
                <p className="text-xs text-slate-500 italic">{edu.graduationDate}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className="flex-1 p-12 bg-white">
        {sectionOrder.map(renderSection)}
      </div>
    </div>
  );
}
