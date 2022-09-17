import { toOrganisationJSON } from '$lib/server/serialization';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals, params }) {

	if (!locals.session) {
		return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
	}

    const { prisma } = locals;
    // Get the of the given user
    const organisation = await prisma.organisation.findFirst({
        where: {
            id: params.slug,
            superusers: {  
                some: {
                    superuser_id: locals.session.id
                }
          },
        }, 
        include: {
            superusers: { include: { superuser: true } },
            events: true,
            users: true,
        }
      
      });


    return new Response( toOrganisationJSON(organisation));
}