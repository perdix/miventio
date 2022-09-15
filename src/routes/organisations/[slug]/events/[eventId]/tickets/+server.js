export let tickets = []


export async function GET({ url }) {
    
    return new Response( JSON.stringify(tickets));
}