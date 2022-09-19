export const isLoggedIn = async (locals) => {

    if (locals.session == undefined) {
        return false;
    }

    return true
}


export const isOrganisationAdmin = async (locals, organisation_id) => {


    if (locals.session == undefined) {
        return false;
    }

    const role = await locals.prisma.role.findFirst({
        where: {
            organisation_id: organisation_id,
            superuser_id: locals.session.id
        }
    });
    
    if ((role === null) || (role.role !== "ADMIN")) {
        return false;
    }

    return true
}


export const isOrganisationMember = async (locals, organisation_id) => {

    if (locals.session == undefined) {
        return false;
    }

    const role = await locals.prisma.role.findFirst({
        where: {
            organisation_id: organisation_id,
            superuser_id: locals.session.id
        }
    });
    
    if ((role === null)) {
        return false;
    }

    return true
}