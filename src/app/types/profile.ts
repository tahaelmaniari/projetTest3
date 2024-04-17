let cachedProfileTxt = window.localStorage.getItem("USER_PROFILE");
let cachedProfile = cachedProfileTxt ? JSON.parse(cachedProfileTxt) : {};

export const userProfile={
  login: cachedProfile.login,
  userId: cachedProfile.userId,
  matricule: cachedProfile.matricule,
  email: cachedProfile.email,
  roles: cachedProfile.roles || [],
  lastName: cachedProfile.lastName,
  firstName: cachedProfile.firstName,
  provenance: cachedProfile.provenance,
  delegationRegionale: cachedProfile.delegationRegionale,
  entite: cachedProfile.entite
}
