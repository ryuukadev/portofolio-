export type Lang = "id" | "en";

export type Dictionary = {
  nav: {
    links: { name: string; href: string }[];
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    greeting: string;
    rotatingWords: string[];
    descriptionPrefix: string;
    descriptionSchool: string;
    descriptionSuffix: string;
    ctaContact: string;
    ctaProjects: string;
    location: string;
    badge: string;
    badgeSchool: string;
    locationShort: string;
  };
  about: {
    sectionLabel: string;
    sectionNumber: string;
    profileTitle: string;
    role: string;
    school: string;
    location: string;
    badgeRpl: string;
    badgeYear: string;
    cardFooterSchool: string;
    cardFooterCity: string;
    storyLabel: string;
    p1: { a: string; school: string; b: string };
    p2: { a: string; bold: string; b: string };
    p3: string;
    tags: string[];
  };
  projects: {
    sectionLabel: string;
    sectionNumber: string;
    intro: string;
    categories: string[];
    allLabel: string;
    live: string;
  };
  projectItems: {
    title: string;
    description: string;
    category: string;
    techStack: string[];
    image?: string;
  }[];
  skills: {
    sectionLabel: string;
    sectionNumber: string;
    intro: string;
    introTechHint: string;
    groups: { id: string; label: string }[];
    techItems: { name: string; desc: string }[];
  };
  certificates: {
    sectionLabel: string;
    sectionNumber: string;
    heading: string;
    intro: string;
    galleryTitle: string;
  };
  contact: {
    sectionLabel: string;
    sectionNumber: string;
    heading: string;
    intro: string;
    infoEmail: string;
    infoLocation: string;
    infoLocationValue: string;
    infoResponse: string;
    infoResponseValue: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formMessage: string;
    formMessagePlaceholder: string;
    submit: string;
    submitting: string;
    sentTitle: string;
    sentDesc: string;
    consent: string;
    toastTitle: string;
    toastDesc: string;
    messageHistory: string;
  };
  footer: {
    tagline: string;
  };
  github: {
    profile: string;
    overview: string;
    repos: string;
    repositories: string;
    followers: string;
    following: string;
    contributions: string;
    lastYear: string;
    contributionsSuffix: string;
    viewProfile: string;
    contributionsHint: string;
    loadError: string;
    reposError: string;
    chartAlt: string;
    chartFailed: string;
  };
  showcase: {
    badge: string;
    sectionNumber: string;
    oneSection: string;
    certSuffix: string;
    emptyFilter: string;
  };
};

