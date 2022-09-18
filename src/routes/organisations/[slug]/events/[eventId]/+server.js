import { toEventJSON } from '$lib/server/serialization'
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization'


export async function GET({ locals, params }) {

    if (!isOrganisationMember(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }

    const event = await locals.prisma.event.findFirst({
        where: {
          id: params.eventId,
          organisation_id: params.slug
        },
        include: {
            tickets: true,
            bookings: true,
            activities: true
        },
      })
    
    return new Response( toEventJSON(event));
}



export async function PUT({ locals, params, request }) {

    if (!isOrganisationAdmin(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }
   
    // Prepare data
    const data = await request.json();
    delete data.tickets;
    delete data.bookings;
    delete data.activities;
    data.start = new Date(data.start);
    data.end = new Date(data.end);

    const event = await locals.prisma.event.update({
        where: {
            id: params.eventId,
        },
        data: data
    })
  
    return new Response(toEventJSON(event), {status: 200});
}


export async function DELETE({ locals, params }) {

    if (!isOrganisationAdmin(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }
   
    const deletedEvent = await locals.prisma.event.delete({
        where: {
            id: params.eventId,
        },
      })
    
    return new Response(JSON.stringify({message: "Event successfully deleted!"}), {status: 200});
}