
/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {
    const { prisma } = locals;

    const orgs = await prisma.organisation.findMany();

    return new Response( JSON.stringify(orgs));
}