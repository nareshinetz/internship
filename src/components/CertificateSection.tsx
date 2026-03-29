"use client";

import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import Image from "next/image";

type Testimonial = {
    name: string;
    role: string;
    text: string;
    initials: string;
};

export default function CertificateSection() {
    const testimonials: Testimonial[] = [
        {
            name: "Arun J.",
            role: "Software Engineer, Zoho",
            text: "The real-time project experience at Inetz helped me clear my technical rounds at Zoho effortlessly. Highly recommended!",
            initials: "AJ",
        },
        {
            name: "Sneha P.",
            role: "System Associate, Infosys",
            text: "Excellent mentors who explain concepts with real-world scenarios. The placement support is genuine and active.",
            initials: "SP",
        },
        {
            name: "Rahul K.",
            role: "Web Developer, TCS",
            text: "Flexible timings allowed me to manage college while gaining professional skills. Truly the best in Chennai!",
            initials: "RK",
        },
    ];

    return (
        <section className="bg-gradient-to-br from-[#061E26] via-[#0A1A2F] to-[#061E26] text-white py-24 overflow-hidden relative border-y border-emerald-900/30">
            {/* Dynamic Glow Accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Top Section */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-2">

                    {/* Certificate Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex justify-center"
                    >
                        <div className="bg-white p-6 rounded-xl shadow-xl rotate-[-4deg]">
                            <Image
                                src="/certificate.jpeg"
                                width={350}
                                height={450}
                                alt="certificate"
                                className="rounded-md"
                            />
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold leading-snug">
                            Get Industry Recognized <br />
                            <span className="text-emerald-500">Certification</span>
                        </h2>

                        <p className="text-gray-300 mt-6 max-w-lg">
                            Boost your profile with our globally recognized training certificate.
                            Prove your practical skills to employers worldwide.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-emerald-500" />
                                <span>Verified QR Code Authenticity</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-emerald-500" />
                                <span>Portfolio Project Validation</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}