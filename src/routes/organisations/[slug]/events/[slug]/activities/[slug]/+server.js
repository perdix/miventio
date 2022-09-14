export let activity = {
       
    }


export async function GET({ url }) {
    
    return new Response( JSON.stringify(activity));
}