

let organisations = [
    { slug: 'zahn', title: 'Gesellschaft für Parodontologie' },
    { slug: 'inner', title: 'Gesellschaft für Gesellschaft für Innere Medizin' },
    { slug: 'herz', title: 'Gesellschaft für Kardiologie' }
];

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    
    return new Response( JSON.stringify(organisations));
}