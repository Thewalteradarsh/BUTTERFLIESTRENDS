import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
    // Now reads the secret from the URL (e.g., ?secret=123)
    const secret = req.nextUrl.searchParams.get('secret');
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    revalidateTag('products');
    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}