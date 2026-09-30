import BrandStory from "@/components/BrandStory";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A] relative">
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
      </div>
      
      <main className="flex-grow pt-24">
        <BrandStory />
      </main>
    </div>
  );
}
