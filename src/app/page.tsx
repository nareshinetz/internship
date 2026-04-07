import CoursesSection from "@/components/CourseSection";
import CTASection from "@/components/CTA";
import CertificateSection from "@/components/CertificateSection";
import { HeroInternship } from "@/components/HeroInternship";
import HiringPartners from "@/components/HiringPartners";
import IndustrySectors from "@/components/IndustrySectors";
import InternshipProcess from "@/components/InternshipProcess";
import SuccessStories from "@/components/SuccessStories";
import ProblemSolution from "@/components/ProblemSolution";
import StudentProjects from "@/components/StudentProjects";

export default function Home() {
  return (
    // Server component wrapper so the hero doesn't require client JS.
    // Navbar + theme are already handled globally in the root layout.
    <div className="min-h-[calc(100vh-4rem)]">
      <HeroInternship />
      <ProblemSolution />
      <InternshipProcess/>
      <HiringPartners/>
      <IndustrySectors/>
      <CoursesSection/>   
      <StudentProjects />
      <CertificateSection/>
      <SuccessStories/>
      <CTASection/>
    </div>
  );
}
