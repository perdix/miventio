

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










