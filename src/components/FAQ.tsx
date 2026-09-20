"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What fabrics do you use for your kurtis?",
    answer: "We primarily use premium 100% organic cotton, along with traditional hand block prints, Kalamkari, Ajrakh, and Ikat fabrics. Our materials are chosen for their breathability, comfort, and lasting quality."
  },
  {
    question: "Are your kurtis suitable for office wear?",
    answer: "Yes! Our straight cut kurtis, A-line designs, and elegant co-ord sets are perfect for office wear. They blend traditional Indian aesthetics with modern, professional silhouettes."
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer: "Yes, we offer Cash on Delivery (COD) as a payment option for most pin codes across India."
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes, we are delighted to offer absolutely free delivery on all prepaid orders."
  },
  {
    question: "What is your replacement policy?",
    answer: "We offer an easy replacement policy. If you receive a defective item or face size issues, you can initiate a replacement request within 7 days of delivery."
  },
  {
    question: "Do you deliver all over India?",
    answer: "Yes, we provide pan-India shipping. We partner with reliable courier services to ensure your orders reach you safely and quickly, no matter where you are in the country."
  },
  {
    question: "What sizes are available?",
    answer: "We believe fashion is for everyone. Our collection features a wide variety of sizes, typically ranging from XS to 3XL. Please check the individual product pages for specific size availability."
  },
  {
    question: "How do I choose the right size?",
    answer: "Each product page includes a detailed size guide with exact measurements. We recommend measuring yourself and comparing it with our size chart to find your perfect, comfortable fit."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#BA2461]">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-[#EAE2D6] rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-serif text-[#27272A] text-lg pr-4">{faq.question}</span>
                <span className="text-[#BA2461] flex-shrink-0">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-[#27272A]/80 text-sm md:text-base leading-relaxed font-sans border-t border-[#EAE2D6] pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
