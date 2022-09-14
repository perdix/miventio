
export async function GET({ url }) {
    
    const check = {
        "message": "Service is working!"
    }

    return new Response( JSON.stringify(check));
}