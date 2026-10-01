import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A]">
      <Header />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="px-4 py-12 md:py-24 max-w-3xl mx-auto">
          <div className="bg-white p-8 md:p-12 border border-[#EAE2D6] shadow-sm rounded-lg flex flex-col">
            
            {/* Contact Information */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif text-[#BA2461] mb-4">Get in Touch</h1>
              <p className="text-lg text-[#27272A]/80 font-serif mb-10">
                For queries, orders, and outstation video calling.
              </p>

              <div className="flex flex-col gap-8 mb-12 w-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <MapPin className="text-[#BA2461] mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-[#27272A] mb-1">Store Address</h3>
                    <p className="text-[#27272A]/80 leading-relaxed">
                      📍 Manyata Tech Park, Bengaluru
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <Phone className="text-[#BA2461] mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-[#27272A] mb-1">Phone / WhatsApp</h3>
                    <p className="text-[#27272A]/80 leading-relaxed mb-4">
                      +91 7676302578
                    </p>
                    <a 
                      href="https://wa.me/917676302578" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-md font-bold shadow-md hover:bg-opacity-90 transition-all text-sm uppercase tracking-wider"
                    >
                      <MessageCircle size={18} />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <Mail className="text-[#BA2461] mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-[#27272A] mb-1">Email</h3>
                    <p className="text-[#27272A]/80 leading-relaxed">
                      <a href="mailto:butterfliestrends.org@gmail.com" className="hover:text-[#BA2461] transition-colors">butterfliestrends.org@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-[#EAE2D6] w-full flex flex-col items-center md:items-start">
                <h3 className="font-semibold text-[#27272A] mb-4 uppercase tracking-widest text-sm">Follow Us</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://www.instagram.com/butterflies_trends?stkn=d29nZ3c3a3Q1am0y" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-[#EAE2D6] rounded-full text-[#BA2461] hover:bg-[#BA2461] hover:text-white transition-colors shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/@Trends.butterflies" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-[#EAE2D6] rounded-full text-[#BA2461] hover:bg-[#BA2461] hover:text-white transition-colors shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
