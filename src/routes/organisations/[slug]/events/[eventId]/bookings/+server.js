export let bookings = []


export async function GET({ url }) {
    
    return new Response( JSON.stringify(bookings));
}