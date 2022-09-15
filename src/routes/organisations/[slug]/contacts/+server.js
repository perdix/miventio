




export async function GET({ url, locals, params }) {

    const { prisma } = locals;

    const organisation_id = params.slug;

    const users = await prisma.user.findMany({
        where: {
            organisation_id: organisation_id
          }
    }
    );
    
    return new Response( JSON.stringify(users));
}