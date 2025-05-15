export const commandsPage = {
  // Login form
  loginFormHeader: () => cy.get(".login-form > h2"),
  loginEmailInput: () => cy.get("[data-qa=login-email]"),
  loginPasswordInput: () => cy.get("[data-qa=login-password]"),
  loginButton: () => cy.get("[data-qa=login-button]"),

  // Signup form
  signupFormHeader: () => cy.get(".signup-form > h2"),
  signupNameInput: () => cy.get("[data-qa=signup-name]"),
  signupEmailInput: () => cy.get("[data-qa=signup-email]"),
  signupButton: () => cy.get("[data-qa=signup-button]"),

  // Account information form
  accountInfoHeader: () => cy.get(":nth-child(1) > b"),
  genderMaleRadio: () => cy.get("#id_gender1"),
  accountPasswordInput: () => cy.get("[data-qa=password]"),
  daysSelect: () => cy.get("[data-qa=days]"),
  monthsSelect: () => cy.get("[data-qa=months]"),
  yearsSelect: () => cy.get("[data-qa=years]"),
  newsletterCheckbox: () => cy.get("#newsletter"),
  optinCheckbox: () => cy.get("#optin"),
  firstNameInput: () => cy.get("[data-qa=first_name]"),
  lastNameInput: () => cy.get("[data-qa=last_name]"),
  companyInput: () => cy.get("[data-qa=company]"),
  addressInput: () => cy.get("[data-qa=address]"),
  countrySelect: () => cy.get("[data-qa=country]"),
  stateInput: () => cy.get("[data-qa=state]"),
  cityInput: () => cy.get("[data-qa=city]"),
  zipcodeInput: () => cy.get("[data-qa=zipcode]"),
  mobileNumberInput: () => cy.get("[data-qa=mobile_number]"),
  createAccountButton: () => cy.get("[data-qa=create-account]"),

  // Account created
  accountCreatedMsg: () => cy.get("[data-qa=account-created]"),
  continueButton: () => cy.get("[data-qa=continue-button]"),

  // Payment details
  nameOnCardInput: () => cy.get('[data-qa="name-on-card"]'),
  cardNumberInput: () => cy.get('[data-qa="card-number"]'),
  cvcInput: () => cy.get('[data-qa="cvc"]'),
  expiryMonthInput: () => cy.get('[data-qa="expiry-month"]'),
  expiryYearInput: () => cy.get('[data-qa="expiry-year"]'),
  payButton: () => cy.get('[data-qa="pay-button"]'),

  // Product
  productImageWrapper: (index = 0) => cy.get(".product-image-wrapper").eq(index),
  addToCartButton: () => cy.get(".add-to-cart").first(),

  // Search
  searchInput: () => cy.get("#search_product"),
  searchButton: () => cy.get("#submit_search"),
};