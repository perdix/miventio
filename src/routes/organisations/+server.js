

// let organisations = [
//     { slug: 'zahn', title: 'Gesellschaft für Parodontologie' },
//     { slug: 'inner', title: 'Gesellschaft für Gesellschaft für Innere Medizin' },
//     { slug: 'herz', title: 'Gesellschaft für Kardiologie' }
// ];

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {
    const { prisma } = locals;

    // await prisma.organisation.create({
    //     data: {
    //       name: "Gesellschaft für Datenbankdesign",
    //     }
    //   });

    const orgs = await prisma.organisation.findMany();

    return new Response( JSON.stringify(orgs));
}