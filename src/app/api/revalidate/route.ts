import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-revalidation-secret');
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    revalidateTag('products');
    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}