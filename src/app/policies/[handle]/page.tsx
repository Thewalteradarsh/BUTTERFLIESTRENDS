import { getShopPolicy } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> | { handle: string } }): Promise<Metadata> {
    const resolvedParams = await params;
    const handle = resolvedParams.handle;
    
    if (!handle) {
        return { title: "Policy Not Found" };
    }

    const policy = await getShopPolicy(handle);

    if (!policy) {
        return { title: "Policy Not Found" };
    }

    return {
        title: policy.title,
        description: `Read the ${policy.title} for our store.`
    };
}

export default async function PolicyPage({ params }: { params: Promise<{ handle: string }> | { handle: string } }) {
    const resolvedParams = await params;
    const handle = resolvedParams.handle;

    if (!handle) {
        return notFound();
    }

    const policy = await getShopPolicy(handle);

    if (!policy) {
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
                <div className="bg-white rounded-3xl shadow-sm border border-[#E5E0D8] p-8 md:p-14 transition-all duration-300 hover:shadow-md">
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#27272A] mb-10 pb-8 border-b border-[#E5E0D8] text-center font-serif">
                        {policy.title}
                    </h1>
                    
                    <div 
                        className="prose prose-lg max-w-none text-gray-600
                            prose-headings:text-[#27272A] prose-headings:font-semibold prose-headings:tracking-tight
                            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-[#B38C61] prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#906b45] transition-colors
                            prose-strong:text-[#27272A] prose-strong:font-semibold
                            prose-ul:my-6 prose-li:my-2
                            selection:bg-[#B38C61]/20 selection:text-[#27272A]"
                        dangerouslySetInnerHTML={{ __html: policy.body }}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
