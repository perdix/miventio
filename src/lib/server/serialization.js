
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

// Event

const cleanEvent = (event) => {
	delete event.updatedAt;
	delete event.createdAt;
	event.start = event.start ? event.start.toISOString().substring(0, 10) : null;
	event.end = event.end ? event.end.toISOString().substring(0, 10) : null;
	if (('_count' in event) && ('visits' in event._count)) {
		event.number_of_visits = event._count.visits;
	}
	delete event._count;
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
	delete contact.updated_at;
	delete contact.created_at;
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
	delete activity.updated_at;
	delete activity.created_at;
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
	delete booking.updated_at;
	delete booking.created_at;
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
	delete ticket.updated_at;
	delete ticket.created_at;
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
const cleanVisit = (visit) => {
	delete visit.updated_at;
	delete visit.created_at;
	return visit;
};

export const toVisitJSON = (visit) => {
	return JSON.stringify(cleanTicket(visit));
};

export const toVisitsJSON = (visits) => {
	const cleanedVisits = visits.map((v) => cleanVisit(v));
	return JSON.stringify(cleanedVisits);
};
