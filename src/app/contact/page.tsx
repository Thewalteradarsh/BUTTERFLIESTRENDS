import { MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A]">
      <Header />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="px-4 py-12 md:py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: Contact Information */}
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-serif text-[#BA2461] mb-4">Get in Touch</h1>
              <p className="text-lg text-[#27272A]/80 font-serif mb-10">
                For queries, orders, and outstation video calling.
              </p>

              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#BA2461] mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-[#27272A] mb-1">Store Address</h3>
                    <p className="text-[#27272A]/80 leading-relaxed">
                      Nagavara, near Manyata Tech Park,<br />
                      Bengaluru
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
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
              </div>

              <div className="pt-8 border-t border-[#EAE2D6]">
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

            {/* Right Column: Contact Form */}
            <div className="bg-white p-6 md:p-10 border border-[#EAE2D6] shadow-sm rounded-lg h-fit">
              <h2 className="text-2xl font-serif text-[#27272A] mb-8">Send us a Message</h2>
              <form 
                action="mailto:your-email@example.com" 
                method="POST" 
                encType="text/plain"
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-[#27272A]">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BA2461] focus:border-[#BA2461] transition-shadow bg-[#FDFBF7]"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-[#27272A]">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BA2461] focus:border-[#BA2461] transition-shadow bg-[#FDFBF7]"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-[#27272A]">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BA2461] focus:border-[#BA2461] transition-shadow bg-[#FDFBF7]"
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-semibold text-[#27272A]">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BA2461] focus:border-[#BA2461] transition-shadow resize-y bg-[#FDFBF7]"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-[#b8325a] text-white rounded-md font-bold hover:bg-opacity-90 transition mt-4 uppercase tracking-widest text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
