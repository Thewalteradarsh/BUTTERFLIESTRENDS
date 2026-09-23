import Image from "next/image";

export default function InstagramReels() {
  const lookbookPhotos = [
    { src: '/hero-kurti.png.png', alt: 'Lookbook 1' },
    { src: '/a-line.jpg.jpg', alt: 'Lookbook 2' },
    { src: '/straight-cut.jpg.jpg', alt: 'Lookbook 3' },
    { src: '/hero-kurti.png.png', alt: 'Lookbook 4' },
  ];

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#FDFBF7]">
      <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#BA2461]">Follow Us on Instagram</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {lookbookPhotos.map((photo, i) => (
          <div key={i} className="relative w-full aspect-[9/16] bg-[#EAE2D6] overflow-hidden border border-[#D5C8B8] shadow-sm group">
            <Image 
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
