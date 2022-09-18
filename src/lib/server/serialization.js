

export const toOrganisationJSON = (organisation) => {

  if ('superusers' in organisation) {
    
    organisation.superusers = organisation.superusers.map(s => { 
      return {
        role: s.role,
        id: s.superuser_id,
        email: s.superuser.email,
      }
    });
    
  }
  return JSON.stringify(organisation);
}


export const toSuperuserJSON = (superuser) => {

  if ('password' in superuser) {
    delete superuser.password
  }


  superuser.organisations = superuser.organisations.map(o => { 
    return {
      role: o.role,
      id: o.organisation_id,
      name: o.organisation.name,
    }
  });
  return JSON.stringify(superuser);
}


// Event

const cleanEvent = (event) => {
  delete event.updated_at;
  delete event.created_at;
  event.start = event.start ? event.start.toISOString().substring(0,10): null;
  event.end = event.end ? event.end.toISOString().substring(0,10): null;
  return event;
}

export const toEventJSON = (event) => {
  return JSON.stringify(cleanEvent(event))
}

export const toEventsJSON = (events) => {
  const cleandEvents = events.map(e => cleanEvent(e));
  return JSON.stringify(cleandEvents)
}


// Contacts
const cleanContact = (contact) => {
  delete contact.updated_at;
  delete contact.created_at;
  return contact;
}

export const toContactJSON = (contact) => {
  return JSON.stringify(cleanContact(contact))
}

export const toContactsJSON = (contacts) => {
  const cleanedContacts = contacts.map(c => cleanContact(c));
  return JSON.stringify(cleanedContacts)
}

// Activities

const cleanActivity = (activity) => {
  delete activity.updated_at;
  delete activity.created_at;
  return activity;
}

export const toActivityJSON = (activity) => {
  return JSON.stringify(cleanActivity(activity))
}

export const toActivitiesJSON = (activities) => {
  const cleanedActivities = activities.map(a => cleanActivity(a));
  return JSON.stringify(cleanedActivities)
}






