import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    { name: "Anjali M.", text: "Absolutely love the fit and the pure cotton feel. It's so breathable during summers!" },
    { name: "Priya S.", text: "The Ajrakh prints are gorgeous. I get compliments every time I wear my kurti to work." },
    { name: "Riya K.", text: "Finally found a brand that offers stylish traditional wear in my size. Highly recommended!" }
  ];

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#FDFBF7]">
      <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#BA2461]">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="p-8 bg-white border border-[#EAE2D6] shadow-sm flex flex-col items-center text-center">
            <div className="flex gap-1 mb-4 text-[#BA2461]">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
            </div>
            <p className="text-[#27272A]/80 font-serif italic mb-6">"{review.text}"</p>
            <span className="text-[#27272A] font-semibold text-sm uppercase tracking-widest">{review.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
