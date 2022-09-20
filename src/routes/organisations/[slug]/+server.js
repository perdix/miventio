import { toOrganisationJSON } from '$lib/server/serialization';
import { isOrganisationMember, isOrganisationAdmin } from '$lib/server/authorization'


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


    return new Response(toOrganisationJSON(organisation));
}


export async function PUT({ locals, params, request }) {

    if (!isOrganisationAdmin(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }

    const data = await request.json();

    if ('role' in data) {
        delete data.role;
    }

    if ('superusers' in data) {
        delete data.superusers;
    }
    if ('events' in data) {
        delete data.events;
    }
    if ('users' in data) {
        delete data.users;
    }
    console.log(data)
    const organisation = await locals.prisma.organisation.update({
        where: {
            id: params.slug,
        },
        data: data, 
        include: {
            superusers: { include: { superuser: true } },
            events: true,
            users: true,
        }
    })
    
    return new Response(toOrganisationJSON(organisation));
}