export let booking = {}


export async function GET({ url }) {
    
    return new Response( JSON.stringify(booking));
}