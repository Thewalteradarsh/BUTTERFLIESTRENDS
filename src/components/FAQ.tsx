"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What fabrics do you use?",
    answer: "Most of our products are crafted using premium-quality cotton and breathable fabrics designed for everyday comfort."
  },
  {
    question: "Are your kurtis suitable for office wear?",
    answer: "Yes. Our collection includes elegant styles perfect for office wear, casual outings, and daily wear."
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer: "Yes, Cash on Delivery is available on eligible orders."
  },
  {
    question: "Do you provide free shipping?",
    answer: "Yes, we offer free shipping on prepaid orders."
  },
  {
    question: "What is your replacement policy?",
    answer: "If there is a size or product issue, you can request a replacement within the specified replacement period."
  },
  {
    question: "Do you deliver across India?",
    answer: "Yes, we ship across India."
  },
  {
    question: "What sizes are available?",
    answer: "We offer multiple sizes to ensure a comfortable fit for different body types."
  },
  {
    question: "How do I choose the right size?",
    answer: "Please refer to the Size Guide available on every product page."
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
