import React, { ReactNode } from "react";

export interface FeatureItem {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

interface FeatureGridProps {
  title: string;
  items: FeatureItem[];
  bgColor?: string;
}

export default function FeatureGrid({ title, items, bgColor = "bg-[#F4E8E8]" }: FeatureGridProps) {
  return (
    <section className={`py-24 ${bgColor}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-serif text-center mb-16 text-[#BA2461]">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-[#FDFBF7] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#BA2461]/5">
              <div className="w-12 h-12 flex items-center justify-center text-[#BA2461] mb-6">
                {item.icon}
              </div>
              <h3 className="text-sm md:text-base font-serif text-[#27272A] mb-2">{item.title}</h3>
              <p className="text-[#27272A]/70 text-xs md:text-sm leading-relaxed">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
