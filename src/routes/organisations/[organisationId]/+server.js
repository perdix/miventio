import { toOrganisationJSON } from '$lib/server/serialization';
import { isOrganisationMember, isOrganisationAdmin } from '$lib/server/authorization';

export async function GET({ locals, params }) {
	if (!isOrganisationMember(locals)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const organisation = await locals.prisma.organisation.findFirst({
		where: {
			id: params.organisationId,
			users: {
				some: {
					userId: locals.session.id
				}
			}
		},
		include: {
			users: { include: { user: true } },
			contacts: true,
			events: {
				include: {
					_count: {
					  select: { visitors: true },
					},
				  },
			}
		}
	});

	return new Response(toOrganisationJSON(organisation));
}

export async function PUT({ locals, params, request }) {
	if (!isOrganisationAdmin(locals, params.organisationId)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const data = await request.json();

	if ('role' in data) {
		delete data.role;
	}
	if ('users' in data) {
		delete data.users;
	}
	if ('events' in data) {
		delete data.events;
	}
	if ('contacts' in data) {
		delete data.contacts;
	}
	const organisation = await locals.prisma.organisation.update({
		where: {
			id: params.organisationId
		},
		data: data,
		include: {
			users: { include: { user: true } },
			events: true,
			contacts: {include: { membership: true } }
		}
	});
	return new Response(toOrganisationJSON(organisation));
}