export const dictionaries: Record<Lang, Dictionary> = {
  id: {
    nav: {
      links: [
        { name: "Beranda", href: "#beranda" },
        { name: "Tentang", href: "#tentang" },
        { name: "Karya", href: "#karya" },
        { name: "Kontak", href: "#kontak" },
      ],
      cta: "Hubungi",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
    },
    hero: {
      greeting: "HALO, SAYA",
      rotatingWords: ["Frontend Dev", "Desainer UI/UX", "Junior Developer", "Perajin Kode"],
      descriptionPrefix: "Halo! Saya siswa kelas 11 Program Keahlian Rekayasa Perangkat Lunak (RPL).",
      descriptionSchool: "",
      descriptionSuffix:
        ". Saya berfokus pada pengembangan antarmuka web yang modern, interaktif, rapi, dan estetis, dengan fokus utama pada frontend development dan desain UI/UX.",
      ctaContact: "HUBUNGI SAYA",
      ctaProjects: "LIHAT PROYEK",
      location: "Klungkung, Bali, Indonesia",
      badge: "11 RPL",
      badgeSchool: "SEKOLAH MENENGAH KEJURUAN",
      locationShort: "BALI • INDONESIA",
    },
    about: {
      sectionLabel: "TENTANG",
      sectionNumber: "02 — PROFILE",
      profileTitle: "DEWAHYU",
      role: "STUDENT • JR FRONTEND DEV • UI/UX",
      school: "Kelas 11 RPL",
      location: "Klungkung, Bali, Indonesia",
      badgeRpl: "RPL",
      badgeYear: "2025 — NOW",
      cardFooterSchool: "",
      cardFooterCity: "",
      storyLabel: "LATAR BELAKANG & PASSION",
      p1: {
        a: "Saya siswa XI RPL yang berfokus pada web development, frontend, dan UI/UX. Berawal dari tugas sekolah, saya mulai mengeksplorasi desain dan teknologi web untuk membangun website yang modern, responsif, dan berkarakter.",
        school: "",
        b: "",
      },
      p2: {
        a: "Fokus pada pengembangan",
        bold: "Frontend & UI/UX",
        b: "menggunakan Next.js, React, dan Tailwind CSS. Saya senang membangun antarmuka yang bersih, responsif, dan mudah digunakan, dengan perhatian pada detail visual serta karakter desain yang kuat.",
      },
    p3: "Di luar coding, saya suka mendengarkan musik di Spotify dan bermain game seperti Valorant maupun Mobile Legends. Bagi saya, bermain game dan mendengarkan musik adalah cara untuk bersantai dan mengisi waktu luang.",
      tags: ["FRONTEND", "UI/UX", "WEB DEV", "MOBILE"],
    },
    projects: {
      sectionLabel: "PROYEK",
      sectionNumber: "03 — SHOWCASE",
      intro: "Proyek akademis & eksplorasi mandiri — web, mobile, dan UI/UX.",
      categories: ["Semua", "Web App", "Mobile", "UI/UX"],
      allLabel: "Semua",
      live: "LIVE",
    },
    projectItems: [
      {
        title: "Website Portofolio Pribadi — Situs Ini",
        description:
          "Website yang sedang kamu lihat ini. Dibangun dengan Next.js 15, Tailwind CSS & next-themes — menampilkan profil, karya, keahlian & sertifikat dengan animasi spring physics, glassmorphism, dan desain high-contrast ala Persona.",
        category: "Web App",
        techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
        image: "/portofolio.png",
      },
    ],
    skills: {
      sectionLabel: "KEAHLIAN",
      sectionNumber: "04 — ARSENAL",
      intro: "Teknologi yang lagi saya pelajari & pakai — jujur sesuai level sekarang.",
      introTechHint: "pemula → berkembang, logo resmi.",
      groups: [
        { id: "frontend", label: "FRONTEND" },
        { id: "backend", label: "BACKEND" },
        { id: "design", label: "DESAIN" },
        { id: "tools", label: "TOOLS" },
      ],
      techItems: [
        { name: "HTML", desc: "Struktur & Semantic Markup" },
        { name: "CSS", desc: "Styling & Layout Responsif" },
        { name: "JavaScript", desc: "Interaktivitas & DOM Dasar" },
        { name: "Next.js", desc: "Framework React & App Router" },
        { name: "Tailwind CSS", desc: "Utility Styling Cepat" },
        { name: "React", desc: "Komponen UI Dasar" },
        { name: "Figma", desc: "Desain & Prototyping UI" },
        { name: "Git & GitHub", desc: "Version Control Dasar" },
      ],
    },
    certificates: {
      sectionLabel: "SERTIFIKAT",
      sectionNumber: "06 — CREDENTIALS",
      heading: "Pengakuan & Sertifikat",
      intro: "Beberapa sertifikat dan pengakuan yang saya dapatkan selama belajar tentang pengembangan web dan desain UI/UX.",
      galleryTitle: "Serba Sertifikat",
    },
    contact: {
      sectionLabel: "KONTAK",
      sectionNumber: "05 — CONNECT",
      heading: "MARI TERHUBUNG",
      intro: "Punya ide kolaborasi atau sekadar ingin say hi? Kirim pesan — biasanya saya balas 1–2 hari kerja.",
      infoEmail: "EMAIL",
      infoLocation: "LOKASI",
      infoLocationValue: "Klungkung, Bali, Indonesia",
      infoResponse: "RESPONS",
      infoResponseValue: "1–2 hari kerja",
      formName: "NAMA LENGKAP",
      formNamePlaceholder: "Nama kamu",
      formEmail: "EMAIL",
      formMessage: "PESAN",
      formMessagePlaceholder: "Tulis pesanmu di sini...",
      submit: "KIRIM PESAN",
      submitting: "MENGIRIM...",
      sentTitle: "TERKIRIM!",
      sentDesc: "Terima kasih — pesanmu sudah masuk.",
      consent: "Dengan mengirim, kamu menyetujui untuk dihubungi kembali.",
      toastTitle: "Pesan terkirim!",
      toastDesc: "Terima kasih — saya akan membalas segera.",
      messageHistory: "Riwayat Pesan",
    },
    footer: {
      tagline: "Dibuat dengan presisi — putih, hitam, dan kontras tinggi.",
    },
    github: {
      profile: "Profil GitHub",
      overview: "Ikhtisar",
      repos: "Repositori",
      repositories: "Repositori",
      followers: "Pengikut",
      following: "Mengikuti",
      contributions: "Kontribusi",
      lastYear: "tahun terakhir",
      contributionsSuffix: "kontribusi dalam setahun terakhir",
      viewProfile: "Lihat profil GitHub",
      contributionsHint: "Klik grafik untuk membuka profil",
      loadError: "Gagal ambil data GitHub",
      reposError: "Gagal ambil repositori",
      chartAlt: "Grafik kontribusi GitHub",
      chartFailed: "Grafik kontribusi tidak dapat dimuat.",
    },
    showcase: {
      badge: "KARYA",
      sectionNumber: "03 — SHOWCASE",
      oneSection: "1 SECTION",
      certSuffix: "SERTIFIKAT",
      emptyFilter: "Tidak ada proyek di kategori ini.",
    },
  },
  en: {
    nav: {
      links: [
        { name: "Home", href: "#beranda" },
        { name: "About", href: "#tentang" },
        { name: "Showcase", href: "#karya" },
        { name: "Contact", href: "#kontak" },
      ],
      cta: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      greeting: "HI, I'M",
      rotatingWords: ["Frontend Dev", "UI/UX Designer", "Junior Developer", "Code Crafter"],
      descriptionPrefix: "Hello! I'm an 11th-grade Software Engineering (RPL) student.",
      descriptionSchool: "",
      descriptionSuffix:
        ". I specialize in developing modern, interactive, neat, and aesthetic web interfaces, with a primary focus on frontend development and UI/UX design.",
      ctaContact: "CONTACT ME",
      ctaProjects: "VIEW PROJECTS",
      location: "Klungkung, Bali, Indonesia",
      badge: "11 RPL",
      badgeSchool: "VOCATIONAL HIGH SCHOOL",
      locationShort: "BALI • INDONESIA",
    },
    about: {
      sectionLabel: "ABOUT",
      sectionNumber: "02 — PROFILE",
      profileTitle: "DEWAHYU",
      role: "STUDENT • JR FRONTEND DEV • UI/UX",
      school: "Grade 11 RPL",
      location: "Klungkung, Bali, Indonesia",
      badgeRpl: "RPL",
      badgeYear: "2025 — NOW",
      cardFooterSchool: "",
      cardFooterCity: "",
      storyLabel: "BACKGROUND & PASSION",
      p1: {
        a: "I'm an 11th-grade RPL student focused on web development, frontend, and UI/UX. Starting from school assignments, I began exploring web design and technology to build modern, responsive websites with character.",
        school: "",
        b: "",
      },
      p2: {
        a: "Focused on",
        bold: "Frontend & UI/UX",
        b: "development using Next.js, React, and Tailwind CSS. I enjoy building clean, responsive, and easy-to-use interfaces, with attention to visual detail and strong design character.",
      },
      p3: "Outside of coding, I enjoy listening to music on Spotify and playing games like Valorant and Mobile Legends. For me, playing games and listening to music are ways to relax and spend my free time.",
      tags: ["FRONTEND", "UI/UX", "WEB DEV", "MOBILE"],
    },
    projects: {
      sectionLabel: "PROJECTS",
      sectionNumber: "03 — SHOWCASE",
      intro: "Academic projects & self-driven explorations — web, mobile, and UI/UX.",
      categories: ["All", "Web App", "Mobile", "UI/UX"],
      allLabel: "All",
      live: "LIVE",
    },
    projectItems: [
      {
        title: "Personal Portfolio Website — This Site",
        description:
          "The website you are viewing right now. Built with Next.js 15, Tailwind CSS & next-themes — featuring profile, showcase, skills & certificates with spring physics animations, glassmorphism, and high-contrast Persona-inspired design.",
        category: "Web App",
        techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
        image: "/portofolio.png",
      },
    ],
    skills: {
      sectionLabel: "SKILLS",
      sectionNumber: "04 — ARSENAL",
      intro: "Technologies I'm learning & using — honest to my current level.",
      introTechHint: "beginner → growing, official logos.",
      groups: [
        { id: "frontend", label: "FRONTEND" },
        { id: "backend", label: "BACKEND" },
        { id: "design", label: "DESIGN" },
        { id: "tools", label: "TOOLS" },
      ],
      techItems: [
        { name: "HTML", desc: "Structure & Semantic Markup" },
        { name: "CSS", desc: "Styling & Responsive Layout" },
        { name: "JavaScript", desc: "Interactivity & Basic DOM" },
        { name: "Next.js", desc: "React Framework & App Router" },
        { name: "Tailwind CSS", desc: "Fast Utility Styling" },
        { name: "React", desc: "Basic UI Components" },
        { name: "Figma", desc: "UI Design & Prototyping" },
        { name: "Git & GitHub", desc: "Basic Version Control" },
      ],
    },
    certificates: {
      sectionLabel: "CERTIFICATES",
      sectionNumber: "06 — CREDENTIALS",
      heading: "Recognition & Certificates",
      intro: "Some certificates and recognitions I've earned while learning web development and UI/UX design.",
      galleryTitle: "Certificate Gallery",
    },
    contact: {
      sectionLabel: "CONTACT",
      sectionNumber: "05 — CONNECT",
      heading: "LET'S CONNECT",
      intro: "Got a collaboration idea or just want to say hi? Drop a message — I usually reply within 1–2 business days.",
      infoEmail: "EMAIL",
      infoLocation: "LOCATION",
      infoLocationValue: "Klungkung, Bali, Indonesia",
      infoResponse: "RESPONSE",
      infoResponseValue: "1–2 business days",
      formName: "FULL NAME",
      formNamePlaceholder: "Your name",
      formEmail: "EMAIL",
      formMessage: "MESSAGE",
      formMessagePlaceholder: "Write your message here...",
      submit: "SEND MESSAGE",
      submitting: "SENDING...",
      sentTitle: "SENT!",
      sentDesc: "Thanks — your message has been received.",
      consent: "By sending, you agree to be contacted back.",
      toastTitle: "Message sent!",
      toastDesc: "Thanks — I'll get back to you soon.",
      messageHistory: "Message History",
    },
    footer: {
      tagline: "Crafted with precision — white, black, and high contrast.",
    },
    github: {
      profile: "GitHub Profile",
      overview: "Overview",
      repos: "Repositories",
      repositories: "Repositories",
      followers: "Followers",
      following: "Following",
      contributions: "Contributions",
      lastYear: "last year",
      contributionsSuffix: "contributions in the last year",
      viewProfile: "View GitHub profile",
      contributionsHint: "Click the graph to open profile",
      loadError: "Failed to fetch GitHub data",
      reposError: "Failed to fetch repositories",
      chartAlt: "GitHub contributions chart",
      chartFailed: "Contributions chart could not be loaded.",
    },
    showcase: {
      badge: "WORKS",
      sectionNumber: "03 — SHOWCASE",
      oneSection: "1 SECTION",
      certSuffix: "CERTIFICATES",
      emptyFilter: "No projects in this category.",
    },
  },
};
