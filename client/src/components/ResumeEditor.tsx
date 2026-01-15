import { useState, useEffect, useRef } from "react";
import { ResumeContent } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import {
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
  Zap,
  Brain,
  Cpu,
  Mic,
  MicOff,
  FilePenLine,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Link as LinkIcon,
  Calendar,
  Target,
  Eye,
  Download,
  Palette,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Award,
  Languages,
  BookOpen,
  Users,
  Code,
  Database,
  Cloud,
  Server,
  Lock,
  Type,
  LayoutGrid,
  StickyNote,
  Hash,
  Bold,
  Italic,
  List,
  ListOrdered,
  Undo,
  Redo,
  Quote,
  Mail,
  Phone,
  MapPin,
  FileText,
  ExternalLink,
  Upload,
  Share2,
  Copy,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  Settings,
  User,
  Briefcase,
  GraduationCap,
  Star,
  TrendingUp,
  PieChart,
  LineChart,
  Activity,
  Info,
  HelpCircle,
  Shield,
  Key,
  EyeOff,
  Bell,
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
  Disc,
  Aperture,
  Command,
  Grid,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Minus,
  AlertTriangle,
  AlertOctagon,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// ========== TYPES ==========
interface ResumeEditorProps {
  data: ResumeContent;
  onChange: (data: ResumeContent) => void;
}

interface CustomSection {
  id: string;
  title: string;
  type: "text" | "list" | "date" | "link" | "rich-text" | "badges";
  content: string | string[];
}

interface SocialLinks {
  linkedin?: string;
  github?: string;
  gitlab?: string;
  twitter?: string;
  portfolio?: string;
  medium?: string;
  stackoverflow?: string;
  dribbble?: string;
  behance?: string;
  leetcode?: string;
  hackerrank?: string;
  codepen?: string;
  kaggle?: string;
  devto?: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

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

interface SkillCategories {
  programming?: string[];
  frameworks?: string[];
  databases?: string[];
  cloud?: string[];
  devops?: string[];
  tools?: string[];
  methodologies?: string[];
  softSkills?: string[];
  languages?: Language[];
  certifications?: Certification[];
}

interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  effects: {
    shadows: boolean;
    gradients: boolean;
    animations: boolean;
  };
}

// ========== COMPONENTS ==========

// Rich Text Editor Component
function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-[100px] p-2 text-white",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-white/20 rounded-md overflow-hidden bg-white/5">
      <div className="flex items-center gap-1 p-2 border-b border-white/20">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 ${editor.isActive("bold") ? "bg-white/10" : ""}`}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 ${
            editor.isActive("italic") ? "bg-white/10" : ""
          }`}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 ${
            editor.isActive("bulletList") ? "bg-white/10" : ""
          }`}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-8 w-8 ${
            editor.isActive("orderedList") ? "bg-white/10" : ""
          }`}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          className="h-8 w-8"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          className="h-8 w-8"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      <div className="bg-white/5">
        <EditorContent
          editor={editor}
          className="min-h-[100px] p-2"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

// Color Picker Component
function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) {
  const [color, setColor] = useState(value);

  const colors = [
    "#8b5cf6",
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#6366f1",
    "#f97316",
    "#0f172a",
    "#64748b",
    "#cbd5e1",
    "#f1f5f9",
    "#ffffff",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[60px] h-10 border-white/20 bg-white/5"
        >
          <div
            className="w-full h-full rounded"
            style={{ backgroundColor: color }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 bg-gray-900 border-white/20">
        <div className="grid grid-cols-5 gap-2">
          {colors.map((c) => (
            <button
              key={c}
              className="w-8 h-8 rounded border border-white/20"
              style={{ backgroundColor: c }}
              onClick={() => {
                setColor(c);
                onChange(c);
              }}
            />
          ))}
        </div>
        <div className="mt-3">
          <input
            type="text"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              onChange(e.target.value);
            }}
            className="w-full p-2 text-sm border border-white/20 rounded bg-white/5 text-white"
            placeholder="#000000"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
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
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative group"
    >
      {isDragging && (
        <div className="absolute inset-0 rounded-xl border-2 border-purple-500/50 bg-purple-500/10 animate-pulse" />
      )}

      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-10"
        {...attributes}
        {...listeners}
      >
        <div className="relative">
          <GripVertical className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
          <motion.div
            className="absolute inset-0 bg-purple-400/20 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
      </div>
      {children}
    </motion.div>
  );
}

// Custom Accordion Trigger
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

