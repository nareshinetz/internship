import CoursesSection from "@/components/CourseSection";
import CTASection from "@/components/CTA";
import CertificateSection from "@/components/CertificateSection";
import Footer from "@/components/Footer";
import { HeroInternship } from "@/components/HeroInternship";
import HiringPartners from "@/components/HiringPartners";
import InternshipProcess from "@/components/InternshipProcess";
import SuccessStories from "@/components/SuccessStories";

export default function Home() {
  return (
    // Server component wrapper so the hero doesn't require client JS.
    // Navbar + theme are already handled globally in the root layout.
    <div className="min-h-[calc(100vh-4rem)]">
      <HeroInternship />
      <InternshipProcess/>
      <HiringPartners/>
      <CoursesSection/>   
      <CertificateSection/>
      <SuccessStories/>
      <CTASection/>
      <Footer/>
    </div>
  );
}
