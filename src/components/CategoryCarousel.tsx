import Image from "next/image";

const categories = [
  { name: "Sleeveless Umbrella Kurtis", image: "/category-1.jpg" },
  { name: "Straight cut Kurtis", image: "/straight-cut.jpg.jpg" },
  { name: "A line Umbrella Kurtis", image: "/a-line.jpg.jpg" },
  { name: "Short/Jeans Top", image: "/category-4.jpg" },
  { name: "Gown/ Dresses", image: "/category-5.jpg" },
  { name: "Co-ord Sets", image: "/category-6.jpg" },
  { name: "Narrow Pants", image: "/category-7.jpg" },
  { name: "Skirts", image: "/category-8.jpg" },
  { name: "Accessories", image: "/category-9.jpg" }
];

export default function CategoryCarousel() {
  return (
    <section id="categories" className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#EAE2D6] rounded-3xl mt-12 mb-12 shadow-sm">
      <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#BA2461]">Shop by Category</h2>
      
      {/* Mobile: Horizontal Swipeable, Desktop: Grid/Wrap */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center group cursor-pointer text-center shrink-0 w-[75vw] sm:w-[45vw] md:w-full snap-start">
            <div className="w-full aspect-[4/5] bg-[#FDFBF7] mb-4 border border-[#D5C8B8] transition-all duration-700 ease-out group-hover:border-[#BA2461] shadow-sm overflow-hidden relative flex items-center justify-center">
              {/* Fallback placeholder text if image fails, and default placeholder image */}
              <div className="absolute inset-0 bg-[#FDFBF7] flex items-center justify-center p-4">
                <span className="text-[#BA2461]/30 font-serif text-2xl font-bold">{index + 1}</span>
              </div>
              <Image 
                src={category.image} 
                alt={category.name} 
                fill 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500 z-10" 
              />
            </div>
            <h3 className="text-base md:text-lg font-serif text-[#27272A] group-hover:text-[#BA2461] transition-colors duration-500 max-w-[200px]">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
