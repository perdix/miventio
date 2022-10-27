export const isLoggedIn = async (locals) => {
	if (locals.session == undefined) {
		return false;
	}

	return true;
};

export const isOrganisationAdmin = async (locals, organisationId) => {
	if (locals.session == undefined) {
		return false;
	}

	const role = await locals.prisma.role.findFirst({
		where: {
			organisationId: organisationId,
			userId: locals.session.id
		}
	});

	if (role === null || role.role !== 'ADMIN') {
		return false;
	}

	return true;
};

export const isOrganisationMember = async (locals, organisationId) => {
	if (locals.session == undefined) {
		return false;
	}

	const role = await locals.prisma.role.findFirst({
		where: {
			organisationId: organisationId,
			userId: locals.session.id
		}
	});

	if (role === null) {
		return false;
	}

	return true;
};
