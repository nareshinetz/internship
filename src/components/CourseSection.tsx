"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, BookOpen, Clock, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Course = {
  title: string;
  desc: string;
  tag: string;
  image: string;
  color: string;
  details: string;
  duration: string;
  students: string;
};

export default function PremiumCoursesSection() {
  const [selected, setSelected] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      title: "MERN Stack Development",
      desc: "Build modern web apps using React & Node.",
      tag: "Full Stack",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
      color: "from-orange-500/20 to-orange-500/5",
      details: "Comprehensive training in MongoDB, Express, React, and Node.js. Includes real-world projects and deployment strategies.",
      duration: "4 Months",
      students: "1.2k+ Joined",
    },
    {
      title: "Java Fullstack Development",
      desc: "Enterprise apps using Spring Boot.",
      tag: "Backend Focus",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      color: "from-blue-600/20 to-blue-600/5",
      details: "Master Spring Boot, REST APIs, and microservices architecture with Java. Focus on enterprise-grade system design.",
      duration: "5 Months",
      students: "800+ Joined",
    },
    {
      title: "Python Fullstack Development",
      desc: "Build apps using Django & Flask.",
      tag: "Data Driven",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      color: "from-yellow-500/20 to-yellow-500/5",
      details: "Learn Python from scratch to advanced web development with Django and Flask. Includes integration with AI/ML tools.",
      duration: "4 Months",
      students: "1.5k+ Joined",
    },
    {
      title: "Data Science & AI",
      desc: "AI, ML, and data modeling.",
      tag: "Advanced Tech",
      image: "https://images.unsplash.com/photo-1551288049-bbda48242175?auto=format&fit=crop&q=80&w=800",
      color: "from-purple-600/20 to-purple-600/5",
      details: "Deep dive into statistical analysis, machine learning algorithms, and neural networks using Python and R.",
      duration: "6 Months",
      students: "600+ Joined",
    },
    {
      title: "Embedded Systems",
      desc: "IoT & real-time systems.",
      tag: "Hardware",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      color: "from-teal-600/20 to-teal-600/5",
      details: "Experience hardware-software co-design. Learn microcontrollers, RTOS, and industrial IoT protocols.",
      duration: "4 Months",
      students: "450+ Joined",
    },
    {
      title: "Data Analytics",
      desc: "Transform raw data into business insights.",
      tag: "Analytics",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      color: "from-sky-500/20 to-sky-500/5",
      details: "Master Excel, SQL, Tableau, and PowerBI. Learn to clean, analyze, and visualize data to drive strategic business decisions.",
      duration: "3 Months",
      students: "1.1k+ Joined",
    }
  ];

  return (
    <Section className="bg-white dark:bg-zinc-950 relative">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-wider uppercase mb-4">
            <Sparkles className="h-4 w-4" />
            Empower your future
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Industry Specialized <br />
            <span className="text-emerald-600">Learning Paths</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Our programs are designed by industry experts to get you from basics to professional level in months, not years.
          </p>
        </div>
        <Button href="/programs" variant="outline" size="lg" className="rounded-2xl border-2">
          Browse all programs
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              variant="outline"
              hover="lift"
              className="p-0 border-zinc-200/60 dark:border-zinc-800/60 transition-colors group h-full flex flex-col overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t opacity-60", course.color)} />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur rounded-full text-[10px] font-bold text-zinc-900 dark:text-white shadow-lg uppercase tracking-wider">
                  {course.tag}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent">
                  {course.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
                  {course.desc}
                </p>

                <div className="mt-auto">
                  <Link href="/programs" className="inline-flex items-center gap-2 text-orange-500 text-lg font-bold group/btn hover:underline decoration-2 underline-offset-4">
                    View Program Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}