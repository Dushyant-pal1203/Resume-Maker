import { useState, useEffect } from "react";
import { ResumeContent } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Calendar,
  GripVertical,
  Text,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ResumeEditorProps {
  data: ResumeContent;
  onChange: (data: ResumeContent) => void;
}

interface CustomSection {
  id: string;
  title: string;
  type: "text" | "list" | "date" | "link";
  content: string | string[];
}

// Sortable Accordion Item Component
function SortableAccordionItem({
  id,
  children,
  index,
}: {
  id: string;
  children: React.ReactNode;
  index: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-10"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
      </div>
      {children}
    </div>
  );
}

// Custom Accordion Trigger that makes the entire header clickable
function CustomAccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <AccordionTrigger
      className={`w-full cursor-pointer hover:no-underline hover:text-primary transition-colors ${className}`}
      {...props}
    >
      {children}
    </AccordionTrigger>
  );
}

export function ResumeEditor({ data, onChange }: ResumeEditorProps) {
  // Initialize custom sections from data or empty array
  const customSections = (data.customSections || []) as CustomSection[];

  const sectionOrder = data.sectionOrder || [
    "personal-info",
    "experience",
    "education",
    "skills",
    "projects",
    ...customSections.map((section) => section.id),
  ];

  // Set up drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id as string);
      const newIndex = sectionOrder.indexOf(over.id as string);

      const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
      onChange({ ...data, sectionOrder: newOrder });
    }
  };

  const handleChange = (
    section: keyof ResumeContent,
    field: string,
    value: any
  ) => {
    onChange({
      ...data,
      [section]: {
        ...data[section as keyof typeof data],
        [field]: value,
      },
    });
  };

  const updateListItem = (
    section: "experience" | "education" | "projects",
    index: number,
    field: string,
    value: any
  ) => {
    const list = [...data[section]];
    (list[index] as any)[field] = value;
    onChange({ ...data, [section]: list });
  };

  const addListItem = (section: "experience" | "education" | "projects") => {
    const newItem =
      section === "experience"
        ? {
            id: uuidv4(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
          }
        : section === "education"
        ? { id: uuidv4(), school: "", degree: "", graduationDate: "" }
        : { id: uuidv4(), name: "", description: "", technologies: [] };

    onChange({ ...data, [section]: [...data[section], newItem] });
  };

  const removeListItem = (
    section: "experience" | "education" | "projects",
    index: number
  ) => {
    const list = [...data[section]];
    list.splice(index, 1);
    onChange({ ...data, [section]: list });
  };

  // Custom sections handlers
  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: `custom-${uuidv4()}`,
      title: "New Section",
      type: "text",
      content: "",
    };

    const updatedSections = [...customSections, newSection];
    const updatedOrder = [...sectionOrder, newSection.id];

    onChange({
      ...data,
      customSections: updatedSections,
      sectionOrder: updatedOrder,
    });
  };

  const updateCustomSection = (index: number, field: string, value: any) => {
    const updatedSections = [...customSections];
    (updatedSections[index] as any)[field] = value;
    onChange({ ...data, customSections: updatedSections });
  };

  const removeCustomSection = (index: number) => {
    const updatedSections = [...customSections];
    const sectionId = updatedSections[index].id;
    updatedSections.splice(index, 1);

    const updatedOrder = sectionOrder.filter((id) => id !== sectionId);

    onChange({
      ...data,
      customSections: updatedSections,
      sectionOrder: updatedOrder,
    });
  };

  const addCustomListItem = (sectionIndex: number) => {
    const section = customSections[sectionIndex];
    if (section.type === "list") {
      const newContent = Array.isArray(section.content)
        ? [...section.content, ""]
        : [""];
      updateCustomSection(sectionIndex, "content", newContent);
    }
  };

  const updateCustomListItem = (
    sectionIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const section = customSections[sectionIndex];
    if (section.type === "list" && Array.isArray(section.content)) {
      const newContent = [...section.content];
      newContent[itemIndex] = value;
      updateCustomSection(sectionIndex, "content", newContent);
    }
  };

  const removeCustomListItem = (sectionIndex: number, itemIndex: number) => {
    const section = customSections[sectionIndex];
    if (section.type === "list" && Array.isArray(section.content)) {
      const newContent = [...section.content];
      newContent.splice(itemIndex, 1);
      updateCustomSection(sectionIndex, "content", newContent);
    }
  };

  const updateSkills = (value: string) => {
    const skillsArray = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    onChange({ ...data, skills: skillsArray });
  };

  const renderSection = (sectionId: string, index: number) => {
    switch (sectionId) {
      case "personal-info":
        return (
          <SortableAccordionItem key={sectionId} id={sectionId} index={index}>
            <AccordionItem
              value="personal-info"
              className="border border-slate-800/50 rounded-xl bg-slate-900/50 backdrop-blur-sm px-4 md:px-6 shadow-lg shadow-black/20 ml-10 md:ml-12"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
                    <span className="font-semibold text-base md:text-lg text-left">
                      Personal Information
                    </span>
                  </CustomAccordionTrigger>
                </div>
              </div>
              <AccordionContent className="pb-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2">
                    <Label className="text-white" htmlFor="fullName">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={data.personalInfo.fullName}
                      onChange={(e) =>
                        handleChange("personalInfo", "fullName", e.target.value)
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.personalInfo.email}
                      onChange={(e) =>
                        handleChange("personalInfo", "email", e.target.value)
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white" htmlFor="phone">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={data.personalInfo.phone}
                      onChange={(e) =>
                        handleChange("personalInfo", "phone", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white" htmlFor="address">
                      Address/Location
                    </Label>
                    <Input
                      id="address"
                      value={data.personalInfo.address}
                      onChange={(e) =>
                        handleChange("personalInfo", "address", e.target.value)
                      }
                      placeholder="New York, NY"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label className="text-white" htmlFor="summary">
                      Professional Summary
                    </Label>
                    <Textarea
                      id="summary"
                      value={data.personalInfo.summary}
                      onChange={(e) =>
                        handleChange("personalInfo", "summary", e.target.value)
                      }
                      placeholder="Brief overview of your professional background..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </SortableAccordionItem>
        );
      case "experience":
        return (
          <SortableAccordionItem key={sectionId} id={sectionId} index={index}>
            <AccordionItem
              value="experience"
              className="border border-slate-800/50 rounded-xl bg-slate-900/50 backdrop-blur-sm px-4 md:px-6 shadow-lg shadow-black/20 ml-10 md:ml-12"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
                    <span className="font-semibold text-base md:text-lg text-left">
                      Work Experience
                    </span>
                  </CustomAccordionTrigger>
                </div>
              </div>
              <AccordionContent className="pb-4 space-y-4 md:space-y-6">
                {data.experience.map((exp, index) => (
                  <Card
                    key={exp.id}
                    className="relative group overflow-hidden border-dashed"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeListItem("experience", index)}
                        className="text-destructive hover:bg-destructive/10 h-8 w-8"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <CardContent className="p-3 md:p-4 space-y-3 md:space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-2">
                          <Label className="text-white ">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) =>
                              updateListItem(
                                "experience",
                                index,
                                "company",
                                e.target.value
                              )
                            }
                            placeholder="Company Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white ">Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) =>
                              updateListItem(
                                "experience",
                                index,
                                "position",
                                e.target.value
                              )
                            }
                            placeholder="Job Title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white ">Start Date</Label>
                          <DatePicker
                            value={exp.startDate}
                            className="text-white"
                            onChange={(value) =>
                              updateListItem(
                                "experience",
                                index,
                                "startDate",
                                value
                              )
                            }
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white ">End Date</Label>
                          <DatePicker
                            value={exp.endDate}
                            className="text-white"
                            onChange={(value) =>
                              updateListItem(
                                "experience",
                                index,
                                "endDate",
                                value
                              )
                            }
                            placeholder="MM/YYYY or Present"
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                          <Label className="text-white ">Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) =>
                              updateListItem(
                                "experience",
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Key responsibilities and achievements..."
                            className="min-h-[80px] md:min-h-[100px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={() => addListItem("experience")}
                  variant="outline"
                  className="w-full border-dashed py-2"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Experience
                </Button>
              </AccordionContent>
            </AccordionItem>
          </SortableAccordionItem>
        );
      case "education":
        return (
          <SortableAccordionItem key={sectionId} id={sectionId} index={index}>
            <AccordionItem
              value="education"
              className="border border-slate-800/50 rounded-xl bg-slate-900/50 backdrop-blur-sm px-4 md:px-6 shadow-lg shadow-black/20 ml-10 md:ml-12"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
                    <span className="font-semibold text-base md:text-lg text-left">
                      Education
                    </span>
                  </CustomAccordionTrigger>
                </div>
              </div>
              <AccordionContent className="pb-4 space-y-4 md:space-y-6">
                {data.education.map((edu, index) => (
                  <Card key={edu.id} className="relative group border-dashed">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeListItem("education", index)}
                        className="text-destructive hover:bg-destructive/10 h-8 w-8"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <CardContent className="p-3 md:p-4 space-y-3 md:space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">
                            School/University
                          </Label>
                          <Input
                            value={edu.school}
                            onChange={(e) =>
                              updateListItem(
                                "education",
                                index,
                                "school",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) =>
                              updateListItem(
                                "education",
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Graduation Date</Label>
                          <DatePicker
                            value={edu.graduationDate}
                            className="text-white"
                            onChange={(value) =>
                              updateListItem(
                                "education",
                                index,
                                "graduationDate",
                                value
                              )
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={() => addListItem("education")}
                  variant="outline"
                  className="w-full border-dashed py-2"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Education
                </Button>
              </AccordionContent>
            </AccordionItem>
          </SortableAccordionItem>
        );
      case "skills":
        return (
          <SortableAccordionItem key={sectionId} id={sectionId} index={index}>
            <AccordionItem
              value="skills"
              className="border border-slate-800/50 rounded-xl bg-slate-900/50 backdrop-blur-sm px-4 md:px-6 shadow-lg shadow-black/20 ml-10 md:ml-12"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
                    <span className="font-semibold text-base md:text-lg text-left">
                      Skills
                    </span>
                  </CustomAccordionTrigger>
                </div>
              </div>
              <AccordionContent className="pb-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">
                    Skills List (comma separated)
                  </Label>
                  <Textarea
                    value={data.skills.join(", ")}
                    onChange={(e) => updateSkills(e.target.value)}
                    placeholder="React, TypeScript, Node.js, Project Management..."
                    className="min-h-[80px]"
                  />
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2">
                    {data.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-purple-300 text-black px-2 py-1 rounded text-xs md:text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </SortableAccordionItem>
        );
      case "projects":
        return (
          <SortableAccordionItem key={sectionId} id={sectionId} index={index}>
            <AccordionItem
              value="projects"
              className="border border-slate-800/50 rounded-xl bg-slate-900/50 backdrop-blur-sm px-4 md:px-6 shadow-lg shadow-black/20 ml-10 md:ml-12"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
                    <span className="font-semibold text-base md:text-lg text-left">
                      Projects
                    </span>
                  </CustomAccordionTrigger>
                </div>
              </div>
              <AccordionContent className="pb-4 space-y-4 md:space-y-6">
                {data.projects.map((proj, index) => (
                  <Card key={proj.id} className="relative group border-dashed">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeListItem("projects", index)}
                        className="text-destructive hover:bg-destructive/10 h-8 w-8"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <CardContent className="p-3 md:p-4 space-y-3 md:space-y-4">
                      <div className="space-y-2">
                        <Label className="text-white">Project Name</Label>
                        <Input
                          value={proj.name}
                          onChange={(e) =>
                            updateListItem(
                              "projects",
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Description</Label>
                        <Textarea
                          value={proj.description}
                          onChange={(e) =>
                            updateListItem(
                              "projects",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">
                          Technologies (comma separated)
                        </Label>
                        <Input
                          value={proj.technologies?.join(", ") || ""}
                          onChange={(e) => {
                            const techs = e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean);
                            updateListItem(
                              "projects",
                              index,
                              "technologies",
                              techs
                            );
                          }}
                          placeholder="React, Node.js, AWS..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={() => addListItem("projects")}
                  variant="outline"
                  className="w-full border-dashed py-2"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
              </AccordionContent>
            </AccordionItem>
          </SortableAccordionItem>
        );
      default:
        // Check if this is a custom section
        const customSectionIndex = customSections.findIndex(
          (s) => s.id === sectionId
        );
        if (customSectionIndex !== -1) {
          const section = customSections[customSectionIndex];
          return (
            <SortableAccordionItem key={sectionId} id={sectionId} index={index}>
              <AccordionItem
                value={sectionId}
                className="border border-slate-800/50 rounded-xl bg-slate-900/50 backdrop-blur-sm px-4 md:px-6 shadow-lg shadow-black/20 ml-10 md:ml-12"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base md:text-lg">
                          {section.title}
                        </span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          Custom
                        </span>
                      </div>
                    </CustomAccordionTrigger>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCustomSection(customSectionIndex)}
                      className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <AccordionContent className="pb-4 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) =>
                          updateCustomSection(
                            customSectionIndex,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Section Title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Content Type</Label>
                      <select
                        value={section.type}
                        onChange={(e) =>
                          updateCustomSection(
                            customSectionIndex,
                            "type",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="text">Text/Paragraph</option>
                        <option value="list">List Items</option>
                        <option value="date">Date</option>
                        <option value="link">Link/URL</option>
                      </select>
                    </div>

                    {section.type === "text" && (
                      <div className="space-y-2">
                        <Label>Content</Label>
                        <Textarea
                          value={section.content as string}
                          onChange={(e) =>
                            updateCustomSection(
                              customSectionIndex,
                              "content",
                              e.target.value
                            )
                          }
                          placeholder="Enter your content here..."
                          className="min-h-[80px] md:min-h-[100px]"
                        />
                      </div>
                    )}

                    {section.type === "list" && (
                      <div className="space-y-4">
                        <Label>List Items</Label>
                        {Array.isArray(section.content) &&
                          section.content.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex gap-2 items-center"
                            >
                              <Input
                                value={item}
                                onChange={(e) =>
                                  updateCustomListItem(
                                    customSectionIndex,
                                    itemIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Item ${itemIndex + 1}`}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  removeCustomListItem(
                                    customSectionIndex,
                                    itemIndex
                                  )
                                }
                                className="text-destructive hover:bg-destructive/10 h-8 w-8"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          ))}
                        <Button
                          onClick={() => addCustomListItem(customSectionIndex)}
                          variant="outline"
                          size="sm"
                          className="py-1.5"
                        >
                          <Plus className="w-3.5 h-3.5 mr-2" /> Add Item
                        </Button>
                      </div>
                    )}

                    {section.type === "date" && (
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <DatePicker
                          value={section.content as string}
                          onChange={(value) =>
                            updateCustomSection(
                              customSectionIndex,
                              "content",
                              value
                            )
                          }
                        />
                      </div>
                    )}

                    {section.type === "link" && (
                      <div className="space-y-2">
                        <Label>Link URL</Label>
                        <Input
                          type="url"
                          value={section.content as string}
                          onChange={(e) =>
                            updateCustomSection(
                              customSectionIndex,
                              "content",
                              e.target.value
                            )
                          }
                          placeholder="https://example.com"
                        />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </SortableAccordionItem>
          );
        }
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto pr-2 md:pr-4 pb-20 space-y-4 md:space-y-6">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0px, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0px, transparent 50%)
          `,
          }}
        />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            defaultValue={["personal-info"]}
            className="w-full space-y-3 md:space-y-4"
          >
            {sectionOrder.map((sectionId, index) =>
              renderSection(sectionId, index)
            )}
          </Accordion>
        </SortableContext>
      </DndContext>

      <Button
        onClick={addCustomSection}
        variant="outline"
        className="w-full border-dashed border-slate-700/50 text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-slate-800/50 mt-4 md:mt-6 py-3 md:py-2 backdrop-blur-sm group"
      >
        <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
        ADD DIMENSIONAL SECTION
      </Button>
    </div>
  );
}
