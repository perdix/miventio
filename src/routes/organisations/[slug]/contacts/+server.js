
const res = await fetch('https://jsonplaceholder.typicode.com/users');
let users = await res.json();
users = users.map((u) => ({ ...u, status: 'Student' }));

export async function GET({ url }) {
    
    return new Response( JSON.stringify(users));
}