/**
 * Scrub input email address if it's not a VT or test email address
 */
function getContextEmail(email?: string) {
  return email?.includes('@example.') || email?.includes('@varsitytutors.') ? email : undefined;
}

export default getContextEmail;
