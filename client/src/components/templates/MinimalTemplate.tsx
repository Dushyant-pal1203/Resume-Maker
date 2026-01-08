import { ResumeContent } from "@shared/schema";

interface TemplateProps {
  data: ResumeContent;
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, sectionOrder = ['personal-info', 'experience', 'education', 'skills', 'projects'] } = data;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'personal-info':
        return (
          <section key="profile">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">Profile</h2>
            <p className="text-slate-600 leading-relaxed text-center max-w-2xl mx-auto italic">{personalInfo.summary}</p>
          </section>
        );
      case 'experience':
        return experience.length > 0 && (
          <section key="experience">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">Experience</h2>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-lg font-medium text-slate-900">{exp.position} at {exp.company}</h3>
                    <span className="text-sm text-slate-400 italic">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case 'education':
        return education.length > 0 && (
          <section key="education">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-medium text-slate-900 text-center">{edu.school}</h3>
                  <p className="text-slate-600 text-sm text-center">{edu.degree}</p>
                  <p className="text-slate-400 text-xs italic text-center">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case 'skills':
        return skills.length > 0 && (
          <section key="skills">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">Skills</h2>
            <p className="text-slate-600 leading-loose text-center">
              {skills.join(" • ")}
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-16 font-serif">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-slate-900 mb-4 tracking-tight">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center items-center gap-6 text-sm text-slate-500 border-y border-slate-100 py-3">
          <span>{personalInfo.email}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span>{personalInfo.phone}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span>{personalInfo.address}</span>
        </div>
      </div>
      <div className="space-y-12">
        {sectionOrder.map(renderSection)}
      </div>
    </div>
  );
}
