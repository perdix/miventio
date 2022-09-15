export async function GET({ url, locals, params }) {

    const { prisma } = locals;

    const event = await prisma.event.findUnique({
        where: {
          id: params.eventId,
        },
        include: {
            tickets: true,
            bookings: true,
            activities: true
        },
      })
    
    return new Response( JSON.stringify(event));
}