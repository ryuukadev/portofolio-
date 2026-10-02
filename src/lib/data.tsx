import { Project, Skill, SocialLink } from "./types";
import { Github, Mail, Instagram } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";

export const githubUsername = "ryuukadev";

export const personalInfo = {
  fullName: "I Kadek Wahyu Arta Pratama",
  shortName: "Dewahyu",
  title: "Siswa/Kelas 11 RPL — Pengembang Frontend & UI/UX",
  grade: "Kelas 11 RPL",
  major: "Rekayasa Perangkat Lunak",
  school: "Siswa Kelas 11 RPL",
  location: "Klungkung, Bali, Indonesia",
  bio: "Siswa Rekayasa Perangkat Lunak (RPL) asal Bali yang mengkhususkan diri dalam pengembangan antarmuka web modern, interaktif, rapi, dan berkarakter, dengan fokus pada frontend development dan desain UI/UX.",
  email: "dewahyuwork@gmail.com",
  github: `https://github.com/${githubUsername}`,
  instagram: "https://instagram.com/ryuukanjut",
  tiktok: "https://www.tiktok.com/@dewahyu7_",
  whatsapp: "https://wa.me/message/ASTIE63CL3BKN1",
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Website Portofolio Pribadi — Situs Ini",
    description:
      "Website yang sedang kamu lihat ini. Dibangun dengan Next.js 15, Tailwind CSS & next-themes — menampilkan profil, karya, keahlian & sertifikat dengan animasi spring physics, glassmorphism, dan desain high-contrast ala Persona.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    category: "Web App",
    image: "/portofolio.png",
    demoUrl: undefined,
    githubUrl: undefined,
  },
];

export const skills: Skill[] = [
  { name: "HTML", category: "frontend", level: 90 },
  { name: "CSS", category: "frontend", level: 85 },
  { name: "JavaScript", category: "frontend", level: 80 },
  { name: "Tailwind CSS", category: "frontend", level: 85 },
  { name: "React", category: "frontend", level: 75 },
  { name: "Next.js", category: "frontend", level: 70 },
  { name: "TypeScript", category: "frontend", level: 70 },
  { name: "Figma", category: "design", level: 80 },
  { name: "Git", category: "tools", level: 75 },
  { name: "Github", category: "tools", level: 80 },
  { name: "REST API", category: "backend", level: 65 },
  { name: "React Native", category: "frontend", level: 60 },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: personalInfo.github,
    icon: <Github className="w-5 h-5" />,
  },
  {
    name: "WhatsApp",
    url: personalInfo.whatsapp,
    icon: <WhatsAppIcon className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    url: personalInfo.instagram,
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    name: "TikTok",
    url: personalInfo.tiktok,
    icon: <TikTokIcon className="w-5 h-5" />,
  },
  {
    name: "Email",
    url: `mailto:${personalInfo.email}`,
    icon: <Mail className="w-5 h-5" />,
  },
];