// Theme Customizer Component
function ThemeCustomizer({
  theme,
  onThemeChange,
}: {
  theme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "colors" | "typography" | "spacing" | "effects"
  >("colors");

  const handleColorChange = (
    key: keyof ThemeConfig["colors"],
    value: string
  ) => {
    onThemeChange({
      ...theme,
      colors: {
        ...theme.colors,
        [key]: value,
      },
    });
  };

  const handleTypographyChange = (
    key: keyof ThemeConfig["typography"],
    value: any
  ) => {
    onThemeChange({
      ...theme,
      typography: {
        ...theme.typography,
        [key]: value,
      },
    });
  };

  const handleSpacingChange = (
    key: keyof ThemeConfig["spacing"],
    value: number
  ) => {
    onThemeChange({
      ...theme,
      spacing: {
        ...theme.spacing,
        [key]: value,
      },
    });
  };

  const handleEffectsChange = (
    key: keyof ThemeConfig["effects"],
    value: boolean
  ) => {
    onThemeChange({
      ...theme,
      effects: {
        ...theme.effects,
        [key]: value,
      },
    });
  };

  const fontFamilies = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Poppins",
    "Lato",
    "Source Sans Pro",
    "Playfair Display",
    "Merriweather",
    "Space Grotesk",
  ];

  return (
    <Card className="border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-white">Theme Customizer</h3>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-4 mb-6 bg-white/5">
            <TabsTrigger
              value="colors"
              className="flex items-center gap-2 data-[state=active]:bg-purple-600"
            >
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              Colors
            </TabsTrigger>
            <TabsTrigger
              value="typography"
              className="flex items-center gap-2 data-[state=active]:bg-purple-600"
            >
              <Type className="w-4 h-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger
              value="spacing"
              className="flex items-center gap-2 data-[state=active]:bg-purple-600"
            >
              <LayoutGrid className="w-4 h-4" />
              Spacing
            </TabsTrigger>
            <TabsTrigger
              value="effects"
              className="flex items-center gap-2 data-[state=active]:bg-purple-600"
            >
              <Sparkles className="w-4 h-4" />
              Effects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            {Object.entries(theme.colors).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <span className="text-xs text-gray-400">{value}</span>
                </div>
                <div className="flex gap-2">
                  <ColorPicker
                    value={value}
                    onChange={(color) =>
                      handleColorChange(
                        key as keyof ThemeConfig["colors"],
                        color
                      )
                    }
                  />
                  <Input
                    value={value}
                    onChange={(e) =>
                      handleColorChange(
                        key as keyof ThemeConfig["colors"],
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-300">Font Family</Label>
              <Select
                value={theme.typography.fontFamily}
                onValueChange={(value) =>
                  handleTypographyChange("fontFamily", value)
                }
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {fontFamilies.map((font) => (
                    <SelectItem
                      key={font}
                      value={font}
                      style={{ fontFamily: font }}
                      className="text-white"
                    >
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm text-gray-300">Font Size</Label>
                <span className="text-xs text-gray-400">
                  {theme.typography.fontSize}px
                </span>
              </div>
              <Slider
                value={[theme.typography.fontSize]}
                onValueChange={([value]) =>
                  handleTypographyChange("fontSize", value)
                }
                min={10}
                max={24}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm text-gray-300">Line Height</Label>
                <span className="text-xs text-gray-400">
                  {theme.typography.lineHeight}
                </span>
              </div>
              <Slider
                value={[theme.typography.lineHeight]}
                onValueChange={([value]) =>
                  handleTypographyChange("lineHeight", value)
                }
                min={1}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-4">
            {Object.entries(theme.spacing).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm text-gray-300 capitalize">
                    {key}
                  </Label>
                  <span className="text-xs text-gray-400">{value}px</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={([val]) =>
                    handleSpacingChange(
                      key as keyof ThemeConfig["spacing"],
                      val
                    )
                  }
                  min={4}
                  max={48}
                  step={4}
                  className="w-full"
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            {Object.entries(theme.effects).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="text-sm text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) =>
                    handleEffectsChange(
                      key as keyof ThemeConfig["effects"],
                      checked
                    )
                  }
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Theme Preview */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-medium text-white mb-3">Preview</h4>
          <div
            className="p-4 rounded-lg border border-white/20"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize,
              lineHeight: theme.typography.lineHeight,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <div>
                <h3
                  style={{ color: theme.colors.primary }}
                  className="font-bold"
                >
                  Sample Section
                </h3>
                <p
                  style={{ color: theme.colors.textSecondary }}
                  className="text-sm"
                >
                  Preview text with secondary color
                </p>
              </div>
            </div>
            <p style={{ color: theme.colors.text }} className="text-sm">
              This is how your resume will look with the current theme settings.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Social Links Component
function SocialLinksSection({
  data,
  onChange,
}: {
  data: ResumeContent;
  onChange: (data: ResumeContent) => void;
}) {
  const socialLinks = data.personalInfo.socialLinks || {};

  const handleSocialLinkChange = (platform: string, url: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        socialLinks: {
          ...socialLinks,
          [platform]: url,
        },
      },
    });
  };

  const removeSocialLink = (platform: string) => {
    const updatedLinks = { ...socialLinks };
    delete updatedLinks[platform];
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        socialLinks: updatedLinks,
      },
    });
  };

  const [newPlatform, setNewPlatform] = useState("linkedin");
  const [newUrl, setNewUrl] = useState("");

  const addSocialLink = () => {
    if (newPlatform && newUrl) {
      handleSocialLinkChange(newPlatform, newUrl);
      setNewUrl("");
    }
  };

  const SOCIAL_PLATFORMS = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      placeholder: "https://linkedin.com/in/username",
      category: "Professional",
      importance: 10,
    },
    {
      id: "github",
      name: "GitHub",
      icon: <Github className="w-4 h-4" />,
      placeholder: "https://github.com/username",
      category: "Technical",
      importance: 9,
    },
    {
      id: "gitlab",
      name: "GitLab",
      icon: <Code className="w-4 h-4" />,
      placeholder: "https://gitlab.com/username",
      category: "Technical",
      importance: 8,
    },
    {
      id: "stackoverflow",
      name: "Stack Overflow",
      icon: <Database className="w-4 h-4" />,
      placeholder: "https://stackoverflow.com/users/id/username",
      category: "Technical",
      importance: 7,
    },
    {
      id: "portfolio",
      name: "Portfolio Website",
      icon: <Globe className="w-4 h-4" />,
      placeholder: "https://yourportfolio.com",
      category: "Portfolio",
      importance: 10,
    },
    {
      id: "medium",
      name: "Medium",
      icon: <BookOpen className="w-4 h-4" />,
      placeholder: "https://medium.com/@username",
      category: "Blog",
      importance: 6,
    },
    {
      id: "devto",
      name: "Dev.to",
      icon: <Code className="w-4 h-4" />,
      placeholder: "https://dev.to/username",
      category: "Blog",
      importance: 5,
    },
    {
      id: "dribbble",
      name: "Dribbble",
      icon: <Target className="w-4 h-4" />,
      placeholder: "https://dribbble.com/username",
      category: "Design",
      importance: 8,
    },
    {
      id: "behance",
      name: "Behance",
      icon: <LayoutGrid className="w-4 h-4" />,
      placeholder: "https://behance.net/username",
      category: "Design",
      importance: 7,
    },
    {
      id: "figma",
      name: "Figma Community",
      icon: <LayoutGrid className="w-4 h-4" />,
      placeholder: "https://figma.com/@username",
      category: "Design",
      importance: 6,
    },
    {
      id: "leetcode",
      name: "LeetCode",
      icon: <Code className="w-4 h-4" />,
      placeholder: "https://leetcode.com/username",
      category: "Coding",
      importance: 6,
    },
    {
      id: "hackerrank",
      name: "HackerRank",
      icon: <Code className="w-4 h-4" />,
      placeholder: "https://hackerrank.com/username",
      category: "Coding",
      importance: 5,
    },
    {
      id: "codepen",
      name: "CodePen",
      icon: <Code className="w-4 h-4" />,
      placeholder: "https://codepen.io/username",
      category: "Coding",
      importance: 5,
    },
    {
      id: "codewars",
      name: "Codewars",
      icon: <Award className="w-4 h-4" />,
      placeholder: "https://codewars.com/users/username",
      category: "Coding",
      importance: 4,
    },
    {
      id: "kaggle",
      name: "Kaggle",
      icon: <BarChart3 className="w-4 h-4" />,
      placeholder: "https://kaggle.com/username",
      category: "Data Science",
      importance: 7,
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: <Twitter className="w-4 h-4" />,
      placeholder: "https://twitter.com/username",
      category: "Social",
      importance: 4,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: <Users className="w-4 h-4" />,
      placeholder: "https://youtube.com/@username",
      category: "Social",
      importance: 4,
    },
    {
      id: "upwork",
      name: "Upwork",
      icon: <Users className="w-4 h-4" />,
      placeholder: "https://upwork.com/freelancers/~username",
      category: "Freelance",
      importance: 5,
    },
    {
      id: "angel",
      name: "AngelList",
      icon: <Users className="w-4 h-4" />,
      placeholder: "https://angel.co/u/username",
      category: "Professional",
      importance: 4,
    },
  ];

  // Group platforms by category
  const groupedPlatforms = SOCIAL_PLATFORMS.reduce((acc, platform) => {
    if (!acc[platform.category]) {
      acc[platform.category] = [];
    }
    acc[platform.category].push(platform);
    return acc;
  }, {} as Record<string, typeof SOCIAL_PLATFORMS>);

  return (
    <Card className="border border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white">
            Social Links & Online Presence
          </h3>
        </div>

        {/* Social Link Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-cyan-400">
              {Object.keys(socialLinks).length}
            </div>
            <div className="text-xs text-gray-400">Total Links</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-green-400">
              {SOCIAL_PLATFORMS.filter((p) => socialLinks[p.id]).length}
            </div>
            <div className="text-xs text-gray-400">Platforms Used</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-purple-400">
              {Object.keys(groupedPlatforms).length}
            </div>
            <div className="text-xs text-gray-400">Categories</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-yellow-400">
              {
                Object.keys(socialLinks).filter((k) =>
                  ["linkedin", "github", "portfolio"].includes(k)
                ).length
              }
              /3
            </div>
            <div className="text-xs text-gray-400">Essential Links</div>
          </div>
        </div>

        {/* Platform Categories */}
        {Object.entries(groupedPlatforms).map(([category, platforms]) => (
          <div key={category} className="mb-6">
            <h4 className="text-sm font-medium text-white mb-3">
              {category} Platforms
            </h4>
            <div className="space-y-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-2 min-w-[140px]">
                    <div
                      className={`p-1.5 rounded ${
                        platform.importance >= 9
                          ? "bg-red-500/20"
                          : platform.importance >= 7
                          ? "bg-yellow-500/20"
                          : "bg-blue-500/20"
                      }`}
                    >
                      {platform.icon}
                    </div>
                    <span className="text-sm font-medium text-white">
                      {platform.name}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Input
                      value={socialLinks[platform.id] || ""}
                      onChange={(e) =>
                        handleSocialLinkChange(platform.id, e.target.value)
                      }
                      placeholder={platform.placeholder}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {socialLinks[platform.id] && (
                      <a
                        href={socialLinks[platform.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4 text-cyan-400" />
                      </a>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSocialLink(platform.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add New Link */}
        <div className="space-y-4 p-4 bg-black/30 rounded-lg border border-white/10">
          <h4 className="text-sm font-medium text-white">Add New Platform</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select value={newPlatform} onValueChange={setNewPlatform}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20 max-h-[300px]">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <SelectItem
                    key={platform.id}
                    value={platform.id}
                    className="text-white"
                  >
                    <div className="flex items-center gap-2">
                      {platform.icon}
                      <span>{platform.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {platform.category}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder={
                SOCIAL_PLATFORMS.find((p) => p.id === newPlatform)
                  ?.placeholder || "Enter URL"
              }
              className="col-span-2 bg-white/5 border-white/20 text-white"
            />
          </div>
          <Button
            onClick={addSocialLink}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Social Link
          </Button>
        </div>

        {/* Importance Legend */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">
              Importance Guide
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-white">Essential (9-10)</span>
              <span className="text-xs text-gray-400 ml-auto">
                LinkedIn, GitHub, Portfolio
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-white">Important (7-8)</span>
              <span className="text-xs text-gray-400 ml-auto">
                GitLab, Stack Overflow
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-white">Optional (4-6)</span>
              <span className="text-xs text-gray-400 ml-auto">
                Social Media, Blogs
              </span>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">
            Best Practices
          </h4>
          <ul className="space-y-1 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
              <span>
                LinkedIn: Keep profile updated with professional photo
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
              <span>
                GitHub: Pin your best repositories, keep README files complete
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
              <span>
                Portfolio: Showcase 3-5 best projects with case studies
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
              <span>Keep all profiles professional and up-to-date</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Resume Metrics Component
function ResumeMetrics({ data }: { data: ResumeContent }) {
  const calculateScore = () => {
    let score = 0;

    // Personal Info (20 points)
    if (data.personalInfo.fullName) score += 5;
    if (data.personalInfo.email) score += 5;
    if (data.personalInfo.phone) score += 5;
    if (data.personalInfo.summary?.length > 50) score += 5;

    // Experience (30 points)
    if (data.experience.length >= 3) score += 30;
    else if (data.experience.length === 2) score += 20;
    else if (data.experience.length === 1) score += 10;

    // Skills (20 points)
    if (data.skills.length >= 10) score += 20;
    else if (data.skills.length >= 5) score += 15;
    else if (data.skills.length >= 3) score += 10;

    // Education (15 points)
    if (data.education.length >= 2) score += 15;
    else if (data.education.length === 1) score += 10;

    // Projects (10 points)
    if (data.projects.length >= 2) score += 10;
    else if (data.projects.length === 1) score += 5;

    // Social Links (5 points)
    if (
      data.personalInfo.socialLinks &&
      Object.keys(data.personalInfo.socialLinks).length > 0
    ) {
      score += 5;
    }

    return Math.min(score, 100);
  };

  const score = calculateScore();

  const metrics = [
    {
      label: "Completeness",
      value: score,
      color: "text-emerald-400",
      icon: <CheckCircle className="w-4 h-4" />,
      target: 100,
    },
    {
      label: "Experiences",
      value: data.experience.length,
      color: "text-cyan-400",
      target: 3,
    },
    {
      label: "Skills",
      value: data.skills.length,
      color: "text-purple-400",
      target: 10,
    },
    {
      label: "Social Links",
      value: data.personalInfo.socialLinks
        ? Object.keys(data.personalInfo.socialLinks).length
        : 0,
      color: "text-blue-400",
      target: 3,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-cyan-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <Card className="border border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white">Resume Analytics</h3>
          </div>
          <div className="text-2xl font-bold text-white">
            <span
              className={
                score >= 80
                  ? "text-emerald-400"
                  : score >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              {score}
            </span>
            <span className="text-gray-400">/100</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Score Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Overall Score</span>
              <span className="text-white font-medium">{score}%</span>
            </div>
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${getScoreColor(score)}`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Poor</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                whileHover={{ scale: 1.05 }}
                className="relative p-3 rounded-lg bg-black/30 border border-white/10"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">{metric.label}</span>
                  {metric.icon && (
                    <span className={metric.color}>{metric.icon}</span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </span>
                  {metric.target && (
                    <span className="text-xs text-gray-500">
                      /{metric.target}
                    </span>
                  )}
                </div>
                {metric.target && (
                  <div className="mt-2">
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${metric.color.replace(
                          "text-",
                          "bg-"
                        )}`}
                        style={{
                          width: `${Math.min(
                            (metric.value / metric.target) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Background Component
function EnhancedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 4,
          }}
        />
      </div>
    </div>
  );
}

// ========== MAIN EDITOR COMPONENT ==========
export function ResumeEditor({ data, onChange }: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "analyze" | "theme">(
    "edit"
  );
  const [isListening, setIsListening] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeAccordionItems, setActiveAccordionItems] = useState<string[]>([
    "personal-info",
  ]);

  // Default theme configuration
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    id: "default",
    name: "Default",
    colors: {
      primary: "#8b5cf6",
      secondary: "#10b981",
      accent: "#3b82f6",
      background: "#0f172a",
      text: "#f1f5f9",
      textSecondary: "#94a3b8",
    },
    typography: {
      fontFamily: "Inter",
      fontSize: 14,
      lineHeight: 1.6,
    },
    spacing: {
      small: 8,
      medium: 16,
      large: 24,
    },
    borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
    },
    effects: {
      shadows: true,
      gradients: true,
      animations: true,
    },
  });

  // Initialize custom sections from data or empty array
  const customSections = (data.customSections || []) as CustomSection[];

  const sectionOrder = data.sectionOrder || [
    "personal-info",
    "experience",
    "education",
    "skills",
    "projects",
    "social-links",
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
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleChange = (
    section: keyof ResumeContent,
    field: string,
    value: any
  ) => {
    onChange({
      ...data,
      [section]: {
        ...(data[section as keyof typeof data] as any),
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
    const list = [...(data[section] as any[])];
    list[index][field] = value;
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
            location: "",
            achievements: [],
            employmentType: "",
            industry: "",
            teamSize: 0,
            technologies: [],
            supervisor: "",
            supervisorContact: "",
            reasonForLeaving: "",
            awards: [],
            client: "",
            project: "",
            metrics: [] as Metric[],
          }
        : section === "education"
        ? {
            id: uuidv4(),
            school: "",
            degree: "",
            graduationDate: "",
            location: "",
            fieldOfStudy: "",
            gpa: "",
            honors: [],
            coursework: [],
            type: "",
            duration: "",
            thesis: "",
            advisor: "",
            publications: [],
            extracurricular: [],
            scholarships: [],
            accreditation: "",
            percentage: "",
            ranking: "",
          }
        : {
            id: uuidv4(),
            name: "",
            description: "",
            technologies: [],
            url: "",
            role: "",
            date: "",
            features: [],
            client: "",
            teamSize: 0,
            duration: "",
            challenges: [],
            results: [],
            liveUrl: "",
            repoUrl: "",
            demoUrl: "",
            documentationUrl: "",
            responsibilities: [],
            impact: [],
            tools: [],
            methodologies: [],
          };

    onChange({ ...data, [section]: [...(data[section] as any[]), newItem] });
  };

  const removeListItem = (
    section: "experience" | "education" | "projects",
    index: number
  ) => {
    const list = [...(data[section] as any[])];
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

    // Open the new section
    setActiveAccordionItems([...activeAccordionItems, newSection.id]);
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
    const updatedAccordionItems = activeAccordionItems.filter(
      (id) => id !== sectionId
    );

    onChange({
      ...data,
      customSections: updatedSections,
      sectionOrder: updatedOrder,
    });

    setActiveAccordionItems(updatedAccordionItems);
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

  // Voice command setup
  useEffect(() => {
    if (isListening && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        console.log("Voice command:", transcript);

        // Basic voice commands
        if (transcript.toLowerCase().includes("add experience")) {
          addListItem("experience");
        } else if (transcript.toLowerCase().includes("add education")) {
          addListItem("education");
        } else if (transcript.toLowerCase().includes("add project")) {
          addListItem("projects");
        } else if (transcript.toLowerCase().includes("add section")) {
          addCustomSection();
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.start();

      return () => {
        recognition.stop();
      };
    }
  }, [isListening]);

  // ========== SECTION RENDERERS ==========

  // Personal Info Section - ENHANCED
  const renderPersonalInfo = () => (
    <SortableAccordionItem key="personal-info" id="personal-info" index={0}>
      <AccordionItem
        value="personal-info"
        className="border border-white/20 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl px-4 md:px-6 shadow-2xl shadow-black/40 ml-10 md:ml-12"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
              <span className="font-semibold text-base md:text-lg text-left flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Personal Information
              </span>
            </CustomAccordionTrigger>
          </div>
        </div>
        <AccordionContent className="pb-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info */}
            <div className="space-y-2">
              <Label className="text-white" htmlFor="fullName">
                Full Name *
              </Label>
              <Input
                id="fullName"
                value={data.personalInfo.fullName}
                onChange={(e) =>
                  handleChange("personalInfo", "fullName", e.target.value)
                }
                placeholder="John Doe"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white" htmlFor="pronouns">
                Pronouns
              </Label>
              <Input
                id="pronouns"
                value={data.personalInfo.pronouns || ""}
                onChange={(e) =>
                  handleChange("personalInfo", "pronouns", e.target.value)
                }
                placeholder="he/him, she/her, they/them"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white" htmlFor="email">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) =>
                  handleChange("personalInfo", "email", e.target.value)
                }
                placeholder="john@example.com"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white" htmlFor="phone">
                Phone *
              </Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) =>
                  handleChange("personalInfo", "phone", e.target.value)
                }
                placeholder="+1 (555) 123-4567"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white" htmlFor="preferredContact">
                Preferred Contact Method
              </Label>
              <Select
                value={data.personalInfo.preferredContact || ""}
                onValueChange={(value) =>
                  handleChange("personalInfo", "preferredContact", value)
                }
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="any">Any</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white" htmlFor="address">
                Address/Location *
              </Label>
              <Input
                id="address"
                value={data.personalInfo.address}
                onChange={(e) =>
                  handleChange("personalInfo", "address", e.target.value)
                }
                placeholder="New York, NY"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white" htmlFor="nationality">
                Nationality
              </Label>
              <Input
                id="nationality"
                value={data.personalInfo.nationality || ""}
                onChange={(e) =>
                  handleChange("personalInfo", "nationality", e.target.value)
                }
                placeholder="American"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white" htmlFor="visaStatus">
                Visa Status
              </Label>
              <Select
                value={data.personalInfo.visaStatus || ""}
                onValueChange={(value) =>
                  handleChange("personalInfo", "visaStatus", value)
                }
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="permanent-resident">
                    Permanent Resident
                  </SelectItem>
                  <SelectItem value="work-visa">Work Visa</SelectItem>
                  <SelectItem value="student-visa">Student Visa</SelectItem>
                  <SelectItem value="requires-sponsorship">
                    Requires Sponsorship
                  </SelectItem>
                  <SelectItem value="none">None Required</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white" htmlFor="relocation">
                Willing to Relocate?
              </Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={data.personalInfo.relocation || false}
                  onCheckedChange={(checked) =>
                    handleChange("personalInfo", "relocation", checked)
                  }
                />
                <span className="text-sm text-gray-300">
                  {data.personalInfo.relocation ? "Yes" : "No"}
                </span>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label className="text-white" htmlFor="title">
                Professional Title/Headline *
              </Label>
              <Input
                id="title"
                value={data.personalInfo.title || ""}
                onChange={(e) =>
                  handleChange("personalInfo", "title", e.target.value)
                }
                placeholder="Senior Software Engineer | Full Stack Developer | AI/ML Specialist"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label className="text-white" htmlFor="website">
                Personal Website/Portfolio
              </Label>
              <Input
                id="website"
                type="url"
                value={data.personalInfo.website || ""}
                onChange={(e) =>
                  handleChange("personalInfo", "website", e.target.value)
                }
                placeholder="https://yourportfolio.com"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            {/* Professional Availability */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h4 className="text-sm font-medium text-white border-b border-white/10 pb-2">
                Professional Availability
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white" htmlFor="availability">
                    Availability
                  </Label>
                  <Select
                    value={data.personalInfo.availability || ""}
                    onValueChange={(value) =>
                      handleChange("personalInfo", "availability", value)
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-white/20">
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="2-months">2 Months</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white" htmlFor="noticePeriod">
                    Notice Period
                  </Label>
                  <Input
                    id="noticePeriod"
                    value={data.personalInfo.noticePeriod || ""}
                    onChange={(e) =>
                      handleChange(
                        "personalInfo",
                        "noticePeriod",
                        e.target.value
                      )
                    }
                    placeholder="2 weeks"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="expectedSalary">
                  Expected Salary
                </Label>
                <Input
                  id="expectedSalary"
                  value={data.personalInfo.expectedSalary || ""}
                  onChange={(e) =>
                    handleChange(
                      "personalInfo",
                      "expectedSalary",
                      e.target.value
                    )
                  }
                  placeholder="$120,000/year"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label className="text-white" htmlFor="summary">
                Professional Summary/Objective *
              </Label>
              <Textarea
                id="summary"
                value={data.personalInfo.summary}
                onChange={(e) =>
                  handleChange("personalInfo", "summary", e.target.value)
                }
                placeholder="Detail-oriented Senior Software Engineer with 8+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering scalable solutions that improve efficiency by 40%. Passionate about clean code, mentorship, and innovative problem-solving. Seeking to leverage expertise in a forward-thinking tech company..."
                className="min-h-[120px] bg-white/5 border-white/20 text-white"
              />
              <p className="text-xs text-gray-400">
                Recommended: 3-5 paragraphs highlighting key achievements,
                skills, and career goals
              </p>
            </div>

            {/* Additional Notes */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label className="text-white" htmlFor="additionalInfo">
                Additional Information
              </Label>
              <Textarea
                id="additionalInfo"
                value={data.personalInfo.additionalInfo || ""}
                onChange={(e) =>
                  handleChange("personalInfo", "additionalInfo", e.target.value)
                }
                placeholder="Professional memberships, volunteer work, publications, patents, security clearance, etc."
                className="min-h-[80px] bg-white/5 border-white/20 text-white"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </SortableAccordionItem>
  );

  // Experience Section - ENHANCED
  const renderExperience = () => (
    <SortableAccordionItem key="experience" id="experience" index={1}>
      <AccordionItem
        value="experience"
        className="border border-white/20 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl px-4 md:px-6 shadow-2xl shadow-black/40 ml-10 md:ml-12"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
              <span className="font-semibold text-base md:text-lg text-left flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Work Experience
              </span>
            </CustomAccordionTrigger>
          </div>
        </div>
        <AccordionContent className="pb-4 space-y-6">
          {data.experience.map((exp: any, index: number) => (
            <Card
              key={exp.id}
              className="relative group overflow-hidden border-dashed border-white/20 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeListItem("experience", index)}
                  className="text-red-400 hover:bg-red-500/10 h-8 w-8"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <CardContent className="p-6 space-y-6">
                {/* Basic Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Company *</Label>
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
                      placeholder="Google LLC"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Position/Title *</Label>
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
                      placeholder="Senior Software Engineer"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Location</Label>
                    <Input
                      value={exp.location || ""}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "location",
                          e.target.value
                        )
                      }
                      placeholder="Mountain View, CA"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Industry</Label>
                    <Input
                      value={exp.industry || ""}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "industry",
                          e.target.value
                        )
                      }
                      placeholder="Technology/SaaS"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Employment Type</Label>
                  <Select
                    value={exp.employmentType || ""}
                    onValueChange={(value) =>
                      updateListItem(
                        "experience",
                        index,
                        "employmentType",
                        value
                      )
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-white/20">
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="self-employed">
                        Self-employed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Start Date *</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      placeholder="MM/YYYY"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                      placeholder="MM/YYYY or Present"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Team Size</Label>
                    <Input
                      type="number"
                      value={exp.teamSize || ""}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "teamSize",
                          e.target.value
                        )
                      }
                      placeholder="8"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                {/* Technologies Used */}
                <div className="space-y-2">
                  <Label className="text-white">
                    Technologies Used (comma separated)
                  </Label>
                  <Input
                    value={exp.technologies?.join(", ") || ""}
                    onChange={(e) => {
                      const techs = e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean);
                      updateListItem(
                        "experience",
                        index,
                        "technologies",
                        techs
                      );
                    }}
                    placeholder="React, TypeScript, Node.js, AWS, Docker, Kubernetes, GraphQL, PostgreSQL"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label className="text-white">Role Description *</Label>
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
                    placeholder="Describe your responsibilities, daily tasks, and overall role..."
                    className="min-h-[100px] bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Key Achievements */}
                <div className="space-y-2">
                  <Label className="text-white">
                    Key Achievements (one per line)
                  </Label>
                  <Textarea
                    value={exp.achievements?.join("\n") || ""}
                    onChange={(e) =>
                      updateListItem(
                        "experience",
                        index,
                        "achievements",
                        e.target.value.split("\n").filter(Boolean)
                      )
                    }
                    placeholder="• Led migration of legacy system to microservices architecture, reducing latency by 40%\n• Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes\n• Mentored 3 junior developers, improving team productivity by 25%\n• Developed new feature that increased user engagement by 30%"
                    className="min-h-[120px] bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Metrics & Impact */}
                <div className="space-y-2">
                  <Label className="text-white">
                    Quantifiable Metrics (Format: Metric: Value Unit)
                  </Label>
                  <Textarea
                    value={
                      exp.metrics
                        ?.map(
                          (m: Metric) =>
                            `${m.description}: ${m.value} ${m.unit}`
                        )
                        .join("\n") || ""
                    }
                    onChange={(e) => {
                      const metrics = e.target.value
                        .split("\n")
                        .filter(Boolean)
                        .map((line) => {
                          const [desc, rest] = line.split(":");
                          const [value, unit] = rest
                            ? rest.trim().split(" ")
                            : ["", ""];
                          return {
                            description: desc?.trim() || "",
                            value: value?.trim() || "",
                            unit: unit?.trim() || "",
                          };
                        });
                      updateListItem("experience", index, "metrics", metrics);
                    }}
                    placeholder="Code coverage: 95 %\nResponse time: 200 ms\nCost reduction: 15000 $/month\nUser growth: 50000 users"
                    className="min-h-[80px] bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Projects & Clients */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Major Projects</Label>
                    <Input
                      value={exp.project || ""}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "project",
                          e.target.value
                        )
                      }
                      placeholder="Internal Tooling Platform"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Key Clients</Label>
                    <Input
                      value={exp.client || ""}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "client",
                          e.target.value
                        )
                      }
                      placeholder="Fortune 500 Companies"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                {/* Awards & Recognition */}
                <div className="space-y-2">
                  <Label className="text-white">
                    Awards & Recognition (one per line)
                  </Label>
                  <Textarea
                    value={exp.awards?.join("\n") || ""}
                    onChange={(e) =>
                      updateListItem(
                        "experience",
                        index,
                        "awards",
                        e.target.value.split("\n").filter(Boolean)
                      )
                    }
                    placeholder="• Employee of the Month - March 2023\n• Innovation Award 2022\n• Top Performer Q4 2021"
                    className="min-h-[60px] bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Supervisor & Reference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Supervisor/Manager</Label>
                    <Input
                      value={exp.supervisor || ""}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "supervisor",
                          e.target.value
                        )
                      }
                      placeholder="Jane Smith"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Reference Contact</Label>
                    <Input
                      value={exp.supervisorContact || ""}
                      onChange={(e) =>
                        updateListItem(
                          "experience",
                          index,
                          "supervisorContact",
                          e.target.value
                        )
                      }
                      placeholder="jane.smith@company.com"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                {/* Reason for Leaving */}
                <div className="space-y-2">
                  <Label className="text-white">Reason for Leaving</Label>
                  <Textarea
                    value={exp.reasonForLeaving || ""}
                    onChange={(e) =>
                      updateListItem(
                        "experience",
                        index,
                        "reasonForLeaving",
                        e.target.value
                      )
                    }
                    placeholder="Career growth opportunities, seeking new challenges..."
                    className="min-h-[60px] bg-white/5 border-white/20 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            onClick={() => addListItem("experience")}
            variant="outline"
            className="w-full border-dashed border-white/30 hover:border-purple-500/50 hover:bg-purple-500/10 py-3"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Work Experience
          </Button>

          {/* Tips Section */}
          <Card className="border border-yellow-500/30 bg-gradient-to-r from-yellow-900/10 to-orange-900/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <h4 className="text-sm font-medium text-white">
                  Tips for Experience Section
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                  <span>
                    Use action verbs: Led, Developed, Implemented, Optimized,
                    Reduced, Increased
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                  <span>
                    Include quantifiable achievements with numbers and
                    percentages
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                  <span>
                    Focus on impact and results, not just responsibilities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                  <span>
                    List most recent experience first, in reverse chronological
                    order
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </SortableAccordionItem>
  );

  // Education Section
  const renderEducation = () => (
    <SortableAccordionItem key="education" id="education" index={2}>
      <AccordionItem
        value="education"
        className="border border-white/20 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl px-4 md:px-6 shadow-2xl shadow-black/40 ml-10 md:ml-12"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
              <span className="font-semibold text-base md:text-lg text-left flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" />
                Education
              </span>
            </CustomAccordionTrigger>
          </div>
        </div>
        <AccordionContent className="pb-4 space-y-4 md:space-y-6">
          {data.education.map((edu: any, index: number) => (
            <Card
              key={edu.id}
              className="relative group border-dashed border-white/20 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeListItem("education", index)}
                  className="text-red-400 hover:bg-red-500/10 h-8 w-8"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <CardContent className="p-3 md:p-4 space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">School/University</Label>
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
                      placeholder="University Name"
                      className="bg-white/5 border-white/20 text-white"
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
                      placeholder="Bachelor of Science in Computer Science"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Field of Study</Label>
                    <Input
                      value={edu.fieldOfStudy || ""}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          index,
                          "fieldOfStudy",
                          e.target.value
                        )
                      }
                      placeholder="Computer Science"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Graduation Date</Label>
                    <Input
                      value={edu.graduationDate}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          index,
                          "graduationDate",
                          e.target.value
                        )
                      }
                      placeholder="MM/YYYY"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Location</Label>
                    <Input
                      value={edu.location || ""}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          index,
                          "location",
                          e.target.value
                        )
                      }
                      placeholder="City, Country"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">GPA</Label>
                    <Input
                      value={edu.gpa || ""}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          index,
                          "gpa",
                          e.target.value
                        )
                      }
                      placeholder="3.8/4.0"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label className="text-white">
                      Honors & Awards (one per line)
                    </Label>
                    <Textarea
                      value={edu.honors?.join("\n") || ""}
                      onChange={(e) =>
                        updateListItem(
                          "education",
                          index,
                          "honors",
                          e.target.value.split("\n").filter(Boolean)
                        )
                      }
                      placeholder="• Magna Cum Laude\n• Dean's List 2019-2021\n• Best Thesis Award"
                      className="min-h-[80px] bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label className="text-white">
                      Relevant Coursework (comma separated)
                    </Label>
                    <Input
                      value={edu.coursework?.join(", ") || ""}
                      onChange={(e) => {
                        const coursework = e.target.value
                          .split(",")
                          .map((c) => c.trim())
                          .filter(Boolean);
                        updateListItem(
                          "education",
                          index,
                          "coursework",
                          coursework
                        );
                      }}
                      placeholder="Algorithms, Data Structures, Machine Learning, Web Development"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            onClick={() => addListItem("education")}
            variant="outline"
            className="w-full border-dashed border-white/30 hover:border-purple-500/50 hover:bg-purple-500/10 py-2"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Education
          </Button>
        </AccordionContent>
      </AccordionItem>
    </SortableAccordionItem>
  );

  // Skills Section - ENHANCED
  const renderSkills = () => (
    <SortableAccordionItem key="skills" id="skills" index={3}>
      <AccordionItem
        value="skills"
        className="border border-white/20 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl px-4 md:px-6 shadow-2xl shadow-black/40 ml-10 md:ml-12"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
              <span className="font-semibold text-base md:text-lg text-left flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                Skills
              </span>
            </CustomAccordionTrigger>
          </div>
        </div>
        <AccordionContent className="pb-4 space-y-6">
          <div className="space-y-4">
            {/* Technical Skills */}
            <div className="space-y-2">
              <Label className="text-white">
                Technical Skills (comma separated)
              </Label>
              <Textarea
                value={data.skills.join(", ")}
                onChange={(e) => updateSkills(e.target.value)}
                placeholder="React, TypeScript, Node.js, Python, AWS, Docker..."
                className="min-h-[100px] bg-white/5 border-white/20 text-white"
              />
              <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2">
                <AnimatePresence>
                  {data.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Skill Categories */}
            <div className="space-y-4">
              <Label className="text-white">Skill Categories</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Programming Languages */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">
                    Programming Languages
                  </Label>
                  <Input
                    value={data.skillCategories?.programming?.join(", ") || ""}
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s !== "");
                      onChange({
                        ...data,
                        skillCategories: {
                          ...data.skillCategories,
                          programming: skills,
                        },
                      });
                    }}
                    placeholder="JavaScript, TypeScript, Python, Java, C++, Go, Rust, Swift, Kotlin"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Frameworks */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">
                    Frameworks & Libraries
                  </Label>
                  <Input
                    value={data.skillCategories?.frameworks?.join(", ") || ""}
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s !== "");
                      onChange({
                        ...data,
                        skillCategories: {
                          ...data.skillCategories,
                          frameworks: skills,
                        },
                      });
                    }}
                    placeholder="React, Vue.js, Angular, Next.js, Express.js, Django, Flask, Spring"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Databases */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Databases</Label>
                  <Input
                    value={data.skillCategories?.databases?.join(", ") || ""}
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s !== "");
                      onChange({
                        ...data,
                        skillCategories: {
                          ...data.skillCategories,
                          databases: skills,
                        },
                      });
                    }}
                    placeholder="PostgreSQL, MySQL, MongoDB, Redis, Cassandra, Elasticsearch"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Cloud Platforms */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">
                    Cloud Platforms
                  </Label>
                  <Input
                    value={data.skillCategories?.cloud?.join(", ") || ""}
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s !== "");
                      onChange({
                        ...data,
                        skillCategories: {
                          ...data.skillCategories,
                          cloud: skills,
                        },
                      });
                    }}
                    placeholder="AWS, Google Cloud, Azure, DigitalOcean, Heroku, Vercel"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* DevOps & Tools */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">
                    DevOps & Tools
                  </Label>
                  <Input
                    value={data.skillCategories?.devops?.join(", ") || ""}
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s !== "");
                      onChange({
                        ...data,
                        skillCategories: {
                          ...data.skillCategories,
                          devops: skills,
                        },
                      });
                    }}
                    placeholder="Docker, Kubernetes, Jenkins, Git, CI/CD, Terraform, Ansible"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                {/* Methodologies */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Methodologies</Label>
                  <Input
                    value={
                      data.skillCategories?.methodologies?.join(", ") || ""
                    }
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s !== "");
                      onChange({
                        ...data,
                        skillCategories: {
                          ...data.skillCategories,
                          methodologies: skills,
                        },
                      });
                    }}
                    placeholder="Agile, Scrum, Kanban, Waterfall, TDD, BDD, DevOps"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Languages Proficiency */}
            <div className="space-y-2">
              <Label className="text-white">Languages Proficiency</Label>
              <div className="space-y-2">
                {(data.skillCategories?.languages || []).map(
                  (lang: Language, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        value={lang.language}
                        onChange={(e) => {
                          const newLangs = [
                            ...(data.skillCategories?.languages || []),
                          ];
                          newLangs[index].language = e.target.value;
                          onChange({
                            ...data,
                            skillCategories: {
                              ...data.skillCategories,
                              languages: newLangs,
                            },
                          });
                        }}
                        placeholder="Language"
                        className="bg-white/5 border-white text-white"
                      />
                      <Select
                        value={lang.proficiency}
                        onValueChange={(value) => {
                          const newLangs = [
                            ...(data.skillCategories?.languages || []),
                          ];
                          newLangs[index].proficiency =
                            value as Language["proficiency"];
                          onChange({
                            ...data,
                            skillCategories: {
                              ...data.skillCategories,
                              languages: newLangs,
                            },
                          });
                        }}
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-white/20">
                          <SelectItem value="Native">Native</SelectItem>
                          <SelectItem value="Fluent">Fluent</SelectItem>
                          <SelectItem value="Professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Basic">Basic</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newLangs = [
                            ...(data.skillCategories?.languages || []),
                          ];
                          newLangs.splice(index, 1);
                          onChange({
                            ...data,
                            skillCategories: {
                              ...data.skillCategories,
                              languages: newLangs,
                            },
                          });
                        }}
                        className="text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )
                )}
                <Button
                  onClick={() => {
                    const newLangs = [
                      ...(data.skillCategories?.languages || []),
                    ];
                    newLangs.push({
                      language: "",
                      proficiency: "Intermediate",
                    });
                    onChange({
                      ...data,
                      skillCategories: {
                        ...data.skillCategories,
                        languages: newLangs,
                      },
                    });
                  }}
                  variant="outline"
                  size="sm"
                  className="border-white/5 !text-white hover:border-purple-500/50 hover:bg-purple-500/10"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Language
                </Button>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <Label className="text-white">Certifications</Label>
              <div className="space-y-2">
                {(data.skillCategories?.certifications || []).map(
                  (cert: Certification, index: number) => (
                    <Card
                      key={index}
                      className="bg-white/5 border-white/20 p-3"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Input
                            value={cert.name}
                            onChange={(e) => {
                              const newCerts = [
                                ...(data.skillCategories?.certifications || []),
                              ];
                              newCerts[index].name = e.target.value;
                              onChange({
                                ...data,
                                skillCategories: {
                                  ...data.skillCategories,
                                  certifications: newCerts,
                                },
                              });
                            }}
                            placeholder="Certification Name"
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={cert.issuer}
                            onChange={(e) => {
                              const newCerts = [
                                ...(data.skillCategories?.certifications || []),
                              ];
                              newCerts[index].issuer = e.target.value;
                              onChange({
                                ...data,
                                skillCategories: {
                                  ...data.skillCategories,
                                  certifications: newCerts,
                                },
                              });
                            }}
                            placeholder="Issuing Organization"
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={cert.date}
                            onChange={(e) => {
                              const newCerts = [
                                ...(data.skillCategories?.certifications || []),
                              ];
                              newCerts[index].date = e.target.value;
                              onChange({
                                ...data,
                                skillCategories: {
                                  ...data.skillCategories,
                                  certifications: newCerts,
                                },
                              });
                            }}
                            placeholder="Issue Date (MM/YYYY)"
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={cert.credentialId || ""}
                            onChange={(e) => {
                              const newCerts = [
                                ...(data.skillCategories?.certifications || []),
                              ];
                              newCerts[index].credentialId = e.target.value;
                              onChange({
                                ...data,
                                skillCategories: {
                                  ...data.skillCategories,
                                  certifications: newCerts,
                                },
                              });
                            }}
                            placeholder="Credential ID"
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={cert.url || ""}
                            onChange={(e) => {
                              const newCerts = [
                                ...(data.skillCategories?.certifications || []),
                              ];
                              newCerts[index].url = e.target.value;
                              onChange({
                                ...data,
                                skillCategories: {
                                  ...data.skillCategories,
                                  certifications: newCerts,
                                },
                              });
                            }}
                            placeholder="Verification URL"
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newCerts = [
                                ...(data.skillCategories?.certifications || []),
                              ];
                              newCerts.splice(index, 1);
                              onChange({
                                ...data,
                                skillCategories: {
                                  ...data.skillCategories,
                                  certifications: newCerts,
                                },
                              });
                            }}
                            className="text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                )}
                <Button
                  onClick={() => {
                    const newCerts = [
                      ...(data.skillCategories?.certifications || []),
                    ];
                    newCerts.push({
                      name: "",
                      issuer: "",
                      date: "",
                    });
                    onChange({
                      ...data,
                      skillCategories: {
                        ...data.skillCategories,
                        certifications: newCerts,
                      },
                    });
                  }}
                  variant="outline"
                  size="sm"
                  className="border-white/5 !text-white hover:border-purple-500/50 hover:bg-purple-500/10"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Certification
                </Button>
              </div>
            </div>

            {/* Proficiency Levels */}
            <div className="space-y-2">
              <Label className="text-white">
                Proficiency Levels (Skill:Level)
              </Label>
              <Textarea
                value={data.proficiencyLevels?.join("\n") || ""}
                onChange={(e) => {
                  const levels = e.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line !== "");
                  onChange({
                    ...data,
                    proficiencyLevels: levels,
                  });
                }}
                placeholder="JavaScript: Expert\nReact: Advanced\nPython: Intermediate\nGit: Advanced"
                className="min-h-[100px] bg-white/5 border-white/20 text-white"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </SortableAccordionItem>
  );

  // Projects Section
  const renderProjects = () => (
    <SortableAccordionItem key="projects" id="projects" index={4}>
      <AccordionItem
        value="projects"
        className="border border-white/20 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl px-4 md:px-6 shadow-2xl shadow-black/40 ml-10 md:ml-12"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
              <span className="font-semibold text-base md:text-lg text-left flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Projects
              </span>
            </CustomAccordionTrigger>
          </div>
        </div>
        <AccordionContent className="pb-4 space-y-4 md:space-y-6">
          {data.projects.map((proj: any, index: number) => (
            <Card
              key={proj.id}
              className="relative group border-dashed border-white/20 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeListItem("projects", index)}
                  className="text-red-400 hover:bg-red-500/10 h-8 w-8"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <CardContent className="p-3 md:p-4 space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
                      placeholder="E-commerce Platform"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Your Role</Label>
                    <Input
                      value={proj.role || ""}
                      onChange={(e) =>
                        updateListItem(
                          "projects",
                          index,
                          "role",
                          e.target.value
                        )
                      }
                      placeholder="Full Stack Developer"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Project URL</Label>
                    <Input
                      value={proj.url || ""}
                      onChange={(e) =>
                        updateListItem("projects", index, "url", e.target.value)
                      }
                      placeholder="https://project.com"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Date Completed</Label>
                    <Input
                      value={proj.date || ""}
                      onChange={(e) =>
                        updateListItem(
                          "projects",
                          index,
                          "date",
                          e.target.value
                        )
                      }
                      placeholder="MM/YYYY"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
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
                      placeholder="Describe the project, its purpose, and your contributions..."
                      className="min-h-[100px] bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label className="text-white">
                      Key Features (one per line)
                    </Label>
                    <Textarea
                      value={proj.features?.join("\n") || ""}
                      onChange={(e) =>
                        updateListItem(
                          "projects",
                          index,
                          "features",
                          e.target.value.split("\n").filter(Boolean)
                        )
                      }
                      placeholder="• User authentication system\n• Real-time chat functionality\n• Payment integration\n• Admin dashboard"
                      className="min-h-[80px] bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
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
                      placeholder="React, Node.js, MongoDB, AWS, Docker..."
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            onClick={() => addListItem("projects")}
            variant="outline"
            className="w-full border-dashed border-white/30 hover:border-purple-500/50 hover:bg-purple-500/10 py-2"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </Button>
        </AccordionContent>
      </AccordionItem>
    </SortableAccordionItem>
  );

  // Social Links Section
  const renderSocialLinks = () => (
    <SortableAccordionItem key="social-links" id="social-links" index={5}>
      <AccordionItem
        value="social-links"
        className="border border-white/20 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl px-4 md:px-6 shadow-2xl shadow-black/40 ml-10 md:ml-12"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
              <span className="font-semibold text-base md:text-lg text-left flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Social Links & Online Presence
              </span>
            </CustomAccordionTrigger>
          </div>
        </div>
        <AccordionContent className="pb-4">
          <SocialLinksSection data={data} onChange={onChange} />
        </AccordionContent>
      </AccordionItem>
    </SortableAccordionItem>
  );

  // Custom Section Renderer
  const renderCustomSection = (sectionIndex: number, index: number) => {
    const section = customSections[sectionIndex];
    return (
      <SortableAccordionItem key={section.id} id={section.id} index={index}>
        <AccordionItem
          value={section.id}
          className="border border-white/20 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl px-4 md:px-6 shadow-2xl shadow-black/40 ml-10 md:ml-12"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <CustomAccordionTrigger className="pl-0 py-4 text-white hover:no-underline hover:text-purple-300 transition-colors group">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-base md:text-lg">
                    {section.title}
                  </span>
                </div>
              </CustomAccordionTrigger>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCustomSection(sectionIndex)}
                className="text-red-400 hover:bg-red-500/10 h-8 w-8"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          <AccordionContent className="pb-4 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Section Title</Label>
                <Input
                  value={section.title}
                  onChange={(e) =>
                    updateCustomSection(sectionIndex, "title", e.target.value)
                  }
                  placeholder="Section Title"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Content Type</Label>
                <Select
                  value={section.type}
                  onValueChange={(value) =>
                    updateCustomSection(sectionIndex, "type", value)
                  }
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="text" className="text-white">
                      Text/Paragraph
                    </SelectItem>
                    <SelectItem value="rich-text" className="text-white">
                      Rich Text
                    </SelectItem>
                    <SelectItem value="list" className="text-white">
                      List Items
                    </SelectItem>
                    <SelectItem value="badges" className="text-white">
                      Badges/Tags
                    </SelectItem>
                    <SelectItem value="date" className="text-white">
                      Date
                    </SelectItem>
                    <SelectItem value="link" className="text-white">
                      Link/URL
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {section.type === "text" && (
                <div className="space-y-2">
                  <Label className="text-white">Content</Label>
                  <Textarea
                    value={section.content as string}
                    onChange={(e) =>
                      updateCustomSection(
                        sectionIndex,
                        "content",
                        e.target.value
                      )
                    }
                    placeholder="Enter your content here..."
                    className="min-h-[100px] bg-white/5 border-white/20 text-white"
                  />
                </div>
              )}

              {section.type === "rich-text" && (
                <div className="space-y-2">
                  <Label className="text-white">Rich Content</Label>
                  <RichTextEditor
                    value={section.content as string}
                    onChange={(value) =>
                      updateCustomSection(sectionIndex, "content", value)
                    }
                    placeholder="Enter rich text content..."
                  />
                </div>
              )}

              {section.type === "list" && (
                <div className="space-y-4">
                  <Label className="text-white">List Items</Label>
                  {Array.isArray(section.content) &&
                    section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2 items-center">
                        <Input
                          value={item}
                          onChange={(e) =>
                            updateCustomListItem(
                              sectionIndex,
                              itemIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Item ${itemIndex + 1}`}
                          className="bg-white/5 border-white/20 text-white"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeCustomListItem(sectionIndex, itemIndex)
                          }
                          className="text-red-400 hover:bg-red-500/10 h-8 w-8"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  <Button
                    onClick={() => addCustomListItem(sectionIndex)}
                    variant="outline"
                    size="sm"
                    className="py-1.5 border-white/30 hover:border-purple-500/50 hover:bg-purple-500/10"
                  >
                    <Plus className="w-3.5 h-3.5 mr-2" /> Add Item
                  </Button>
                </div>
              )}

              {section.type === "badges" && (
                <div className="space-y-2">
                  <Label className="text-white">
                    Badges/Tags (comma separated)
                  </Label>
                  <Input
                    value={
                      Array.isArray(section.content)
                        ? section.content.join(", ")
                        : ""
                    }
                    onChange={(e) => {
                      const badges = e.target.value
                        .split(",")
                        .map((b) => b.trim())
                        .filter(Boolean);
                      updateCustomSection(sectionIndex, "content", badges);
                    }}
                    placeholder="Certification Name, Award Name, Skill..."
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              )}

              {section.type === "date" && (
                <div className="space-y-2">
                  <Label className="text-white">Date</Label>
                  <Input
                    value={section.content as string}
                    onChange={(e) =>
                      updateCustomSection(
                        sectionIndex,
                        "content",
                        e.target.value
                      )
                    }
                    placeholder="MM/YYYY"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              )}

              {section.type === "link" && (
                <div className="space-y-2">
                  <Label className="text-white">Link URL</Label>
                  <Input
                    type="url"
                    value={section.content as string}
                    onChange={(e) =>
                      updateCustomSection(
                        sectionIndex,
                        "content",
                        e.target.value
                      )
                    }
                    placeholder="https://example.com"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </SortableAccordionItem>
    );
  };

  const renderSection = (sectionId: string, index: number) => {
    switch (sectionId) {
      case "personal-info":
        return renderPersonalInfo();
      case "experience":
        return renderExperience();
      case "education":
        return renderEducation();
      case "skills":
        return renderSkills();
      case "projects":
        return renderProjects();
      case "social-links":
        return renderSocialLinks();
      default:
        // Check if this is a custom section
        const customSectionIndex = customSections.findIndex(
          (s) => s.id === sectionId
        );
        if (customSectionIndex !== -1) {
          return renderCustomSection(customSectionIndex, index);
        }
        return null;
    }
  };

  return (
    <div className="h-auto flex flex-col bg-gradient-to-br from-gray-950 via-black to-purple-950 p-4 rounded-2xl">
      <EnhancedBackground />

      {/* Header */}
      <div className="p-4 border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            NEXUS RESUME BUILDER
          </h1>
        </div>

        <div className="flex items-center justify-between">
          {/* Voice command button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsListening(!isListening)}
            className={`relative ${
              isListening ? "text-red-400 bg-red-500/10" : "text-gray-400"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </>
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          {/* Navigation tabs */}
          <div className="flex gap-2">
            {["edit", "analyze", "theme"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }
                  transition-all duration-300
                `}
              >
                {tab === "edit" && <FilePenLine className="w-4 h-4 mr-2" />}
                {tab === "analyze" && <BarChart3 className="w-4 h-4 mr-2" />}
                {tab === "theme" && <Palette className="w-4 h-4 mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        {activeTab === "edit" ? (
          <div className="h-full">
            <div className="overflow-y-auto p-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sectionOrder}
                  strategy={verticalListSortingStrategy}
                >
                  <AnimatePresence>
                    <Accordion
                      type="multiple"
                      value={activeAccordionItems}
                      onValueChange={setActiveAccordionItems}
                      className="space-y-3"
                    >
                      {sectionOrder.map((sectionId, index) =>
                        renderSection(sectionId, index)
                      )}
                    </Accordion>
                  </AnimatePresence>
                </SortableContext>
              </DndContext>

              {/* Add Custom Section Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={addCustomSection}
                  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 
                           hover:from-purple-700 hover:to-pink-700 text-white py-2"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  <span className="text-lg">Add Custom Section</span>
                </Button>
              </motion.div>
            </div>
          </div>
        ) : activeTab === "analyze" ? (
          <div className="h-full p-4 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <ResumeMetrics data={data} />
            </div>
          </div>
        ) : (
          <div className="h-full p-4 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <ThemeCustomizer
                theme={themeConfig}
                onThemeChange={setThemeConfig}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
