export let activities = []


export async function GET({ url }) {
    
    return new Response( JSON.stringify(activities));
}