
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import profileImage from "../assets/profile.jpg";
import zohoLogo from "../assets/zoho.png";

export const portfolioData = {
  personalInfo: {
    name: "Sriram",
    title: "Software Engineer",
    bio: "I'm a developer who turns ideas into systems and challenges into solutions, building clean and meaningful applications along the way. Every step forward is an opportunity to learn and build better.",
    email: "sriramdev5602@gmail.com",
    profileImage: profileImage,
    socials: [
      { icon: Github, link: "https://github.com/Sriram-5602", label: "GitHub" },
      { icon: Linkedin, link: "https://www.linkedin.com/in/sriram-b-571488344", label: "LinkedIn" },
      { icon: Instagram, link: "https://www.instagram.com/sriram_5602", label: "Instagram" },
      { icon: Mail, link: "mailto:sriramdev5602@gmail.com", label: "Email" },
    ],
  },
  navLinks: [
    { id: "about", label: "About" },
    { id: "profile", label: "Profile" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certifications" },
    // { id: "blog", label: "Blog" },
    { id: "labs", label: "Labs" },
    { id: "contact", label: "Contact" },
  ],
  shortProfile: {
    heading: "Profile",
    description: `A developer who enjoys building clean, meaningful applications and solving real-world problems with clarity and curiosity.
    Every challenge is a chance to learn, improve, and build something better.
    Coding has taught me resilience, clarity, and the drive to keep exploring.
    I’m excited to keep growing and moving forward—one logical step at a time.`,
    languages: "Fluent in English and Tamil",
    techStack: ["JavaScript", "Java", "MySQL", "REST APIs", "React", "TypeScript", "Vite", "Git"],
    currentRole: {
      title: "Full-stack Developer",
      company: "Zoho",
      description: "Focused on building features, improving performance, and creating reusable frameworks used across teams — delivering measurable improvements for thousands of users."
    },
    hobbies: ["Music", "Reading", "Travelling", "Sports"],
    quickFacts: [
      "Fueled by coffee ☕",
      "Tabs over spaces ⌨️",
      "Minimalist ✨"
    ]
  },
  projects: [
    {
      title: "Portfolio Website",
      description: "A fast and minimal portfolio website built with React and Vite, featuring clean UI design, reusable components, and a responsive layout.",
      tech: ["React", "Vite", "CSS"],
      link: "#",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
  ],
  experience: [
    {
      role: "Member Technical Staff",
      company: "Zoho Corporation",
      location: "Chennai, India",
      period: "June 2023 - Present",
      description: "Delivered major performance improvements for Zoho’s Learning Platform by reducing module load times from 2 minutes to 300ms and enhancing scalability across large enterprise deployments. Built secure custom video player components, reusable Java/JavaScript frameworks, and optimized API/database workflows supporting high-volume user activity and smoother product operations.",
      logo: zohoLogo,
      techStack: ["HTML", "CSS", "JavaScript", "Java", "MySQL", "REST APIs", "Struts", "HG (Mercurial)", "Internal Frameworks"]
    },
    {
      role: "Project Trainee",
      company: "Zoho Corporation",
      location: "Chennai, India",
      period: "Aug 2022 - May 2023",
      description: "Developed key features, enabling precise course eligibility controls across large enterprises. Enhanced product quality by resolving 60+ functional and security issues, contributing to improved customer satisfaction, stability, and compliance.",
      logo: zohoLogo,
      techStack: ["HTML", "CSS", "JavaScript", "Java", "MySQL", "REST APIs", "Struts", "HG (Mercurial)"]
    },
    {
      role: "Software Engineering Intern",
      company: "Zoho Corporation",
      location: "Chennai, India",
      period: "May 2022 - June 2022",
      description: "Built a full-stack Learning Management System prototype with role-based authentication, course creation, content delivery, and enrollment workflows using React, Java, MySQL, and internal frameworks. Simulated real-world learning flows for multiple user roles.",
      logo: zohoLogo,
      techStack: ["React", "Java", "MySQL", "REST APIs", "JAX", "HG (Mercurial)", "Internal Frameworks"]
    },
  ],
  education: [
    {
      degree: "B.Tech., Information Technology",
      school: "Sri Venkateswara College of Engineering ",
      period: "2019 - 2023",
      coursework: "Data Structures, Algorithms, Databases, Computer Systems, Machine Learning, OOPS",
      research: "Built a hand gesture recognition system using machine learning, applying image processing and classification to enable touchless control, tested on dozens of samples."
    },
  ],
  skills: {
    frontend: [
      { name: "JavaScript", level: 95 },
      { name: "React", level: 90 },
      { name: "HTML5", level: 80 },
      { name: "CSS3", level: 75 },
      { name: "Next.js", level: 70 },
    ],
    backend: [
      { name: "Java", level: 85 },
      { name: "MySQL", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Redis", level: 75 },
      { name: "Python", level: 70 },
    ],
    tools: [
      { name: "Git", level: 85 },
      { name: "Mercurial (Hg)", level: 85 },
      { name: "AWS", level: 75 },
      { name: "Vercel", level: 70 },
      { name: "Docker", level: 70 },
    ]
  },
  certifications: [
    {
      title: "Ultimate AWS Certified Cloud Practitioner",
      issuer: "Udemy",
      date: "2025",
      link: "https://www.udemy.com/certificate/UC-329d1e68-ba47-42ab-a134-292636adde4b/"
    },
    {
      title: "Machine Learning A-Z: Hands-On Python In Data Science",
      issuer: "Udemy",
      date: "2021",
      link: "https://www.udemy.com/certificate/UC-6af0db16-e5c1-4bfa-a792-bd101a51ffcd/"
    }
  ],
  blogPosts: [
    {
      title: "Understanding React Hooks",
      date: "Oct 15, 2023",
      excerpt: "A deep dive into useState, useEffect, and custom hooks.",
      link: "#",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "CSS Grid vs Flexbox",
      date: "Sep 22, 2023",
      excerpt: "When to use which layout model for modern web design.",
      link: "#",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Building Scalable APIs",
      date: "Aug 10, 2023",
      excerpt: "Best practices for designing RESTful APIs with Node.js.",
      link: "#",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
  fun: {
    currentStatus: "Deploying cool stuff 🚀",
    listening: "Lo-Fi Beats to Code To",
    listeningLink: "https://open.spotify.com",
    quote: "The only way to do great work is to love what you do. – Steve Jobs"
  }
};
