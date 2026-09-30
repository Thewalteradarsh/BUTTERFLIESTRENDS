import { getShopPolicy } from "@/lib/shopify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export default async function PolicyPage({ params }: { params: Promise<{ handle: string }> | { handle: string } }) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) {
    return notFound();
  }

  const policy = await getShopPolicy(handle);

  if (!policy || !policy.body) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A] relative">
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
      </div>

      <main className="flex-grow pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight text-gray-900 text-center">
          {policy.title}
        </h1>
        <div 
          className="prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-500 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
          dangerouslySetInnerHTML={{ __html: policy.body }} 
        />
      </main>

      <Footer />
    </div>
  );
}
