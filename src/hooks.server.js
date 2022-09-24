import { PrismaClient } from '@prisma/client';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const handle = async ({ event, resolve }) => {
	const prisma = new PrismaClient();

	event.locals = {
		prisma: prisma
	};

	const { headers } = event.request;

	const cookies = parse(headers.get('cookie') ?? '');

	if (cookies.AuthorizationToken) {
		// Remove Bearer prefix
		const token = cookies.AuthorizationToken.split(' ')[1];
		try {
			const jwtUser = jwt.verify(token, env.AUTH_SECRET);
			if (typeof jwtUser === 'string') {
				throw new Error('Something went wrong');
			}
			const user = await prisma.superuser.findUnique({
				where: {
					id: jwtUser.id
				},
				include: { organisations: { include: { organisation: true } } }
			});
			if (!user) {
				throw new Error(`Superuser not found: ${jwtUser}`);
			}
			const session = {
				id: user.id,
				email: user.email,
				token: token,
				organisations: user.organisations.map((o) => {
					return { role: o.role, name: o.organisation.name, id: o.organisation.id };
				})
			};
			event.locals.session = session;
		} catch (error) {
			console.error(error);
		}
	}

	const response = await resolve(event);
	return response;
};
