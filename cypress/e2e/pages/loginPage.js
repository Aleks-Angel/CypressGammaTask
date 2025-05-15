export const loginPage = {
  signupLoginTab: () => cy.contains("Signup / Login"),
  loggedInAs: (name) => cy.contains(`Logged in as ${name}`),
  deleteAccountBtn: () => cy.contains("Delete Account"),
  accountDeletedMsg: () => cy.get('[data-qa="account-deleted"]'),
  continueBtn: () => cy.get('[data-qa="continue-button"]'),
  logoutBtn: () => cy.contains("Logout"),
  emailExistsMsg: () => cy.contains("Email Address already exist!"),
  incorrectLoginMsg: () => cy.contains("Your email or password is incorrect!"),
};