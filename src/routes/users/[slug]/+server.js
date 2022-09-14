export let user = {
    
       
    }

export async function GET({ url }) {
    
    return new Response( JSON.stringify(user));
}