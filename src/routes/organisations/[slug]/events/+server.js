import {toEventJSON, toEventsJSON} from '$lib/server/serialization'
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization'

export async function GET({ locals, params }) {

    if (!isOrganisationMember(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }

    const events = await locals.prisma.event.findMany({
            where: { organisation_id: params.slug }
        }
    );

    return new Response(toEventsJSON(events));
}

export async function POST({ locals, params, request }) {

    if (!isOrganisationAdmin(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }
   
    const data = await request.json();
    data.organisation_id = params.slug;
    data.start = new Date(data.start);
    data.end = new Date(data.end);
    const event = await locals.prisma.event.create({
        data: data
      })
    
    return new Response(toEventJSON(event), {status: 201});
}