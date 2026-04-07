"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, BookOpen, Clock, Users, Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Course = {
  title: string;
  desc: string;
  tag: string;
  video: string;
  image?: string;
  color: string;
  details: string;
  duration: string;
  students: string;
};

export default function PremiumCoursesSection() {
  const [selected, setSelected] = useState<Course | null>(null);

  const courses: Course[] = [
    // {
    //   title: "MERN Stack Development",
    //   desc: "Build modern web apps using React & Node.",
    //   tag: "Full Stack",
    //   video: "https://cdn.pixabay.com/video/2019/04/10/22616-330089849_large.mp4",
    //   color: "from-orange-500/20 to-orange-500/5",
    //   details: "Comprehensive training in MongoDB, Express, React, and Node.js. Includes real-world projects and deployment strategies.",
    //   duration: "4 Months",
    //   students: "1.2k+ Joined",
    // },
    {
      title: "Java Fullstack Development",
      desc: "Enterprise apps using Spring Boot.",
      tag: "Backend Focus",
      video: "https://cdn.pixabay.com/video/2022/02/16/107936-678508493_large.mp4",
      color: "from-blue-600/20 to-blue-600/5",
      details: "Master Spring Boot, REST APIs, and microservices architecture with Java. Focus on enterprise-grade system design.",
      duration: "5 Months",
      students: "800+ Joined",
    },
    // {
    //   title: "Python Fullstack Development",
    //   desc: "Build apps using Django & Flask.",
    //   tag: "Data Driven",
    //   video: "https://cdn.pixabay.com/video/2020/09/27/50868-462310862_large.mp4",
    //   color: "from-yellow-500/20 to-yellow-500/5",
    //   details: "Learn Python from scratch to advanced web development with Django and Flask. Includes integration with AI/ML tools.",
    //   duration: "4 Months",
    //   students: "1.5k+ Joined",
    // },
    {
      title: "Data Science & AI",
      desc: "AI, ML, and data modeling.",
      tag: "Advanced Tech",
      video: "https://cdn.pixabay.com/video/2020/03/12/33580-398014022_large.mp4",
      color: "from-purple-600/20 to-purple-600/5",
      details: "Deep dive into statistical analysis, machine learning algorithms, and neural networks using Python and R.",
      duration: "6 Months",
      students: "600+ Joined",
    },
    {
      title: "Embedded Systems",
      desc: "IoT & real-time systems.",
      tag: "Hardware",
      video: "https://cdn.pixabay.com/video/2022/10/30/137021-766158022_large.mp4",
      color: "from-teal-600/20 to-teal-600/5",
      details: "Experience hardware-software co-design. Learn microcontrollers, RTOS, and industrial IoT protocols.",
      duration: "4 Months",
      students: "450+ Joined",
    },
    // {
    //   title: "Data Analytics",
    //   desc: "Transform raw data into business insights.",
    //   tag: "Analytics",
    //   video: "https://cdn.pixabay.com/video/2023/07/22/172675-847844070_large.mp4",
    //   color: "from-sky-500/20 to-sky-500/5",
    //   details: "Master Excel, SQL, Tableau, and PowerBI. Learn to clean, analyze, and visualize data to drive strategic business decisions.",
    //   duration: "3 Months",
    //   students: "1.1k+ Joined",
    // }
  ];

  return (
    <Section className="bg-white dark:bg-zinc-950 relative">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full" />

      {/* Header */}
      <div className="flex flex-col gap-6 mb-16">
        {/* Centered Badge + Heading */}
        <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="h-4 w-4" />
              Empower your future
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
              Industry Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Learning Programs</span>
            </h2>
        </div>

        {/* Description + Button row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Our programs are designed by industry experts to get you from basics to professional level in months, not years. Use trending technologies through real-time projects to master every challenge.
          </p>
          <Button href="/programs" variant="ghost" size="lg" className="rounded-2xl border-2 shrink-0 self-start md:self-center bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 hover:border-emerald-700">
            Browse all programs
          </Button>
        </div>
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
              className="p-4 border border-zinc-200/80 dark:border-zinc-800/80 transition-shadow duration-300 group h-110 flex flex-col bg-white dark:bg-zinc-950 rounded-3xl shadow-sm hover:shadow-lg"
            >
              {/* Inset Video Container without gradients/badges */}
              <div
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 cursor-pointer group/video"
                onClick={() => setSelected(course)}
              >
                <video
                  src={course.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 text-white shadow-xl transform scale-90 group-hover/video:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 ml-1 fill-white" />
                  </div>
                </div>
                {/* Optional: Simple subtle inner shadow to mimic video container depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] rounded-2xl pointer-events-none" />
              </div>

              <div className="px-2 flex flex-col flex-1 pb-2">
                <h3 className="text-[20px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug mb-3">
                  {course.title}
                </h3>
                <p className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {course.details}
                </p>

                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                  <Link href="/programs" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold group/btn hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                    View more details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-md border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black">
                <video
                  src={selected.video}
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Course Info below video */}
              <div className="p-6 md:p-8 bg-zinc-950">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3">
                      {selected.tag}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selected.title}
                    </h3>
                    <p className="text-zinc-400 max-w-2xl">
                      {selected.details}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex flex-col items-center p-3 rounded-2xl bg-zinc-900 border border-zinc-800 min-w-[100px]">
                      <Clock className="w-5 h-5 text-emerald-400 mb-1" />
                      <span className="text-sm font-medium text-white">{selected.duration}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-2xl bg-zinc-900 border border-zinc-800 min-w-[100px]">
                      <Users className="w-5 h-5 text-blue-400 mb-1" />
                      <span className="text-sm font-medium text-white">{selected.students}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}