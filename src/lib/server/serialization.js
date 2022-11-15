// Organisation
export const toOrganisationJSON = (organisation) => {
	if ('users' in organisation) {
		organisation.users = organisation.users.map((s) => {
			return {
				role: s.role,
				id: s.userId,
				email: s.user.email
			};
		});
	}
	if ('events' in organisation) {
		organisation.events = organisation.events.map(e => cleanEvent(e))
	}
	return JSON.stringify(organisation);
};

export const toOrganisationsJSON = (organisations) => {
	return JSON.stringify(organisations);
};


// User

export const toUserJSON = (user) => {
	if ('password' in user) {
		delete user.password;
	}

	user.organisations = user.organisations.map((o) => {
		return {
			role: o.role,
			id: o.organisation_id,
			name: o.organisation.name
		};
	});
	return JSON.stringify(user);
};


export const toUsersJSON = (users) => {
	return JSON.stringify(users);
}

// Event

const cleanEvent = (event) => {
	delete event.updatedAt;
	delete event.createdAt;
	event.start = event.start ? event.start.toISOString().substring(0, 10) : null;
	event.end = event.end ? event.end.toISOString().substring(0, 10) : null;
	if (('_count' in event) && ('visitors' in event._count)) {
		event.numberOfVisitors = event._count.visitors;
	}
	delete event._count;
	if (event.activities) {
		event.activities.forEach(a => {
			if (('_count' in a) && ('visitors' in a._count)) {
				a.numberOfVisitors = a._count.visitors;
			}
			delete a._count;
		});
	}
	return event;
};

export const toEventJSON = (event) => {
	return JSON.stringify(cleanEvent(event));
};

export const toEventsJSON = (events) => {
	const cleandEvents = events.map((e) => cleanEvent(e));
	return JSON.stringify(cleandEvents);
};

// Contacts
const cleanContact = (contact) => {
	delete contact.updatedAt;
	delete contact.createdAt;
	return contact;
};

export const toContactJSON = (contact) => {
	return JSON.stringify(cleanContact(contact));
};

export const toContactsJSON = (contacts) => {
	const cleanedContacts = contacts.map((c) => cleanContact(c));
	return JSON.stringify(cleanedContacts);
};

// Activities
const cleanActivity = (activity) => {
	delete activity.updateAt;
	delete activity.createdAt;
	return activity;
};

export const toActivityJSON = (activity) => {
	return JSON.stringify(cleanActivity(activity));
};

export const toActivitiesJSON = (activities) => {
	const cleanedActivities = activities.map((a) => cleanActivity(a));
	return JSON.stringify(cleanedActivities);
};

// Bookings
const cleanBooking = (booking) => {
	delete booking.updatedAt;
	delete booking.createdAt;
	return booking;
};

export const toBookingJSON = (booking) => {
	return JSON.stringify(cleanBooking(booking));
};

export const toBookingsJSON = (bookings) => {
	const cleanedBookings = bookings.map((b) => cleanBooking(b));
	return JSON.stringify(cleanedBookings);
};

// EventTickets
const cleanTicket = (ticket) => {
	delete ticket.updatedAt;
	delete ticket.createdAt;
	return ticket;
};

export const toTicketJSON = (ticket) => {
	return JSON.stringify(cleanTicket(ticket));
};

export const toTicketsJSON = (tickets) => {
	const cleanedTickets = tickets.map((t) => cleanTicket(t));
	return JSON.stringify(cleanedTickets);
};

// Visitors
const cleanVisitor = (visitor) => {
	delete visitor.updatedAt;
	delete visitor.createdAt;
	return visitor;
};

export const toVisitorJSON = (visitor) => {
	return JSON.stringify(cleanVisitor(visitor));
};

export const toVisitorsJSON = (visitors) => {
	const cleanedVisitors = visitors.map((v) => cleanVisitor(v));
	return JSON.stringify(cleanedVisitors);
};


// Membership
const cleanMembership = (membership) => {
	delete membership.updatedAt;
	delete membership.createdAt;
	if ('_count' in membership) {
		membership.numberOfContacts= membership._count.contacts;
		delete membership._count;
	}
	return membership;
};

export const toMembershipJSON = (membership) => {
	return JSON.stringify(cleanMembership(membership));
};

export const toMembershipsJSON = (memberships) => {
	const cleanedMemberships = memberships.map((m) => cleanMembership(m));
	return JSON.stringify(cleanedMemberships);
};


// VisitorCategory
const cleanCategory = (category) => {
	delete category.updatedAt;
	delete category.createdAt;
	return category;
};

export const toCategoryJSON = (category) => {
	return JSON.stringify(cleanCategory(category));
};

export const toCategoriesJSON = (categories) => {
	const cleanedCategories = categories.map((c) => cleanCategory(c));
	return JSON.stringify(cleanedCategories);
};

// ActivityTicket
const cleanActivityTicket = (activityTicket) => {
	delete activityTicket.updatedAt;
	delete activityTicket.createdAt;
	return activityTicket;
};

export const toActivityTicketJSON = (activityTicket) => {
	return JSON.stringify(cleanCategory(activityTicket));
};

export const toActivityTicketsJSON = (activityTickets) => {
	const cleanedActivityTickets = activityTickets.map((a) => cleanActivityTicket(a));
	return JSON.stringify(cleanedActivityTickets);
};