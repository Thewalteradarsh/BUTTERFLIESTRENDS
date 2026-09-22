import FeatureGrid from "@/components/FeatureGrid";
import { Diamond, Paintbrush, Ruler, Sparkles } from "lucide-react";

export default function WhyWeLove() {
  const items = [
    { icon: <Diamond size={24} />, title: "Premium Cotton Fabrics", subtitle: "Soft, breathable fabrics designed for Indian weather." },
    { icon: <Paintbrush size={24} />, title: "Traditional Prints, Modern Style", subtitle: "Inspired by Kalamkari, Ikat, Ajrakh, and timeless Indian craftsmanship." },
    { icon: <Ruler size={24} />, title: "Variety of Sizes", subtitle: "Available in various sizes, designed to fit and flatter every woman." },
    { icon: <Sparkles size={24} />, title: "Everyday Elegance", subtitle: "100+ styles you can wear from workdays to weekends." }
  ];
  
  return <FeatureGrid title="Why Women Love Butterflies Trends" items={items} bgColor="bg-[#F4E8E8]" />;
}
