import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    { name: "Shruthi Murali", text: "Hi... Quality is really good and collection also awesome.... 15days back I've purchased kurtas, pants, duppatas... And today again I'm purchasing kurtas... This is the best place for cotton lovers" },
    { name: "Mahima Vaidya", text: "I've been buying here for the past 1.5 years!! My entire wardrobe is only filled with butterflies trends collections. The fabric is soft, breathable and light to carry. The designs are amazing and the stitching is very good. The staff is also so sweet! Would highly recommend to anybody who wants to have all cotton clothes in their cupboard!! I don't buy anything from anywhere else." },
    { name: "Muthu Bharathi", text: "Quality & Material are very good. Very responsive for queries also video calling facility available for outstation orders. Orders getting delivered quickly to Chennai. Must try place for cotton kurtis and dresses" },
    { name: "Sandhyarani Dharmavaram", text: "Definitely this is the hidden gem for cotton lovers . Wide range of collections and they have ..must visit place .Guys who are looking for office wear kurtha sets and kurthis I can strongly recommend this is right place" }
  ];

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#FDFBF7]">
      <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#BA2461]">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="h-full p-6 md:p-8 bg-white border border-[#EAE2D6] shadow-sm flex flex-col items-center text-center justify-between">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-4 text-[#BA2461]">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <p className="text-[#27272A]/80 font-serif italic mb-6 text-sm md:text-base leading-relaxed">"{review.text}"</p>
            </div>
            <span className="text-[#27272A] font-semibold text-xs md:text-sm uppercase tracking-widest mt-auto">{review.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
