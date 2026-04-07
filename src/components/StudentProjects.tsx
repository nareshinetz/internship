"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUpRight, Code2, Rocket, Laptop, Database, Globe, BarChart, Settings, X, CheckCircle2, Cpu, Smartphone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  desc: string;
  gradient: string;
  icon: any;
  accentColor: string;
  borderColor: string;
  modalContent: {
    overview: string;
    features: string[];
    techStack: string[];
    result: string;
  };
};

const studentProjects: Project[] = [
  {
    id: "01",
    title: "Weather App",
    desc: "A sleek real-time weather tracking application that fetches global data with dynamic visual changes based on conditions.",
    gradient: "from-orange-500/20 to-orange-500/5",
    icon: Globe,
    accentColor: "text-orange-500",
    borderColor: "group-hover:border-orange-500/30",
    modalContent: {
      overview: "Students build a highly responsive Weather Application that utilizes OpenWeather API to provide real-time updates for any city globally.",
      features: ["Geolocation Integration", "Dynamic Weather Icons", "UV Index & Humidity Tracking", "5-Day Forecast View"],
      techStack: ["React.js", "OpenWeather API", "Tailwind CSS", "Axios"],
      result: "Mastered API integration, asynchronous programming, and conditional rendering based on external data inputs."
    }
  },
  {
    id: "02",
    title: "Admin Dashboard",
    desc: "A comprehensive enterprise-grade dashboard for managing users, tracking analytics, and visualizing complex data sets.",
    gradient: "from-sky-500/20 to-sky-500/5",
    icon: Laptop,
    accentColor: "text-sky-500",
    borderColor: "group-hover:border-sky-500/30",
    modalContent: {
      overview: "A complex data management system designed to handle large datasets and provide actionable insights through visual representation.",
      features: ["Interactive Data Charts", "User Role Management", "Light/Dark Mode Support", "Custom Analytics Widgets"],
      techStack: ["Next.js", "Recharts", "Prisma ORM", "TypeScript"],
      result: "Learned complex state management, database schema design, and enterprise-level UI/UX principles."
    }
  },
  {
    id: "03",
    title: "Portfolio Website",
    desc: "A high-performance personal brand showcase featuring glassmorphism design, smooth animations, and optimized SEO.",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    icon: Rocket,
    accentColor: "text-emerald-500",
    borderColor: "group-hover:border-emerald-500/30",
    modalContent: {
      overview: "A premium personal portfolio for developers to showcase their skills, projects, and professional journey with a focus on web performance.",
      features: ["Framer Motion Animations", "Responsive Grid Layout", "Optimized Asset Loading", "Contact Form Integration"],
      techStack: ["Next.js", "Framer Motion", "Three.js", "Resend API"],
      result: "Mastered high-end animations, performance optimization (Lighthouse 90+), and personal brand storytelling."
    }
  },
  {
    id: "04",
    title: "Inventory System",
    desc: "A full-stack CRUD application for business logistics, featuring real-time stock alerts and secure database management.",
    gradient: "from-blue-500/20 to-blue-500/5",
    icon: Database,
    accentColor: "text-blue-500",
    borderColor: "group-hover:border-blue-500/30",
    modalContent: {
      overview: "A robust backend-driven system that allows businesses to track inventory levels, sales, and supply chains in real-time.",
      features: ["Real-time Stock Tracking", "PDF Invoice Generation", "Authentication System", "Inventory Search & Filter"],
      techStack: ["Node.js", "Express", "MongoDB", "JWT Auth"],
      result: "Deep understanding of RESTful API architecture, JWT authentication, and NoSQL database management."
    }
  },
  {
    id: "05",
    title: "Analytics Engine",
    desc: "A specialized data processing engine that transforms raw CSV data into interactive visual reports with predictive insights.",
    gradient: "from-indigo-500/20 to-indigo-500/5",
    icon: BarChart,
    accentColor: "text-indigo-500",
    borderColor: "group-hover:border-indigo-500/30",
    modalContent: {
      overview: "A data-science focused web tool that processes large CSV/JSON files to generate statistical insights and predictions.",
      features: ["CSV Bulk Upload", "Trend Prediction Graphs", "Exportable Data Reports", "Custom Filter Engine"],
      techStack: ["Python", "Pandas", "React", "Chart.js"],
      result: "Learned data cleaning, statistical modeling, and bridge communication between Python backends and React frontends."
    }
  },
  {
    id: "06",
    title: "EMS System",
    desc: "A scalable Education Management System for tracking student performance, attendance, and assignment submissions.",
    gradient: "from-purple-500/20 to-purple-500/5",
    icon: Settings,
    accentColor: "text-purple-500",
    borderColor: "group-hover:border-purple-500/30",
    modalContent: {
      overview: "A multi-role platform for students, teachers, and admins to manage the entire lifecycle of an educational institution.",
      features: ["Attendance Tracker", "Assignment Submission Portal", "Grade Management", "Event Messaging"],
      techStack: ["PostgreSQL", "React", "NestJS", "Docker"],
      result: "Mastered relational database design, complex role-based access control (RBAC), and containerization."
    }
  },
];

export default function StudentProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section className="bg-white dark:bg-zinc-950 transition-colors overflow-hidden py-12 sm:py-16 relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full hidden dark:block" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full hidden dark:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            What Students Build Here
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Project-first learning that <br className="hidden md:block" />
            makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">students stand out.</span>
          </h2>
          
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Instead of just watching videos, students complete tasks and build projects that improve skills, confidence, and interview readiness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
                onClick={() => setSelectedProject(project)}
              >
                <Card 
                  variant="glass" 
                  hover="lift" 
                  className={cn(
                    "relative h-full flex flex-col p-8 rounded-[2.5rem] border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden transition-all duration-500 cursor-pointer",
                    project.borderColor
                  )}
                >
                  {/* Subtle Gradient Hover */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                    project.gradient
                  )} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-10">
                      <div className={cn("p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 transition-all", project.accentColor)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">{project.id}</div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-8 flex-grow">
                      {project.desc}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                      <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                        <Code2 className="w-4 h-4" />
                        Professional Level
                      </div>
                      <MoveUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 md:p-12 hide-scrollbar"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-colors shadow-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className={cn("p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800", selectedProject.accentColor)}>
                  <selectedProject.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                    Project Case Study {selectedProject.id}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-500" />
                    Overview
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    {selectedProject.modalContent.overview}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-orange-500" />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.modalContent.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-orange-500" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.modalContent.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 relative overflow-hidden group/result">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-orange-500" />
                    Learning Outcome
                  </h4>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                    {selectedProject.modalContent.result}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Section>
  );
}
