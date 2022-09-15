

export async function GET({ url, locals, params }) {

    const { prisma } = locals;

    const events = await prisma.event.findMany({
            where: { organisation_id: params.slug }
        }
    );

    return new Response( JSON.stringify(events));
}