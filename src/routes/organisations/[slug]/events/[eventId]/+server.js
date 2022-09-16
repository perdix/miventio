export async function GET({ url, locals, params }) {

  if (!locals.session) {
		return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
	}

    const { prisma } = locals;

    const role = await prisma.role.findFirst({
        where: {
            organisation_id: params.slug,
            superuser_id: locals.session.id
        }
    });
    
    if (role === null) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }

    const event = await prisma.event.findFirst({
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
    
    return new Response( JSON.stringify(event));
}