export default function InstagramReels() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#FDFBF7]">
      <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#BA2461]">Follow Us on Instagram</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full aspect-[9/16] bg-[#EAE2D6] animate-pulse flex items-center justify-center border border-[#D5C8B8] shadow-sm">
            <span className="text-[#BA2461]/30 font-sans tracking-widest text-xs uppercase">Reel {i}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
