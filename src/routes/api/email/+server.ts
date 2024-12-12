import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    // Email is stored server-side only
    const email = 'webinbox@isolyth.dev';
    
    return new Response(JSON.stringify({ email }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
