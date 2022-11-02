import { toUserJSON } from '$lib/server/serialization';
import { isLoggedIn } from '$lib/server/authorization';
import bcrypt from 'bcryptjs';

export async function GET({ locals, params }) {
	if (!isLoggedIn(locals)) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

	const user = await locals.prisma.user.findUnique({
		where: {
			id: params.userId
		},
		include: {
			organisations: { include: { organisation: true } }
		}
	});
	return new Response(toUserJSON(user));
}

export async function PUT({ locals, params, request }) {
	if (!isLoggedIn(locals) && locals.session.id === params.userId) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}
	const data = await request.json();
	// Check data
	if (!('password' in data) || !('newPassword' in data)) {
		return new Response(JSON.stringify({ message: 'Bad Request' }), { status: 404 });
	}
	// Find user
	const user = await locals.prisma.user.findUnique({
		where: {
			id: locals.session.id
		}
	});
	if (!user) {
		return new Response(JSON.stringify({ message: 'Invalid user' }), { status: 401 });
	}
	// Verify old password
	const passwordIsValid = await bcrypt.compare(data.password, user.password);
	if (!passwordIsValid) {
		return new Response(JSON.stringify({ message: 'Bad Request' }), { status: 404 });
	}
	// Update password if everything is good
	const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
	const updatedUser = await locals.prisma.user.update({
		where: {
			id: locals.session.id
		},
		data: {
			password: hashedNewPassword
		},
		include: {
			organisations: { include: { organisation: true } }
		}
	});
	return new Response(toUserJSON(updatedUser));
}
