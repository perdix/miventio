import { toOrganisationJSON } from '$lib/server/serialization';
import { isOrganisationMember } from '$lib/server/authorization'


export async function GET({ locals, params }) {

	if (!isOrganisationMember(locals)) {
		return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
	}

    const organisation = await locals.prisma.organisation.findFirst({
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